import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAnglesLeft, faAnglesRight, faCheckCircle, faChevronLeft, faChevronRight, faCircleNotch, faClipboardQuestion, faFilter, faPenToSquare, faReceipt, faRotate, faUpload, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-eclaims',
  templateUrl: './eclaims.component.html',
  styleUrls: ['./eclaims.component.scss']
})
export class EclaimsComponent implements OnInit {
  faRotate = faRotate;
  faUpload = faUpload;
  faCircleNotch = faCircleNotch;
  faReceipt = faReceipt;
  faClipboardQuestion = faClipboardQuestion;
  faPenToSquare = faPenToSquare;
  faFilter = faFilter;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;

  pending_list: any = [];
  modal: any = [];

  caserate_list: any;
  patient:any;
  patient_philhealth:any;
  eclaims_list: any;
  program_creds:any;

  selected_pHospitalTransmittalNo: string;
  selected_caserate_code: string;
  selected_ticket_number: string;

  is_refreshing: boolean = false;
  show_form:boolean = false;
  show_cf2: boolean = false;


  pStatus: string = null;
  program_desc: string = null;
  patient_search: string = null;
  code: string = null;
  code_list: any = [];
  // pTransmissionDate: null


  status_lists = [
    'IN PROCESS',
    'VOUCHERING',
    'WITH VOUCHER',
    'WITH CHEQUE',
    'DENIED',
    'RETURN'
  ];

  program_list = ['ab', 'cc', 'tb', 'mc', 'fp'];
  code_list_ab = ['90375'];
  code_list_cc = ['99432', '99460'];
  code_list_tb = ['89221', '89222'];
  code_list_mc = ['MCP01', 'NSD01', 'ANC01', 'ANC02'];
  code_list_fp = ['FP001', '58300'];

  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  changeCodeList(){
    switch(this.program_desc) {
      case 'ab': {
        this.code_list = this.code_list_ab;
        break;
      }
      case 'cc': {
        this.code_list = this.code_list_cc;
        break;
      }
      case 'tb': {
        this.code_list = this.code_list_tb;
        break;
      }
      case 'mc': {
        this.code_list = this.code_list_mc;
        break;
      }
      case 'fp': {
        this.code_list = this.code_list_fp;
        break;
      }
      default: {
        this.code_list = null;
      }
    };
  }

  getEclaimsList(page?) {
    this.item_status = [];
    this.success_count = 0;
    this.error_count = 0;
    this.retrieved_claims = 0;
    this.show_form = false;
    this.checking_index = null;

    let params = {
      pStatus: this.pStatus ?? '',
      program_desc: this.program_desc ?? '',
      code: this.code ?? '',
      'filter[search]': this.patient_search ?? '',
      page: page ?? '',
      per_page: this.per_page
    }

    this.http.get('eclaims/eclaims-upload', { params }).subscribe({
      next:(data:any) => {
        // console.log(data.data)
        this.eclaims_list = data.data;
        this.show_form = true;

        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
      },
      error: err => console.log(err)
    })
  }

  claims_count: number = 0;
  retrieved_claims: number = 0;
  success_count: number = 0;
  error_count: number = 0;

  batch_refresh: boolean = false;
  item_status: any[] = [];

  async getStatuses(){
    this.item_status = [];
    this.batch_refresh = true;
    this.success_count = 0;
    this.error_count = 0;
    this.retrieved_claims = 0;
    this.claims_count = Object.entries(this.eclaims_list).length;

    for(const [key, value] of Object.entries(this.eclaims_list)) {
      const val:any = value;
      try {
        if(val.pClaimSeriesLhio) {
          await this.asyncGetClaimsStatus(val, val.pStatus)
        } else {
          this.checkSeries(value);
        }
        this.item_status[key] = {icon: faCheckCircle, status: 'success'};
        this.success_count += 1;
      } catch (error) {
        this.item_status[key] = {icon: faXmarkCircle, status: 'failed'};
        this.error_count += 1;
      }
    }
  }

