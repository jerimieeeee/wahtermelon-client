import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCalendarDay, faCaretLeft, faCaretRight, faCircleCheck, faInfoCircle, faPencil, faPlus, faSave, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';



@Component({
    selector: 'app-fppe',
    templateUrl: './fppe.component.html',
    styleUrls: ['./fppe.component.scss'],
    standalone: false
})

export class FppeComponent implements OnInit {
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

  pes: any = [];
  pe_answers: any = [];
  pe_grouped = [];

  is_saving: boolean = false;
  show_form: boolean = false;

  abdomen_pes: any = [];
  breast_pes: any = [];
  conjunctiva_pes: any = [];
  extremities_pes: any = [];
  neck_pes: any = [];
  thorax_pes: any = [];
  physical_codes: any = [];

  fp_visit_history_details: any;
  pe_remarks: any;

  category = [
    {"name" : "Conjunctiva"},
    {"name" : "Neck"},
    {"name" : "Breast"},
    {"name" : "Thorax"},
    {"name" : "Abdomen"},
    {"name" : "Extremities"}
  ];

  onSubmit(){
    var pe_arr = [];
    this.is_saving = true;
    // console.log(this.vaccineForm)
    Object.entries(this.physical_codes).forEach(([key, value], index) => {
      if(value != false){
        let pes = {
          pe_id: key
        };

        pe_arr.push(pes);
        console.log(pe_arr, 'ito ung array sa for loop')
      }
    })


      let fp_id = this.fp_visit_history_details.id
      let p_id = this.patient_id
      let remarks = this.fp_visit_history ? this.fp_visit_history.pe_remarks : null

      var physical_exam_details = {
        patient_fp_id: fp_id,
        patient_id: p_id,
        physical_exam: pe_arr,
        pe_remarks: remarks,


      }

      console.log(physical_exam_details)

      this.http.post('family-planning/fp-physical-exam', physical_exam_details).subscribe({
        next: () => {
          this.toastr.success('First Visit was ' + (physical_exam_details ? 'updated' : 'saved') + ' successfully', 'Success')
          this.is_saving = false;
          this.loadFP.emit();
          this.reloadData();
          this.loadSelected();
          console.log(physical_exam_details, 'ito ung submit sa PE')
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



  //   this.is_saving = true;

  //   if(Object.keys(this.physical_codes).length > 0) {
  //     let pe_codes = [];
  //     Object.entries(this.physical_codes).forEach(([key, value], index) => {
  //       if(value === true) pe_codes.push(key);
  //     });
  //     this.saveCodes(pe_codes)
  //   } else {
  //     // this.saveNotes();
  //     // console.log(pe_codes, 'ito ung submit')
  //   }
  // }

  // saveCodes(codes) {
  //   let physical_exam_details = {
  //     // notes_id: this.consult_notes.id,

  //     patient_id: this.patient_id,
  //     patient_fp_id: this.fp_visit_history_details.id,
  //     physical_exam: {
  //       pe_id: codes
  //     },
  //     pe_remarks: ''
  //   }
  //     console.log(this.fp_visit_history_details.id, 'ito ung submit sa PE')
  //   this.http.post('family-planning/fp-physical-exam', physical_exam_details).subscribe({
  //     next: (data: any) => {
  //       // this.saveNotes();
  //     },
  //     error: err => console.log(err)
  //   })
  // }

  loadSelected() {

      Object.entries(this.fp_visit_history_details.physical_exam).forEach(([key, value], index) => {
        let val: any = value;
        this.physical_codes[val.pe_id] = true;

        // this.fp_visit_history_details.physical_exam.forEach((value) => {
        //   // console.log(value)
        //   this.physical_codes[val.pe_id] = value.pe_id;
        //   // serv2.service_date['value.status_id'] = value.s
        // })
      });
      console.log(this.fp_visit_history.physical_exam, 'test')


  }

  loadLibraries() {
    this.http.get('libraries/family-planning-physical-exam').subscribe(
      (data: any) => {
        // console.log(data.data)
        const list = data.data;

        const groups = list.reduce((groups, item) => {
          const group = (groups[item.category_id.toLowerCase()] || []);
          group.push(item);
          groups[item.category_id.toLowerCase()] = group;
          return groups;
        }, {});

        this.pe_grouped = groups;
        this.loadFP.emit();
        this.loadSelected();
        this.show_form = true;
        console.log(this.pe_grouped, 'grouped')
      }
    );
  }




  // loadLibraries(){
  //   this.http.get('libraries/family-planning-physical-exam').subscribe({
  //     next: (data: any) => {

  //       this.pes = data.data;


  //       this.abdomen_pes = this.pes.filter(t=>t.category_id ==='ABDOMEN');
  //       this.breast_pes = this.pes.filter(t=>t.category_id ==='BREAST');
  //       this.conjunctiva_pes = this.pes.filter(t=>t.category_id ==='CONJUNCTIVA');
  //       this.extremities_pes = this.pes.filter(t=>t.category_id ==='EXTREMITIES');
  //       this.neck_pes = this.pes.filter(t=>t.category_id ==='NECK');
  //       this.thorax_pes = this.pes.filter(t=>t.category_id ==='THORAX');

  //       console.log(this.pes, 'pes')
  //       console.log(this.abdomen_pes, 'pes abdomen')

  //     },
  //     error: err => console.log(err)
  //   });
  // }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
    this.fp_visit_history_details = this.fp_visit_history
    console.log(this.fp_visit_history_details.physical_exam, 'test')
  }

}


