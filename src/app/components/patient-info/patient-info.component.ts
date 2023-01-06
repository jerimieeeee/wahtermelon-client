import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { faFlask, faHeart, faExclamationCircle, faNotesMedical, faPlusCircle, faQuestionCircle, faPenToSquare, faTrash, faTableList, faPenSquare, faChevronRight, faChevronUp, faChevronDown, fas, faClipboardUser, faCamera } from '@fortawesome/free-solid-svg-icons';
import { AgeService } from 'app/shared/services/age.service';
import { HttpService } from 'app/shared/services/http.service';
import { VitalsChartsService } from 'app/shared/services/vitals-charts.service';
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
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss'],
  animations: [
    trigger('openCloseAccordion', [
      transition(':enter', [
        style({height: 0, opacity: 0}),
        animate('200ms', style({ height: '100%', opacity: '100%'})),
      ]),
      transition(':leave', [
        animate('200ms', style({ height: 0, opacity: 0 }))
      ])
    ]),
  ]
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

  @Output() patientInfo = new EventEmitter<any>();
  @Output() patientVitals = new EventEmitter<any>();
  @Output() reloadLabs = new EventEmitter<any>();
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

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private http: HttpService,
    private ageService: AgeService,
    private vitalsCharts: VitalsChartsService
  ) { }

  navigateTo(loc){
    this.router.navigate(['/'+loc, {id: this.patient_info.id}])
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

  getPatient(id){
    this.http.get('patient/'+id).subscribe({
      next: (data: any) => {
        this.patient_info = data.data;
        this.show_form = true;
        this.patientInfo.emit(data.data);
        this.loadVitals();

        this.loadData('all');
        // this.toggleModal('history') //togglemodal for easy test;
        this.accordions['vitals'] = true;
        this.accordions['lab_request'] = true;
        this.accordions['prescriptions'] = true;
      },
      error: err => {
        // feature: add prompt that patient is not found. for now redirect to home
        this.router.navigate(['/home'])
        //  console.log(err)
      }
    });
  }

  pending_labs: any;

  loadData(field){
    console.log(field);
    if(field === 'past_medical' || field==='all') this.pastMedical.loadData(this.patient_info.id);
    if(field === 'family_medical' || field==='all') this.familyMedical.loadData(this.patient_info.id);
    if(field === 'vaccines' || field==='all') this.vaccine.loadData(this.patient_info.id);
    if(field === 'philhealth' || field==='all') this.philhealth.loadData(this.patient_info.id);
    if(field === 'laboratory' || field==='all') this.laboratories.loadData(this.patient_info.id);
    if(field === 'prescription' || field==='all') this.prescriptions.loadData(this.patient_info.id);
    if(field === 'social_history' || field==='all') this.socialHistory.loadData(this.patient_info.id);
    if(field === 'surgical_history' || field==='all') this.surgicalHistory.loadData(this.patient_info.id);
    if(field === 'menstrual_history' || field==='all') {} //this.surgicalHistory.loadData(this.patient_info.id);
    if(field === 'pregnancy_history' || field==='all')  {} //this.surgicalHistory.loadData(this.patient_info.id);
  }

  social_history: any;
  past_medical: any;
  family_medical: any;
  surgical_history: any;

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


  vitals: any;
  loadVitals(){
    this.http.get('patient-vitals/vitals', {params:{patient_id: this.patient_info.id, sort: '-vitals_date', per_page: 15}}).subscribe({
      next: (data: any) => {
        // console.log(data.data)
        let vitals = data.data;

        if(vitals.length > 0) {
          let orig_systolic = data.data[0].bp_systolic;
          let orig_diastolic = data.data[0].bp_diastolic;

          this.latest_vitals = this.vitalsCharts.getLatestToday(vitals);

          vitals[0]['bp_systolic'] = orig_systolic;
          vitals[0]['bp_diastolic'] = orig_diastolic;
          this.patientVitals.emit(vitals);
        } else {
          this.latest_vitals = null;
        }

        this.show_vitals = true;
      },
      error: err => console.log(err),
    })
  }

  getLatestToday(vitals){
    if(vitals.length > 0) {
      this.latest_vitals = this.vitalsCharts.getLatestToday(vitals)
    } else {
      this.latest_vitals = null;
    }
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
    this.reloadLabs.emit(data);
  }

  vaccine_to_edit: any;
  setVaccineGiven(data) {
    // console.log(data);
    this.vaccines_given = data;
  }

  history_list: any;

  loadLibrary(url, var_name, modal_name){
    console.log('loaded')
    this.http.get(url).subscribe({
      next: (data: any) => {
        this[var_name] = data.data;
        this.modals[modal_name] = !this.modals[modal_name];
      },
      error: err => console.log(err)
    })
  }

  toggleModal(modal_name, data?){
    console.log(modal_name)

    if(modal_name === 'fam-history' || modal_name === 'history') {
      if(!this.history_list){
        this.loadLibrary('libraries/medical-history', 'history_list', modal_name);
        /* this.http.get('libraries/medical-history').subscribe({
          next: (data: any) => {
            this.history_list = data.data;
            this.modals[modal_name] = !this.modals[modal_name];
          },
          error: err => console.log(err)
        }) */
      } else {
        this.modals[modal_name] = !this.modals[modal_name];
      }

      if(modal_name === 'history' && this.modals['history'] === false) this.loadData('past_medical');
      if(modal_name === 'fam-history' && this.modals['surgical-history'] === false) this.loadData('family_medical');
    } else {
      this.modals[modal_name.modal_name ?? modal_name] = !this.modals[modal_name.modal_name ?? modal_name];

      if (modal_name === 'vitals' && this.modals[modal_name] === false) {
        if(this.modals['vitals'] == false)  this.vitals_to_edit = null;
        this.loadVitals();
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

      if(modal_name === 'surgical-history' && this.modals['surgical-history'] === false) this.loadData('surgical_history');
      if(modal_name === 'lifestyle' && this.modals['lifestyle'] === false) this.loadData('social_history');
      if (modal_name === 'lab-request' && this.modals[modal_name] === false) this.loadData('laboratory');
    }
    // if (modal_name === 'vaccine-action' && this.modals[modal_name] === false) this.loadData('vaccines');
  }

  navigationEnd$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    tap(() => {
      this.getPatient(this.activeRoute.snapshot.paramMap.get('id'));
    })
  );

  ngOnInit(): void {
    this.consult_id = this.activeRoute.snapshot.paramMap.get('consult_id');
    this.getPatient(this.activeRoute.snapshot.paramMap.get('id'));
    this.navigationEnd$.subscribe();
  }
}
