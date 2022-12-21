import { formatDate } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { alcohol, answer_yna, answer_ynau, smoking } from '../../data-lib/answers';
import { client, family_history } from '../../data-lib/libraries';
import { riskAssessForm } from './forms';

@Component({
  selector: 'app-risk-assessment',
  templateUrl: './risk-assessment.component.html',
  styleUrls: ['./risk-assessment.component.scss']
})
export class RiskAssessmentComponent implements OnInit, OnChanges {
  @Input() patient_info;
  @Input() consult_id;
  @Input() vitals;
  @Input() ncd_details;

  faInforCircle = faInfoCircle;
  faSave = faSave;
  faSpinner = faSpinner;

  location: [];
  logical: [];
  logical2: [];
  client: [];
  smoking: [];
  alcohol: [];

  family_history = family_history;

  riskAssessForm = riskAssessForm;

  is_saving: boolean = false;



  onSubmit() {
    console.log(this.riskAssessForm.value);

    /* this.is_saving = true;
    if(this.riskAssessForm.valid){
      this.http.post('non-communicable-disease/risk-assessment', this.riskAssessForm.value).subscribe({
        next: (data: any) => {
          console.log(data)
        },
        error: err => console.log(err)
      })
    } */
  }

  get f(): { [key: string]: AbstractControl } {
    return this.riskAssessForm.controls;
  }

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder
  ) { }

  vitals_today = {
    patient_waist: null,
    patient_bmi_class: null
  };

  setAdiposity(waist){
    let val;

    if(this.patient_info.gender === 'M' && waist >= 90) {
      val = true;
    } else if (this.patient_info.gender === 'F' && waist >= 80) {
      val = true;
    } else {
      val = false;
    }
    this.riskAssessForm.patchValue({central_adiposity: val})
  }

  checkDiabetes() {
    if(this.riskAssessForm.value.presence_diabetes === '1' && this.riskAssessForm.value.location === '2') {
      this.f.polyphagia.enable();
      this.f.polydipsia.enable();
      this.f.polyuria.enable();
    } else {
      this.riskAssessForm.patchValue({diabetes_medication: 'N'})
      this.f.polyphagia.disable();
      this.f.polydipsia.disable();
      this.f.polyuria.disable();
    }
  }

  getVitalsToday(vitals){
    let consult_date = new Date();
    Object.entries(vitals).every(([keys, values], indexes) => {
      let val:any = values;

      if(!this.riskAssessForm.value.bmi && val.patient_bmi) this.riskAssessForm.patchValue({bmi: val.patient_bmi});
      if(!this.riskAssessForm.value.obesity && val.patient_bmi) this.riskAssessForm.patchValue({obesity: val.patient_bmi >= 25});
      if(!this.vitals_today.patient_bmi_class && val.patient_bmi_class) this.vitals_today.patient_bmi_class = val.patient_bmi_class;
      if(!this.vitals_today.patient_waist && val.patient_waist) this.vitals_today.patient_waist = val.patient_waist; this.setAdiposity(val.patient_waist)

      let vitals_date = formatDate(val.vitals_date, 'yyyy-MM-dd','en', 'en')
      let date_today = formatDate(consult_date, 'yyyy-MM-dd','en', 'en')

      if(vitals_date === date_today){
        if(!this.riskAssessForm.value.systolic_1st && val.bp_systolic) {
          this.riskAssessForm.patchValue({
            systolic_1st: val.bp_systolic,
            diastolic_1st: val.bp_diastolic
          })
        } else {
          if((!this.riskAssessForm.value.systolic_2nd && this.riskAssessForm.value.systolic_1st) && val.bp_systolic) {
            this.riskAssessForm.patchValue({
              systolic_2nd: val.bp_systolic,
              diastolic_2nd: val.bp_diastolic
            })
          }
        }
      }

      if(this.riskAssessForm.value.systolic_1st && this.riskAssessForm.value.diastolic_1st &&
        this.riskAssessForm.value.systolic_2nd && this.riskAssessForm.value.diastolic_2nd &&
        this.vitals_today.patient_waist > 0){
        return false;
      }
      return true;
    });
  }

  getAverage(){
    this.riskAssessForm.patchValue({
      avg_systolic: (this.riskAssessForm.value.systolic_1st + this.riskAssessForm.value.systolic_2nd)/2,
      avg_diastolic: (this.riskAssessForm.value.diastolic_1st + this.riskAssessForm.value.diastolic_2nd)/2
    })

    if(this.riskAssessForm.value.avg_systolic >= 140 && this.riskAssessForm.value.avg_diastolic >= 90){
      this.riskAssessForm.patchValue({raised_bp: 'Y'});
    } else {
      this.riskAssessForm.patchValue({raised_bp: 'N'});
    }
    return this.riskAssessForm.value.avg_systolic+'/'+this.riskAssessForm.value.avg_diastolic
  }

  loadLibraries(){
    this.http.get('libraries/ncd-locations').subscribe({
      next: (data: any) =>  this.location = data.data,
      error: err => console.log(err)
    });

    this.http.get('libraries/ncd-smoking').subscribe({
      next: (data: any) =>  {this.smoking = data.data; console.log(data.data)},
      error: err => console.log(err)
    });

    this.http.get('libraries/ncd-answers').subscribe({
      next: (data: any) =>  this.logical = data.data,
      error: err => console.log(err)
    });

    this.http.get('libraries/ncd-answers-s2').subscribe({
      next: (data: any) =>  this.logical2 = data.data,
      error: err => console.log(err)
    });

    this.http.get('libraries/ncd-client-types').subscribe({
      next: (data: any) =>  {this.client = data.data; console.log(data.data)},
      error: err => console.log(err)
    });

    //Alcohol
  }

  creatFormValidation() {
    this.riskAssessForm = this.formBuilder.nonNullable.group({
      facility_code: [this.http.getUserFacility()],
      patient_id: [this.patient_info.id],
      location: [null, Validators.required],
      client_type: [null, Validators.required],
      assessment_date: [null, Validators.required],
      family_hx_hypertension: [null, Validators.required],
      family_hx_stroke: [null, Validators.required],
      family_hx_heart_attack: [null, Validators.required],
      family_hx_diabetes: [null, Validators.required],
      family_hx_asthma: [null, Validators.required],
      family_hx_cancer: [null, Validators.required],
      family_hx_kidney_disease: [null, Validators.required],
      smoking: [null, Validators.required],
      alcohol_intake: [null, Validators.required],
      excessive_alcohol_intake: [null, Validators.required],
      high_fat: [null, Validators.required],
      intake_vegetables: [null, Validators.required],
      intake_fruits: [null, Validators.required],
      physical_activity: [null, Validators.required],
      presence_diabetes: [null, Validators.required],
      diabetes_medication: [null, Validators.required],
      polyphagia: [null, Validators.required],
      polydipsia: [null, Validators.required],
      polyuria: [null, Validators.required],
      obesity: [null, Validators.required],
      central_adiposity: [null, Validators.required],
      bmi: [null, Validators.required],
      raised_bp: [null, Validators.required],
      avg_systolic: [null, Validators.required],
      avg_diastolic: [null, Validators.required],
      systolic_1st: [null, Validators.required],
      diastolic_1st: [null, Validators.required],
      systolic_2nd: [null, Validators.required],
      diastolic_2nd: [null, Validators.required],
      gender: [null, Validators.required],
      age: [null, Validators.required],
    });

    this.checkDiabetes()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.patient_info) this.creatFormValidation();
    if(this.patient_info && this.vitals) this.getVitalsToday(this.vitals);
  }

  ngOnInit(): void {
    this.loadLibraries()
  }
}
