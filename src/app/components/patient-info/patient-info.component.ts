import { Component, OnInit } from '@angular/core';
import { faFlask, faHeart, faExclamationCircle, faNotesMedical, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void {
  }

}
