import { Component, OnInit } from '@angular/core';
import { faEdit, faFlaskVial, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';

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

  pending_list = [
    {
      id: 1,
      type: 'Serology',
      date_requested: '12/22/2022'
    },
    {
      id: 2,
      type: 'Serology',
      date_requested: '12/22/2022'
    },
    {
      id: 3,
      type: 'Serology',
      date_requested: '12/22/2022'
    },
    {
      id: 4,
      type: 'Serology',
      date_requested: '12/22/2022'
    },
    {
      id: 5,
      type: 'Serology',
      date_requested: '12/22/2022'
    },
    {
      id: 6,
      type: 'Serology',
      date_requested: '12/22/2022'
    },
  ];



  patientInfo(info){
    this.patient_details = info;
  }
  modal = [];
  selected_lab: any;

  toggleModal(form, lab?){
    this.selected_lab = lab;
    this.modal[form] = !this.modal[form];
    if(this.modal[form] === false) this.selected_lab = null;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
