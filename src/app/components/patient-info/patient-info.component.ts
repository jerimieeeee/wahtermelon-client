import { animate, style, transition, trigger } from '@angular/animations';
import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFlask, faHeart, faExclamationCircle, faNotesMedical, faPlusCircle, faQuestionCircle, faPenToSquare, faTrash, faTableList, faPenSquare, faChevronRight, faChevronUp, faChevronDown, fas, faClipboardUser } from '@fortawesome/free-solid-svg-icons';
import { AgeService } from 'app/shared/services/age.service';
import { HttpService } from 'app/shared/services/http.service';
import { VitalsChartsService } from 'app/shared/services/vitals-charts.service';

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
export class PatientInfoComponent implements OnInit{
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

  show_form: boolean = false;
  show_philhealth: boolean = false;
  show_vitals: boolean = false;
  show_vaccines: boolean = false;
  lab_request: boolean = false;

  vaccines_given: any;
  vaccine_list: any = [];
  vaccine_to_edit: any;
  patient_age: any;
  latest_vitals: any;
  philhealth_info: any;
  patient_vitals: any;
  vitals_to_edit: any;
  philhealth_to_edit: any;
  immunization_status: any;

  accordions = [];
  modals = [];

  consult_id: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private http: HttpService,
    private ageService: AgeService,
    private vitalsCharts: VitalsChartsService
  ) {
    this.activeRoute.params.subscribe(params => {
      this.getPatient(params.id);
    });
  }

  navigateTo(loc){
    this.router.navigate(['/'+loc, {id: this.patient_info.id}])
  }

  editPatient(id){
    if(id) this.router.navigate(['/edit-patient', {id: id}]);
  }

  getAge(){
    let age_value = this.ageService.calcuateAge(this.patient_info.birthdate);
    this.patient_age = age_value;
    return age_value.age + ' ' + age_value.type+(age_value.age>1 ? 's old' : ' old' );
  }

  getPatient(id){
    this.http.get('patient/'+id).subscribe({
      next: (data: any) => {
        this.show_form = true;
        this.patient_info = data.data;
        this.patientInfo.emit(data.data);
        this.loadPhilhealth();
        this.loadVitals();
        this.loadVaccines();
        this.loadLabs()
        this.accordions['vitals'] = true
        this.accordions['lab_request'] = true
        // this.toggleModal('philhealth-modal');//open sample modal
        // console.log(data.data)
      },
      error: err => {
        // feature: add prompt that patient is not found. for now redirect to home
        this.router.navigate(['/home'])
        //  console.log(err)
      }
    });
  }

  pending_labs: any;

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
      this.vaccine_list[key]['dose'] = new_vax[val.vaccines.vaccine_id][val.id].dose;
    })

    this.vaccines_given = new_vax;
    this.show_vaccines = true;
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

  toggleActionModal(modal_name, vaccine){
    this.vaccine_to_edit = vaccine;
    this.modals['vaccine-action'] = !this.modals['vaccine-action'];
    if(this.modals['vaccine-action'] == false) this.loadVaccines();
  }

  get philhealthColor(){
    if(this.philhealth_info){
      return (formatDate(this.philhealth_info.enlistment_date, 'yyyy', 'en') < formatDate(new Date(), 'yyyy', 'en'))
    } else {
      return false;
    }
  }

  loadPhilhealth(){
    this.http.get('patient-philhealth/philhealth', {params:{'filter[patient_id]': this.patient_info.id,  per_page: '1', sort: '-enlistment_date'}}).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.philhealth_info = data.data[0];
        this.show_philhealth = true;
      },
      error: err => console.log(err)
    })
  }

  loadVaccines(){
    this.http.get('patient-vaccines/vaccines-records', {params:{'patient_id': this.patient_info.id, 'sort': '-vaccine_date' }}).subscribe({
      next: (data: any) => {
        this.vaccine_list = data.data;
        this.immunization_status = data.status;

        this.checkVaccineStatus(this.vaccine_list);
      },
      error: err => {console.log(err)},
    })
  }

  loadVitals(){
    this.http.get('patient-vitals/vitals', {params:{patient_id: this.patient_info.id, sort: '-vitals_date', per_page: 15}}).subscribe({
      next: (data: any) => {
        // console.log(data.data)
        this.patientVitals.emit(data.data);
        if(data.data.length > 0) {
          this.latest_vitals = this.vitalsCharts.getLatestToday(data.data)
        } else {
          this.latest_vitals = null;
        }
        this.show_vitals = true;
      },
      error: err => console.log(err),
    })
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

  toggleModal(modal_name){
    this.modals[modal_name] = !this.modals[modal_name];

    if (modal_name === 'vitals' && this.modals[modal_name] === false) {
      if(this.modals['vitals'] == false)  this.vitals_to_edit = null;
      this.loadVitals();
    }

    if (modal_name === 'philhealth' && this.modals[modal_name] === false) {
      if(this.modals['philhealth'] == false)  this.philhealth_to_edit = null;
      this.loadPhilhealth();
    }

    if (modal_name === 'vaccine' && this.modals[modal_name] === false) this.loadVaccines();
    if (modal_name === 'vaccine-action' && this.modals[modal_name] === false) this.loadVaccines();
  }

  ngOnInit(): void {
    this.consult_id = this.activeRoute.snapshot.paramMap.get('consult_id');
  }
}
