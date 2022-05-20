import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faAngleDown, faCalendarDay, faCaretRight, faClose, faInfoCircle, faPencil, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-prenatal',
  templateUrl: './prenatal.component.html',
  styleUrls: ['./prenatal.component.scss']
})
export class PrenatalComponent implements OnInit {
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

  prenatal_form: FormGroup;
  
  fhr: Number = new Number();
  fundic_height: Number = new Number();
  fhr_location_id: String = new String();
  fetal_presentation_id: String = new String();
  patient_height: Number = new Number();
  patient_weight: Number = new Number();
  bp_systolic: Number = new Number();
  bp_diastolic: Number = new Number();
  consult_id: Number = new Number();

  mc_id: Number = new Number();
  user_id: Number = new Number();
  patient_id: Number = new Number();
  trimester: Number = new Number();
  remarks: String = new String();
  value: number;
  cm_value ='';
  feet: number;
  in: number;
  decimal: number;
  actual_height: any;

  
  constructor() { }
  public fetals = ["Cephalic","Breech","Transverse","Mass Palpable - NA"];
  public fhr_lib = ["LLQ","RLQ","LUQ","RUQ","N/A"];
  public keyUp = [];
  public buttons = [];

  ngOnInit(): void {
    this.value = 1;
    this.patient_height = 145;
    this.patient_weight = 75;
    this.patient_id = 1;
    this.bp_systolic = 120;
    this.bp_diastolic = 90;
    this.consult_id = 1;
    this.mc_id = 2;
    this.user_id = 1;

    this.createForm();

  }
  flip(): void{
    this.focused = !this.focused;
    this.keyUp = [];
    this.buttons = [];
    this.buttons.push('save');
  }
  saveForm(data) {
    this.prenatal_form.setValue({
      visit_sequence: data.visit_sequence,
      fhr: data.fhr,
      fundic_height: data.fundic_height,
      fhr_location_id: data.fhr_location_id,
      fetal_presentation_id: data.fetal_presentation_id,
      patient_height: data.patient_height == ''? this.patient_height : this.actual_height,
      patient_weight: data.patient_weight == ''? this.patient_weight : data.patient_weight,
      bp_systolic: data.bp_systolic == ''? this.bp_systolic : data.bp_systolic,
      bp_diastolic: data.bp_diastolic == ''? this.bp_diastolic : data.bp_diastolic,
      consult_id: data.consult_id == ''? this.consult_id : data.consult_id,
      lmp_date: data.lmp_date,
      mc_id: data.mc_id == ''? this.mc_id : data.mc_id,
      user_id: data.user_id == ''? this.user_id : data.user_id,
      patient_id: data.patient_id == ''? this.patient_id : data.patient_id,
      //trimester: data.trimester,
      remarks: data.remarks,
      // {"visit_sequence":"2",
      // "fhr":0,
      // "fundic_height":0,
      // "fhr_location_id":"LLQ",
      // "fetal_presentation_id":"MASS",
      // "patient_height":154.94,
      // "patient_weight":52,
      // "bp_systolic":120,
      // "bp_diastolic":90,
      // "consult_id":367,
      // "lmp_date":"2022-04-01",
      // "mc_id":35,
      // "user_id":57,
      // "patient_id":52,
      prenatal_date: data.prenatal_date,
      // "trimester":1} 
      // _____sample save data prenatal
      
      // {"vitals_weight":52,
      // "vitals_height":154.94,
      // "vitals_systolic":120,
      // "vitals_diastolic":90,
      // "patient_id":52,
      // "user_id":57,
      // "vitals_date":"2022-05-19T13:54:00+08:00"} 
      // _______sample add vital
    });
    console.log(this.prenatal_form.value);
    
    //this.prenatal_form.disable();
  }
  createForm() {
    this.prenatal_form = new FormGroup({
      prenatal_date:  new FormControl(new Date().toISOString().substring(0,10)),
      visit_sequence: new FormControl(this.value),
      fhr: new FormControl(this.fhr),
      fundic_height: new FormControl(this.fundic_height),
      fhr_location_id: new FormControl(this.fhr_location_id),
      fetal_presentation_id: new FormControl(this.fetal_presentation_id),
      patient_height: new FormControl(this.patient_height),
      patient_weight: new FormControl(this.patient_weight),
      bp_systolic: new FormControl(this.bp_systolic),
      bp_diastolic: new FormControl(this.bp_diastolic),
      consult_id: new FormControl(this.consult_id),
      lmp_date: new FormControl(new Date().toISOString().substring(0,10)),
      mc_id: new FormControl(this.mc_id),
      user_id: new FormControl(this.user_id),
      patient_id: new FormControl(this.patient_id),
     // trimester: new FormControl(this.trimester),
      remarks: new FormControl(this.remarks),
    });
  }

  quadrant(id){
    if(this.prenatal_form.get('fhr_location_id').value == id){
      this.prenatal_form.get('fhr_location_id').setValue('N/A');
    }else{
      this.prenatal_form.get('fhr_location_id').setValue(id);
    }
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
  clearForm(id){
    this.prenatal_form.get(id).reset();
    // this.onKeyUp('', id);
  }

  cmCatcher(h){
    console.log(h, " cmCatcher");
    
    if(h > 12){
      this.feet = h/30.48;
      this.decimal = this.feet - Math.trunc(this.feet);
      this.in = this.decimal * 12;
      this.in = +this.in.toFixed(2);
      this.actual_height = h;
      this.cm_value = Math.trunc(this.feet) + 'ft ' + this.in + ' in';
      console.log('h value is ', Math.trunc(this.feet), 'ft ', this.in, ' in');
    }else{
      console.log(h.lastIndexOf(' '));
    if (h.lastIndexOf(' ') == 1){
       h = h.split(' ');
       this.feet = h[0] * 30.48;
       this.in = h[1] * 2.54;
       this.in = +this.in.toFixed(1);
       this.actual_height = this.feet + this.in;
       this.cm_value = this.feet + this.in + ' cm';
    }else{
      this.feet = h * 30.48;
      this.feet = +this.feet.toFixed(1);
      this.actual_height = this.feet;
       this.cm_value = this.feet + ' cm';
    }
    }
  }
}
