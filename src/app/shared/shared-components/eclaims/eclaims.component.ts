import { Component, Input, OnInit } from '@angular/core';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch, faClipboardQuestion, faPenToSquare, faReceipt, faRotate, faUpload, faXmark } from '@fortawesome/free-solid-svg-icons';
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
  faXmark = faXmark;
  faQuestionCircle = faQuestionCircle;

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

  page: number = 1;
  caserate_details!: any;
  transmittal_number: string;
  eclaims_upload_id: string;
  togglePage(page_number: number, data?: any) {
    // console.log(data);
    this.caserate_details = page_number === 2 ? data.caserate : null;
    this.transmittal_number = page_number === 2 ? data.pHospitalTransmittalNo : null;
    this.eclaims_upload_id = page_number === 2 ? data.id : null;
    this.page = page_number;
  }

  getEclaimsList() {
    this.show_form = false;

    let params = {
      patient_id: this.patient.id,
      program_desc: this.program_name,
      program_code: this.program_name === 'cc' || this.program_name === 'fp' ? 'mc' :  this.program_name,
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
      program_desc: this.program_name,
      program_code: this.program_name === 'cc' || this.program_name === 'fp' ? 'mc' :  this.program_name,
    };

    params['eclaims_id_arr'] = eclaims_id_arr ? eclaims_id_arr.join(',') : null;

    this.http.get('eclaims/eclaims-caserate', {params}).subscribe({
      next:(data:any) => {
        this.caserate_list = data.data;
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
    this.process_name = 'checking_series';
    this.is_refreshing = true;

    let params = {
      receiptTicketNumber: data.pReceiptTicketNumber,
      program_code: this.program_name === 'cc' || this.program_name === 'fp' ? 'mc' :  this.program_name
    }

    this.http.post('eclaims/get-claims-map', params).subscribe({
      next: (resp: any) => {
        if(resp.success === false) {
          this.toastr.error('No query result', 'Series LHIO');
          this.stopRefreshing();
        } else {
          data.pClaimSeriesLhio = resp.mapping[0].pclaimSeriesLhio;
          data.pStatus = 'IN PROCESS';

          this.updateUploadClaim(data);
        }
      },
      error: err => {
        this.toastr.error(err.error.message, 'Series LHIO', {
          closeButton: true,
          positionClass: 'toast-top-center',
          disableTimeOut: true
        });
        this.stopRefreshing();
      }
    })
  }

  getClaimStatus(data, type) {
    this.process_name = 'checking_claim_status';
    this.is_refreshing = true;

    let params = {
      series_lhio: data.pClaimSeriesLhio,
      program_code: this.program_name === 'cc' || this.program_name === 'fp' ? 'mc' :  this.program_name
    }

    this.http.post('eclaims/get-claim-status', params).subscribe({
      next:(resp: any) => {
        this.stopRefreshing();
        this.iterateMessage(resp, data, resp.CLAIM['@attributes'].pStatus);
      },
      error: err => {
        this.stopRefreshing();
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

  is_exporting: boolean = false;
  exportXML(data: any) {
    this.process_name = 'exporting_xml';
    this.is_exporting = true;
    this.is_refreshing = true;
    this.http.post('eclaims/export-xml', data, { responseType: 'blob'  }).subscribe({
      next: (blob: any) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = data.pClaimSeriesLhio+'.xml.enc';
        a.click();
        URL.revokeObjectURL(objectUrl);
        this.is_exporting = false;
        this.stopRefreshing();
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

  process_name: string = null;
  getVoucherDetails(data) {
    this.process_name = 'checking_voucher';
    this.is_refreshing = true;
    let params = {
      voucherNo: data.pVoucherNo,
      program_code: data.program_desc === 'cc' || data.program_desc === 'fp' ? 'mc' : data.program_desc
    }
    this.http.post('eclaims/get-voucher-details', params).subscribe({
      next: (data: any) => {
        data.voucher_details = data.CLAIM;
        this.updateUploadClaim(data);
        this.toggleModal('voucher-details', data.voucher_details);
        this.stopRefreshing();
      },
      error: err => {
        this.http.showError(err.error.text, 'Voucher Details Error');
        this.stopRefreshing();
      }
    })
  }

  stopRefreshing() {
    this.is_refreshing =false;
    this.process_name = null;
  }

  updateUploadClaim(data) {
    this.http.post('eclaims/eclaims-upload', data).subscribe({
      next: () => {
        this.stopRefreshing();
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

  show_guide: boolean = false;
  openGuide() {
    this.show_guide = !this.show_guide;
  }

  voucher_details: any;
  toggleModal(name, eclaims?) {
    // console.log(name)

    if(name==='voucher-details') {
      this.voucher_details = eclaims;
    } else {
      this.selected_pHospitalTransmittalNo = eclaims?.pHospitalTransmittalNo ?? null;
      this.selected_caserate_code = eclaims?.caserate.caserate_code ?? null;
      this.selected_ticket_number = eclaims?.pReceiptTicketNumber ?? null;
      this.selected_series_lhio = eclaims?.pClaimSeriesLhio ?? null;

      if(eclaims) this.caserate_list = [eclaims?.caserate];
    }

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
