import { Component, Input, OnInit } from '@angular/core';
import { faCircleNotch, faRotate, faUpload } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

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
  faCircleNotch = faCircleNotch;

  pending_list: any = [];
  modal: any = [];

  caserate_list: any;
  patient:any;
  patient_philhealth:any;
  eclaims_list: any;
  program_creds:any;

  selected_pHospitalTransmittalNo: string;
  selected_caserate_code: string;

  is_refreshing: boolean = false;
  show_form:boolean = false;
  show_cf2: boolean = false;


  getEclaimsList() {
    this.show_form = false;

    let params = {
      patient_id: this.patient.id,
      program_desc: this.program_name
    };

    this.http.get('eclaims/eclaims-upload', {params}).subscribe({
      next:(data:any) => {
        // console.log(data);
        this.eclaims_list = data.data;

        if(Object.keys(this.eclaims_list).length > 0) {
          let eclaims_id_arr = [];
          Object.entries(this.eclaims_list).forEach(([key,value]:any, index) => {
            eclaims_id_arr.push(value.caserate.id);
          });

          this.getCaserate(eclaims_id_arr);
        } else {
          this.getCaserate()
        }
      },
      error: err => console.log(err)
    })
  }

  getCaserate(eclaims_id_arr?) {
    console.log(eclaims_id_arr)
    let params = {
      program_id: this.program_id,
      program_desc: this.program_name
    };

    params['eclaims_id_arr'] = eclaims_id_arr ? eclaims_id_arr.join(',') : null;

    this.http.get('eclaims/eclaims-caserate', {params}).subscribe({
      next:(data:any) => {
        this.caserate_list = data.data;

        this.show_cf2 = Object.keys(this.caserate_list).length > 0 ? true:false;
        this.show_form = true;
      },
      error: err => console.log(err)
    });
  }

  refreshClaims(){
    this.is_refreshing = true;
  }

  checkSeries(data){
    console.log(data)
    this.is_refreshing = true;

    let params = {
      pReceiptTicketNumber: data.pReceiptTicketNumber,
      program_code: this.program_name !== 'cc' ? this.program_name : 'mc'
    }

    this.http.post('eclaims/get-claims-map', params).subscribe({
      next: (resp: any) => {
        console.log(resp);
        data.pClaimSeriesLhio = resp.MAPPING.pClaimSeriesLhio;
        data.pStatus = 'IN PROCESS';

        this.updateUploadClaim(data);
      },
      error: err => {
        console.log(err);
        this.is_refreshing = false;
        this.toastr.error(err.error.message, 'Series LHIO', {
          closeButton: true,
          positionClass: 'toast-top-center',
          disableTimeOut: true
        });
      }
    })
  }

  getClaimStatus(data) {
    this.is_refreshing = true;

    let params = {
      series_lhio: data.pClaimSeriesLhio,
      program_code: this.program_name !== 'cc' ? this.program_name : 'mc'
    }

    this.http.post('eclaims/get-claim-status', params).subscribe({
      next:(resp: any) => {
        console.log(resp)
        this.is_refreshing = false;
        this.toastr.info('As of: '+resp.pAsOf+ ' '+resp.pAsOfTime, resp.CLAIM.pStatus, {
          closeButton: true,
          positionClass: 'toast-top-center',
          disableTimeOut: true
        });
        data.pStatus = resp.CLAIM.pStatus;
        this.updateUploadClaim(data);
      },
      error: err => {
        console.log(err);
        this.is_refreshing = false;
        this.toastr.error(err.error.message, 'Claims Status', {
          closeButton: true,
          positionClass: 'toast-top-center',
          disableTimeOut: true
        });
      }
    })
  }

  updateUploadClaim(data) {
    console.log(data);
    this.http.post('eclaims/eclaims-upload', data).subscribe({
      next:(data:any) => {
        console.log(data)
        this.is_refreshing = false;
      },
      error: err => {
        console.log(err)
      }
    })
  }

  getCreds(){
    // let params = { 'filter[program_code]': this.program_name };
    let params = { 'filter[program_code]': this.program_name  !== 'cc' ? this.program_name : 'mc' };
    this.http.get('settings/philhealth-credentials', {params}).subscribe({
      next:(data:any) => {
        console.log(data)
        if(data.data[0]) {
          this.program_creds = data.data[0];
        }
        this.getEclaimsList();
      },
      error: err => console.log(err)
    })
  }

  toggleModal(name, eclaims?) {
    this.selected_pHospitalTransmittalNo = eclaims?.pHospitalTransmittalNo ?? null;
    this.selected_caserate_code = eclaims?.caserate.caserate_code ?? null;
    this.modal[name] = !this.modal[name];

    if(name==='cf2' && !this.modal['cf2']) this.getEclaimsList();
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.patient = this.http.getPatientInfo();
    this.patient_philhealth = this.patient.philhealthLatest;

    if(this.patient_philhealth) {
      this.getCreds();
    }
  }

}
