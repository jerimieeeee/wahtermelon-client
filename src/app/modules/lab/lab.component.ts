import { Component, OnInit } from '@angular/core';
import { faEdit, faFlaskVial, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {
  faFlaskVial = faFlaskVial;
  faTrash = faTrash;
  faEdit = faEdit;
  faXmark = faXmark;

  patient_details: any;

  pending_list: any;

  loadData(){
    let params = {
      patient_id: this.patient_details.id,
      sort: '-request_date'
    }
    this.http.get('laboratory/consult-laboratories', {params}).subscribe({
      next: (data: any) => {
        console.log(data)
        this.pending_list = data.data
      },
      error: err => console.log(err)
    })
  }

  patientInfo(info){
    this.patient_details = info;
    this.loadData();
    console.log(info)
  }
  modal = [];
  selected_lab: any;

  toggleModal(form, lab?){
    this.selected_lab = lab;
    this.modal[form] = !this.modal[form];
    if(this.modal[form] === false) this.selected_lab = null;
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
  }

}
