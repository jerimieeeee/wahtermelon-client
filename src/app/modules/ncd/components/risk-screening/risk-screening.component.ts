import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ketones_list, protein_list } from '../../data-lib/libraries'
import { bloodLipidForm, glucoseForm, urineKetonesForm, urineProteinForm } from './forms';
@Component({
  selector: 'app-risk-screening',
  templateUrl: './risk-screening.component.html',
  styleUrls: ['./risk-screening.component.scss']
})
export class RiskScreeningComponent implements OnInit, OnChanges {
  @Input() patient_id;
  @Input() consult_details;

  faInfoCircle = faInfoCircle;
  faSave = faSave;
  faSpinner = faSpinner;

  is_saving = {
    glucose: false,
    bloodLipid: false,
    urineKetones: false,
    urineProtein: false
  }

  protein_list: [];
  ketones_list: []

  //forms
  glucoseForm = glucoseForm
  bloodLipidForm = bloodLipidForm
  urineKetonesForm = urineKetonesForm
  urineProteinForm = urineProteinForm

  urls =[
    'non-communicable-disease/risk-screening-blood-glucose',
    'non-communicable-disease/risk-screening-blood-lipid',
    'non-communicable-disease/risk-screening-urine-ketones',
    'non-communicable-disease/risk-screening-urine-protein'
  ]

  loadLibraries(){
    this.http.get('libraries/ncd-risk-screening-urine-ketones').subscribe({
      next: (data: any) => this.ketones_list = data.data,
      error: err => console.log(err)
    });

    this.http.get('libraries/ncd-risk-screening-urine-protein').subscribe({
      next: (data: any) => this.protein_list = data.data,
      error: err => console.log(err)
    });
  }

  loadScreenings(){
    this.urls.forEach((val) => {
      console.log(val)
      this.http.get(val,{params:{patient_ncd_id: this.consult_details.patient_ncd_id}}).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: err => console.log(err)
      })
    })
  }

  raisedGlucose(){
    if(this.glucoseForm.value.fbs > 0 || this.glucoseForm.value.rbs > 0) {
      if(this.glucoseForm.value.fbs >= 126 || this.glucoseForm.value.rbs >= 200) {
        this.glucoseForm.patchValue({raised_blood_glucose: true});
      } else {
        this.glucoseForm.patchValue({raised_blood_glucose: false});
      }
    }
  }

  raisedLipids() {
    if(this.bloodLipidForm.value.total_cholesterol > 0 ) {
      if(this.bloodLipidForm.value.total_cholesterol >= 5.1) {
        this.bloodLipidForm.patchValue({raised_blood_lipid: true});
      } else {
        this.bloodLipidForm.patchValue({raised_blood_lipid: false});
      }
    }
  }

  urineKetone(){
    console.log(this.urineKetonesForm.value.ketone)
    if(this.urineKetonesForm.value.ketone) {
      if(this.urineKetonesForm.value.ketone !== '1') {
        this.urineKetonesForm.patchValue({presence_of_urine_ketone: true});
      } else {
        this.urineKetonesForm.patchValue({presence_of_urine_ketone: false});
      }
    }
  }

  urineProtein(){
    if(this.urineProteinForm.value.protein) {
      if(this.urineProteinForm.value.protein != '1') {
        this.urineProteinForm.patchValue({presence_of_urine_protein: true});
      } else {
        this.urineProteinForm.patchValue({presence_of_urine_protein: false});
      }
    }
  }

  onSubmit(group, val) {
    console.log(group, val)
    console.log(this[group+'Form'])
    if(this[group+'Form'].valid) {
      let url = this.getURL(group)
      console.log(url)
      this.http.post(url, this[group+'Form'].value).subscribe({
        next: (data: any) => {
          console.log(data)
        },
        error: err => console.log(err)
      })
    }
  }

  getURL(group){
    switch(group) {
      case 'glucose':
        return this.urls[0];
      case 'bloodLipid':
        return this.urls[1];
      case 'urineKetones':
        return this.urls[2];
      case 'urineProtein':
        return this.urls[2];
    }
  }

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder
  ) { }

  createForm(){
    let consult_ncd_risk_id = this.consult_details.id;
    let patient_ncd_id = this.consult_details.patient_ncd_id;

    this.glucoseForm = this.formBuilder.nonNullable.group({
      consult_ncd_risk_id: [consult_ncd_risk_id,Validators.required],
      patient_ncd_id: [patient_ncd_id,Validators.required],
      patient_id: [this.patient_id],
      date_taken: [null, Validators.required],
      fbs: [null],
      rbs: [null],
      raised_blood_glucose: [null, Validators.required],
    });

    this.bloodLipidForm = this.formBuilder.nonNullable.group({
      consult_ncd_risk_id: [consult_ncd_risk_id,Validators.required],
      patient_ncd_id: [patient_ncd_id,Validators.required],
      patient_id: [this.patient_id],
      date_taken: [null, Validators.required],
      total_cholesterol: [null, Validators.required],
      raised_blood_lipid: [null, Validators.required]
    });

    this.urineKetonesForm = this.formBuilder.nonNullable.group({
      consult_ncd_risk_id: [consult_ncd_risk_id,Validators.required],
      patient_ncd_id: [patient_ncd_id,Validators.required],
      patient_id: [this.patient_id],
      date_taken: [null, Validators.required],
      ketone: [null, Validators.required],
      presence_of_urine_ketone: [null, Validators.required]
    });

    this.urineProteinForm = this.formBuilder.nonNullable.group({
      consult_ncd_risk_id: [consult_ncd_risk_id,Validators.required],
      patient_ncd_id: [patient_ncd_id,Validators.required],
      patient_id: [this.patient_id],
      date_taken: [null, Validators.required],
      protein: [null, Validators.required],
      presence_of_urine_protein: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadLibraries();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.consult_details && this.consult_details.assessment_date){
      this.createForm();
      this.loadScreenings();
    }
  }
}
