import { Component, OnInit } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todays-stats',
  templateUrl: './todays-stats.component.html',
  styleUrls: ['./todays-stats.component.scss']
})
export class TodaysStatsComponent implements OnInit {
  faChevronDown = faChevronDown;

  constructor() { }

  ngOnInit(): void {
  }

}
