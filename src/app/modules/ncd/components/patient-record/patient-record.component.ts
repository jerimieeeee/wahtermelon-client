import { Component, Input, OnInit } from '@angular/core';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faSearch,faBalanceScale,faPlus,faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.scss']
})
export class PatientRecordComponent implements OnInit {
  @Input() patient_id;
  @Input() consult_id;

  faSave = faSave;
  faInfoCircle = faInfoCircle;
  faSpinner = faSpinner;

  is_saving: boolean = false;

  patient_counseling: any = [];
  patient_target_organ: any = [];
  patient_diagnosis: any = [];

  ncd_record = {
    current_medication: null,
    palpation_heart: null,
    peripheral_pulses: null,
    abdomen: null,
    heart: null,
    lungs: null,
    sensation_feet: null,
    other_findings: null,
    other_info: null,
  };

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
    {
      code: 'palpation_heart',
      desc: 'Palpation of heart'
    },
    {
      code: 'peripheral_pulses',
      desc: 'Palpation of perpheral pulses'
    },
    {
      code: 'abdomen',
      desc: 'Palpation of abdomen'
    },
    {
      code: 'heart',
      desc: 'Auscultation of heart'
    },
    {
      code: 'lungs',
      desc: 'Auscultation of lungs'
    },
    {
      code: 'sensation_feet',
      desc: 'If DM, sensation of feet and foot pulses'
    }
  ];

  physical_examination_result = [
    {code: 'Normal', desc: 'Normal'},
    {code: 'Abnormal', desc: 'Abnormal'}
  ];

  counselling = [
    {code: '1', desc: 'Smoking cessation'},
    {code: '2', desc: 'Diet'},
    {code: '3', desc: 'Physical activity'},
    {code: '4', desc: 'Weight control'},
    {code: '5', desc: 'Alcohol intake'},
    {code: '6', desc: 'Others'}
  ];

  onSubmit(){
    // this.is_saving = true;

    console.log(this.patient_counseling);
    console.log(this.ncd_record);
    console.log(this.patient_target_organ);
    console.log(this.patient_diagnosis);
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
  }

}
