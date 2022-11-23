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
    {code: '01', desc: 'Facility Based'},
    {code: '02', desc: 'Non-Facility Based'}
];
  
  toggleRecord(){
    this.showRecord = !this.showRecord;
  }

  showCaseModal = false;
  toggleCaseModal(){
    this.showCaseModal = !this.showCaseModal;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
