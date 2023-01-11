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

  /* getFacility() {
    let facility = this.http.getUserFromJSON();
    console.log(facility)
    this.http.get('libraries/facilities/'+facility.facility_code).subscribe({
      next: (data: any) => {
        this.facility_info = data.data;

        this.prescription_length = Object.keys(this.prescriptions).length;
        this.age = this.ageService.calcuateAge(this.patient_info.birthdate, this.consult_details.consult_date)
      },
      error: err => console.log(err)
    })
  } */

  constructor(
    private http: HttpService,
    private ageService: AgeService
  ) { }

  ngOnInit(): void {
    this.patient_info = this.http.getPatientInfo();
    this.patient_philhealth = this.http.getPhilhealhtInfo();
    this.facility = this.http.getUserFromJSON();
    this.age = this.ageService.calcuateAge(this.patient_info.birthdate, this.consult_details.consult_date)

  }
}
