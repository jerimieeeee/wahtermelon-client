import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AgeService } from 'app/shared/services/age.service';
import { HttpService } from 'app/shared/services/http.service';

RouterOutlet

@Component({
  selector: 'app-med-cert',
  templateUrl: './med-cert.component.html',
  styleUrl: './med-cert.component.scss',
  standalone: true,
  imports: [RouterModule]
})
export class MedCertComponent implements OnInit {

  patient_info: any;
   patient_age: any;

  patient_id: string;
  consult_id: string;
  active_loc: string;
  active_loc_id: any;


  getPatient() {
    this.active_loc_id = this.http.getUrlParams();
    this.active_loc = this.active_loc_id.loc;
    this.consult_id = this.active_loc_id.consult_id ?? null;

     this.patient_id = this.active_loc_id.patient_id;

    this.http.get('patient/'+this.active_loc_id.patient_id).subscribe({
       next: (data: any) => {
          this.patient_info = data.data;

          this.http.setPatientInfo(this.patient_info);
          console.log(this.patient_info);
        },

        error: err => {
          console.log(err)
        }
    })

  }

   getAge(){
    if(this.patient_info && this.patient_info.birthdate){
      let age_value = this.ageService.calcuateAge(this.patient_info.birthdate);
      this.patient_age = age_value;
      return age_value.age + ' ' + age_value.type+(age_value.age>1 ? 's old' : ' old' );
    }
  }

  constructor(
      private router: Router,
      private http: HttpService,
      private ageService: AgeService,
    ) { }


  ngOnInit(): void {
     this.getPatient();
  }
}
