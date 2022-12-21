import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { Subject } from 'rxjs';
import { ketones_list, protein_list } from '../../data-lib/libraries'
import { bloodLipidForm, glucoseForm, urineKetonesForm, urineProteinForm } from './forms';
@Component({
  selector: 'app-risk-screening',
  templateUrl: './risk-screening.component.html',
  styleUrls: ['./risk-screening.component.scss']
})
export class RiskScreeningComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  @Input() patient_id;
  @Input() consult_id;

  faInfoCircle = faInfoCircle;
  faSave = faSave;
  faSpinner = faSpinner;

  is_saving = {
    glucose: false,
    bloodLipid: false,
    urineKetones: false,
    urineProtein: false
  }

  protein_list = protein_list;
  ketones_list = ketones_list

  //forms
  glucoseForm = glucoseForm
  bloodLipidForm = bloodLipidForm
  urineKetonesForm = urineKetonesForm
  urineProteinForm = urineProteinForm

  raisedGlucose(){
    if(this.glucoseForm.value.fbs > 0 || this.glucoseForm.value.rbs > 0) {
      if(this.glucoseForm.value.fbs >= 126 || this.glucoseForm.value.rbs >= 200) {
        this.glucoseForm.patchValue({raised_blood_glucose: 'Y'});
      } else {
        this.glucoseForm.patchValue({raised_blood_glucose: 'N'});
      }
    }
  }

  raisedLipids() {
    if(this.bloodLipidForm.value.total_cholesterol > 0 ) {
      if(this.bloodLipidForm.value.total_cholesterol >= 5.1) {
        this.bloodLipidForm.patchValue({raised_lipid: 'Y'});
      } else {
        this.bloodLipidForm.patchValue({raised_lipid: 'N'});
      }
    }
  }

  urineKetone(){
    console.log(this.urineKetonesForm.value.ketone)
    if(this.urineKetonesForm.value.ketone) {
      if(this.urineKetonesForm.value.ketone !== 'N') {
        this.urineKetonesForm.patchValue({presence_urine_ketone: 'Y'});
      } else {
        this.urineKetonesForm.patchValue({presence_urine_ketone: 'N'});
      }
    }
  }

  urineProtein(){
    if(this.urineProteinForm.value.protein) {
      if(this.urineProteinForm.value.protein != 'N') {
        this.urineProteinForm.patchValue({presence_urine_protein: 'Y'});
      } else {
        this.urineProteinForm.patchValue({presence_urine_protein: 'N'});
      }
    }
  }

  onSubmit(group, val) {
    console.log(group, val)
    console.log(this[group+'Form'].value)
    if(this[group+'Form'].valid) {

    }
  }

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.glucoseForm = this.formBuilder.nonNullable.group({
      consult_ncd_risk_id: ['',Validators.required],
      patient_ncd_id: ['',Validators.required],
      patient_id: [this.patient_id],
      date_taken: [null, Validators.required],
      fbs: [null, Validators.required],
      rbs: [null, Validators.required],
      raised_blood_glucose: [null, Validators.required],
    });

    this.bloodLipidForm = this.formBuilder.nonNullable.group({
      consult_ncd_risk_id: ['',Validators.required],
      patient_ncd_id: ['',Validators.required],
      patient_id: [this.patient_id],
      date_taken: [null, Validators.required],
      total_cholesterol: [null, Validators.required],
      raised_lipid: [null, Validators.required]
    });

    this.urineKetonesForm = this.formBuilder.nonNullable.group({
      consult_ncd_risk_id: ['',Validators.required],
      patient_ncd_id: ['',Validators.required],
      patient_id: [this.patient_id],
      date_taken: [null, Validators.required],
      ketone: [null, Validators.required],
      presence_urine_ketone: [null, Validators.required]
    });

    this.urineProteinForm = this.formBuilder.nonNullable.group({
      consult_ncd_risk_id: ['',Validators.required],
      patient_ncd_id: ['',Validators.required],
      patient_id: [this.patient_id],
      date_taken: [null, Validators.required],
      protein: [null, Validators.required],
      presence_urine_protein: [null, Validators.required]
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
