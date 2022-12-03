import { Component, OnInit, Output } from '@angular/core';
import { faPenToSquare, faPersonWalking, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PatientInfoComponent } from 'app/components/patient-info/patient-info.component';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-maternalcare',
  templateUrl: './maternalcare.component.html',
  styleUrls: ['./maternalcare.component.scss']
})
export class MaternalcareComponent implements OnInit {

  faPersonWalking = faPersonWalking;
  faPenToSquare = faPenToSquare;
  faSpinner = faSpinner;

  patient_details: any;
  public mcr_data: any;
  public patient_mc_record: any = '';
  public patient_mc_list: any;
  public view_id: any;
  prenatal: boolean;
  services: boolean;
  post_value: boolean;
  loading: boolean;

  modalStats: any;

  constructor(private http: HttpService) { }

  module: number;

  libraries = [
    { var_name: 'risk_factors', location: 'mc-risk-factors' },
    { var_name: 'fetals', location: 'mc-presentations' },
    { var_name: 'fhr_lib', location: 'mc-locations' },
    { var_name: 'delivery_location', location: 'mc-delivery-locations' },
    { var_name: 'regions', location: 'regions?include=provinces' },
    { var_name: 'attendants', location: 'mc-attendants' },
    { var_name: 'preg_outcome', location: 'mc-outcomes' },
    { var_name: 'lib_services', location: 'mc-services' },
    { var_name: 'visit_type', location: 'mc-visit-type' },
  ]

  ngOnInit(): void {
    this.module = 1;
    this.post_value = false;
    this.loading = false
    this.loadLibraries();

  }

  switchTab(tab) {
    this.module = 0;
    this.module = tab;
    if (this.module == 1) {
      this.patient_mc_record = '';
    }
    console.log(this.module);
  }

  postValue(post_data) {
    if (post_data) {
      this.post_value = true;
    }
  }

  openNew() {
    this.switchTab(2);
    // this.patient_mc_record = this.patient_mc_record[0]
  }


  patientInfo(info) {
    this.patient_details = info;
    this.mcrID('all', this.patient_details.id);
  }

  mcrID(type: any, id: any) {
    if (id) {
      let params = {
        type: type,
        patient_id: id
      }

      this.http.get('maternal-care/mc-records', { params }).subscribe({
        next: (data: any) => {
          console.log(data.data);
          if (data.data.length > 0) {
            this.patient_mc_list = data.data;

            if (!this.patient_mc_list[0].post_registration || !this.patient_mc_list[0].post_registration.end_pregnancy) {
              this.openMCR(this.patient_mc_list[0].id);    
              console.log(!this.patient_mc_list[0].pre_registration, !this.patient_mc_list[0].post_registration.end_pregnancy);
                  
            }
          }
        },
        error: err => console.log(err),
      });
    }
  }

  openMCR(id: any) {
    this.loading = true;
    this.view_id = id;
    console.log(id);
    if (id) {
      this.http.get('maternal-care/mc-records/' + id).subscribe({
        next: (data: any) => {
          console.log(data, " openMCR");
          this.patient_mc_record = data.data;
          if (this.patient_mc_record.pre_registration != null) {

            this.prenatal = true;
            // this.services = true;
            // if (this.patient_mc_record.post_registration && this.patient_mc_record.post_registration.length != 0) {
            //   this.post_value = true;
            // }
            // if (this.patient_mc_record.pre_registration.length == null && this.patient_mc_record.post_registration != null) {
            //   this.module = 4;
            // } else {
            //   this.module = 2;
            // }
          }
        },
        error: err => console.log(err),
        complete: () => {
          this.loading = false;

          if (!this.patient_mc_record.pre_registration && !this.patient_mc_record.post_registration.end_pregnancy) {
            this.module = 4;        
          }else{
            this.module = 2;
          }
        }
      });
    }
  }

  loadLibraries() {
    this.libraries.forEach(obj => {
      this.http.get('libraries/' + obj.location).subscribe({
        next: (data: any) => {
          this[obj.var_name] = data.data;

        },
        error: err => console.log(err),
      })
    });
    console.log(this['risk_factors']);
  }

  showPreServ(id: any) {
    if (id != '') {
      this.openMCR(id);
    }

    this.prenatal = true;
  }

  openModal(modal) {
    console.log("Opening modal via emit mcr with ", this.modalStats);

    this.modalStats = modal;
  }

  updatePrenatal(info) {
    this.patient_mc_record.prenatal_visit = info;
  }

  updatePost(info) {
    this.patient_mc_record.post_registration = info;
  }


}
