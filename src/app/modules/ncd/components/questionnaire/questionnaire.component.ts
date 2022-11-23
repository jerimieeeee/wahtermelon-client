import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus,faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {

  faInfoCircle = faInfoCircle;

  logical2 = [
    {code: 'Y', desc: 'Yes'},
    {code: 'N', desc: 'No'},
    {code: 'X', desc: 'Not Applicable'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
