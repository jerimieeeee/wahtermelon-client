import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faCalendarDay, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-postpartum',
  templateUrl: './postpartum.component.html',
  styleUrls: ['./postpartum.component.scss']
})
export class PostpartumComponent implements OnInit {
  focused: boolean;
  keyUp: any[];
  buttons: any[];
  faInfoCircle = faInfoCircle;
  faCalendarDay = faCalendarDay;
  constructor() { }

  ngOnInit(): void {
    this.focused = true;
  }

  flip(): void{
    this.focused = !this.focused;
    this.keyUp = [];
    this.buttons = [];
    this.buttons.push('save');
  }
}
