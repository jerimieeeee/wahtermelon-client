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
  program_code: string = 'mc';
  program_creds: object;

  getCreds(){
    let params = {
      'filter[program_code]': this.program_code
    }

    this.http.get('settings/philhealth-credentials').subscribe({
      next:(data:any) => {
        console.log(data)
        this.program_creds = data.data[0];
        // this.getPbef();
      },
      error: err => console.log(err)
    })
  }

  createXml() {

  }

  getCaserate() {
    let params = {
      program_id: this.program_id,
      program_desc: this.program_name
    };

    this.http.get('eclaims/eclaims-caserate', {params}).subscribe({
      next:(data:any) => {
        this.caserate_list = data.data;
        console.log(this.caserate_list);
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

  patient:any;
  patient_philhealth:any;
  ngOnInit(): void {
    console.log(this.selected_case);
    this.patient = this.http.getPatientInfo();
    this.patient_philhealth = this.patient.philhealthLatest;

    if(this.patient_philhealth) {
      this.getCaserate();
    }
  }

}
