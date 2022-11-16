import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-vitals-modal',
  templateUrl: './vitals-modal.component.html',
  styleUrls: ['./vitals-modal.component.scss']
})
export class VitalsModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_age;
  @Input() patient_info;

  error_message = "exceeded maximum value";

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
    vitals_height_ft: new FormControl<number| null>(null),
    vitals_height_in: new FormControl<number| null>(null),
    vitals_waist_in: new FormControl<number| null>(null),
    vitals_date_temp: new FormControl<string| null>(''),
    vitals_time_temp: new FormControl<string| null>(''),
  });

  date;
  showChildVitals: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService
  ) { }

  onSubmit(){
    this.vitalsForm.patchValue({vitals_date: this.vitalsForm.value.vitals_date_temp+' '+this.vitalsForm.value.vitals_time_temp+':00'});
    console.log(this.vitalsForm.value);
    this.http.post('patient-vitals/vitals', this.vitalsForm.value).subscribe({
      next: (data: any) => { console.log(data.data) },
      error: err => console.log(err),
      complete: () => console.log('vitals saved')
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.vitalsForm.controls;
  }

  ftChange(){
    let height_cm = ((this.vitalsForm.value.vitals_height_ft*12) * 2.54) + (this.vitalsForm.value.vitals_height_in * 2.54);
    this.vitalsForm.patchValue({patient_height:height_cm.toFixed(2)});
  }

  cmChange(){
    let height_real_ft = ((this.vitalsForm.value.vitals_height*0.393701) / 12);
    let height_ft = Math.floor(height_real_ft);
    let height_in = Math.round((height_real_ft - height_ft) * 12);
    this.vitalsForm.patchValue({vitals_height_ft: height_ft});
    this.vitalsForm.patchValue({vitals_height_in: height_in});
  }

  cmToInch(){
    let waist_in = this.vitalsForm.value.vitals_waist*0.393701;
    this.vitalsForm.patchValue({vitals_waist_in: waist_in.toFixed(2)});
  }

  inchToCm(){
    let waist_cm = this.vitalsForm.value.vitals_waist_in*2.54;
    this.vitalsForm.patchValue({patient_waist: waist_cm.toFixed(2)});
  }

  closeModal(){
    this.toggleModal.emit('vitals-modal');
  }

  checkIfChild(){
    if((this.patient_age.type == 'year' && this.patient_age.age <= 6) || (this.patient_age.type == 'month' || this.patient_age.type == 'day')){
      this.showChildVitals = true;
    } else {
      this.showChildVitals = false;
    }
  }

  ngOnInit(): void {
    let date = new Date();
    let user_id = localStorage.getItem('user_id');
    let facility_code = "DOH000000000005672";
    this.vitalsForm = this.formBuilder.group({
      facility_code: [facility_code, Validators.required],
      patient_id: [this.patient_info.id, Validators.required],
      vitals_date: [null, Validators.required],
      user_id: [user_id, Validators.required],
      patient_temp: [null, Validators.max(50)],
      patient_height: [null, Validators.max(272)],
      patient_weight: [null, Validators.max(200)],
      patient_head_circumference: [null, Validators.max(200)],
      patient_skinfold_thickness: [null, Validators.max(200)],
      bp_systolic: [null],
      bp_diastolic: [null],
      patient_heart_rate: [null, Validators.max(300)],
      patient_respiratory_rate: [null, Validators.max(300)],
      patient_pulse_rate: [null, Validators.max(300)],
      patient_waist: [null, Validators.max(300)],
      patient_hip: [null, Validators.max(300)],
      patient_limbs: [null, Validators.max(300)],
      patient_muac: [null, Validators.max(300)],
      vitals_waist_in: [null],
      vitals_height_ft: [null, Validators.max(8)],
      vitals_height_in: [null, Validators.max(11)],
      vitals_date_temp: [formatDate(date,'Y-M-dd','en'), Validators.required],
      vitals_time_temp: [formatDate(date,'H:mm','en'), Validators.required],
    });

    this.date = new Date().toISOString().slice(0,10);
    this.checkIfChild();
  }
}
