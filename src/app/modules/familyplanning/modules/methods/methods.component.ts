import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faCaretDown, faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.scss']
})
export class MethodsComponent implements OnInit {
  show: boolean;

  constructor() { }
  public focused: boolean;
  faInfoCircle = faInfoCircle;
  faTimesCircle = faTimesCircle;
  faCalendarDay = faCalendarDay;
  faCaretDown = faCaretDown;
   
  public fp_methods = [
    {"id": 1, "method": "Condom"},
    {"id": 2, "method": "Injectibles"},
    {"id": 3, "method": "Implant"},
    {"id": 4, "method": "NA"},
  ];
  ngOnInit(): void {
    this.focused = true;
  }

  flip(){
    console.log('flip');
    this.focused = !this.focused;
  }

  drop(){
    this.show = !this.show;
  }
}
