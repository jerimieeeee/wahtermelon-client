import { Component, Output, Input, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { AgeService } from 'app/shared/services/age.service';

@Component({
    selector: 'app-medical-certificate',
    templateUrl: './medical-certificate.component.html',
    styleUrls: ['./medical-certificate.component.scss'],
    standalone: false
})
export class MedicalCertificateComponent implements OnInit {
  @Output() toggleMedCert = new EventEmitter<any>();
  @Input() selected_gbv_case;

  patient_details: any;

  patient_age: any;

  occupations: any;

  conv_occu: any;
  
  closeModal(){
    this.toggleMedCert.emit('med_cert');
    console.log('check modal med cert')
  }

  getAge(){
    if(this.patient_details && this.patient_details.birthdate){
      let age_value = this.ageService.calcuateAge(this.patient_details.birthdate);
      this.patient_age = age_value;
      return age_value.age;
    }
  }

  getOccupations(){
    this.http.get('libraries/occupations').subscribe({
      next: (data: any) => {
        this.occupations = data.data;
        console.log(this.occupations, 'occupations data')
      },
      error: err => console.log(err)
    })
  }

  // convertOccupation(){
  //   this.conv_occu = this.patient_details.map((occupation_code) => this.occupations.find((el) => el.code == occupation_code).occupation_desc);
  // }

  constructor(private http: HttpService,
    private ageService: AgeService, 
    // private exportAsService: ExportAsService
) { }

  ngOnInit() {
    this.getOccupations();
    this.patient_details = this.http.getPatientInfo();
    console.log(this.patient_details,'medical cert modal patient')
    console.log(this.selected_gbv_case,'export modal')
    // console.log(this.conv_occu,'occu converted')
  }
}
