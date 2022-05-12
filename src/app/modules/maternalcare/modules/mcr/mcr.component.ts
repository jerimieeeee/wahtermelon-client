import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faCalendarDay, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mcr',
  templateUrl: './mcr.component.html',
  styleUrls: ['./mcr.component.scss']
})
export class McrComponent implements OnInit {
 date = new Date();
  focused: boolean;
  keyUp: any[];
  buttons: any[];
  faInfoCircle = faInfoCircle;
  faCalendarDay = faCalendarDay;

  mcr_form: FormGroup;
  // reg_date: Date = new Date();
  // lmp_date: Date = new Date();
  gravidity: Number = new Number();
  parity: Number = new Number();
  full_term: Number = new Number();
  pre_term: Number = new Number();
  abortions: Number = new Number();
  live_births: Number = new Number();

  constructor() { }

  ngOnInit(): void {
    this.focused = false;
    this.createForm();
  }
  createForm() {
    this.mcr_form = new FormGroup({
      reg_date: new FormControl(new Date().toISOString().substring(0,10)),
      lmp_date: new FormControl(),
      gravidity: new FormControl(this.gravidity),
      parity: new FormControl(this.parity),
      full_term: new FormControl(this.full_term),
      pre_term: new FormControl(this.pre_term),
      abortions: new FormControl(this.abortions),
      live_births: new FormControl(this.live_births),
    });
  }
  flip(): void{
    this.focused = !this.focused;
    this.keyUp = [];
    this.buttons = [];
    this.buttons.push('save');
  }
  saveForm(data) {
    this.mcr_form.setValue({
    
       reg_date: data.reg_date,
      lmp_date: data.lmp_date,
      gravidity: data.gravidity != 0? data.gravidity : 0,
      parity: data.parity != 0? data.parity : 0,
      full_term: data.full_term != 0? data.full_term : 0,
      pre_term: data.pre_term != 0? data.pre_term : 0,
      abortions: data.abortions != 0? data.abortions : 0,
      live_births: data.live_births != 0? data.live_births : 0,
    });
    console.log(this.mcr_form.value);
    
    this.mcr_form.disable();
  }
}
