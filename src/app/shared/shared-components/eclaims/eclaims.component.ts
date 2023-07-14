import { Component, Input, OnInit } from '@angular/core';
import { faRotate, faUpload } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-eclaims',
  templateUrl: './eclaims.component.html',
  styleUrls: ['./eclaims.component.scss']
})
export class EclaimsComponent implements OnInit {
  @Input() program_id;
  @Input() program_name;
  @Input() selected_case;

  faRotate = faRotate;
  faUpload = faUpload;
  pending_list: any = [];
  modal: any = [];

  caserate_list: any;
  is_refreshing: boolean = false;
  patient:any;
  patient_philhealth:any;
  eclaims_list: any;

  getEclaimsList() {
    let params = {
      patient_id: this.patient.id,
      program_code: this.program_name
    };

    this.http.get('eclaims/eclaims-upload', {params}).subscribe({
      next:(data:any) => {
        console.log(data);
        this.eclaims_list = data.data;

        if(Object.keys(this.eclaims_list).length > 0) {
          let eclaims_id_arr = [];
          Object.entries(this.eclaims_list).forEach(([key,value]:any, index) => {
            // console.log(value)
            eclaims_id_arr.push(value.caserate.id);
          });

          // if(eclaims_id_arr.length>0) {
            this.getCaserate(eclaims_id_arr)
          // }
        } else {
          this.getCaserate()
        }
      },
      error: err => console.log(err)
    })
  }

  show_cf2: boolean = false;

  getCaserate(eclaims_id_arr?) {
    let params = {
      program_code: this.program_id,
      program_desc: this.program_name
    };

    params['eclaims_id_arr'] = eclaims_id_arr.join(',') ?? null;

    this.http.get('eclaims/eclaims-caserate', {params}).subscribe({
      next:(data:any) => {
        this.caserate_list = data.data;

        this.show_cf2 = Object.keys(this.caserate_list).length > 0 ? true:false;
      },
      error: err => console.log(err)
    });
  }

  refreshClaims(){
    this.is_refreshing = true;
  }

  selected_pHospitalTransmittalNo: string;
  selected_caserate_code: string;
  toggleModal(name, eclaims?) {
    this.selected_pHospitalTransmittalNo = eclaims?.pHospitalTransmittalNo ?? null;
    this.selected_caserate_code = eclaims?.caserate.caserate_code ?? null;
    this.modal[name] = !this.modal[name];
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.patient = this.http.getPatientInfo();
    this.patient_philhealth = this.patient.philhealthLatest;

    if(this.patient_philhealth) {
      this.getEclaimsList();
    }
  }

}
