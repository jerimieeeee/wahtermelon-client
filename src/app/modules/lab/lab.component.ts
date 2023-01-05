import { Component, OnInit, ViewChild } from '@angular/core';
import { faEdit, faFlask, faFlaskVial, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { PatientInfoComponent } from 'app/components/patient-info/patient-info.component';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {
  @ViewChild(PatientInfoComponent) patient_info: PatientInfoComponent;
  faFlaskVial = faFlaskVial;
  faTrash = faTrash;
  faEdit = faEdit;
  faXmark = faXmark;
  faFlask = faFlask;

  patient_details: any;
  pending_list: any;

  show_form: boolean = false;

  loadData(){
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

    this.patient_info.loadData('laboratory');
  }

  getResults(){
    Object.entries(this.pending_list).forEach(([key, value], index) => {
      let val: any = value;
      let url = this.getURL(val.laboratory.code)
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

  getURL(lab_code): string{
    switch (lab_code) {
      case 'CBC':
        return 'laboratory/consult-laboratory-cbc'
      case 'CRTN':
        return 'laboratory/consult-laboratory-creatinine'
      case 'CXRAY':
        return 'laboratory/consult-laboratory-chestxray'
      case 'ECG':
        return 'laboratory/consult-laboratory-ecg'
      case 'FBS':
        return 'laboratory/consult-laboratory-fbs'
      case 'RBS':
        return 'laboratory/consult-laboratory-rbs'
      case 'HBA':
        return 'laboratory/consult-laboratory-hba1c'
      case 'PSMR':
        return 'laboratory/consult-laboratory-papsmear'
      case 'PPD':
        return 'laboratory/consult-laboratory-ppd'
      case 'SPTM':
        return 'laboratory/consult-laboratory-sputum'
      default:
        break;
    }
    return '';
  }

  patientInfo(info){
    this.patient_details = info;
    // this.loadData();
  }
  modal = [];
  selected_lab: any;

  toggleModal(form, lab?){
    this.selected_lab = lab;
    this.modal[form] = !this.modal[form];
    if(this.modal[form] === false) {
      this.selected_lab = null;
      this.getResults();
    }
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
  }

}
