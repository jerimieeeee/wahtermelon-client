import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFaceFrown, faFaceMeh, faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faPrint, faCircleNotch, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { dateHelper } from 'app/shared/services/date-helper.service';
import { HttpService } from 'app/shared/services/http.service';
import { NameHelperService } from 'app/shared/services/name-helper.service';

@Component({
  selector: 'app-ekas',
  templateUrl: './ekas.component.html',
  styleUrls: ['./ekas.component.scss']
})
export class EkasComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() lab_list;
  @Input() consult_details;

  faPrint = faPrint;
  faFaceSmile = faFaceSmile;
  faFaceMeh = faFaceMeh;
  faFaceFrown = faFaceFrown;
  faCircleNotch = faCircleNotch;
  faCheck = faCheck;
  faXmark = faXmark;

  patient_info: any;
  patient_philhealth: any;
  facility_info: any;
  age: any;
  prescription_length: number;
  facility: any;
  show_form: boolean = false;

  lab_arr = {
    CBC:  { desc: 'Complete Blood Count (CBC) w/ platelet count', with_result: null },
    LPFL: { desc: 'Lipid profile (Total Cholesterol, Triglycerides, HDL Cholesterol, LDL Cholesterol)', with_result: null },
    FBS:  { desc: 'Fasting Blood Sugar (FBS)', with_result: null },
    OGTT: { desc: 'Oral Glucose Tolerance Test', with_result: null },
    HBA:  { desc: 'Glycosylated Hemoglobin (HbA1c)', with_result: null },
    CRTN: { desc: 'Creatinine', with_result: null },
    CXRAY:{ desc: 'Chest X-Ray', with_result: null },
    SPTM: { desc: 'Sputum Microscopy', with_result: null },
    ECG:  { desc: 'Electrocardiogram (ECG)', with_result: null },
    URN:  { desc: 'Urinalysis', with_result: null },
    PSMR: { desc: 'Pap smear', with_result: null },
    FCAL: { desc: 'Fecalysis', with_result: null },
    FOBT: { desc: 'Fecal Occult Blood Test', with_result: null }
  };

  lab_list_arr: any = [];
  getResults(){
    Object.entries(this.lab_list).forEach(([key, value]:any, index) => {
      let url = this.nameService.getURL(value.laboratory.code)
      if(url !== '') {
        this.http.get(url, {params: {request_id: value.id}}).subscribe({
          next: (data: any) => {
            if(data.data[0] && this.lab_arr[value.laboratory.code]) this.lab_arr[value.laboratory.code].with_result = data.data[0];
          },
          error: err => console.log(err)
        })
      }
    });

    this.getAge();
  }

  philhealth_info: any;
  patient_age: any;
  getAge(){
    this.http.get('patient-philhealth/philhealth', {params:{'filter[patient_id]': this.patient_info.id,  per_page: '1', sort: '-enlistment_date'}}).subscribe({
      next: (data: any) => {
        this.philhealth_info = data.data[0];

        let params = {
          date_from: this.dateHelper.dateFormat(this.patient_info.birthdate),
          date_to: data.data[0].enlistment_date
        }

        this.http.post('konsulta/generate-age', params).subscribe({
          next: (data: any) => {
            this.show_form = true;
            this.patient_age = data.data;
          },
          error: err => console.log(err)
        })
      },
      error: err => console.log(err)
    })
  }

  closeModal(){
    this.toggleModal.emit('ekas');
  }

  constructor(
    private http: HttpService,
    private nameService: NameHelperService,
    private dateHelper: dateHelper
  ) { }

  ngOnInit(): void {
    this.patient_info = this.http.getPatientInfo();
    this.patient_philhealth = this.http.getPhilhealhtInfo();
    this.facility = this.http.getUserFromJSON();

    this.getResults();
  }
}
