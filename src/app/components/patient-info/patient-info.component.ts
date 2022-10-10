import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFlask, faHeart, faExclamationCircle, faNotesMedical, faPlusCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { AgeService } from 'app/shared/services/age.service';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent {
  patient_info: any;

  faNotesMedical = faNotesMedical;
  faFlask = faFlask;
  faHeart = faHeart;
  faExclamationCircle = faExclamationCircle;
  faPlusCircle = faPlusCircle;
  faQuestionCircle = faQuestionCircle;

  showModal: boolean = false;
  show_form: boolean = false;
  showDeathRecordModal: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private http: HttpService,
    private ageService: AgeService
  ) {
    this.activeRoute.params.subscribe(params => {
      this.getPatient(params.id);
    });
  }

  getAge(){
    let age_value = this.ageService.calcuateAge(this.patient_info.birthdate);
    return age_value.age + ' ' + age_value.type+(age_value.age>1 ? 's old' : ' old' );
  }

  getPatient(id){
    this.http.get('patient/'+id).subscribe({
      next: (data: any) => {
        this.patient_info = data.data;
        this.show_form = true;
        console.log(data.data)
      },
      error: err => console.log(err)
    });
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  toggleDeathRecordModal(){
    this.showDeathRecordModal = !this.showDeathRecordModal;
  }
}
