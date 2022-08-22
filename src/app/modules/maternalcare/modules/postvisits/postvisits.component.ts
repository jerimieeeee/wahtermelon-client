import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faAngleDown, faCalendarDay, faCaretRight, faClose, faInfoCircle, faPencil, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-postvisits',
  templateUrl: './postvisits.component.html',
  styleUrls: ['./postvisits.component.scss']
})
export class PostvisitsComponent implements OnInit {
  faCalendarDay = faCalendarDay;
  faTimes = faTimes;
  faClose = faClose;
  faTimesCircle = faTimesCircle;
  faSave = faSave;
  faPencil = faPencil;
  faAngleDown = faAngleDown;
  faInfoCircle = faInfoCircle;
  faCaretRight = faCaretRight;

  value: number;
  registry_id: number;
  postpartum_week: number;

  postpartum_visit_form: FormGroup;
  patient_height: Number = new Number();
  patient_weight: Number = new Number();
  bp_systolic: Number = new Number();
  bp_diastolic: Number = new Number();

  mc_id: Number = new Number();
  user_id: Number = new Number();
  patient_id: Number = new Number();

  focused: boolean;

  feet: number;
  in: number;
  decimal: number;
  actual_height: any;

  constructor() { }

  cm_value = '';
 
  public keyUp = [];
  public buttons = [];
 public toggle_questionaire = [
   {name:"Vaginal infection",form_name:"vi"},
   {name:"Vaginal bleeding",form_name:"vb"},
   {name:"Fever > 38*C",form_name:"f"},
   {name:"Pallor",form_name:"p"},
   {name:"Baby's cord OK",form_name:"b"},
   {name:"Patient Breastfeeds baby",form_name:"pb"},
   {name:"Family Planning Method",form_name:"fp"},
 ]
  ngOnInit(): void {
    this.value = 1;
    this.registry_id = 1;
    this.patient_height = 145;
    this.patient_weight = 75;
    this.patient_id = 1;
    this.bp_systolic = 120;
    this.bp_diastolic = 90;

    this.mc_id = 2;
    this.user_id = 1;
    this.postpartum_week = 1;
    this.createForm();
    this.focused = false;
  }
  flip(): void {
    this.focused = !this.focused;
    this.keyUp = [];
    this.buttons = [];
    this.buttons.push('save');
  }

createForm() {
    this.postpartum_visit_form = new FormGroup({
      postpartum_visit_date: new FormControl(new Date().toISOString().substring(0, 10)),
      visit_sequence: new FormControl(this.value),
      registry_id: new FormControl(this.registry_id),
      postpartum_week: new FormControl(this.postpartum_week),
      patient_height: new FormControl(this.patient_height),
      patient_weight: new FormControl(this.patient_weight),
      bp_systolic: new FormControl(this.bp_systolic),
      bp_diastolic: new FormControl(this.bp_diastolic),
      vi: new FormControl(),
      vb: new FormControl(),
      f: new FormControl(),
      p: new FormControl(),
      b: new FormControl(),
      pb: new FormControl(),
      fp: new FormControl(),
      
  });
}
saveForm(data){

}
onKeyUp(data_input: string, id: string) {
  console.log(data_input + ' this is my data input');

 if (this.keyUp.includes(id)) {
   if (data_input == '') {
     this.keyUp.splice(this.keyUp.indexOf(id), 1);
   }
 } else {
   this.keyUp.push(id);

 }
 console.log(this.keyUp);
 
}
clearForm(id) {
 this.postpartum_visit_form.get(id).reset();
 // this.onKeyUp('', id);
}
cmCatcher(h, h2) {
  console.log(h, " cmCatcher");

  h2 = h.split(' ');

  console.log(h2[0]);

  if (h2[0] > 9) {
    this.feet = h / 30.48;
    this.decimal = this.feet - Math.trunc(this.feet);
    this.in = this.decimal * 12;
    this.in = +this.in.toFixed(2);
    this.actual_height = h;
    this.cm_value = Math.trunc(this.feet) + 'ft ' + this.in + ' in';
    console.log('h value is ', Math.trunc(this.feet), 'ft ', this.in, ' in');
  } else {
    console.log(h.lastIndexOf(' '));
    console.log(h.lastIndexOf(','));
    if (h.lastIndexOf(' ') == 1) {

      h = h.split(' ');

      this.feet = h[0] * 30.48;
      this.feet = +this.feet.toFixed(1);
      console.log(h[1] > 12);

      if (h[1] >= 12) {
        h[1] = 11
      }
      this.in = h[1] * 2.54;
      this.in = +this.in.toFixed(1);

      this.actual_height = this.feet + this.in;
      this.cm_value = this.feet + this.in + ' cm';
    } else {
      this.feet = h * 30.48;
      this.feet = +this.feet.toFixed(1);
      this.actual_height = this.feet;
      this.cm_value = this.feet + ' cm';
    }
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
  this.createForm();
}
}
