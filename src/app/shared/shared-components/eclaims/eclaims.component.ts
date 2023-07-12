import { Component, Input, OnInit } from '@angular/core';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
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
      },
      error: err => console.log(err)
    })
  }

  getCaserate() {
    let params = {
      program_code: this.program_id,
      program_desc: this.program_name
    };

    this.http.get('eclaims/eclaims-caserate', {params}).subscribe({
      next:(data:any) => {
        this.caserate_list = data.data;
      },
      error: err => console.log(err)
    });

    this.getEclaimsList();
  }

  refreshClaims(){
    this.is_refreshing = true;
  }

  toggleModal(name) {
    this.modal[name] = !this.modal[name];
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.patient = this.http.getPatientInfo();
    this.patient_philhealth = this.patient.philhealthLatest;

    if(this.patient_philhealth) {
      this.getCaserate();
    }
  }

}
