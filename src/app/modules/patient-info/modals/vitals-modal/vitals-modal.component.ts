import { animate, style, transition, trigger } from '@angular/animations';
import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { vitalsForm } from './forms';

@Component({
  selector: 'app-vitals-modal',
  templateUrl: './vitals-modal.component.html',
  styleUrls: ['./vitals-modal.component.scss']
})
export class VitalsModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_age;
  @Input() patient_info;
  @Input() vitals_to_edit;

  vitalsForm = vitalsForm;

  error_message = "exceeded maximum value";
  error_message_min = "exceeded minimum value";

  date;
  showChildVitals: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  onSubmit(){
    this.vitalsForm.patchValue({vitals_date: this.vitalsForm.value.vitals_date_temp+' '+this.vitalsForm.value.vitals_time_temp});
    // console.log(this.vitalsForm);
    let query;

    if(this.vitals_to_edit){
      query = this.http.update('patient-vitals/vitals/', this.vitals_to_edit.id, this.vitalsForm.value);
    } else {
      query = this.http.post('patient-vitals/vitals', this.vitalsForm.value);
    }
    query.subscribe({
      next: () => {
        this.vitalsForm.markAsPristine();
        this.vitalsForm.disable();

        this.toastr.success('Successfully recorded!', 'Vital signs')
        this.closeModal();
        // console.log(data)
      },
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
    let height_real_ft = ((this.vitalsForm.value.patient_height*0.393701) / 12);
    let height_ft = Math.floor(height_real_ft);
    let height_in = Math.round((height_real_ft - height_ft) * 12);
    this.vitalsForm.patchValue({vitals_height_ft: height_ft});
    this.vitalsForm.patchValue({vitals_height_in: height_in});
  }

  cmToInch(){
    let waist_in = this.vitalsForm.value.patient_waist*0.393701;
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
    let user_id = this.http.getUserID();
    let facility_code = this.http.getUserFacility();

    this.vitalsForm = this.formBuilder.group({
      facility_code: [facility_code, Validators.required],
      patient_id: [this.patient_info.id, Validators.required],
      vitals_date: [null, Validators.required],
      user_id: [user_id, Validators.required],
      patient_temp: [null, Validators.max(50)],
      patient_height: [null, [Validators.min(10), Validators.max(272)]],
      patient_weight: [null, [Validators.min(1), Validators.max(200)]],
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
      patient_chest: [null, Validators.max(300)],
      patient_abdomen: [null, Validators.max(300)],
      patient_spo2: [null, Validators.max(100)],
      vitals_waist_in: [null],
      vitals_height_ft: [null, Validators.max(8)],
      vitals_height_in: [null, Validators.max(11)],
      vitals_date_temp: [formatDate(date,'yyyy-MM-dd','en', 'Asia/Manila'), Validators.required],
      vitals_time_temp: [formatDate(date,'HH:mm:ss','en', 'Asia/Manila'), Validators.required],
      patient_right_vision_acuity: [null, Validators.max(20)],
      patient_left_vision_acuity: [null, Validators.max(20)],
    });

    if(this.vitals_to_edit){
      console.log(this.vitals_to_edit)
      this.vitalsForm.patchValue({...this.vitals_to_edit});
      this.vitalsForm.patchValue({vitals_date_temp: formatDate(this.vitalsForm.value.vitals_date,'yyyy-MM-dd','en', 'Asia/Manila')});
      this.vitalsForm.patchValue({vitals_time_temp: formatDate(this.vitalsForm.value.vitals_date,'HH:mm:ss','en', 'Asia/Manila')});

      console.log(this.vitalsForm);
      this.cmChange();
    }else{
      // console.log('new vitals')
    }


    // console.log(this.vitalsForm.value);
    this.date = new Date().toISOString().slice(0,10);
    this.checkIfChild();
  }
}
