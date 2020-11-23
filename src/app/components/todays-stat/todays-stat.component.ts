import { Component, OnInit } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todays-stat',
  templateUrl: './todays-stat.component.html',
  styleUrls: ['./todays-stat.component.scss']
})
export class TodaysStatComponent implements OnInit {
  faChevronDown = faChevronDown;
  constructor() { }

  ngOnInit(): void {
  }

}
