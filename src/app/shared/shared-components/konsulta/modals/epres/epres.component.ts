import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { faFaceFrown, faFaceMeh, faFaceSmile, faPrint } from '@fortawesome/free-solid-svg-icons';
import { AgeService } from 'app/shared/services/age.service';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-epres',
  templateUrl: './epres.component.html',
  styleUrls: ['./epres.component.scss']
})
export class EpresComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() prescriptions;
  @Input() consult_details;

  faPrint = faPrint;
  faFaceSmile = faFaceSmile;
  faFaceMeh = faFaceMeh;
  faFaceFrown = faFaceFrown;

  timeout: any;

  printForm(form_name) {
    let printContents = document.getElementById(form_name).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    this.timeout = setTimeout(() => {
      window.print();
      document.body.innerHTML = originalContents;
    }, 250)
    // window.print();
    // document.body.innerHTML = originalContents;
  }

  closeModal(){
    this.toggleModal.emit('epres');
  }

  patient_info: any;
  patient_philhealth: any;
  facility: any;
  age: any;
  prescription_length: number;
  dispensed_personnel: any;
  philhealth_info: any;
  patient_age: any;

  iteratePrescription(){
    if(this.prescriptions){
      if(this.prescriptions[0].dispensing){
        this.http.get('users/'+this.prescriptions[0].dispensing[0].user_id).subscribe({
          next: (data: any) => {
            console.log(data)
            this.dispensed_personnel = data.data
            this.getAge();
          },
          error: err => console.log(err)
        })
      }
    }
  }

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
            this.patient_age = data.data;
          },
          error: err => console.log(err)
        })
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService,
    private ageService: AgeService
  ) { }

  ngOnInit(): void {
    this.patient_info = this.http.getPatientInfo();
    this.patient_philhealth = this.http.getPhilhealhtInfo();
    this.facility = this.http.getUserFromJSON();
    this.prescription_length = Object.keys(this.prescriptions).length;
    this.age = this.ageService.calcuateAge(this.patient_info.birthdate, this.consult_details.consult_date)

    this.iteratePrescription();
    console.log(this.patient_philhealth)

  }
}
