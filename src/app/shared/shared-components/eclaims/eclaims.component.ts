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

  getCaserate() {
    let params = {
      program_id: this.program_id,
      program_desc: this.program_name
    };

    this.http.get('eclaims/eclaims-caserate', {params}).subscribe({
      next:(data:any) => {
        this.caserate_list = data.data;
      },
      error: err => console.log(err)
    })
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

  paramsTb(){

  }

  paramsCc(){

  }

  ngOnInit(): void {
    this.patient = this.http.getPatientInfo();
    this.patient_philhealth = this.patient.philhealthLatest;

    if(this.patient_philhealth) {
      this.getCaserate();
    }
  }

}
