import { Component, OnInit, Output } from '@angular/core';
import { faPersonWalking } from '@fortawesome/free-solid-svg-icons';
import { PatientInfoComponent } from 'app/components/patient-info/patient-info.component';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-maternalcare',
  templateUrl: './maternalcare.component.html',
  styleUrls: ['./maternalcare.component.scss']
})
export class MaternalcareComponent implements OnInit {

  faPersonWalking = faPersonWalking;
  patient_details: any;
  public mcr_data: any;
  patient_mc_record: any;
  prenatal: boolean;
  services: boolean;
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

    this.loadLibraries();

  }

  switchTab(tab) {
    this.module = 0;
    this.module = tab;
    console.log(this.module);
  }
  post_value: boolean;
  postValue(post_data) {

    if (post_data) {
      this.post_value = true;
    }
  }

  showPreServ(id: any){
    if(id){
      this.prenatal = true;
      this.services = true;
    }
  }
  mcrID(type: any, id: any) {

    if (id) {

      this.http.get('maternal-care/mc-records?type=' + type + '&patient_id=' + id).subscribe({
        next: (data: any) => {
          this.patient_mc_record = data.data;
          console.log(this.patient_mc_record, " patient_mc_record");
          if (this.patient_mc_record.length != 0) {
            // if (this.patient_mc_record[0].pre_registration) {
              this.prenatal = true;
              this.services = true;
              if(this.patient_mc_record[0].post_registration && this.patient_mc_record[0].post_registration.length != 0){
                this.post_value = true;
              }
            // }
          }
          // this.module = 2;
        },
        error: err => console.log(err),
      });
      // this.patient_mc_record = patient_mc_record
    }
  }
  loadLibraries() {
    this.libraries.forEach(obj => {
      this.http.get('libraries/' + obj.location).subscribe({
        next: (data: any) => this[obj.var_name] = data.data,
        error: err => console.log(err),
      })
    });
  }
  openModal(modal){
    console.log("Opening modal via emit mcr with ", this.modalStats);
    
    this.modalStats = modal;
  }

  patientInfo(info) {
    this.patient_details = info;
    this.mcrID('all', this.patient_details.id);

    // console.log(this.patient_details, " pantient info");
  }
}
