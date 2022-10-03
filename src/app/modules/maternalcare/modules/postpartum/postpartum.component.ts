import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faAngleDown, faCalendarDay, faCaretRight, faClose, faInfoCircle, faPencil, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-postpartum',
  templateUrl: './postpartum.component.html',
  styleUrls: ['./postpartum.component.scss']
})
export class PostpartumComponent implements OnInit {
  focused: boolean;
  public keyUp = [];
  public buttons = [];
  
  faCalendarDay = faCalendarDay;
  faTimes = faTimes;
  faClose = faClose;
  faTimesCircle = faTimesCircle;
  faSave = faSave;
  faPencil = faPencil;
  faAngleDown = faAngleDown;
  faInfoCircle = faInfoCircle;
  faCaretRight = faCaretRight;

  postpartum_form: FormGroup;
  gravidity: Number = new Number();
  parity: Number = new Number();
  full_term: Number = new Number();
  live_births: Number = new Number();
  abortions: Number = new Number();
  pre_term: Number = new Number();
  bfd: boolean;

  @Output() postpartum_bool = new EventEmitter<string>();
  filter: string;
  @Input() delivery_location;
  @Input() attendants;
  @Input() preg_outcome;
  constructor() { }

  ngOnInit(): void {
   this.createForm();
   this.filter = '';
  }
 createForm(){
  this.postpartum_form = new FormGroup({
    registration_date: new FormControl(new Date().toISOString().substring(0,10)),
    delivery_date: new FormControl(new Date().toISOString().substring(0,10)),
    admission_date: new FormControl(new Date().toISOString().substring(0,10)),
    discharge_date: new FormControl(new Date().toISOString().substring(0,10)),
    gravidity: new FormControl(this.gravidity),
    parity: new FormControl(this.parity),
    full_term: new FormControl(this.full_term),
    pre_term: new FormControl(this.pre_term),
    abortions: new FormControl(this.abortions),
    live_births: new FormControl(this.live_births),
    delivery_location: new FormControl(),
    region: new FormControl(),
    province: new FormControl(),
    muncity: new FormControl(),
    barangay: new FormControl(),
    birth_attendant: new FormControl(),
    pregnancy_outcome: new FormControl(),
    breastfeeding_asap: new FormControl(),
    baby_healthy: new FormControl(),
    breastfeeding_date: new FormControl(new Date().toISOString().substring(0,10)),
  });
 }
  flip(): void{
    this.focused = !this.focused;
    this.keyUp = [];
    this.buttons = [];
    this.buttons.push('save');
  }
 saveForm(data){
  this.postpartum_form.setValue({
    registration_date: data.registration_date,
    delivery_date: data.delivery_date,
    admission_date: data.admission_date,
    discharge_date: data.discharge_date,
    gravidity: data.gravidity,
    parity: data.parity,
    full_term: data.full_term,
    pre_term: data.pre_term,
    abortions: data.abortions,
    live_births: data.live_births,
    delivery_location:data.delivery_location,
    region: data.region,
    province: data.province,
    muncity:data.muncity,
    barangay:data.barangay,
    birth_attendant: data.birth_attendant,
    pregnancy_outcome: data.pregnancy_outcome,
    breastfeeding_asap:data.breastfeeding_asap,
    baby_healthy:data.baby_healthy,
    breastfeeding_date: data.breastfeeding_date,
    // region:  ,
    // province: ,
    // muncity: ,
    // barangay: 
  });
  console.log(this.postpartum_form.value, " data value");
  this.postpartum_bool.emit(this.postpartum_form.value);
 }
 bfdCheck(value){
  this.bfd = !this.bfd;
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
}

buttonShow(name) {
  this.buttons = [];
  if (!this.buttons.includes(name)) {
    this.buttons.push(name);
  }
  // console.log(this.buttons);

}
cancel() {
  this.bfd = false;
  this.keyUp = [];
  this.createForm();
}
}
