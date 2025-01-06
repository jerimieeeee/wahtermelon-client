import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { questionnaire } from '../../data-lib/libraries';
import { questionnaireForm } from './forms';

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.scss'],
    standalone: false
})
export class QuestionnaireComponent implements OnInit, OnChanges {
  @Input() patient_id;
  @Input() consult_details;

  faInfoCircle = faInfoCircle;
  faSave = faSave;
  faSpinner = faSpinner;

  questionnaireForm = questionnaireForm;

  is_saving: boolean = false;
  show_form: boolean = false;

  questionnaire = questionnaire;
  logical2: [];

  loadLibraries() {
    this.http.get('libraries/ncd-answers-s2').subscribe({
      next: (data: any) =>  {this.logical2 = data.data},
      error: err => console.log(err)
    });
  }

  getAnginaValue(){
    if(this.questionnaireForm.value.question3 === 'Y' || this.questionnaireForm.value.question4 === 'Y' || this.questionnaireForm.value.question5 === 'Y' ||
    this.questionnaireForm.value.question6 === 'Y' || this.questionnaireForm.value.question7 === 'Y') {
      this.questionnaireForm.patchValue({angina_heart_attack: 'Y'});
    } else {
      this.questionnaireForm.patchValue({angina_heart_attack: 'N'});
    }
  }

  getStrokeTia(){
    if(this.questionnaireForm.value.question8 === 'Y') {
      this.questionnaireForm.patchValue({stroke_tia: 'Y'});
    } else {
      this.questionnaireForm.patchValue({stroke_tia: 'N'});
    }
  }

  identify(index, item) {
    return item.id
  }

  onSubmit() {
    this.is_saving = true;

    if(this.questionnaireForm.valid){
      this.http.post('non-communicable-disease/risk-questionnaire', this.questionnaireForm.value).subscribe({
        next: (data: any) => {
          this.toastr.success('Recorded successfully!','Questionnaire');
          this.is_saving = false;
        },
        error: err => console.log(err)
      })
    }
  }

  getRecord() {
    if(this.consult_details){
      this.questionnaireForm.patchValue({...this.consult_details.riskQuestionnaire});
      this.getAnginaValue();
      this.getStrokeTia();
      this.show_form = true
    }
  }

  createForm() {
    if(this.consult_details && this.consult_details.assessment_date){
      this.questionnaireForm = this.formBuilder.nonNullable.group({
        consult_ncd_risk_id: [this.consult_details.id],
        patient_ncd_id: [this.consult_details.patient_ncd_id],
        consult_id: [this.consult_details.consult_id, Validators.required],
        patient_id: [this.consult_details.patient_id, Validators.required],
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required],
        question5: [null, Validators.required],
        question6: [null, Validators.required],
        question7: [null, Validators.required],
        question8: [null, Validators.required],
        angina_heart_attack: [null, Validators.required],
        stroke_tia: [null, Validators.required],
      });

      this.getRecord();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createForm();
  }

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
