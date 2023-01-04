import { animate, style, transition, trigger } from '@angular/animations';
import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFlask, faHeart, faExclamationCircle, faNotesMedical, faPlusCircle, faQuestionCircle, faPenToSquare, faTrash, faTableList, faPenSquare, faChevronRight, faChevronUp, faChevronDown, fas, faClipboardUser, faCamera } from '@fortawesome/free-solid-svg-icons';
import { AgeService } from 'app/shared/services/age.service';
import { HttpService } from 'app/shared/services/http.service';
import { VitalsChartsService } from 'app/shared/services/vitals-charts.service';
import { FamilyMedicalComponent } from './components/family-medical/family-medical.component';
import { PastMedicalComponent } from './components/past-medical/past-medical.component';
import { PhilhealthComponent } from './components/philhealth/philhealth.component';
import { VaccineComponent } from './components/vaccine/vaccine.component';

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

  @Output() patientInfo = new EventEmitter<any>();
  @Output() patientVitals = new EventEmitter<any>();
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
  show_vaccines: boolean = false;
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
        this.loadLabs();

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
  }

  loadLabs(){
    this.lab_request = true;
    let params = {
      patient_id: this.patient_info.id
    }

    /* this.http.get('lab_url', {params}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.pending_labs = data.data
      },
      error: err => console.log(err)
    }) */
  }

  /* toggleActionModal(modal_name, vaccine){
    this.vaccine_to_edit = vaccine;
    this.modals['vaccine-action'] = !this.modals['vaccine-action'];
    if(this.modals['vaccine-action'] == false) this.loadVaccines();
  } */





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

  vaccine_to_edit;

  toggleModal(modal_name, data?){
    // if(modal_name === 'vaccine')
    console.log(modal_name)
    this.modals[modal_name.modal_name ?? modal_name] = !this.modals[modal_name.modal_name ?? modal_name];
    console.log(this.modals)

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

    // if (modal_name === 'vaccine-action' && this.modals[modal_name] === false) this.loadData('vaccines');
  }

  ngOnInit(): void {
    this.consult_id = this.activeRoute.snapshot.paramMap.get('consult_id');
    this.getPatient(this.activeRoute.snapshot.paramMap.get('id'));
  }
}
