import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faChevronCircleDown, faChevronCircleUp, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit, OnChanges {
  @Input() toggle_content;
  @Input() consult_details;

  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;
  faSpinner = faSpinner;
  faSave = faSave;

  show_content: boolean = false;
  is_saving: boolean = false;

  management_codes: any;
  consult_notes: any;
  consult_done: any;

  management_list = {
    management_code: [],
    remarks: []
  }

  onSubmit(){
    this.is_saving = true;
    var hx_arr = [];

    Object.entries(this.management_list.management_code).forEach(([key, value], index) => {
      if(value === true){
        let hx = {
          management_code: key,
          remarks: this.management_list.remarks[key] ? this.management_list.remarks[key] : null,
        };
        hx_arr.push(hx);
      }
    })

    if(hx_arr.length > 0){
      var mgmt_form = {
        notes_id: this.consult_notes.id,
        patient_id: this.consult_details.patient.id,
        management: hx_arr
      }

      this.http.post('consultation/management', mgmt_form).subscribe({
        next: (data: any) => {
          this.is_saving = false;
          this.toastr.success('Successfully recorded!','Management record')
        },
        error: err => console.log(err)
      })
    }
  }

  loadLibraries(){
    this.http.get('libraries/management').subscribe({
      next: (data: any) => {
        this.management_codes = data.data
      },
      error: err => console.log(err)
    })
  }

  patchData(){
    if(this.consult_management) {
      Object.entries(this.consult_management).forEach(([key, value], index) => {
        let val: any = value;
        this.management_list.management_code[val.management_code] = true;
        if(val.remarks) {
          this.management_list.remarks[val.management_code] = val.remarks;
        }
      })
    }
  }

  consult_management: any;

  ngOnChanges(changes: SimpleChanges): void{
    // console.log(this.consult_details.consult_done)
    this.show_content = this.toggle_content;
    if(this.consult_details) {
      this.consult_notes = this.consult_details.consult_notes;
      this.consult_done = this.consult_details.consult_done;
      this.consult_management = this.consult_details.management;
      this.patchData()
      // this.loadSelected();

      /* if(this.consult_notes.physical_exam_remarks) {
        this.physical_remarks = this.consult_notes.physical_exam_remarks;
      } */
    }
  };

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLibraries()
  }

}
