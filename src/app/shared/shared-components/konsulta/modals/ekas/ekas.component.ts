import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFaceFrown, faFaceMeh, faFaceSmile, faPrint, faSpinner, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { AgeService } from 'app/shared/services/age.service';
import { HttpService } from 'app/shared/services/http.service';

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

  patient_info: any;
  patient_philhealth: any;
  facility_info: any;
  age: any;
  prescription_length: number;
  facility: any;
  show_form: boolean = false;

  getResults(){
    Object.entries(this.lab_list).forEach(([key, value], index) => {
      let val: any = value;
      let url = this.http.getURL(val.laboratory.code)
      if(url !== '') {
        this.http.get(url, {params: {request_id: val.id}}).subscribe({
          next: (data: any) => {
            // console.log(data.data)
            this.lab_list[key]['result'] = data.data[0];
          },
          error: err => console.log(err)
        })
      }

    });

    this.getAge();
    console.log(this.lab_list);
  }
  philhealth_info: any;
  patient_age: any;

  getAge(){
    this.http.get('patient-philhealth/philhealth', {params:{'filter[patient_id]': this.patient_info.id,  per_page: '1', sort: '-enlistment_date'}}).subscribe({
      next: (data: any) => {
        this.philhealth_info = data.data[0];

        let params = {
          date_from: this.patient_info.birthdate,
          date_to: data.data[0].enlistment_date
        }

        this.http.post('konsulta/generate-age', params).subscribe({
          next: (data: any) => {
            console.log(data)
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
    private ageService: AgeService
  ) { }

  ngOnInit(): void {
    this.patient_info = this.http.getPatientInfo();
    this.patient_philhealth = this.http.getPhilhealhtInfo();
    this.facility = this.http.getUserFromJSON();
    this.age = this.ageService.calcuateAge(this.patient_info.birthdate, this.consult_details.consult_date);

    this.getResults();
    console.log(this.consult_details)
    // console.log(this.patient_info)
    // this.getFacility();
  }
}
