import { Component, OnDestroy, OnInit } from '@angular/core';
import { faEdit, faFlask, faFlaskVial, faXmark, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
// import { PatientInfoComponent } from 'app/components/patient-info/patient-info.component';
import { HttpService } from 'app/shared/services/http.service';
import { NameHelperService } from 'app/shared/services/name-helper.service';
import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { eventSubscriber } from './emmitter.interface';
@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit, OnDestroy {
  faFlaskVial = faFlaskVial;
  faTrashCan = faTrashCan;
  faEdit = faEdit;
  faXmark = faXmark;
  faFlask = faFlask;
  faPlus = faPlus;

  patient_details: any;
  pending_list: any;

  show_form: boolean = false;

  loadData(){
    // console.log('loaded labs')
    let params = {
      patient_id: this.patient_details.id,
      sort: '-request_date',
      include: 'laboratory'
    }
    this.http.get('laboratory/consult-laboratories', {params}).subscribe({
      next: (data: any) => {
        this.pending_list = data.data
        // console.log(this.pending_list);
        this.show_form = true;
      },
      error: err => console.log(err)
    })
  }

  reloadLabs(data){
    this.show_form = false;
    this.pending_list = data;
    this.loadData();
  }

  modal = [];
  selected_lab: any;

  cancelModal(form) {
    this.modal[form] = !this.modal[form];
  }

  forms_with_finding_pn = ['FOBT', 'PPD'];

  delete_id: string;
  delete_desc: string = 'Laboratory';
  url: string = 'laboratory/consult-laboratories/'
  toggleModal(form, lab?){
    this.selected_lab = lab;

    if(this.selected_lab){
      if(form === 'add') {
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
        } else if(lab && lab.laboratory.code === 'FCAL') {
          if(!this.lab_stool_blood && !this.lab_stool_color && !this.lab_stool_consistency) {
            this.loadStoolBlood(form);
          } else {
            this.modal[form] = !this.modal[form];
          }
        } else if(lab && this.forms_with_finding_pn.includes(lab.laboratory.code)) {
          if(!this.lab_result_pn) {
            this.loadLibraries('libraries/laboratory-results','lab_result_pn', form)
          } else {
            this.modal[form] = !this.modal[form];
          }
        } else {
          this.modal[form] = !this.modal[form];
        }
      } else {
        this.delete_id =  lab.id;
        this.modal[form] = !this.modal[form];
      }

      if(this.modal[form] === false) {
        this.loadData();
      }
    } else {
      this.modal[form] = !this.modal[form];
      this.loadData();
    }
  }

  lab_statuses: any;
  lab_findings: any;
  lab_cxray_findings: any;
  lab_cxray_observation: any;
  lab_sputum_collection: any;
  lab_result_pn: any;

  lab_stool_blood: any;
  lab_stool_color: any;
  lab_stool_consistency: any;

  loadSputumCollection(form){
    this.http.get('libraries/laboratory-sputum-collection').subscribe({
      next: (data: any) => {
        this.lab_sputum_collection = data.data;
        this.loadLibraries('libraries/laboratory-findings','lab_findings', form)
      },
      error: err => console.log(err)
    });
  }

  loadStoolBlood(form){
    this.http.get('libraries/laboratory-blood-stool').subscribe({
      next: (data: any) => {
        console.log(data)
        this.lab_stool_blood = data.data;
        this.loadStoolColor(form);
      }
    })
  }

  loadStoolColor(form){
    this.http.get('libraries/laboratory-stool-color').subscribe({
      next: (data: any) => {
        this.lab_stool_color = data.data
        this.loadStoolConsistency(form)
      }
    })
  }

  loadStoolConsistency(form){
    this.http.get('libraries/laboratory-stool-consistency').subscribe({
      next: (data: any) => {
        this.lab_stool_consistency = data.data
        this.modal[form] = !this.modal[form];
      }
    })
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
    private patientInfo: PatientInfoComponent,
    private nameHelper: NameHelperService
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
