import { Component, ComponentFactoryResolver, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFlask, faHeart, faExclamationCircle, faNotesMedical, faPlusCircle, faQuestionCircle, faPenToSquare, faTrash, faTableList } from '@fortawesome/free-solid-svg-icons';
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
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faTableList = faTableList;
  show_form: boolean = false;

  // MODALS
  vitalsModal: boolean = false;
  allergiesModal: boolean = false;
  medicationModal: boolean = false;
  vaccineModal: boolean = false;
  vaccineActionModal: boolean = false;
  historyModal: boolean = false;
  famHistoryModal: boolean = false;
  lifestyleModal: boolean = false;
  deathRecordModal: boolean = false;
  vitalsListModal: boolean = false;

  vaccines_given: any;
  vaccine_list: any = [];
  vaccine_to_edit: any;
  patient_age: any;
  latest_vitals: any;
  vitals_to_edit: any;

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
    this.patient_age = age_value;
    return age_value.age + ' ' + age_value.type+(age_value.age>1 ? 's old' : ' old' );
  }

  getPatient(id){
    this.http.get('patient/'+id).subscribe({
      next: (data: any) => {
        this.patient_info = data.data;
        this.show_form = true;
        this.patientInfo.emit(data.data);
        this.loadVaccines();
        this.loadVitals();
        console.log(data.data)
      },
      error: err => console.log(err)
    });
  }

  checkVaccineStatus(vaccines){
    var new_vax = [];
    Object.entries(vaccines).reverse().forEach(([key, value], index) => {
      var val:any = value
      if(!new_vax[val.vaccines.vaccine_id]) new_vax[val.vaccines.vaccine_id] = []

      let vax = {
        id: val.id,
        vaccine_id: val.vaccines.vaccine_id,
        vaccine_date: val.vaccine_date,
        dose: this.getNumberSuffix(Object.keys(new_vax[val.vaccines.vaccine_id]).length + 1)
      }

      new_vax[val.vaccines.vaccine_id][val.id] = vax
    })

    this.vaccines_given = new_vax;
    this.addDose(new_vax)
  }

  getNumberSuffix(i){
    var j = i % 10,
    k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
  }

  addDose(new_vax){
    Object.entries(this.vaccine_list).forEach(([key, value], index) => {
      var val:any = value;

      this.vaccine_list[key]['dose'] = new_vax[val.vaccines.vaccine_id][val.id].dose;
    });
  }

  toggleActionModal(modal_name, vaccine){
    this.vaccine_to_edit = vaccine;
    this.vaccineActionModal = !this.vaccineActionModal;
    if(this.vaccineActionModal == false) this.loadVaccines();
  }

  loadVaccines(){
    let params = { 'patient_id': this.patient_info.id, 'sort': '-vaccine_date' }
    this.http.get('patient-vaccines/vaccines-records', params).subscribe({
      next: (data: any) => {
        this.vaccine_list = data.data;
        console.log(this.vaccine_list)
        this.checkVaccineStatus(data.data);
      },
      error: err => console.log(err),
      complete: () => console.log('vaccines loaded')
    })
  }

  loadVitals(){
    let query = {
      patient_id: this.patient_info.id,
      sort: '-vitals_date'
    }
    this.http.get('patient-vitals/vitals', query).subscribe({
      next: (data: any) => {
        console.log(data);
        if(data.data.length > 1){
          this.latest_vitals = data.data[0]
        }else{
          this.latest_vitals = data.data
        }
        console.log(this.latest_vitals);
      },
      error: err => console.log(err),
      complete: () => console.log('vitals loaded')
    })
  }

  vitalsEdit(e){
    this.vitals_to_edit = e;
    this.toggleModal('vitals-modal');
  }

  toggleModal(modal_name){
    switch (modal_name){
      case 'vitals-modal':
        this.vitalsModal = !this.vitalsModal;
        if(this.vitalsModal == false)  this.vitals_to_edit = null;
        this.loadVitals();
        break;
      case 'vitals-list-modal':
        this.vitalsListModal = !this.vitalsListModal;
        break;
      case 'allergies-modal':
        this.allergiesModal = !this.allergiesModal;
        break;
      case 'medication-modal':
        this.medicationModal = !this.medicationModal;
        break;
      case 'vaccine-modal':
        this.loadVaccines();
        this.vaccineModal = !this.vaccineModal;
        break;
      case 'vaccine-action-modal':
        this.loadVaccines();
        this.vaccineActionModal = !this.vaccineActionModal;
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
}
