import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { family_history } from '../../data-lib/libraries';
import { riskAssessForm } from './forms';

@Component({
    selector: 'app-risk-assessment',
    templateUrl: './risk-assessment.component.html',
    styleUrls: ['./risk-assessment.component.scss'],
    standalone: false
})
export class RiskAssessmentComponent implements OnInit, OnChanges {
  @Output() loadRisk = new EventEmitter<any>();
  @Output() loadNCD = new EventEmitter<any>();
  @Input() patient_info;
  @Input() consult_details;
  @Input() vitals;
  @Input() ncd_details;

  // patient_info: any;
  faInforCircle = faInfoCircle;
  faSave = faSave;
  faSpinner = faSpinner;

  location: [];
  logical: [];
  logical2: [];
  clients: [];
  smoking: [];
  alcohol: [];

  family_history = family_history;
  riskAssessForm = riskAssessForm;

  is_saving: boolean = false;
  show_form: boolean = false;

  vitals_today = {
    patient_waist: null,
    patient_bmi_class: null
  };

  onSubmit() {
    // console.log(this.riskAssessForm);

    this.is_saving = true;
    if(this.riskAssessForm.valid){
      let query;
      if(this.consult_details && this.consult_details.assessment_date) {
        query = this.http.update('non-communicable-disease/risk-assessment/', this.consult_details.id, this.riskAssessForm.value);
      } else {
        query = this.http.post('non-communicable-disease/risk-assessment', this.riskAssessForm.value);
      }
      query.subscribe({
        next: (data: any) => {
          // console.log(data)
          this.is_saving = false;
          this.toastr.success('Recorded successfully!','Risk Assessment');
          this.loadNCD.emit(data.data.consult_id);
          // this.loadRisk.emit();
        },
        error: err => console.log(err)
      })
    }
  }

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
    if(this.riskAssessForm.value.location === 2) {
      this.f.diabetes_medications.enable();
      this.f.polyphagia.enable();
      this.f.polydipsia.enable();
      this.f.polyuria.enable();
      this.f.client_type.enable();
    } else {
      /* this.riskAssessForm.patchValue({
        diabetes_medications: 'X',
        polyphagia: 'X',
        polydipsia: 'X',
        polyuria: 'X'
      }) */
      /* this.f.diabetes_medications.disable();
      this.f.polyphagia.disable();
      this.f.polydipsia.disable();
      this.f.polyuria.disable(); */
      this.f.client_type.disable();
    }

