import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCalendarDay, faCaretLeft, faCaretRight, faCircleCheck, faInfoCircle, faPencil, faPlus, faSave, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pelvic',
  templateUrl: './pelvic.component.html',
  styleUrls: ['./pelvic.component.scss']
})
export class PelvicComponent implements OnInit {
  @Output() loadFP = new EventEmitter<any>();
  @Input() patient_id;
  @Input() fp_visit_history;
  
  faCalendarDay = faCalendarDay;
  faPlus = faPlus;
  faSave = faSave;
  faTimes = faTimes;
  faPencil = faPencil;
  faCircleCheck = faCircleCheck;
  faCaretRight = faCaretRight;
  faInfoCircle = faInfoCircle;
  faSpinner = faSpinner;
  focused: boolean;
  flippable: boolean;
  saved: boolean;
  fppelvic_typing: boolean;

  hx: any = [];
  pe_grouped = [];

  is_saving: boolean = false;
  show_form = false;

  pelvic_codes: any = [];

  fp_visit_history_details: any;

  category = [
    {"name" : "Adnexa"},
    {"name" : "Cervix"},
    {"name" : "Color"},
    {"name" : "Consistency"},
    {"name" : "Perinium"},
    {"name" : "Uterus Position"},
    {"name" : "Uterus Size"},
    {"name" : "Vagina"},
  ];


  loadLibraries() {
    this.http.get('libraries/family-planning-pelvic-exam').subscribe(
      (data: any) => {
        // console.log(data.data)
        const list = data.data;

        console.log(list)
        const groups = list.reduce((groups, item) => {
          const group = (groups[item.category.toLowerCase()] || []);
          group.push(item);
          groups[item.category.toLowerCase()] = group;
          return groups;
        }, {});

        this.pe_grouped = groups;
        this.loadFP.emit();
        this.loadSelected();
        console.log(this.pe_grouped, 'grouped')
      }
    );
  }

  onSubmit(){
    var pelvic_arr = [];
    this.is_saving = true;
    console.log(this.pelvic_codes)
    Object.entries(this.pelvic_codes).forEach(([key, value], index) => {
      if(value != false){
        let pelv = {
          pelvic_exam_code: key
        };

        pelvic_arr.push(pelv);
        console.log(pelvic_arr, 'ito ung array sa for loop')
      }
    })

    
      let fp_id = this.fp_visit_history_details.id
      let p_id = this.patient_id
      var pelvic_exam = {
        patient_fp_id: fp_id,
        patient_id: p_id,
        pelvic_exam: pelvic_arr,
       
        

      }

      console.log(pelvic_exam, 'history submit')

      this.http.post('family-planning/fp-pelvic-exam', pelvic_exam).subscribe({
        next: () => {
          this.toastr.success('Pelvic was ' + (pelvic_exam ? 'updated' : 'saved') + ' successuly', 'Success')
          this.is_saving = false;
          this.loadFP.emit();
          this.loadSelected();
          console.log(pelvic_exam, 'ito ung submit sa FPHX')
        },
        error: err => console.log(err),
        complete: () => {
        console.log('success')
        }
      })
    
  }

  loadSelected() {
    if(this.fp_visit_history_details.pelvic_exam){
      Object.entries(this.fp_visit_history_details.pelvic_exam).forEach(([key, value]:any, index) => {
        // let val: any = value;
        this.pelvic_codes[value.pelvic_exam_code] = true;

        console.log(key)
        console.log(value)
        // this.fp_visit_history_details.physical_exam.forEach((value) => {
        //   // console.log(value)
        //   this.physical_codes[val.pe_id] = value.pe_id;
        //   // serv2.service_date['value.status_id'] = value.s
        // })
      });
    }
    console.log(this.fp_visit_history_details.pelvic_exam, 'test')
  
 
}

  constructor(
    private http: HttpService,
    // private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
    this.fp_visit_history_details = this.fp_visit_history[0]
  }

}