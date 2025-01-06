import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { faFaceFrown, faFaceMeh, faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch, faPrescription, faPrint } from '@fortawesome/free-solid-svg-icons';
import { AgeService } from 'app/shared/services/age.service';
import { dateHelper } from 'app/shared/services/date-helper.service';
import { HttpService } from 'app/shared/services/http.service';

@Component({
    selector: 'app-epres',
    templateUrl: './epres.component.html',
    styleUrls: ['./epres.component.scss'],
    standalone: false
})
export class EpresComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() prescriptions;
  @Input() consult_details;

  faPrint = faPrint;
  faFaceSmile = faFaceSmile;
  faFaceMeh = faFaceMeh;
  faFaceFrown = faFaceFrown;
  faCircleNotch = faCircleNotch;
  faPrescription = faPrescription;

  show_form:boolean = false;

  closeModal(){
    this.toggleModal.emit('epres');
  }

  patient_info: any;
  patient_philhealth: any;
  facility: any;
  age: any;
  prescription_length: number;
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
            this.patient_age = data.data;
            this.show_form = true;
          },
          error: err => console.log(err)
        })
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService,
    private dateHelper: dateHelper
  ) { }

  ngOnInit(): void {
    console.log(this.prescriptions)
    this.patient_info = this.http.getPatientInfo();
    this.patient_philhealth = this.http.getPhilhealhtInfo();
    this.facility = this.http.getUserFromJSON();
    this.prescription_length = Object.keys(this.prescriptions).length;

    this.getAge();
  }
}
