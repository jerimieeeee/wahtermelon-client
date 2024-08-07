import { CommonModule, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-lab-request',
  templateUrl: './lab-request.component.html',
  styleUrls: ['./lab-request.component.scss'],
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule, CommonModule]
})
export class LabRequestComponent implements OnChanges{
  @Input() patient_info;
  @Input() consult_id;
  @Input() lab_req_list;
  @Output() toggleModal = new EventEmitter<any>();

  faCircleNotch = faCircleNotch;

  max_date = formatDate(new Date, 'yyyy-MM-dd', 'en', 'Asia/Manila');
  lab_list;
  request_date: string;
  labs: any = [];
  is_recommended: string;

  is_saving: boolean = false;

  count = 0;
  updateList(lab_code) {
    if(this.labs[lab_code] === true) {
      this.count -= 1;
    } else {
      this.count += 1;
    }
  }

  recommended: any;
  show_form: boolean = false;
  loadLabs(){
    this.http.get('libraries/laboratory-recommendations').subscribe({
      next: (data: any) => {
        this.recommended = data.data;

        this.http.get('libraries/laboratories').subscribe({
          next: (data: any) => {
            this.lab_list = data.data;
            console.log(this.lab_list);
            Object.entries(this.lab_list).forEach(([key, value], index) => {
              let val: any = value;
              // console.log(val)
              if(this.code_list.find(e => e === val.code)) {
                val["lab_result"] = 'done';
              }
            })
            // console.log(this.lab_list);
            this.show_form = true;
          },
          error: err => console.log(err)
        })
      },
      error: err => console.log(err)
    })
  }

  onSubmit(){
    this.is_saving = true;
    Object.entries(this.labs).forEach(([key, value], index) => {

      if(value === true) {
        let request = {
          request_date: this.request_date,
          patient_id: this.patient_info.id,
          lab_code: key,
          recommendation_code: this.is_recommended,
          request_status_code: 'RQ'
        };

        if(this.consult_id) request['consult_id'] = this.consult_id;

        this.http.post('laboratory/consult-laboratories', request).subscribe({
          next: () => {if(this.count-1 === index) this.saveDone()},
          error: err => this.toastr.error(err, 'Request Error')
        });
      } else {
        if(this.count-1 === index) this.saveDone()
      }
    });
  }

  saveDone(){
    this.showToastr();
    this.is_saving = false;
    this.closeModal();
  }

  showToastr(){
    this.toastr.success('laboratory requested','Lab Request')
  }

  closeModal(){
    this.toggleModal.emit('lab-request')
  }

  pending_list: any;
  code_list: any;

  getPendingList(){
    this.pending_list = [];
    this.code_list = [];
    // let pending_list = [];
    Object.entries(this.lab_req_list).forEach(([key, value], index) => {
      let vals: any = value;
      if(!vals.lab_result && vals.request_status_code === 'RQ') {
        this.pending_list.push(vals)
        this.code_list.push(vals.laboratory.code)
      }
    });

    // this.pending_list = pending_list;
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.lab_req_list)
    this.getPendingList();
    this.loadLabs();
  }
}
