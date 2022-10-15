import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Vaccines } from './data/vaccine';

@Component({
  selector: 'app-vaccine-modal',
  templateUrl: './vaccine-modal.component.html',
  styleUrls: ['./vaccine-modal.component.scss']
})
export class VaccineModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();

  error_message = "exceeded maximum value";
  vaccine_list = Vaccines;

  vaccineForm: FormGroup = new FormGroup({
    vitals_date: new FormControl<string| null>(''),
    vitals_time: new FormControl<string| null>(''),
    vitals_weight: new FormControl<number| null>(null),
    vitals_temp: new FormControl<number| null>(null),
    vitals_height_ft: new FormControl<number| null>(null),
    vitals_height_in: new FormControl<number| null>(null),
    vitals_height: new FormControl<number| null>(null),
    vitals_waist: new FormControl<number| null>(null),
    vitals_waist_in: new FormControl<number| null>(null),
    vitals_blood_pressure: new FormControl<string| null>(''),
    vitals_heart_rate: new FormControl<number| null>(null),
    vitals_pulse_rate: new FormControl<number| null>(null),
    vitals_resp_rate: new FormControl<number>(null)
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  onSubmit(){
    console.log(this.vaccineForm);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.vaccineForm.controls;
  }

  ftChange(){
    let height_cm = ((this.vaccineForm.value.vitals_height_ft*12) * 2.54) + (this.vaccineForm.value.vitals_height_in * 2.54);
    this.vaccineForm.patchValue({vitals_height:height_cm.toFixed(2)});
  }

  cmChange(){
    let height_real_ft = ((this.vaccineForm.value.vitals_height*0.393701) / 12);
    let height_ft = Math.floor(height_real_ft);
    let height_in = Math.round((height_real_ft - height_ft) * 12);
    this.vaccineForm.patchValue({vitals_height_ft: height_ft});
    this.vaccineForm.patchValue({vitals_height_in: height_in});
  }

  cmToInch(){
    let waist_in = this.vaccineForm.value.vitals_waist*0.393701;
    this.vaccineForm.patchValue({vitals_waist_in: waist_in.toFixed(2)});
  }

  inchToCm(){
    let waist_cm = this.vaccineForm.value.vitals_waist_in*2.54;
    this.vaccineForm.patchValue({vitals_waist: waist_cm.toFixed(2)});
  }

  closeModal(){
    this.toggleModal.emit('vaccine-moodal');
  }

  ngOnInit(): void {
    let date = new Date();

    this.vaccineForm = this.formBuilder.group({
      vitals_date: [null, Validators.required],
      vitals_time: [formatDate(date,'H:mm','en'), Validators.required],
      vitals_weight: [null, Validators.max(200)],
      vitals_temp: [null, Validators.max(50)],
      vitals_height: [null, Validators.max(272)],
      vitals_height_ft: [null, Validators.max(8)],
      vitals_height_in: [null, Validators.max(11)],
      vitals_waist: [null, Validators.max(300)],
      vitals_waist_in: [null],
      vitals_blood_pressure: [null],
      vitals_heart_rate: [null, Validators.max(300)],
      vitals_pulse_rate: [null, Validators.max(300)],
      vitals_resp_rate: [null, Validators.max(300)]
    });

    console.log(this.vaccineForm);
  }
}
