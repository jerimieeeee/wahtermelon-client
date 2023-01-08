import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faEdit, faFlask, faFlaskVial, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
// import { PatientInfoComponent } from 'app/components/patient-info/patient-info.component';
import { HttpService } from 'app/shared/services/http.service';
import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { eventSubscriber } from './emmitter.interface';
@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit, OnDestroy {
  faFlaskVial = faFlaskVial;
  faTrash = faTrash;
  faEdit = faEdit;
  faXmark = faXmark;
  faFlask = faFlask;

  patient_details: any;
  pending_list: any;

  show_form: boolean = false;

  loadData(){
    console.log('loaded labs')
    let params = {
      patient_id: this.patient_details.id,
      sort: '-request_date',
      include: 'laboratory'
    }
    this.http.get('laboratory/consult-laboratories', {params}).subscribe({
      next: (data: any) => {
        this.pending_list = data.data
        this.getResults();
      },
      error: err => console.log(err)
    })
  }

  getResults(){
    Object.entries(this.pending_list).forEach(([key, value], index) => {
      let val: any = value;
      let url = this.http.getURL(val.laboratory.code)
      if(url !== '') {
        this.http.get(url, {params: {request_id: val.id}}).subscribe({
          next: (data: any) => {
            this.pending_list[key]['result'] = data.data[0];
          },
          error: err => console.log(err)
        })
      }

      if(Object.keys(this.pending_list).length - 1 === index) {
        this.show_form = true;
      }
    })
  }

  reloadLabs(data){
    console.log(data)
    this.show_form = false;
    this.pending_list = data;
    this.getResults();
  }

  modal = [];
  selected_lab: any;

  toggleModal(form, lab?){
    this.selected_lab = lab;

    if(this.selected_lab){
      if(lab && lab.laboratory.code === 'CXRAY') {
        if(!this.lab_cxray_findings || !this.lab_cxray_observation) {
          this.loadCxrayLib(form);
        } else {
          this.modal[form] = !this.modal[form];
        }
      } else if(lab && lab.laboratory.code === 'ECG') {
        if(!this.lab_findings){
          this.loadLibraries('libraries/laboratory-findings','lab_findings', form)
        } else {
          this.modal[form] = !this.modal[form];
        }
      } else if(lab && lab.laboratory.code === 'SPTM') {
        if(!this.lab_sputum_collection && !this.lab_result_pn) {
          this.loadSputumCollection(form);
        } else {
          this.modal[form] = !this.modal[form];
        }
      }else {
        this.modal[form] = !this.modal[form];
      }

      if(this.modal[form] === false) {
        // this.selected_lab = null;
        this.getResults();
      }
    } else {
      this.modal[form] = false;
      this.getResults();
    }
  }

  lab_statuses: any;
  lab_findings: any;
  lab_cxray_findings: any;
  lab_cxray_observation: any;
  lab_sputum_collection: any;
  lab_result_pn: any;

  loadSputumCollection(form){
    this.http.get('libraries/laboratory-sputum-collection').subscribe({
      next: (data: any) => {
        this.lab_sputum_collection = data.data;
        // this.loadLibraries('libraries/laboratory-results','lab_result_pn', form)
        this.loadLibraries('libraries/laboratory-findings','lab_findings', form)
      },
      error: err => console.log(err)
    });
  }

  loadLabStatusLib(){
    this.http.get('libraries/laboratory-statuses').subscribe({
      next: (data: any) => this.lab_statuses = data.data,
      error: err => console.log(err)
    });
  }

  loadCxrayLib(form){
    this.http.get('libraries/laboratory-chestxray-findings').subscribe({
      next: (data: any) => {
        this.lab_cxray_findings = data.data;
        this.loadCxrayObs(form);
      },
      error: err => console.log(err)
    });
  }

  loadCxrayObs(form){
    this.http.get('libraries/laboratory-chestxray-observations').subscribe({
      next: (data: any) => {
        this.lab_cxray_observation = data.data;
        this.modal[form] = !this.modal[form];
      },
      error: err => console.log(err)
    });
  }

  loadLibraries(url, var_name, form){
    this.http.get(url).subscribe({
      next: (data: any) => {
        this[var_name] = data.data;
        this.modal[form] = !this.modal[form];
      },
      error: err => console.log(err)
    });
  }

  constructor(
    private http: HttpService,
    private patientInfo: PatientInfoComponent
  ) {
    this.loadData = this.loadData.bind(this);
    eventSubscriber(patientInfo.reloadLabs, this.loadData)
  }

  ngOnInit(): void {
    this.loadLabStatusLib();
    this.patient_details = this.http.getPatientInfo();
    this.loadData();
  }

  ngOnDestroy(): void {
    eventSubscriber(this.patientInfo.reloadNCDVitals, this.loadData, true);
  }
}
