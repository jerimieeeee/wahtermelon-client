import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faCircleNotch, faClipboardQuestion, faFilter, faPenToSquare, faReceipt, faRotate, faUpload } from '@fortawesome/free-solid-svg-icons';
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
  // pTransmissionDate: null


  status_lists = [
    'IN PROCESS',
    'DENIED',
    'WITH CHEQUE',
    'RETURN'
  ];

  program_list = ['ab', 'cc', 'tb', 'mc', 'fp'];

  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  getEclaimsList(page?) {
    this.show_form = false;

    let params = {
      pStatus: this.pStatus ?? '',
      program_desc: this.program_desc ?? '',
      'filter[search]': this.patient_search ?? '',
      page: page ?? '',
      per_page: this.per_page
    }

    this.http.get('eclaims/eclaims-upload', { params }).subscribe({
      next:(data:any) => {
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
  retrieved_claims: number = 0
  batch_refresh: boolean = false;
  getStatuses(){
    this.batch_refresh = true;
    this.retrieved_claims = 0;
    this.claims_count = Object.entries(this.eclaims_list).length;

    Object.entries(this.eclaims_list).forEach(([key, value]:any, index) => {
      if(value.pClaimSeriesLhio) {
        this.getClaimStatus(value, value.pStatus + ' - ' + value.pHospitalTransmittalNo);
      } else {
        this.checkSeries(value);
      }
    });
  }

  getClaimStatus(data, type) {
    this.is_refreshing = true;

    let params = {
      series_lhio: data.pClaimSeriesLhio,
      program_code: data.program_desc === 'cc' || data.program_desc === 'fp' ? 'mc' : data.program_desc
    }

    this.http.post('eclaims/get-claim-status', params).subscribe({
      next:(resp: any) => {
        this.iterateMessage(resp, data, type);
        this.addRetrieved();
      },
      error: err => {
        this.is_refreshing = false;
        this.http.showError(err.error.message, 'Claims Status');
        this.addRetrieved();
      }
    })
  }

  addRetrieved(){
    this.retrieved_claims += 1;
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

  iterateMessage(resp, data, type) {
    data.pStatus = resp.CLAIM.pStatus;
    let message: string;

    switch(type) {
      case 'DENIED': {
        data.denied_reason = resp.CLAIM.DENIED.REASON.pReason;
        message = 'As of: '+resp.pAsOf+ ' '+resp.pAsOfTime+ '<br />'+resp.CLAIM.DENIED.REASON.pReason;
        break;
      }
      case 'WITH CHEQUE': {
        message = 'As of: '+resp.pAsOf+ ' '+resp.pAsOfTime;

        Object.entries(resp.CLAIM.PAYMENT.PAYEE).forEach(([key, value]:any, index) => {
          message = 'As of: '+resp.pAsOf+ ' '+resp.pAsOfTime;
          message += '<br />Voucher No: '+value.pVoucherNo;
          message += '<br />Check Amount: '+value.pCheckAmount;
        });
        break;
      }
      case 'RETURN' : {
        message = 'As of: '+resp.pAsOf+ ' '+resp.pAsOfTime;
        Object.entries(resp.CLAIM.RETURN.DEFECTS).forEach(([key, value]:any, index) => {

          message += '<br />Deficiency: '+value.pDeficiency;
          if(value.REQUIREMENT) message += '<br />Requirement: '+value.REQUIREMENT.pRequirement;
        });
        break;
      }
      default: {
        message = 'As of: '+resp.pAsOf+ ' '+resp.pAsOfTime;
      }
    }

    this.showInfoToastr(message, resp.CLAIM.pStatus);
    this.updateUploadClaim(data);
    this.is_refreshing = false;
  }

  showInfoToastr(message, title) {
    this.toastr.info(message, title, {
      closeButton: true,
      positionClass: 'toast-top-center',
      timeOut: 15000,
      enableHtml: true,
      progressBar: true
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

  toggleModal(name, eclaims?) {
    this.selected_pHospitalTransmittalNo = eclaims?.pHospitalTransmittalNo ?? null;
    this.selected_caserate_code = eclaims?.caserate.caserate_code ?? null;
    this.selected_ticket_number = eclaims?.pReceiptTicketNumber ?? null;
    this.selected_series_lhio = eclaims?.pClaimSeriesLhio ?? null;

    this.modal[name] = !this.modal[name];

    if(name==='cf2' && !this.modal['cf2']) this.getEclaimsList();
    if(name==='upload-claims' && !this.modal['upload-claims']) this.getEclaimsList();
    if(name==='upload-required-claims' && !this.modal['upload-required-claims']) this.getEclaimsList();
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
