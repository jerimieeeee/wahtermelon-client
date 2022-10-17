import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() patientInfo = new EventEmitter<any>();
  patient_info: any;

  faNotesMedical = faNotesMedical;
  faFlask = faFlask;
  faHeart = faHeart;
  faExclamationCircle = faExclamationCircle;
  faPlusCircle = faPlusCircle;
  faQuestionCircle = faQuestionCircle;

  show_form: boolean = false;

  // MODALS
  vitalsModal: boolean = false;
  allergiesModal: boolean = false;
  medicationModal: boolean = false;
  vaccineModal: boolean = false;
  historyModal: boolean = false;
  famHistoryModal: boolean = false;
  lifestyleModal: boolean = false;
  deathRecordModal: boolean = false;

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
        this.patientInfo.emit(data.data);
        console.log(data.data)
      },
      error: err => console.log(err)
    });
  }

  toggleModal(modal_name){
    console.log(modal_name);
    switch (modal_name){
      case 'vitals-modal':
        this.vitalsModal = !this.vitalsModal;
        break;
      case 'allergies-modal':
        this.allergiesModal = !this.allergiesModal;
        break;
      case 'medication-modal':
        this.medicationModal = !this.medicationModal;
        break;
      case 'vaccine-modal':
        this.vaccineModal = !this.vaccineModal;
        break;
      case 'history-modal':
        this.historyModal = !this.historyModal;
        break;
      case 'fam-history-modal':
        this.famHistoryModal = !this.famHistoryModal;
        break;
      case 'lifestyle-modal':
        this.lifestyleModal = !this.lifestyleModal;
        break;
      case 'death-modal':
        this.deathRecordModal = !this.deathRecordModal;
        break;
      default:
        break;
    }
  }

  /* toggleDeathRecordModal(){
    this.showDeathRecordModal = !this.showDeathRecordModal;
  } */
/*
  vaccineModals(){
    this.showVaccineModal = !this.showVaccineModal;
  } */
}
