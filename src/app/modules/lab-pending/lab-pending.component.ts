import { Component, OnInit } from '@angular/core';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faFlask, faFlaskVial, faPlus, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { NameHelperService } from 'app/shared/services/name-helper.service';
import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-lab-pending',
    templateUrl: './lab-pending.component.html',
    styleUrls: ['./lab-pending.component.scss'],
    standalone: false
})
export class LabPendingComponent implements OnInit {
  faFlaskVial = faFlaskVial;
  faTrashCan = faTrashCan;
  faEdit = faEdit;
  faXmark = faXmark;
  faFlask = faFlask;
  faPlus = faPlus;
  faSearch = faSearch;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  show_form: boolean = false;
  patient_details: any;
  pending_list: any[] = [];

  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;
  search_item: string;

  loadData(page?: number){
    let params = {params: { }};
    // if (this.search_item) params['params']['filter[search]'] = this.search_item;
    if (page) params['params']['page'] = page;
    params['params']['per_page'] = this.per_page;
    params['params']['include'] = 'laboratory';
    params['params']['sort'] = 'request_date';
    params['params']['list_type'] = 'pending';

    this.http.get('laboratory/consult-laboratories', params).subscribe({
      next: (data: any) => {
        this.pending_list = data.data

        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
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
  toggleModal(form, lab?, patient?){
    this.selected_lab = lab;

    if(this.selected_lab){
      if(form === 'add') {
        this.patient_details = patient;
        if(lab && lab.laboratory.code === 'CXRAY') {
          if(!this.lab_cxray_findings || !this.lab_cxray_observation) {
            this.loadCxrayLib(form);
          } else {
            this.modal[form] = !this.modal[form];
          }
        } else if(lab && lab.laboratory.code === 'BPSY') {
          if(!this.lab_biopsy_type) {
            this.loadBiopsyType(form);
          } else {
            this.modal[form] = !this.modal[form];
          }
        } else if (lab && lab.laboratory.code === 'USND') {
          if(!this.lab_findings){
            this.loadLibraries('libraries/laboratory-ultrasound-type','lab_ultrasound_type', form)
          } else {
            this.modal[form] = !this.modal[form];
          }
        } else if (lab && lab.laboratory.code === 'SYPH') {
          if(!this.lab_findings){
            this.loadSyphilisMethod(form)
          } else {
            this.modal[form] = !this.modal[form];
          }
        } else if (lab && lab.laboratory.code === 'HEMA') {
          if(!this.lab_findings){
            this.loadLibraries('libraries/blood-types', 'blood_types', form);
          } else {
            this.modal[form] = !this.modal[form];
          }
        } else if (lab && lab.laboratory.code === 'MRDT') {
          if(!this.lab_findings){
            this.loadLibraries('libraries/laboratory-malaria-parasite', 'lab_malaria_parasite', form);
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
        } else if(lab && lab.laboratory.code === 'SPTM') {
          if(!this.lab_sputum_collection && !this.lab_result_pn) {
            this.loadSputumCollection(form);
          } else {
            this.modal[form] = !this.modal[form];
          }
        } else if(lab && lab.laboratory.code === 'GXPT') {
          if(!this.lab_gene_mtb && !this.lab_gene_rif) {
            this.loadGeneMtb(form);
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
  lab_biopsy_type: any;
  lab_ultrasound_type: any;
  lab_syphilis_method: any;
  blood_types: any;
  lab_malaria_parasite: any;
  lab_gene_mtb: any;
  lab_gene_rif: any;

  loadGeneMtb(form) {
    this.http.get('libraries/laboratory-mtb-result').subscribe({
      next: (data: any) => {
        this.lab_gene_mtb = data.data;
        this.loadLibraries('libraries/laboratory-rif-result','lab_gene_rif', form)
      },
      error: err => console.log(err)
    })
  }

  loadSyphilisMethod(form) {
    this.http.get('libraries/laboratory-syphilis-method').subscribe({
      next: (data: any) => {
        this.lab_syphilis_method = data.data;
        this.loadLibraries('libraries/laboratory-results','lab_result_pn', form)
      },
      error: err => console.log(err)
    })
  }

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
        // console.log(data)
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

  loadBiopsyType(form) {
    this.http.get('libraries/laboratory-biopsy-type').subscribe({
      next: (data: any) => {
        console.log(data)
        this.lab_biopsy_type = data.data;
        this.modal[form] = !this.modal[form];
      },
      error: err => console.log(err)
    })
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
  ) { }



  getDataDiff(request_date): string {
    let endDate = new Date();
    let startDate = new Date(request_date);
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    // var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    // var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));

    let duration_day = days ? days + ' days': '';;
    // let duration_hours = hours ? hours + ' hours': '';
    // let duration_minutes = minutes ? minutes + ' minutes': '';
    return duration_day;//+' '+duration_hours+' '+duration_minutes;
  }

  user_facility: string;
  ngOnInit(): void {
    this.user_facility = this.http.getUserFacility();
    this.loadLabStatusLib();
    this.loadData();
  }

}