  asyncGetClaimsStatus(data, type): Promise<void> {
    this.is_refreshing = true;
    this.checking_index = null;
    let params = {
      series_lhio: data.pClaimSeriesLhio,
      program_code: data.program_desc === 'cc' || data.program_desc === 'fp' ? 'mc' : data.program_desc
    }

    return new Promise((resolve, reject) => {
      this.http.post('eclaims/get-claim-status', params).subscribe({
        next:(resp: any) => {
          this.iterateMessage(resp, data, type);
          this.addRetrieved();
          resolve();
        },
        error: err => {
          this.is_refreshing = false;
          this.http.showError(err.error.message, 'Claims Status - '+ data.pHospitalTransmittalNo);
          this.addRetrieved();
          reject(err);
        }
      })
    })
  }

  checking_index: number | null;

  getClaimStatus(data, type, i?) {
    this.claims_count = 1;
    this.success_count = 0;
    this.error_count = 0;
    this.retrieved_claims = 0;

    if(i >= 0) {
      this.checking_index = i;
      if(this.item_status[i]) this.item_status[i] = {icon: null, status: null};
    } else {
      if(!i) this.item_status = [];
    }
    this.batch_refresh = true;

    let params = {
      series_lhio: data.pClaimSeriesLhio,
      program_code: data.program_desc === 'cc' || data.program_desc === 'fp' ? 'mc' : data.program_desc
    }

    this.http.post('eclaims/get-claim-status', params).subscribe({
      next:(resp: any) => {
        if(i >= 0) this.item_status[i] = {icon: faCheckCircle, status: 'success'};
        this.iterateMessage(resp, data, type);
        this.addRetrieved();
        this.batch_refresh = false;
      },
      error: err => {
        if(i >= 0) this.item_status[i] = {icon: faXmarkCircle, status: 'failed'};
        this.http.showError(err.error.message, 'Claims Status - '+ data.pHospitalTransmittalNo);
        this.addRetrieved();
        this.batch_refresh = false;
      }
    });
  }

  addRetrieved(){
    this.retrieved_claims += 1;

    if(this.claims_count === this.retrieved_claims) {
      this.batch_refresh = false;
    }
  }

  navigateRoute(loc, data){
    this.router.navigate(['/patient/'+loc, {id: data.patient.id}]);
  }

  refreshClaims(){
    this.is_refreshing = true;
  }

  checkSeries(data){
    this.is_refreshing = true;

    let params = {
      pReceiptTicketNumber: data.pReceiptTicketNumber,
      program_code: data.program_desc === 'cc' || data.program_desc === 'fp' ? 'mc' : data.program_desc
    }

    this.http.post('eclaims/get-claims-map', params).subscribe({
      next: (resp: any) => {
        data.pClaimSeriesLhio = resp.MAPPING.pClaimSeriesLhio;
        data.pStatus = 'IN PROCESS';

        this.showInfoToastr(resp.MAPPING.pClaimSeriesLhio, 'Series LHIO Number');
        this.updateUploadClaim(data);
        this.addRetrieved();
      },
      error: err => {
        this.is_refreshing = false;
        this.toastr.error(err.error.message, 'Series LHIO', {
          closeButton: true,
          positionClass: 'toast-top-center',
          disableTimeOut: true
        });
        this.addRetrieved();
      }
    })
  }

  parseReason(data) {
    if(data) {
      let obj: any = typeof data === 'object' ? JSON.stringify(data) : data;
      let message: any = '';

      if(obj.charAt(0) === '[') {
        obj = JSON.parse(obj);
      } else {
        if(obj.charAt(0) === '{') {
          obj = JSON.parse(obj);
        } else {
          return obj;
        }
      }

      const parse = (obj: any) => {
        Object.entries(obj).forEach(([key, value]: any) => {
          if (typeof value === 'object' && value !== null) {
            parse(value);
          } else {
            message += `<b>${key}</b>: ${value}<br>`;
          }
        });
      };

      parse(obj);
      return message;
    }
    return '';
  }

