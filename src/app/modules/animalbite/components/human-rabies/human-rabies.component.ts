import { Component, OnInit } from '@angular/core';
import { faInfoCircle, faPlus, faCalendarDay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-human-rabies',
  templateUrl: './human-rabies.component.html',
  styleUrls: ['./human-rabies.component.scss']
})
export class HumanRabiesComponent implements OnInit {

  faInfoCircle = faInfoCircle;
  faPlus = faPlus
  faCalendarDay = faCalendarDay

  patientid=null;

  showRecord = false;

  death_place = [
    {code: '01', desc: 'FACILITY BASED'},
    {code: '02', desc: 'NON-FACILITY BASED'}
];
  
  toggleRecord(){
    this.showRecord = !this.showRecord;
  }

  showPreExpModal = false;
  togglePreExpModal(){
    this.showPreExpModal = !this.showPreExpModal;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
