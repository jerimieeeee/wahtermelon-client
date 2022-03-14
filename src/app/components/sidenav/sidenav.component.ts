import { Component, OnInit } from '@angular/core';
import { faHome, faCalendarDay, faFlask } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  faHome = faHome;
  faCalendarDay = faCalendarDay;
  faFlask = faFlask;

  constructor() { }

  ngOnInit(): void {
  }

}
