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
  @Output() toggleModal = new EventEmitter<any>();

  lab_list = lab_list;
  request_date: string;
  labs: any = [];

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }


  onSubmit(){
    let labs = [];

    Object.entries(this.labs).forEach(([key, value], index) => {
      labs.push(key);
    });

    let request = {
      consult_id: this.consult_id,
      request_date: this.request_date,
      request: labs
    };

    this.http.post('route', request).subscribe({
      next: (data: any) => {
        console.log(data);
        this.showToastr();
      },
      error: err => console.log(err)
    });
  }

  showToastr(){
    this.toastr.success('laboratory requested','Lab Request')
  }

  closeModal(){
    this.toggleModal.emit('lab-request')
  }

  ngOnInit(): void {
  }
}