    // console.log(this.f)
  }

  getVitalsToday(vitals, consult_details){
    if(vitals && consult_details){
      // console.log(vitals);
      this.riskAssessForm.patchValue({assessment_date: formatDate(consult_details.consult_date,'yyyy-MM-dd','en', 'Asia/Manila')});

      Object.entries(vitals).reverse().every(([keys, values], indexes) => {
        let val:any = values;

        if(val.patient_bmi) this.riskAssessForm.patchValue({bmi: val.patient_bmi});
        if(val.patient_bmi) this.riskAssessForm.patchValue({obesity: val.patient_bmi >= 25});
        if(val.patient_bmi_class) this.vitals_today.patient_bmi_class = val.patient_bmi_class;

        let vitals_date = formatDate(val.vitals_date, 'yyyy-MM-dd','en', 'Asia/Manila')
        let date_today = formatDate(consult_details.consult_date, 'yyyy-MM-dd','en', 'Asia/Manila')

        if(vitals_date === date_today){
          if(val.bp_systolic) {

            if(!this.riskAssessForm.value.systolic_1st){
              this.riskAssessForm.patchValue({
                systolic_1st: val.bp_systolic,
                diastolic_1st: val.bp_diastolic
              });
            } else if (this.riskAssessForm.value.systolic_1st && !this.riskAssessForm.value.systolic_2nd) {
              this.riskAssessForm.patchValue({
                systolic_2nd: val.bp_systolic,
                diastolic_2nd: val.bp_diastolic
              });
              this.setAverage();
            } else {
              this.riskAssessForm.patchValue({
                systolic_1st: this.riskAssessForm.value.systolic_2nd,
                diastolic_1st: this.riskAssessForm.value.diastolic_2nd
              });

              this.riskAssessForm.patchValue({
                systolic_2nd: val.bp_systolic,
                diastolic_2nd: val.bp_diastolic
              });
              this.setAverage();
            }

          }
          /* if(!this.riskAssessForm.value.systolic_1st && val.bp_systolic) {
            this.riskAssessForm.patchValue({
              systolic_1st: val.bp_systolic,
              diastolic_1st: val.bp_diastolic
            });
          } else {
            if((!this.riskAssessForm.value.systolic_2nd && this.riskAssessForm.value.systolic_1st) && val.bp_systolic) {
              this.riskAssessForm.patchValue({
                systolic_2nd: val.bp_systolic,
                diastolic_2nd: val.bp_diastolic
              });

              this.setAverage();
            }
          } */

          if(!this.riskAssessForm.value.waist_line && val.patient_waist) {
            this.riskAssessForm.patchValue({waist_line: val.patient_waist});
            this.setAdiposity(val.patient_waist);
          }
        }

        if(this.riskAssessForm.value.systolic_1st && this.riskAssessForm.value.diastolic_1st &&
          this.riskAssessForm.value.systolic_2nd && this.riskAssessForm.value.diastolic_2nd &&
          this.vitals_today.patient_waist > 0 && (Object(vitals).length-1 === indexes)){
          return false;
        }
        return true;
      });

      this.checkIfComplete();
    }
  }

  checkIfComplete(){
    if(this.riskAssessForm.value.bmi && this.riskAssessForm.value.obesity !== undefined && this.riskAssessForm.value.avg_systolic && this.riskAssessForm.value.avg_diastolic && this.riskAssessForm.value.waist_line) {
      this.show_form = true;
    }
  }

  setAverage(){
    this.riskAssessForm.patchValue({
      avg_systolic: (this.riskAssessForm.value.systolic_1st + this.riskAssessForm.value.systolic_2nd)/2,
      avg_diastolic: (this.riskAssessForm.value.diastolic_1st + this.riskAssessForm.value.diastolic_2nd)/2
    })

    if(this.riskAssessForm.value.avg_systolic >= 140 && this.riskAssessForm.value.avg_diastolic >= 90){
      this.riskAssessForm.patchValue({raised_bp: true});
    } else {
      this.riskAssessForm.patchValue({raised_bp: false});
    }
  }

  loadLibraries(){
    this.http.get('libraries/ncd-locations').subscribe({
      next: (data: any) =>  this.location = data.data,
      error: err => console.log(err)
    });

    this.http.get('libraries/ncd-smoking').subscribe({
      next: (data: any) =>  this.smoking = data.data,
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
      next: (data: any) =>  this.clients = data.data,
      error: err => console.log(err)
    });

    this.http.get('libraries/ncd-alcohol-intake').subscribe({
      next: (data: any) =>  this.alcohol = data.data,
      error: err => console.log(err)
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.riskAssessForm.controls;
  }

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.patient_info && this.consult_details) this.creatFormValidation();
    if(this.consult_details && this.consult_details.assessment_date){
      // this.getVitalsToday(this.vitals, this.consult_details);
      this.riskAssessForm.patchValue({...this.consult_details});
      this.riskAssessForm.patchValue({assessment_date: formatDate(this.consult_details.assessment_date, 'yyyy-MM-dd', 'en', 'Asia/Manila')})
      this.checkDiabetes()
      this.show_form = true;
    } else {
      this.getVitalsToday(this.vitals, this.consult_details);
    }
  }

  creatFormValidation() {
    let consult_id;
    if(this.consult_details.assessment_date) {
      consult_id = this.consult_details.consult_id;
    } else {
      consult_id = this.consult_details.id;
    }
    this.riskAssessForm = this.formBuilder.nonNullable.group({
      consult_id: [consult_id],
      patient_id: [this.patient_info.id],
      location: [null, Validators.required],
      client_type: [null, Validators.required],
      assessment_date: [this.consult_details.consult_date, Validators.required],
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
      diabetes_medications: [null, Validators.required],
      waist_line: [null, Validators.required],
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
      hypertensive_old_case: [false],
      diabetes_old_case: [false]
    });

    this.checkDiabetes()
  }

  ngOnInit(): void {
    this.loadLibraries();
    // this.patient_info = this.http.getPatientInfo;
    // console.log(this.patient_info)
  }
}