  iterateMessage(resp, data, type) {
    data.pStatus = resp.CLAIM.pStatus;
    let message: string;

    // console.log(type, resp)
    switch(resp.CLAIM.pStatus) {
      case 'DENIED': {
        data.denied_reason = resp.CLAIM.DENIED.REASON;
        message = 'As of: '+resp.pAsOf+ ' '+resp.pAsOfTime+ '<br />'+resp.CLAIM.DENIED.REASON.pReason;
        break;
      }
      case 'VOUCHERING': {
        message = 'As of: '+resp.pAsOf+ ' '+resp.pAsOfTime;
        if(resp.CLAIM.PAYMENT.PAYEE.length > 0) {
          Object.entries(resp.CLAIM.PAYMENT.PAYEE).forEach(([key, value]:any, index) => {
            message += '<br />Claim Amount: '+value.pClaimAmount;
          });
        } else {
          message += '<br />Claim Amount: '+resp.CLAIM.PAYMENT.PAYEE.pClaimAmount;
        }
        break;
      }
      case 'WITH VOUCHER': {
        message = 'As of: '+resp.pAsOf+ ' '+resp.pAsOfTime;
        if(resp.CLAIM.PAYMENT.PAYEE.length > 0) {
          Object.entries(resp.CLAIM.PAYMENT.PAYEE).forEach(([key, value]:any, index) => {
            message += '<br />Voucher No: '+value.pVoucherNo;
            message += '<br />Voucher Date: '+value.pVoucherDate;
            message += '<br />Claim Amount: '+value.pClaimAmount;
          });
        } else {
          message += '<br />Voucher No: '+resp.CLAIM.PAYMENT.PAYEE.pVoucherNo;
          message += '<br />Voucher Date: '+resp.CLAIM.PAYMENT.PAYEE.pVoucherDate;
          message += '<br />Claim Amount: '+resp.CLAIM.PAYMENT.PAYEE.pClaimAmount;
        }
        break;
      }
      case 'WITH CHEQUE': {
        message = 'As of: '+resp.pAsOf+ ' '+resp.pAsOfTime;
        if(resp.CLAIM.PAYMENT.PAYEE.length > 0) {
          Object.entries(resp.CLAIM.PAYMENT.PAYEE).forEach(([key, value]:any, index) => {
            message += '<br />Voucher No: '+value.pVoucherNo;
            message += '<br />Check No: '+value.pCheckNo;
            message += '<br />Check Date: '+value.pCheckDate;
            message += '<br />Claim Amount: '+value.pClaimAmount;
          });
        } else {
          message += '<br />Voucher No: '+resp.CLAIM.PAYMENT.PAYEE.pVoucherNo;
          message += '<br />Check No: '+resp.CLAIM.PAYMENT.PAYEE.pCheckNo;
          message += '<br />Check Date: '+resp.CLAIM.PAYMENT.PAYEE.pCheckDate;
          message += '<br />Claim Amount: '+resp.CLAIM.PAYMENT.PAYEE.pClaimAmount;
        }
        break;
      }
      case 'RETURN' : {
        message = 'As of: '+resp.pAsOf+ ' '+resp.pAsOfTime;
        if(resp.CLAIM.RETURN && resp.CLAIM.RETURN.DEFECTS) {
          data.return_reason = resp.CLAIM.RETURN.DEFECTS;
          Object.entries(resp.CLAIM.RETURN.DEFECTS).forEach(([key, value]:any, index) => {
            // console.log(key, index, value)
            if(value.REQUIREMENT) {
              Object.entries(value.REQUIREMENT).forEach(([k, v]:any, i) => {
                // console.log(v)
                message += '<br />Requirement: '+ (v.pRequirement ? v.pRequirement : v);
              });
            }

            if(typeof value === 'string') message += '<br />Deficiency: '+value;
            if(value.pDeficiency) message += '<br />Deficiency: '+value.pDeficiency;
            if(value.pRequirement) message += '<br />Requirement: '+value.pRequirement;

          });
        }
        break;
      }
      case 'IN PROCESS' : {
        message = 'As of: '+resp.pAsOf+ ' '+resp.pAsOfTime;

        if(resp.CLAIM.TRAIL){
          if(resp.CLAIM.TRAIL.PROCESS.length > 0) {
            Object.entries(resp.CLAIM.TRAIL.PROCESS).forEach(([key, value]:any, index) => {
              message += '<br />Process Stage: '+value.pProcessStage;
              message += '<br />Process Date: '+value.pProcessDate + '<br />';
            });
          } else {
            message += '<br />Process Stage: '+resp.CLAIM.TRAIL.PROCESS.pProcessStage;
            message += '<br />Process Date: '+resp.CLAIM.TRAIL.PROCESS.pProcessDate + '<br />';
          }
        } else {
          if(resp.CLAIM.RETURN && resp.CLAIM.RETURN.DEFECTS) {
            Object.entries(resp.CLAIM.RETURN.DEFECTS).forEach(([key, value]:any, index) => {
              if(!value.pRequirement) message += '<br />Deficiency: '+value;
              if(value.pRequirement) message += '<br />Requirement: '+value.pRequirement;
            });
          }
        }

        break;
      }
      default: {
        message = 'As of: '+resp.pAsOf+ ' '+resp.pAsOfTime;
      }
    }

    this.showInfoToastr(message, resp.CLAIM.pStatus+' - '+data.pHospitalTransmittalNo);
    this.updateUploadClaim(data);
    this.is_refreshing = false;
  }

