import { Component, Input, OnInit } from '@angular/core';
import { faCircleNotch, faClipboardQuestion, faPenToSquare, faReceipt, faRotate, faUpload } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-eclaims',
    templateUrl: './eclaims.component.html',
    styleUrls: ['./eclaims.component.scss'],
    standalone: false
})
export class EclaimsComponent implements OnInit {
  @Input() program_id;
  @Input() program_name;
  @Input() selected_case;

  faRotate = faRotate;
  faUpload = faUpload;
  faCircleNotch = faCircleNotch;
  faReceipt = faReceipt;
  faClipboardQuestion = faClipboardQuestion;
  faPenToSquare = faPenToSquare;

  pending_list: any = [];
  modal: any = [];

  caserate_list: any;
  patient:any;
  patient_philhealth:any;
  eclaims_list: any = [];
  program_creds:any;

  selected_pHospitalTransmittalNo: string;
  selected_caserate_code: string;
  selected_ticket_number: string;

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
    let params = {
      program_id: this.program_id,
      program_desc: this.program_name
    };

    params['eclaims_id_arr'] = eclaims_id_arr ? eclaims_id_arr.join(',') : null;

    this.http.get('eclaims/eclaims-caserate', {params}).subscribe({
      next:(data:any) => {
        this.caserate_list = data.data;
        console.log(this.caserate_list)
        this.show_cf2 = Object.keys(this.caserate_list).length > 0 ? true : false;
        this.show_form = true;
      },
      error: err => console.log(err)
    });
  }

  refreshClaims(){
    this.is_refreshing = true;
  }

  checkSeries(data){
    this.is_refreshing = true;

    let params = {
      receiptTicketNumber: data.pReceiptTicketNumber,
      program_code: this.program_name === 'cc' || this.program_name === 'fp' ? 'mc' :  this.program_name
    }

    this.http.post('eclaims/get-claims-map', params).subscribe({
      next: (resp: any) => {
        console.log(resp)
        if(resp.success === false) {
          this.toastr.error('No query result', 'Series LHIO');
          this.is_refreshing = false;
        } else {
          data.pClaimSeriesLhio = resp.mapping[0].pclaimSeriesLhio;
          data.pStatus = 'IN PROCESS';

          this.updateUploadClaim(data);
        }
      },
      error: err => {
        this.is_refreshing = false;
        this.toastr.error(err.error.message, 'Series LHIO', {
          closeButton: true,
          positionClass: 'toast-top-center',
          disableTimeOut: true
        });
      }
    })
  }

  getClaimStatus(data, type) {
    this.is_refreshing = true;

    let params = {
      series_lhio: data.pClaimSeriesLhio,
      program_code: this.program_name === 'cc' || this.program_name === 'fp' ? 'mc' :  this.program_name
    }

    this.http.post('eclaims/get-claim-status', params).subscribe({
      next:(resp: any) => {
        console.log(resp)
        this.iterateMessage(resp, data, resp.CLAIM['@attributes'].pStatus);
      },
      error: err => {
        console.log(err)
        this.is_refreshing = false;
        this.http.showError(err.error.message, 'eClaims Error');
      }
    })
  }

  getClaimsMaps(data, type) {

  }

  iterateMessage(resp, data, type) {
    data.pStatus = resp.CLAIM['@attributes'].pStatus;
    let message: string;

    switch(type) {
      case 'DENIED': {
        data.denied_reason = resp.CLAIM.DENIED.REASON['@attributes'].pReason;
        message = 'As of: '+resp['@attributes'].pAsOf+ ' '+resp['@attributes'].pAsOfTime+ '<br />'+resp.CLAIM.DENIED.REASON['@attributes'].pReason;
        break;
      }
      case 'WITH CHEQUE': {
        message = 'As of: '+resp['@attributes'].pAsOf+ ' '+resp['@attributes'].pAsOfTime;

        /* Object.entries(resp.CLAIM.PAYMENT.PAYEE).forEach(([key, value]:any, index) => {
          message = 'As of: '+resp['@attributes'].pAsOf+ ' '+resp['@attributes'].pAsOfTime;
          message += '<br />Voucher No: '+value['@attributes'].pVoucherNo;
          message += '<br />Check Amount: '+value['@attributes'].pCheckAmount;
        }); */
        Object.entries(resp.CLAIM.PAYMENT.PAYEE).forEach(([key, value]:any, index) => {
          data.pCheckNo = value['@attributes'].pCheckNo;
          message += '<br />Voucher No: '+value['@attributes'].pCheckNo;
          message += '<br />Voucher Date: '+value['@attributes'].pVoucherDate;
          message += '<br />Claim Amount: '+value['@attributes'].pClaimAmount;
          message += '<br />Check Amount: '+value['@attributes'].pCheckAmount+'<br />';
        });
        break;
      }
      case 'WITH VOUCHER': {
        message = 'As of: '+resp['@attributes'].pAsOf+ ' '+resp['@attributes'].pAsOfTime;

        Object.entries(resp.CLAIM.PAYMENT.PAYEE).forEach(([key, value]:any, index) => {
          data.pVoucherNo = value['@attributes'].pVoucherNo;
          message += '<br />Voucher No: '+value['@attributes'].pVoucherNo;
          message += '<br />Voucher Date: '+value['@attributes'].pVoucherDate;
          message += '<br />Claim Amount: '+value['@attributes'].pClaimAmount;
          message += '<br />Check Amount: '+value['@attributes'].pCheckAmount+'<br />';
        });
        break;
      }
      case 'RETURN' : {
        data.return_reason = resp.CLAIM.RETURN;
        message = 'As of: '+resp['@attributes'].pAsOf+ ' '+resp['@attributes'].pAsOfTime;
        Object.entries(resp.CLAIM.RETURN.DEFECTS['@attributes']).forEach(([key, value]:any, index) => {
          if(!value.pRequirement) message += '<br />Deficiency: '+value;
          if(value.pRequirement) message += '<br />Requirement: '+value.pRequirement;
        });

        break;
      }
      case 'IN PROCESS': {
        message = 'As of: '+resp['@attributes'].pAsOf+ ' '+resp['@attributes'].pAsOfTime+'<br />';
        if(resp.CLAIM.TRAIL) {
          if(resp.CLAIM.TRAIL.PROCESS['@attributes']) {
            message += '<br /><strong>'+resp.CLAIM.TRAIL.PROCESS['@attributes'].pProcessDate +':</strong> '+resp.CLAIM.TRAIL.PROCESS['@attributes'].pProcessStage;
          } else {
            Object.entries(resp.CLAIM.TRAIL.PROCESS).forEach(([key, value]:any, index) => {
              message += '<br /><strong>'+value['@attributes'].pProcessDate +':</strong> '+value['@attributes'].pProcessStage;
            });
          }
        }
        break;
      }
      default: {
        message = 'As of: '+resp['@attributes'].pAsOf+ ' '+resp['@attributes'].pAsOfTime;
      }
    }

    this.showInfoToastr(message, resp.CLAIM.pStatus);
    this.updateUploadClaim(data);
    this.is_refreshing = false;
  }

  /* iterateMessage(resp, data, type) {
    data.pStatus = resp.CLAIM['@attributes'].pStatus;
    let message: string;

    console.log(type);
    switch(type) {
      case 'DENIED': {
        data.denied_reason = resp.CLAIM.DENIED.REASON['@attributes'].pReason;
        message = 'As of: '+resp['@attributes'].pAsOf+ ' '+resp['@attributes'].pAsOfTime+ '<br />'+resp.CLAIM.DENIED.REASON['@attributes'].pReason;
        break;
      }
      case 'WITH CHEQUE': {
        message = 'As of: '+resp['@attributes'].pAsOf+ ' '+resp['@attributes'].pAsOfTime;

        Object.entries(resp.CLAIM.PAYMENT.PAYEE['@attributes']).forEach(([key, value]:any, index) => {
          message = 'As of: '+resp['@attributes'].pAsOf+ ' '+resp['@attributes'].pAsOfTime;
          message += '<br />Voucher No: '+value['@attributes'].pVoucherNo;
          message += '<br />Check Amount: '+value['@attributes'].pCheckAmount;
        });
        break;
      }
      case 'WITH VOUCHER': {
        message = 'As ofs: '+resp['@attributes'].pAsOf+ ' '+resp['@attributes'].pAsOfTime;

        Object.entries(resp.CLAIM.PAYMENT.PAYEE).forEach(([key, value]:any, index) => {
          message += '<br />Voucher No: '+value['@attributes'].pVoucherNo;
          message += '<br />Voucher Date: '+value['@attributes'].pVoucherDate;
          message += '<br />Claim Amount: '+value['@attributes'].pClaimAmount;
          message += '<br />Check Amount: '+value['@attributes'].pCheckAmount+'<br />';
        });
        break;
      }
      case 'RETURN' : {
        message = 'As of: '+resp['@attributes'].pAsOf+ ' '+resp['@attributes'].pAsOfTime;
        Object.entries(resp.CLAIM.RETURN.DEFECTS).forEach(([key, value]:any, index) => {
          console.log(value);
          if(!value.pRequirement) message += '<br />Deficiency: '+value.pDeficiency;
          if(value.pRequirement) message += '<br />Requirement: '+value.pRequirement;
        });

        break;
      }
      case 'IN PROCESS': {
        message = 'As of: '+resp['@attributes'].pAsOf+ ' '+resp['@attributes'].pAsOfTime+'<br />';
        if(resp.CLAIM.TRAIL) {
          Object.entries(resp.CLAIM.TRAIL.PROCESS).forEach(([key, value]:any, index) => {
            if(value['@attributes']){
              message += '<br /><strong>'+value['@attributes'].pProcessDate +':</strong> '+value['@attributes'].pProcessStage;
            } else {
              message += '<br /><strong>'+value.pProcessDate +':</strong> '+value.pProcessStage;
            }
            console.log(value)
          });
        }
        break;
      }
      default: {
        message = 'As of: '+resp['@attributes'].pAsOf+ ' '+resp['@attributes'].pAsOfTime;
      }
    }

    this.showInfoToastr(message, resp.CLAIM.pStatus);
    this.updateUploadClaim(data);
    this.is_refreshing = false;
  } */

  is_exporting: boolean = false;
  exportXML(data: any) {
    this.is_exporting = true;
    this.http.post('eclaims/export-xml', data, { responseType: 'blob'  }).subscribe({
      next: (blob: any) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = data.pClaimSeriesLhio+'.xml.enc';
        a.click();
        URL.revokeObjectURL(objectUrl);
        this.is_exporting = false;
      },
      error: err => console.log(err)
    })
  }

  showInfoToastr(message, title) {
    this.toastr.info(message, title, {
      closeButton: true,
      positionClass: 'toast-top-center',
      disableTimeOut: true,
      enableHtml: true
    });
  }

  getVoucherDetails(data) {
    console.log(data);
    let params = {
      voucherNo: data.pVoucherNo
    }
    this.http.post('eclaims/get-voucher-details', params).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: err => console.log(err.error.message)
    })
  }

  updateUploadClaim(data) {
    console.log(data);
    this.http.post('eclaims/eclaims-upload', data).subscribe({
      next: (data:any) => {
        this.is_refreshing = false;
      },
      error: err => {
        console.log(err)
      }
    })
  }

  getCreds(){
    let params = { 'filter[program_code]': this.program_name  === 'cc' || this.program_name  === 'fp' ? 'mc' : this.program_name };
    this.http.get('settings/philhealth-credentials', {params}).subscribe({
      next:(data:any) => {
        if(data.data[0]) this.program_creds = data.data[0];
        this.getEclaimsList();
      },
      error: err => console.log(err)
    })
  }

  selected_transmittalNumber: string;
  selected_series_lhio: string;
  reopenCf2(name, eclaims){
    this.caserate_list = [eclaims.caserate];
    this.selected_transmittalNumber = eclaims.pHospitalTransmittalNo;
    this.modal[name] = !this.modal[name];
  }

  toggleModal(name, eclaims?) {
    console.log(eclaims)

    if(eclaims) {
      this.caserate_list = [eclaims?.caserate];
    }

    this.selected_pHospitalTransmittalNo = eclaims != undefined ? eclaims?.pHospitalTransmittalNo : null;
    this.selected_caserate_code = eclaims != undefined ? eclaims?.caserate.caserate_code : null;

    this.selected_ticket_number = eclaims != undefined ? eclaims?.pReceiptTicketNumber : null;
    this.selected_series_lhio = eclaims != undefined ? eclaims?.pClaimSeriesLhio : null;

    this.modal[name] = !this.modal[name];

    if(name==='cf2' && !this.modal['cf2']) this.getEclaimsList();
    if(name==='upload-claims' && !this.modal['upload-claims']) this.getEclaimsList();
    if(name==='upload-required-claims' && !this.modal['upload-required-claims']) this.getEclaimsList();
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
    } else {
      this.http.showError('No PhilHealth Details', 'eClaims Error');
      this.show_form = true;
    }
  }

}
