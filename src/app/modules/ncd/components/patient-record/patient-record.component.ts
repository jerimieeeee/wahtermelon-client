import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus,faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.scss']
})
export class PatientRecordComponent implements OnInit {

  faInfoCircle = faInfoCircle;

  logical = [
    {code: 'Y', desc: 'Yes'},
    {code: 'N', desc: 'No'},
    {code: 'U', desc: 'Unknown'},
    {code: 'X', desc: 'Not Applicable'}
  ];

  diagnosis = [
    {code: '1', desc: 'With cardiovascular risk factors only'},
    {code: '2', desc: 'Essential hypertension'},
    {code: '3', desc: 'Secondary hypertension'},
    {code: '4', desc: 'Diabetes'},
    {code: '5', desc: 'Renal disease (albuminuria > 3g/L, createnine > 177 mol/L or 2mg/dl'},
    {code: '6', desc: 'Congestive heart disease'},
    {code: '7', desc: 'Coronary heart disease'},
    {code: '8', desc: 'Peripheral vascular disease'},
    {code: '9', desc: 'Cerebrovascular disease'}
  ];

  target_organ = [
    {code: '1', desc: 'Left ventricular hypertrophy'},
    {code: '2', desc: 'Microalbuminuria (0.2-3g/L)'},
    {code: '3', desc: 'Hypertensive retinopathy'},
    {code: '4', desc: 'Others'}
  ];

  physical_examination = [
    {desc: 'Normal'},
    {desc: 'Abnormal'}
  ];
  
  counselling = [
    {code: '1', desc: 'Smoking cessation'},
    {code: '2', desc: 'Diet'},
    {code: '3', desc: 'Physical activity'},
    {code: '4', desc: 'Weight control'},
    {code: '5', desc: 'Alcohol intake'},
    {code: '6', desc: 'Others'}
  ];




  constructor() { }

  ngOnInit(): void {
  }

}
