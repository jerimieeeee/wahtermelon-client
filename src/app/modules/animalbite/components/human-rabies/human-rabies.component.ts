import { Component, OnInit } from '@angular/core';
import { faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-human-rabies',
  templateUrl: './human-rabies.component.html',
  styleUrls: ['./human-rabies.component.scss']
})
export class HumanRabiesComponent implements OnInit {

  faInfoCircle = faInfoCircle;
  faPlus = faPlus;

  patientid=null;
  
  constructor() { }

  ngOnInit(): void {
  }

}
