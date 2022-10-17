import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faAngleDown, faCalendarDay, faCaretRight, faClose, faInfoCircle, faPencil, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mcr',
  templateUrl: './mcr.component.html',
  styleUrls: ['./mcr.component.scss']
})
export class McrComponent implements OnInit {
 date = new Date();
  focused: boolean;

  faCalendarDay = faCalendarDay;
  faTimes = faTimes;
  faClose = faClose;
  faTimesCircle = faTimesCircle;
  faSave = faSave;
  faPencil = faPencil;
  faAngleDown = faAngleDown;
  faInfoCircle = faInfoCircle;
  faCaretRight = faCaretRight;
  error_message = '';
  lmp_date: any;
  edc_date: any;
  aog_date: any;
  public keyUp = [];
  public buttons = [];
  mcr_form: FormGroup;
  gravidity: Number = new Number();
  parity: Number = new Number();
  full_term: Number = new Number();
  pre_term: Number = new Number();
  abortions: Number = new Number();
  live_births: Number = new Number();
  response: any;
  first_tri: Date;
  second_tri: Date;
  third_tri: Date;
  today: Date;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.focused = false;
    this.createForm();
    this.error_message = "**please enter numbers only!"
    this.today = new Date();
    this.edc_date = new Date();
    this.aog_date = "No Date";
    this.first_tri = new Date();
    this.second_tri = new Date();
    this.third_tri = new Date();
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
    let url = ''
    this.response = this.http.get(url).subscribe();
    console.log('mcr_form: ', this.mcr_form.value, ' vs response:', this.response);
    
    this.mcr_form.disable();
  }
  onKeyUp(data_input: string, id: string) {
    // console.log(data_input + ' this is my data input');

    if (this.keyUp.includes(id)) {
      if (data_input == '') {
        this.keyUp.splice(this.keyUp.indexOf(id), 1);
      }
    } else {
      this.keyUp.push(id);

    }

  }
  buttonShow(name) {
    this.buttons = [];
    if (!this.buttons.includes(name)) {
      this.buttons.push(name);
    }
    // console.log(this.buttons);

  }
  cancel() {
    this.keyUp = [];
    this.mcr_form.reset();
  }
  edit() {
    this.mcr_form.enable();
  }

  getEDC(){
    this.edc_date = new Date(this.lmp_date);
    this.edc_date.setDate(this.edc_date.getDate() + 280)

    this.first_tri = new Date(this.lmp_date);
    this.first_tri.setDate(this.edc_date.getDate() + 73);

    this.second_tri = new Date(this.lmp_date);
    this.second_tri.setDate(this.edc_date.getDate() + 181);

    this.third_tri = this.edc_date;


    this.aog_date = new Date();
    var lmp = new Date(this.lmp_date);
    // this.aog_date = this.aog_date.setDate(this.aog_date.getTime() - lmp.getTime() )
    const msInWeek = 1000 * 60 * 60 * 24 * 7;
    var aggregate = ((this.aog_date.getTime() - lmp.getTime()) / msInWeek).toFixed(2);
    if(Number(aggregate) > 1){
      var suffix = ' weeks';
    }else if (Number(aggregate) == 1){
      var suffix = ' week';
    }else if (Number(aggregate) < 1){
      aggregate = JSON.stringify(Math.round(((this.aog_date.getTime() - lmp.getTime()) / msInWeek) * 7))
      suffix = ' days'
    }
    
    this.aog_date = aggregate + suffix;

  }
}
