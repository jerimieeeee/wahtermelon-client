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

  loadLabs(){
    this.http.get('libraries/laboratories').subscribe({
      next: (data: any) => {
        this.lab_list = data.data;
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
          lab_code: key
        };

        if(this.consult_id) request['consult_id'] = this.consult_id;

        this.http.post('laboratory/consult-laboratories', request).subscribe({
          next: (data: any) => console.log(data),
          error: err => this.toastr.error(err, 'Request Error')
        });
      }

      if(this.count-1 === index) {
        this.showToastr();
        this.is_saving = false;
        this.closeModal();
      }
    });
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
    console.log(this.lab_req_list)
  }
}
