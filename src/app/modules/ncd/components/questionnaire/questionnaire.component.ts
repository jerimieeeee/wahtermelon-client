import { Component, Input, OnInit } from '@angular/core';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faSearch,faBalanceScale,faPlus,faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { Subject } from 'rxjs';
import { answer_yna } from '../../data-lib/answers';
import { questionnaire } from '../../data-lib/libraries';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  @Input() patient_id;
  @Input() consult_id;

  faInfoCircle = faInfoCircle;
  faSave = faSave;
  faSpinner = faSpinner;

  objectKeys = Object.keys;
  is_saving: boolean = false;

  question_answer: any = [];
  angina_heart_attack: boolean = false;
  stroke_tia: boolean = false;

  questionnaire = questionnaire;
  logical2 = answer_yna;

  getAnginaValue(){
    if(this.question_answer.q3 === 'Y' || this.question_answer.q4 === 'Y' || this.question_answer.q5 === 'Y' ||
      this.question_answer.q6 === 'Y' ||this.question_answer.q7 === 'Y') {
      return true;
    } else {
      return false;
    }
  }


  onSubmit() {
    this.is_saving = true;

    this.question_answer['patient_id'] = this.patient_id;
    this.question_answer['facility_code'] = this.http.getUserFacility();
    this.question_answer['angina_heart_attack'] = this.getAnginaValue();
    this.question_answer['stroke_tia'] = this.question_answer.q8 === 'Y' ? true : false;

    console.log(this.question_answer);
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
  }
}
