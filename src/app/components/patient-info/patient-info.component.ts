import { Component, OnInit } from '@angular/core';
import { faFlask, faHeart, faExclamationCircle, faNotesMedical, faPlusCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
  faNotesMedical = faNotesMedical;
  faFlask = faFlask;
  faHeart = faHeart;
  faExclamationCircle = faExclamationCircle;
  faPlusCircle = faPlusCircle;
  faQuestionCircle = faQuestionCircle;

  showModal: boolean = false;
  showDeathRecordModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  toggleDeathRecordModal(){
    this.showDeathRecordModal = !this.showDeathRecordModal;
  }
}
