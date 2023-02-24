import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { lab_list } from './lib';

@Component({
  selector: 'app-lab-request-modal',
  templateUrl: './lab-request-modal.component.html',
  styleUrls: ['./lab-request-modal.component.scss']
})
export class LabRequestModalComponent implements OnInit {
  @Input() patient_info;
  @Input() consult_id;
  @Input() lab_req_list;
  @Output() toggleModal = new EventEmitter<any>();

  lab_list;// = lab_list;
  request_date: string;
  labs: any = [];
  is_recommended: string;

  is_saving: boolean = false;

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  count = 0;
  updateList(lab_code) {
    if(this.labs[lab_code] === true) {
      this.count -= 1;
    } else {
      this.count += 1;
    }
  }

  recommended: any;

  loadLabs(){
    this.http.get('libraries/laboratories').subscribe({
      next: (data: any) => {
        this.lab_list = data.data;
        // console.log(this.lab_list)
      },
      error: err => console.log(err)
    })

    this.http.get('libraries/laboratory-recommendations').subscribe({
      next: (data: any) => {
        this.recommended = data.data;
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

  max_date = formatDate(new Date, 'yyyy-MM-dd', 'en');
  ngOnInit(): void {
    this.loadLabs();
  }
}
