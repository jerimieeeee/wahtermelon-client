import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { Subject } from 'rxjs';
import { alcohol, answer_yna, answer_ynau, smoking } from '../../data-lib/answers';
import { client, family_history, location } from '../../data-lib/libraries';

@Component({
  selector: 'app-risk-assessment',
  templateUrl: './risk-assessment.component.html',
  styleUrls: ['./risk-assessment.component.scss']
})
export class RiskAssessmentComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  @Input() patient_id;
  @Input() consult_id;

  faInforCircle = faInfoCircle;
  faSave = faSave;
  faSpinner = faSpinner;

  location = location;
  client = client;
  logical = answer_ynau;
  logical2 = answer_yna;
  smoking = smoking
  alcohol = alcohol

  family_history = family_history;

  riskAssessForm: FormGroup = new FormGroup({
    ncd_id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    location: new FormControl<string| null>(''),
    client_type: new FormControl<string| null>(''),
    assessment_date: new FormControl<string| null>(''),
    family_hx_hypertension: new FormControl<string| null>(''),
    family_hx_stroke: new FormControl<string| null>(''),
    family_hx_heart_attack: new FormControl<string| null>(''),
    family_hx_diabetes: new FormControl<string| null>(''),
    family_hx_asthma: new FormControl<string| null>(''),
    family_hx_cancer: new FormControl<string| null>(''),
    family_hx_kidney_disease: new FormControl<string| null>(''),
    smoking: new FormControl<string| null>(''),
    alcohol_intake: new FormControl<string| null>(''),
    excessive_alcohol_intake: new FormControl<string| null>(''),
    high_fat: new FormControl<string| null>(''),
    intake_vegetables: new FormControl<string| null>(''),
    intake_fruits: new FormControl<string| null>(''),
    physical_activity: new FormControl<string| null>(''),
    presence_diabetes: new FormControl<string| null>(''),
    diabetes_medication: new FormControl<string| null>(''),
    polyphagia: new FormControl<string| null>(''),
    polydipsia: new FormControl<string| null>(''),
    polyuria: new FormControl<string| null>(''),
    obesity: new FormControl<string| null>(''),
    central_adiposity: new FormControl<string| null>(''),
    bmi: new FormControl<string| null>(''),
    waist_line: new FormControl<string| null>(''),
    raised_bp: new FormControl<string| null>(''),
    avg_systolic: new FormControl<string| null>(''),
    avg_diastolic: new FormControl<string| null>(''),
    systolic_1st: new FormControl<string| null>(''),
    diastolic_1st: new FormControl<string| null>(''),
    systolic_2nd: new FormControl<string| null>(''),
    diastolic_2nd: new FormControl<string| null>(''),
    gender: new FormControl<string| null>(''),
    age: new FormControl<string| null>('')
  });

  is_saving: boolean = false;

  onSubmit() {
    console.log(this.riskAssessForm.value);

    this.is_saving = true;
    if(this.riskAssessForm.valid){
      this.http.post('ncd/risk_assessment', this.riskAssessForm.value).subscribe({
        next: (data: any) => {
          console.log(data)
        },
        error: err => console.log(err)
      })
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.riskAssessForm.controls;
  }

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.riskAssessForm = this.formBuilder.nonNullable.group({
      facility_code: [this.http.getUserFacility()],
      patient_id: [this.patient_id],
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
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
