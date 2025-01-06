import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { faBuildingCircleArrowRight, faCamera, faClipboardUser, faExclamationCircle, faFlask, faHeart, faNotesMedical, faPenSquare, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AgeService } from 'app/shared/services/age.service';
import { HttpService } from 'app/shared/services/http.service';
import { filter, tap } from 'rxjs/operators';
import { FamilyMedicalComponent } from './components/family-medical/family-medical.component';
import { LaboratoryComponent } from './components/laboratory/laboratory.component';
import { MenstrualHistoryComponent } from './components/menstrual-history/menstrual-history.component';
import { PastMedicalComponent } from './components/past-medical/past-medical.component';
import { PhilhealthComponent } from './components/philhealth/philhealth.component';
import { PreghistComponent } from './components/preghist/preghist.component';
import { PregnancyHistoryComponent } from './components/pregnancy-history/pregnancy-history.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component';
import { SocialHistoryComponent } from './components/social-history/social-history.component';
import { SurgicalHistoryComponent } from './components/surgical-history/surgical-history.component';
import { VaccineComponent } from './components/vaccine/vaccine.component';
import { VitalsComponent } from './components/vitals/vitals.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DeathRecordComponent } from './components/death-record/death-record.component';

@Component({
    selector: 'app-patient-info',
    templateUrl: './patient-info.component.html',
    styleUrls: ['./patient-info.component.scss'],
    standalone: false
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
  @ViewChild(PreghistComponent) preghist: PreghistComponent;
  @ViewChild(AppointmentComponent) appointment: AppointmentComponent;
  @ViewChild(DeathRecordComponent) death: DeathRecordComponent;
  reloadNCDVitals: EventEmitter<any> = new EventEmitter();
  reloadLabs: EventEmitter<any> = new EventEmitter();

  reloadChild(child) {
    switch (child) {
      case 'ncd':
        this.reloadNCDVitals.emit()
        break;
      case 'lab':
        this.reloadLabs.emit()
        break;
      default:
        break;
    }
  }

  show_female_history: boolean = true;

  loadData(field){
    // console.log(field)
    if(field === 'past_medical'       || field==='all') this.pastMedical.loadData(this.patient_info.id);
    if(field === 'family_medical'     || field==='all') this.familyMedical.loadData(this.patient_info.id);
    if(field === 'vaccines'           || field==='all') this.vaccine.loadData(this.patient_info.id);
    if(field === 'philhealth'         || field==='all') this.philhealth.loadData(this.patient_info.id);

    if(this.patient_info.gender === 'M') {
      this.show_female_history = false;
    } else {
      this.show_female_history = true;
      if(this.show_female_history === true && (field === 'menstrual_history'  || field==='all')) this.menstrualHistory.loadData(this.patient_info.id);
      if(this.show_female_history === true && (field === 'pregnancy_history'  || field==='all')) this.preghist.loadData(this.patient_info.id);
    }

    if(field === 'social_history'       || field==='all') this.socialHistory.loadData(this.patient_info.id);
    if((field === 'surgical_history'    || field==='all') && this.active_loc !== 'dn') this.surgicalHistory.loadData(this.patient_info.id);
    if(field === 'vitals'               || field==='all') this.vitals.loadData(this.patient_info.id);
    if(field === 'appointment'          || field==='all') this.appointment.loadData(this.patient_info.id);


    if((field === 'laboratory'         || field==='all') && this.active_loc !== 'lab') this.laboratories.loadData(this.patient_info.id);
    if((field === 'prescription'       || field==='all') && this.active_loc !== 'dispensing') this.prescriptions.loadData(this.patient_info.id);

    if(field === 'death'     || field==='all') this.death.loadData(this.patient_info.id);
  }

  no_graph_list = ['lab', 'dispensing'];

  patient_info: any;

  faNotesMedical = faNotesMedical;
  faFlask = faFlask;
  faHeart = faHeart;
  faExclamationCircle = faExclamationCircle;
  faPenSquare = faPenSquare;
  faClipboardUser = faClipboardUser;
  faCamera = faCamera;
  faBuildingCircleArrowRight = faBuildingCircleArrowRight;

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

  navigateTo(loc){
    this.router.navigate(['/patient/'+loc, {id: this.patient_info.id}])
  }

  editPatient(id){
    if(id) this.router.navigate(['/edit-patient', {id: id}]);
  }

  patient_id: string;
  consult_id: string;
  active_loc: string;
  active_loc_id: any;

  getPatient(){
    this.active_loc_id = this.http.getUrlParams();
    this.active_loc = this.active_loc_id.loc;
    this.consult_id = this.active_loc_id.consult_id ?? null;

    // console.log('get patient', this.patient_id ?? null, this.active_loc_id.patient_id)
    if(this.active_loc_id.patient_id && (this.patient_id !== this.active_loc_id.patient_id)){
      // console.log('getting patient')
      this.patient_id = this.active_loc_id.patient_id;

      this.http.get('patient/'+this.active_loc_id.patient_id).subscribe({
        next: (data: any) => {
          this.patient_info = data.data;
          // console.log(this.patient_info);
          this.show_form = true;
          this.http.setPatientInfo(this.patient_info);
          this.loadData('all');

          this.accordions['vitals'] = true;
          this.accordions['lab_request'] = true;
          this.accordions['prescriptions'] = true;
          this.accordions['appointment'] = true;
          this.getImage(data.data)
        },
        error: err => {
          // feature: add prompt that patient is not found. for now redirect to home
          console.log(err)
        }
      });
    } else {
      this.reloadData();
    }
  }

  imageData: SafeUrl | null = null;
  getImage(data) {
    this.imageData = null;

    if(data.image_url){
      this.http.get('images/'+data.id, { responseType: 'blob' }).subscribe({
        next: (data: any) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;
            this.imageData = this.sanitizer.bypassSecurityTrustUrl(base64data);
          };
          reader.readAsDataURL(data);
        },
        error: err => console.log(err)
      });
    }
  }

  reloadData(){
    switch (this.active_loc) {
      case 'lab':
        this.loadData('prescription')
        break;
      case 'dispensing':
        this.loadData('laboratory')
        break;
      default:
        this.loadData('laboratory')
        this.loadData('prescription')
        break;
    }
  }

  social_history: any;
  past_medical: any;
  family_medical: any;
  surgical_history: any;
  menstrual_history: any;
  lab_req_list: any;
  philhealth_details: any;
  pregnancy_history: any;
  death_record: any;

  setDetails(data) {
    this[data.var_name] = data.data;
  }

  setSurgicalHistory(data) {
    this.surgical_history = data;
  }

  setPastMedical(data) {
    this.past_medical = data;
  }

  setFamilyMedical(data){
    this.family_medical = data;
  }

  setMenstrual(data){
    this.menstrual_history = data;
  }

  setLabList(data) {
    this.lab_req_list = data;
  }

  setVaccineGiven(data) {
    this.vaccines_given = data;
  }

  setVitals(data) {
    this.patient_vitals = data;
  }

  vitalsEdit(e){
    this.vitals_to_edit = e;
    this.toggleModal('vitals');
  }

  philhealthEdit(e){
    this.philhealth_to_edit = e;
    this.toggleModal('philhealth');
  }

  surgery_to_delete: any;
  vaccine_to_edit: any;

  toggleModal(modal_name, data?){
    if(modal_name === 'fam-history' || modal_name === 'history') {
      // PAST AND FAMILY HISTORY
      if(!this.history_list){
        this.loadLibrary('libraries/medical-history', 'history_list', modal_name);
      } else {
        this.modals[modal_name] = !this.modals[modal_name];
      }

      if(modal_name === 'history' && this.modals['history'] === false) this.loadData('past_medical');
      if(modal_name === 'fam-history' && this.modals['fam-history'] === false) this.loadData('family_medical');
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
    } else if (modal_name === 'preghist') {
      //PREGNANCY HISTORY
      if(!this.delivery_method){
        this.loadLibrary('libraries/pregnancy-delivery-type','delivery_method','preghist')
      } else {
        this.modals[modal_name] = !this.modals[modal_name];
      }
      if(modal_name === 'preghist' && this.modals['preghist'] === false) this.loadData('pregnancy_history');
    } else {
      // OTHERS
      this.modals[modal_name.modal_name ?? modal_name] = !this.modals[modal_name.modal_name ?? modal_name];

      if (modal_name === 'vitals' && this.modals[modal_name] === false) {
        if(this.modals['vitals'] == false)  this.vitals_to_edit = null;
        this.loadData('vitals');
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

      if(modal_name ==='photo' && !this.modals['photo']) this.getImage(this.patient_info);
      // if(modal_name === 'preghist' && this.modals[modal_name] === false) this.loadData('pregnancy_history')
      if(modal_name === 'lifestyle' && this.modals['lifestyle'] === false) this.loadData('social_history');
      if (modal_name === 'lab-request' && this.modals[modal_name] === false) this.loadData('laboratory');
      if (modal_name === 'death' && this.modals[modal_name] === false) this.loadData('death');
    }
  }

  toggleAccordion(id){
    this.accordions[id] = !this.accordions[id];
  }

  //Libraries for modals
  history_list: any;
  fp_method: any;
  delivery_method: any;

  loadLibrary(url, var_name, modal_name){
    this.http.get(url).subscribe({
      next: (data: any) => {
        this[var_name] = data.data;
        this.modals[modal_name] = !this.modals[modal_name];
      },
      error: err => console.log(err)
    })
  }

  getInitials(string) {
    return [...string.matchAll(/\b\w/g)].join('')
  }

  getAge(){
    if(this.patient_info && this.patient_info.birthdate){
      let age_value = this.ageService.calcuateAge(this.patient_info.birthdate);
      this.patient_age = age_value;
      return age_value.age + ' ' + age_value.type+(age_value.age>1 ? 's old' : ' old' );
    }
  }

  selected_consult_id!: string;
  navigationEnd$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    tap(() => {
      this.setConsultId();
      this.getPatient();
    })
  );

  setConsultId(){
    const consult_id = this.http.getUrlParams().consult_id ?? null;
    this.selected_consult_id = consult_id;
  }
  user_facility: string;

  constructor(
    private router: Router,
    private http: HttpService,
    private ageService: AgeService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user_facility = this.http.getUserFacility();
    this.getPatient();
    this.setConsultId();
    this.navigationEnd$.subscribe();
  }
}
