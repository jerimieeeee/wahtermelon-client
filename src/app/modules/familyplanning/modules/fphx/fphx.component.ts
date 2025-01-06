import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCalendarDay, faCaretLeft, faCaretRight, faCircleCheck, faInfoCircle, faPencil, faPlus, faSave, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-fphx',
    templateUrl: './fphx.component.html',
    styleUrls: ['./fphx.component.scss'],
    standalone: false
})
export class FphxComponent implements OnInit {
  @Output() loadFP = new EventEmitter<any>();
  @Output() updateSelectedFp = new EventEmitter<any>();
  @Input() patient_id;
  @Input() fp_visit_history;
  @Input() selected_fp_consult;


  faCalendarDay = faCalendarDay;
  faPlus = faPlus;
  faSave = faSave;
  faTimes = faTimes;
  faPencil = faPencil;
  faCircleCheck = faCircleCheck;
  faCaretRight = faCaretRight;
  faInfoCircle = faInfoCircle;
  faSpinner = faSpinner;

  hx: any = [];
  pe_answers: any = [];
  hx_grouped = [];

  is_saving: boolean = false;
  show_form = false;

  hx_codes: any = [];

  // fp_visit_history_details: any;

  category = [
    {"name" : "Abdomen"},
    {"name" : "History of any of the following"},
    {"name" : "Chest/Heart"},
    {"name" : "Extremities"},
    {"name" : "Genital"},
    {"name" : "HEENT"},
    {"name" : "Skin"},
  ];

  loadLibraries() {
    this.http.get('libraries/family-planning-history').subscribe(
      (data: any) => {
        // console.log(data.data)
        const list = data.data;

        // console.log(list, 'history list')
        const groups = list.reduce((groups, item) => {
          const group = (groups[item.category.toLowerCase()] || []);
          group.push(item);
          groups[item.category.toLowerCase()] = group;
          return groups;
        }, {});

        this.hx_grouped = groups;
        this.loadFP.emit();
        this.loadSelected();
        this.show_form = true;
      }
    );
  }

  onSubmit(){
    var hx_arr = [];
    this.is_saving = true;
    // console.log(this.hx_codes)
    Object.entries(this.hx_codes).forEach(([key, value], index) => {
      if(value != false){
        let hxs = {
          history_code: key
        };

        hx_arr.push(hxs);
        // console.log(hx_arr, 'ito ung array sa for loop')
      }
    })

      let fp_id = this.fp_visit_history.id
      let p_id = this.patient_id
      var history ={
        patient_fp_id: fp_id,
        patient_id: p_id,
        history: hx_arr,
      }

      console.log(history, 'history submit')

      this.http.post('family-planning/fp-history', history).subscribe({
        next: () => {
          this.toastr.success('FP History was ' + (history ? 'updated' : 'saved') + ' successfully', 'Success')
          this.is_saving = false;
          this.loadFP.emit();
          this.reloadData();
          this.loadSelected();
          console.log(history, 'ito ung submit sa FPHX')
        },
        error: err => console.log(err),
        complete: () => {
        console.log('success')
        }
      })
  }

  reloadData(){
    let params = {
      patient_id: this.patient_id
    }

    this.http.get('family-planning/fp-records', {params}).subscribe({
      next: (data: any) => {
        this.selected_fp_consult = data.data[0];
        this.updateSelectedFp.emit(this.selected_fp_consult);
        console.log(this.selected_fp_consult, 'check mo selected')
      },
      error: err => console.log(err)
    });
  }

  loadSelected() {
    if(this.fp_visit_history.history){
      Object.entries(this.fp_visit_history.history).forEach(([key, value]:any, index) => {
        // let val: any = value;
        this.hx_codes[value.history_code] = true;

        // console.log(key)
        // console.log(value)
        // this.fp_visit_history_details.physical_exam.forEach((value) => {
        //   // console.log(value)
        //   this.physical_codes[val.pe_id] = value.pe_id;
        //   // serv2.service_date['value.status_id'] = value.s
        // })
      });
    }
    console.log(this.fp_visit_history.history, 'test')


}


  constructor(
    private http: HttpService,
    // private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
    // this.fp_visit_history_details = this.fp_visit_history
    console.log(this.fp_visit_history.history, 'testing history')
    // console.log(this.fp_visit_history, 'testing fp visit history on history')
  }

}
