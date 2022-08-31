import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus, faCalendar, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-death-record',
  templateUrl: './death-record.component.html',
  styleUrls: ['./death-record.component.scss']
})
export class DeathRecordComponent implements OnInit {

  faSearch = faSearch;
  faBalanceScale = faBalanceScale;
  faPlus = faPlus;
  faCalendar = faCalendar;
  faInfoCircle = faInfoCircle;

  constructor() { }

  ngOnInit(): void {
  }

}
