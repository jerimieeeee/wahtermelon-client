import { formatDate } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faSearch,faBalanceScale,faPlus,faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.scss']
})
export class PatientRecordComponent implements OnInit, OnChanges {
  @Input() patient_id;
  @Input() consult_details;

  faSave = faSave;
  faInfoCircle = faInfoCircle;
  faSpinner = faSpinner;

  is_saving: boolean = false;

  patient_counseling: any = [];
  patient_target_organ: any = [];
  patient_diagnosis: any = [];

  ncd_record = {
    current_medications: null,
    palpitation_heart: null,
    peripheral_pulses: null,
    abdomen: null,
    heart: null,
    lungs: null,
    sensation_feet: null,
    other_findings: null,
    other_infos: null,
  };

  logical = [
    {code: 'Y', desc: 'Yes'},
    {code: 'N', desc: 'No'},
    {code: 'U', desc: 'Unknown'},
    {code: 'X', desc: 'Not Applicable'}
  ];


  physical_examination = [
    {
      code: 'palpitation_heart',
      desc: 'Palpitation of heart'
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

  physical_examination_result: [];
  counselling: [];
  diagnosis: [];
  target_organ: [];

  libraries = [
    {var_name: 'counselling', url: 'ncd-record-counselling'},
    {var_name: 'diagnosis', url: 'ncd-record-diagnosis'},
    {var_name: 'target_organ', url: 'ncd-record-target-organ'},
    {var_name: 'physical_examination_result', url: 'ncd-physical-exam'},
  ];

  loadLibraries() {
    Object.entries(this.libraries).forEach(([key, value], index) => {
      let val: any = value;
      this.http.get('libraries/'+val.url).subscribe({
        next: (data: any) => {
          console.log(data)
          this[val.var_name] = data.data;

          // if(this.libraries.length-1 === index) this.getRecord();
        },
        error: err => console.log(err)
      })
    })
  }

  getRecord(){
    if(this.consult_details.patientNcdRecord){

      this.ncd_record = this.consult_details.patientNcdRecord;

      console.log(this.ncd_record)
      if(this.consult_details && Object.keys(this.consult_details.ncdRecordTargetOrgan).length > 0){
        this.patient_target_organ = this.loadIndexSelected(this.consult_details.ncdRecordTargetOrgan, 'target_organ_code')
      }

      if(this.consult_details && Object.keys(this.consult_details.ncdRecordDiagnosis).length > 0){
        this.patient_diagnosis = this.loadIndexSelected(this.consult_details.ncdRecordDiagnosis, 'diagnosis_code')
      }

      if(this.consult_details && Object.keys(this.consult_details.ncdRecordCounselling).length > 0){
        this.patient_counseling = this.loadIndexSelected(this.consult_details.ncdRecordCounselling, 'counselling_code')
      }
    }
  }

  loadIndexSelected(data, field) {
    let index_code = [];
    if(Object.keys(data).length > 0) {
      Object.entries(data).forEach(([key, value], index) => {
        let val: any = value;
        index_code[val[field]] = true;
      });
    }

    console.log(index_code)
    return index_code;
  }


  onSubmit(){
    // this.is_saving = true;
    this.ncd_record['patient_ncd_id'] = this.consult_details.patient_ncd_id;
    this.ncd_record['consult_ncd_risk_id'] = this.consult_details.id;
    this.ncd_record['patient_id'] = this.consult_details.patient_id;
    this.ncd_record['consultation_date'] = formatDate(this.consult_details.assessment_date, 'yyyy-MM-dd', 'en');

    this.ncd_record['diagnosis_code'] = this.getIndexVal(this.patient_diagnosis);
    this.ncd_record['counselling_code'] = this.getIndexVal(this.patient_counseling);
    this.ncd_record['target_organ_code'] = this.getIndexVal(this.patient_target_organ);

    console.log(this.ncd_record);
    this.http.post('non-communicable-disease/patient-record',this.ncd_record).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastr.success('Successfully recorded!','NCD Record')
      },
      error: err => console.log(err)
    })
  }

  getIndexVal(val){
    let code_val = [];

    val.forEach((value, key) => {
      if(value === true) {
        code_val.push(key)
      }
    })

    return code_val;
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getRecord();
  }
}
