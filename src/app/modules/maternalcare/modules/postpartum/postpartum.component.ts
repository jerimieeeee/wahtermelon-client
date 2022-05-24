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
  public keyUp = [];
  public buttons = [];
  faInfoCircle = faInfoCircle;
  faCalendarDay = faCalendarDay;
  postpartum_form: FormGroup;
  gravidity: Number = new Number();
  parity: Number = new Number();
  full_term: Number = new Number();
  live_births: Number = new Number();
  abortions: Number = new Number();
  pre_term: Number = new Number();
  bfd: boolean;

  constructor() { }

  public delivery_location = [
    {id:'1', loc:'Home'},
    {id:'2', loc:'Public Hospital'},
    {id:'3', loc:'Private Hospital'},
    {id:'4', loc:'Public Lying-In Clinic'},
    {id:'5', loc:'Private Lying-In Clinic'},
    {id:'6', loc:'Health Center'},
    {id:'7', loc:'Barangay Health Station'},
    {id:'8', loc:'DOH-Licensed Ambulance'},
    {id:'9', loc:'Others'},
  ];
  public attendants = [
    {id:'1', attendant:'Physician'},
    {id:'2', attendant:'Midwife'},
    {id:'3', attendant:'Nurse'},
    {id:'4', attendant:'Trained Hilot'},
    {id:'5', attendant:'Untrained Hilot'},
    {id:'6', attendant:'Other'},
  ];
  public preg_outcome = [
    {id:'1', outcome:'Fetal Death in Utero - Male'},
    {id:'2', outcome:'Fetal Death in Utero - Male'},
    {id:'3', outcome:'Live baby girl LSCS'},
    {id:'4', outcome:'Live baby boy LSCS'},
    {id:'5', outcome:'Live baby girl NSD'},
    {id:'6', outcome:'Live baby boy NSD'},
    {id:'7', outcome:'Stillbirth - Male'},
    {id:'8', outcome:'Stillbirth - Female'},
    {id:'9', outcome:'Twin'},
  ]
  ngOnInit(): void {
   this.createForm();
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
    delivery_location: data.delivery,
    // region:  ,
    // province: ,
    // muncity: ,
    // barangay: 
  })
 }
 bfdCheck(){
  this.bfd = !this.bfd;
 }
}
