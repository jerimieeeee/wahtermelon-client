import { Component, OnInit, Input } from '@angular/core';
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

  cm_value = '';
  modal_id = '';

  feet: number;
  in: number;
  decimal: number;
  actual_height: any;
  edit_bool: boolean;
  vitals_modal: boolean;
  max_value: number;

  @Input() fetals;
  @Input() fhr_lib;
  constructor() { }

  public keyUp = [];
  public buttons = [];
  public catch_array = [];
  public hide = [];

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
  flip(): void {
    this.focused = !this.focused;
    this.keyUp = [];
    this.buttons = [];
    this.buttons.push('save');
  }
  flipVitals(id){
    if(id != this.modal_id){
      this.modal_id = id;
      this.vitals_modal = true;
    }else{
      this.vitals_modal = !this.vitals_modal;
    }

    
  }
  saveForm(data) {
    //console.log(this.value, ' this is my value b4 saving seq and edit is ', this.edit_bool );
    let index = this.catch_array.findIndex(c => c.visit_sequence === data.visit_sequence);
    if(index != -1){
      this.catch_array.splice(index, 1);
    }
    this.prenatal_form.setValue({
      visit_sequence: data.visit_sequence == '' ? 1 : data.visit_sequence,
      fhr: data.fhr == '' ? 0 : data.fhr,
      fundic_height: data.fundic_height == '' ? 0 : data.fundic_height,
      fhr_location_id: data.fhr_location_id == '' ? 'N/A' : data.fhr_location_id,
      fetal_presentation_id: data.fetal_presentation_id == '' ? '' : data.fetal_presentation_id,
      patient_height: this.actual_height == null ? this.patient_height : this.actual_height,
      patient_weight: data.patient_weight == '' ? this.patient_weight : data.patient_weight,
      bp_systolic: data.bp_systolic == '' ? this.bp_systolic : data.bp_systolic,
      bp_diastolic: data.bp_diastolic == '' ? this.bp_diastolic : data.bp_diastolic,
      consult_id: data.consult_id == '' ? this.consult_id : data.consult_id,
      lmp_date: data.lmp_date,
      mc_id: data.mc_id == '' ? this.mc_id : data.mc_id,
      user_id: data.user_id == '' ? this.user_id : data.user_id,
      patient_id: data.patient_id == '' ? this.patient_id : data.patient_id,
      remarks: data.remarks == '' ? '' : data.remarks,
      prenatal_date: data.prenatal_date,
    });
    console.log(this.prenatal_form.value);
   
    this.catch_array.push(this.prenatal_form.value);
    this.catch_array.sort(function (x, y) {
      return x.visit_sequence - y.visit_sequence;
  });
    console.log(this.catch_array);
    if(!this.edit_bool){
      this.value = this.value + 1;
      this.max_value = this.max_value + 1;
    }
    this.edit_bool = false;
    console.log(this.value, "this value");
    
    //this.prenatal_form.disable();
    this.createForm();
    this.hide = []; 
    this.keyUp = [];

  }
  createForm() {
    this.prenatal_form = new FormGroup({
      prenatal_date: new FormControl(new Date().toISOString().substring(0, 10)),
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
      lmp_date: new FormControl(new Date().toISOString().substring(0, 10)),
      mc_id: new FormControl(this.mc_id),
      user_id: new FormControl(this.user_id),
      patient_id: new FormControl(this.patient_id),
      //trimester: new FormControl(this.trimester),
      remarks: new FormControl(this.remarks),
    });

    this.prenatal_form.get('fetal_presentation_id').setValue('Mass Palpable - NA');
  }

  quadrant(id) {
    if (this.prenatal_form.get('fhr_location_id').value == id) {
      this.prenatal_form.get('fhr_location_id').setValue('N/A');
      this.keyUp.splice(this.keyUp.indexOf(id), 1);
    } else {
      this.prenatal_form.get('fhr_location_id').setValue(id);
    }
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
    this.prenatal_form.get(id).reset();
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
    this.hide = [];
    this.keyUp = [];
    this.edit_bool = false;
    this.createForm();
  }
  edit(id) {
    this.edit_bool = true;
    this.prenatal_form.reset();
    this.catch_array.forEach(c => {
      if (c.visit_sequence == id) {
        //this.value = c.visit_sequence;
        this.prenatal_form.setValue({
          visit_sequence: c.visit_sequence,
          fhr: c.fhr,
          fundic_height: c.fundic_height,
          fhr_location_id: c.fhr_location_id,
          fetal_presentation_id: c.fetal_presentation_id,
          patient_height: c.patient_height,
          patient_weight: c.patient_weight,
          bp_systolic: c.bp_systolic,
          bp_diastolic: c.bp_diastolic,
          consult_id: c.consult_id,
          lmp_date: c.lmp_date,
          mc_id: c.mc_id,
          user_id: c.user_id,
          patient_id: c.patient_id,
          remarks: c.remarks,
          prenatal_date: c.prenatal_date,
        });
      }
    });

    this.hide.push(id);
    console.log(this.hide.includes(id));

    console.log(id, " prenatal id edit");

  }
}