  showInfoToastr(message, title) {
    this.toastr.info(message, title, {
      closeButton: true,
      positionClass: 'toast-top-center',
      disableTimeOut: true,
      enableHtml: true
    });
  }

  updateUploadClaim(data) {
    this.http.post('eclaims/eclaims-upload', data).subscribe({
      next: (data:any) => {
        this.is_refreshing = false;
      },
      error: err => {
        this.http.showError(err.error.message, 'eClaims');
      }
    })
  }

  selected_transmittalNumber: string;
  selected_series_lhio: string;

  reopenCf2(name, eclaims){
    this.caserate_list = [eclaims.caserate];
    this.selected_transmittalNumber = eclaims.pHospitalTransmittalNo;
    this.modal[name] = !this.modal[name];
  }

  toggleColorStatus(status:string) {
    let style: string = '';
    switch (status) {
      case 'IN PROCESS':
        style = 'text-blue-500 font-semibold'
        break;
      case 'RETURN':
        style = 'text-orange-500 font-semibold'
        break;
      case 'DENIED':
        style = 'text-red-500 font-semibold'
        break;
      case 'VOUCHERING':
        style = 'text-green-500 font-semibold'
        break;
      case 'WITH VOUCHER':
        style = 'text-green-500 font-semibold'
      case 'WITH CHEQUE':
        style = 'text-green-500 font-semibold'
        break;
      default:
        break;
    }
    return style;
  }

  toggleModal(name, eclaims?) {
    this.selected_pHospitalTransmittalNo = eclaims?.pHospitalTransmittalNo ?? null;
    this.selected_caserate_code = eclaims?.caserate.caserate_code ?? null;
    this.selected_ticket_number = eclaims?.pReceiptTicketNumber ?? null;
    this.selected_series_lhio = eclaims?.pClaimSeriesLhio ?? null;

    if(name==='cf2' && !this.modal['cf2']) this.getEclaimsList();
    if(name==='upload-claims' && !this.modal['upload-claims']) this.patient = eclaims.patient; this.getEclaimsList();
    if(name==='upload-required-claims' && !this.modal['upload-required-claims']) this.patient = eclaims.patient; this.getEclaimsList();

    // console.log(this.patient)
    this.modal[name] = !this.modal[name];
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEclaimsList();
  }
}
