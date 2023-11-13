import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tooth-condition',
  templateUrl: './tooth-condition.component.html',
  styleUrls: ['./tooth-condition.component.scss']
})
export class ToothConditionComponent implements OnInit {
  date = new Date();

  showModal: boolean = false;
  vitalsForm: FormGroup = new FormGroup({
    facility_code: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    user_id: new FormControl<string| null>(''),
    vitals_date: new FormControl<string| null>(''),
    patient_temp: new FormControl<number| null>(null),
    patient_height: new FormControl<number| null>(null),
    patient_weight: new FormControl<number| null>(null),
    patient_head_circumference: new FormControl<number| null>(null),
    patient_skinfold_thickness: new FormControl<number| null>(null),
    bp_systolic: new FormControl<number| null>(null),
    bp_diastolic: new FormControl<number| null>(null),
    patient_heart_rate: new FormControl<number| null>(null),
    patient_respiratory_rate: new FormControl<number>(null),
    patient_pulse_rate: new FormControl<number| null>(null),
    patient_waist: new FormControl<number| null>(null),
    patient_hip: new FormControl<number| null>(null),
    patient_limbs: new FormControl<number| null>(null),
    patient_muac: new FormControl<number| null>(null),
    patient_chest: new FormControl<number| null>(null),
    patient_abdomen: new FormControl<number| null>(null),
    patient_spo2: new FormControl<number| null>(null),
    vitals_height_ft: new FormControl<number| null>(null),
    vitals_height_in: new FormControl<number| null>(null),
    vitals_waist_in: new FormControl<number| null>(null),
    vitals_date_temp: new FormControl<string| null>(''),
    vitals_time_temp: new FormControl<string| null>(''),
    patient_left_vision_acuity_distance: new FormControl<number| null>(null),
    patient_left_vision_acuity: new FormControl<number| null>(null),
    patient_right_vision_acuity_distance: new FormControl<number| null>(null),
    patient_right_vision_acuity: new FormControl<number| null>(null)
  });
  showChildVitals: boolean = false;


  get f(): { [key: string]: AbstractControl } {
    return this.vitalsForm.controls;
  }

  onSubmit(){
    alert('click')
  }

  onRightClick(){
    alert('right click');
    return false;
  }

  closeModal(){
    this.showModal = !this.showModal;
  }

  constructor() { }

  ngOnInit(): void {

  }
}
