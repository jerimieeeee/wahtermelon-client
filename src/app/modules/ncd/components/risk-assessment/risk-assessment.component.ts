import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus,faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-risk-assessment',
  templateUrl: './risk-assessment.component.html',
  styleUrls: ['./risk-assessment.component.scss']
})
export class RiskAssessmentComponent implements OnInit {

  faInforCircle = faInfoCircle;

  location = [
    {code: 'community', desc: 'Community Level'},
    {code: 'facility', desc: 'Health Facility'}];

    client = [
      {code: 'walk-in', desc: 'Walk-in'},
      {code: 'referred', desc: 'Referred'}
    ];

    logical = [
      {code: 'Y', desc: 'Yes'},
      {code: 'N', desc: 'No'},
      {code: 'U', desc: 'Unknown'},
      {code: 'X', desc: 'Not Applicable'}
    ];

    logical2 = [
      {code: 'Y', desc: 'Yes'},
      {code: 'N', desc: 'No'},
      {code: 'X', desc: 'Not Applicable'}
    ];

    smoking = [
      {code: '1', desc: 'Never smoked'},
      {code: '2', desc: 'Stopped more than a year'},
      {code: '3', desc: 'Current smoker'},
      {code: '4', desc: 'Stopped less than a year'},
      {code: '5', desc: 'Passive smoker'}
    ];

    alcohol = [
      {code: 'Y', desc: 'Yes, Drinks alcohol'},
      {code: 'N', desc: 'Never consumed'}
    ];



  constructor() { }

  ngOnInit(): void {
  }

}
