import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { faCamera, faChevronDown, faChevronRight, faChevronUp, faClipboardUser, faExclamationCircle, faFlask, faHeart, faNotesMedical, faPenSquare, faPenToSquare, faPlusCircle, faQuestionCircle, faTableList, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AgeService } from 'app/shared/services/age.service';
import { HttpService } from 'app/shared/services/http.service';
import { VitalsChartsService } from 'app/shared/services/vitals-charts.service';
import { filter, tap } from 'rxjs/operators';
import { PatientItrComponent } from '../patient-itr/patient-itr.component';
import { FamilyMedicalComponent } from './components/family-medical/family-medical.component';
import { LaboratoryComponent } from './components/laboratory/laboratory.component';
import { MenstrualHistoryComponent } from './components/menstrual-history/menstrual-history.component';
import { PastMedicalComponent } from './components/past-medical/past-medical.component';
import { PhilhealthComponent } from './components/philhealth/philhealth.component';
import { PregnancyHistoryComponent } from './components/pregnancy-history/pregnancy-history.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component';
import { SocialHistoryComponent } from './components/social-history/social-history.component';
import { SurgicalHistoryComponent } from './components/surgical-history/surgical-history.component';
import { VaccineComponent } from './components/vaccine/vaccine.component';
import { VitalsComponent } from './components/vitals/vitals.component';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
  @ViewChild(PastMedicalComponent) pastMedical: PastMedicalComponent;
  @ViewChild(FamilyMedicalComponent) familyMedical: FamilyMedicalComponent;
  @ViewChild(VaccineComponent) vaccine: VaccineComponent;
  @ViewChild(PhilhealthComponent) philhealth: PhilhealthComponent;
  @ViewChild(LaboratoryComponent) laboratories: LaboratoryComponent;
  @ViewChild(PrescriptionsComponent) prescriptions: PrescriptionsComponent;
  @ViewChild(SocialHistoryComponent) socialHistory: SocialHistoryComponent;
  @ViewChild(SurgicalHistoryComponent) surgicalHistory: SurgicalHistoryComponent;
  @ViewChild(MenstrualHistoryComponent) menstrualHistory: MenstrualHistoryComponent;
  @ViewChild(PregnancyHistoryComponent) pregnancyHistory: PregnancyHistoryComponent;
  @ViewChild(VitalsComponent) vitals: VitalsComponent;

  // @ViewChild(PatientItrComponent) patientItr: PatientItrComponent;
  reloadNCDVitals: EventEmitter<any> = new EventEmitter();
  reloadLabs: EventEmitter<any> = new EventEmitter();

  ncdVitals(){
    this.reloadNCDVitals.emit()
  }

  labModule(){
    this.reloadLabs.emit();
  }

  @Output() patientInfo = new EventEmitter<any>();
  @Output() patientVitals = new EventEmitter<any>();
  // @Output() reloadLabs = new EventEmitter<any>();
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
  faPenSquare = faPenSquare;
  faChevronRight = faChevronRight;
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faClipboardUser = faClipboardUser;
  faCamera = faCamera;

  show_form: boolean = false;
  show_vitals: boolean = false;
  lab_request: boolean = false;

  vaccines_given: any;

  patient_age: any;
  latest_vitals: any;
  patient_vitals: any;
  vitals_to_edit: any;
  philhealth_to_edit: any;

  accordions = [];
  modals = [];

  consult_id: string;

  active_loc: any = [];
  toggleLoc(loc){
    this.active_loc = [];
    this.active_loc[loc] = true;
    console.log(this.active_loc)
  }

  navigateTo(loc){
    this.router.navigate(['/patient/'+loc, {id: this.patient_info.id}])
  }

  editPatient(id){
    if(id) this.router.navigate(['/edit-patient', {id: id}]);
  }

  getAge(){
    if(this.patient_info && this.patient_info.birthdate){
      let age_value = this.ageService.calcuateAge(this.patient_info.birthdate);
      this.patient_age = age_value;
      return age_value.age + ' ' + age_value.type+(age_value.age>1 ? 's old' : ' old' );
    }
  }

  patient_id: string;
  getPatient(){
    let params = this.http.getUrlParams();
    console.log(params)
    if(this.patient_id !== params.patient_id){
      this.http.get('patient/'+params.patient_id).subscribe({
        next: (data: any) => {
          this.patient_info = data.data;
          this.show_form = true;
          this.http.setPatientInfo(data.data);
          // this.loadVitals();
          this.loadData('all');
          // this.toggleLoc(params.loc)
          // this.toggleModal('history') //togglemodal for easy test;
          this.accordions['vitals'] = true;
          this.accordions['lab_request'] = true;
          this.accordions['prescriptions'] = true;
        },
        error: err => {
          // feature: add prompt that patient is not found. for now redirect to home
          console.log(err)
          // this.router.navigate(['/home'])
        }
      });
    }
  }

  pending_labs: any;

  loadData(field){
    console.log(field);
    if(field === 'past_medical'       || field==='all') this.pastMedical.loadData(this.patient_info.id);
    if(field === 'family_medical'     || field==='all') this.familyMedical.loadData(this.patient_info.id);
    if(field === 'vaccines'           || field==='all') this.vaccine.loadData(this.patient_info.id);
    if(field === 'philhealth'         || field==='all') this.philhealth.loadData(this.patient_info.id);
    if(field === 'laboratory'         || field==='all') this.laboratories.loadData(this.patient_info.id);
    if(field === 'prescription'       || field==='all') this.prescriptions.loadData(this.patient_info.id);
    if(field === 'social_history'     || field==='all') this.socialHistory.loadData(this.patient_info.id);
    if(field === 'surgical_history'   || field==='all') this.surgicalHistory.loadData(this.patient_info.id);
    if(field === 'menstrual_history'  || field==='all') this.menstrualHistory.loadData(this.patient_info.id);
    if(field === 'pregnancy_history'  || field==='all')  {} //this.surgicalHistory.loadData(this.patient_info.id);
    if(field === 'vitals'             || field==='all') this.vitals.loadData(this.patient_info.id);
  }

  social_history: any;
  past_medical: any;
  family_medical: any;
  surgical_history: any;
  menstrual_history: any;

  setSurgicalHistory(data) {
    this.surgical_history = data;
  }

  setPastMedical(data) {
    this.past_medical = data;
  }

  setFamilyMedical(data){
    this.family_medical = data;
  }

  setSocial(data){
    this.social_history = data;
  }

  setMenstrual(data){
    this.menstrual_history = data;
  }

  vitalsEdit(e){
    this.vitals_to_edit = e;
    this.toggleModal('vitals');
  }

  philhealthEdit(e){
    this.philhealth_to_edit = e;
    this.toggleModal('philhealth');
  }

  getInitials(string) {
    return [...string.matchAll(/\b\w/g)].join('')
  }

  toggleAccordion(id){
    this.accordions[id] = !this.accordions[id];
  }

  lab_req_list: any;
  setLabList(data) {
    // console.log(data)
    this.lab_req_list = data;
    this.labModule()
    // this.reloadLabs.emit(data);
  }

  setVaccineGiven(data) {
    this.vaccines_given = data;
  }

  setVitals(data) {
    console.log(data)
    this.patient_vitals = data;
  }

  surgery_to_delete: any;
  vaccine_to_edit: any;
  //Libraries for modals
  history_list: any;
  fp_method: any;

  toggleModal(modal_name, data?){
    console.log(modal_name)

    if(modal_name === 'fam-history' || modal_name === 'history') {
      // PAST AND FAMILY HISTORY
      if(!this.history_list){
        this.loadLibrary('libraries/medical-history', 'history_list', modal_name);
      } else {
        this.modals[modal_name] = !this.modals[modal_name];
      }

      if(modal_name === 'history' && this.modals['history'] === false) this.loadData('past_medical');
      if(modal_name === 'fam-history' && this.modals['surgical-history'] === false) this.loadData('family_medical');
    } else if (modal_name.modal_name === 'surgical-history' || modal_name.modal_name === 'surgical-action') {
      //SURGICAL HISTORY
      this.modals[modal_name.modal_name] = !this.modals[modal_name.modal_name];

      if(modal_name.modal_name === 'surgical-action' && this.modals['surgical-action'] === true) {
        this.surgery_to_delete = modal_name.data;
      }

      if((modal_name.modal_name === 'surgical-history' && this.modals['surgical-history'] === false) ||
        (modal_name.modal_name === 'surgical-action' && this.modals['surgical-action'] === false)) {
        this.loadData('surgical_history');
        this.surgery_to_delete = null;
      }
    } else if (modal_name === 'menstrual') {
      //MENSTRUAL HISTORY
      if(!this.fp_method){
        this.loadLibrary('libraries/family-planning-method','fp_method','menstrual')
      } else {
        this.modals[modal_name] = !this.modals[modal_name];
      }

      if(modal_name === 'menstrual' && this.modals['menstrual'] === false) this.loadData('menstrual_history');
    }else {
      // OTHERS
      this.modals[modal_name.modal_name ?? modal_name] = !this.modals[modal_name.modal_name ?? modal_name];

      if (modal_name === 'vitals' && this.modals[modal_name] === false) {
        if(this.modals['vitals'] == false)  this.vitals_to_edit = null;
        this.loadData('vitals');
        this.ncdVitals()
      }

      if (modal_name.modal_name === 'philhealth' && this.modals[modal_name.modal_name] === false) {
        if(this.modals['philhealth'] === false)  this.philhealth_to_edit = null;
        this.loadData('philhealth');
      }


      if (modal_name.modal_name === 'vaccine') {
        if(this.modals[modal_name.modal_name] === true) {
          this.vaccines_given = modal_name.data;
        }
      }

      if (modal_name.modal_name === 'vaccine-action') {
        if(this.modals[modal_name.modal_name] === true) {
          this.vaccine_to_edit = modal_name.data;
        } else {
          this.loadData('vaccines');
        }
      }

      if(modal_name === 'lifestyle' && this.modals['lifestyle'] === false) this.loadData('social_history');
      if (modal_name === 'lab-request' && this.modals[modal_name] === false) {
        this.loadData('laboratory');
        // this.labModule();
      }
    }
  }

  loadLibrary(url, var_name, modal_name){
    this.http.get(url).subscribe({
      next: (data: any) => {
        this[var_name] = data.data;
        this.modals[modal_name] = !this.modals[modal_name];
      },
      error: err => console.log(err)
    })
  }

  navigationEnd$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    tap(() => {
      this.getPatient();
    })
  );

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private http: HttpService,
    private ageService: AgeService,
    private vitalsCharts: VitalsChartsService,
  ) { }

  ngOnInit(): void {
    this.getPatient();
    this.navigationEnd$.subscribe();
  }
}
