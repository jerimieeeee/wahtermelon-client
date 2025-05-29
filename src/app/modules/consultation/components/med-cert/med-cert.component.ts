import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AgeService } from 'app/shared/services/age.service';
import { HttpService } from 'app/shared/services/http.service';

RouterOutlet

@Component({
  selector: 'app-med-cert',
  templateUrl: './med-cert.component.html',
  styleUrl: './med-cert.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class MedCertComponent implements OnInit {


  constructor(
      private router: Router,
      private http: HttpService,
      private ageService: AgeService,
      private datePipe: DatePipe
    ) { }

  selected_consult_id!: string;
  user_facility: string;

   occupations: object;
   civil_statuses: object;

    patient_age: any;

   getAge(){
    if(this.patient_info && this.patient_info.birthdate){
      let age_value = this.ageService.calcuateAge(this.patient_info.birthdate);
      this.patient_age = age_value;
      return age_value.age + ' ' + age_value.type+(age_value.age>1 ? 's old' : ' old' );
    }
  }

  

  todaysDate(){
    const today = new Date();

    const formattedDate = this.datePipe.transform(today, 'MM-dd-yyyy');
  console.log(formattedDate);

  }



  consult: any[] = [];
  loading = true;

  getConsultInfo(){
    const params = this.consultation

   this.http.get('consultation/med-cert', { params }).subscribe({
  next: (data: any) => {
    this.consult = data.data;
    console.log('consult:', this.consult);
  },
  error: err => {
    console.error('API Error:', err);
    this.loading = false;
  }
  
    })
  } 

  patient_info: any;
   consultation: any;

  user = {
    facility: {facility_name:''},
    municipality: {municipality_code:''},
  };

  ngOnInit(): void {

    this.consultation = this.http.getUrlParams();
     if (this.consultation.consult_id?.includes('/')) {
    this.consultation.consult_id = this.consultation.consult_id.split('/')[0];
  }

  console.log(this.consultation, 'cleaned consult id');

    this.getConsultInfo();
   
  }
}
