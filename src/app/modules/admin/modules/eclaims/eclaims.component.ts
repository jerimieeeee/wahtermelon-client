import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFile, faFileExcel } from '@fortawesome/free-regular-svg-icons';
import { faAnglesLeft, faAnglesRight, faCheckCircle, faChevronLeft, faChevronRight, faCircleNotch, faClipboardQuestion, faFilter, faPenToSquare, faReceipt, faRotate, faUpload, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-eclaims',
    templateUrl: './eclaims.component.html',
    styleUrls: ['./eclaims.component.scss'],
    standalone: false
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
  faFileExcel = faFileExcel;
  faFile = faFile;

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
  start_date: string | null = null;
  end_date: string | null = null;

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

  printFile() {
    this.getAllData();
  }

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
        this.toastr.success('XML Successfully downloaded', 'Export XML');
      },
      error: err => {
        console.log(err);
        this.toastr.success(err.error.message, 'Export XML');
        this.is_exporting = false;
      }
    })
  }

  exportToExcel(data: {any}[]) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    const columnWidths = Object.keys(data[0] || {}).map((key) => {
      const maxLength = Math.max(
        key.length,
        ...data.map((row) => (row[key] ? row[key].toString().length : 0))
      );
      return { wch: maxLength + 2 };
    });
    worksheet['!cols'] = columnWidths;

    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data'],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    this.saveAsExcelFile(excelBuffer, 'E-Claims Summary Report');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, `${fileName}.xlsx`);
  }

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

  allEclaimsArray!: any[];
  printing: boolean = false;
  total_print_page: number = 0;
  current_print_page: number = 1;
  getAllData() {
    this.printing = true;
    let params = {
      pStatus: this.pStatus ?? '',
      program_desc: this.program_desc ?? '',
      code: this.code ?? '',
      'filter[search]': this.patient_search ?? '',
      per_page: 50,
      for_print: '1',
    }

    if(this.start_date) params['start_date'] = this.start_date;
    if(this.end_date) params['end_date'] = this.end_date;

    this.allEclaimsArray = [];
    let current_number = 0;
    const fetchPage = (page: number) => {
      params['page'] = page;

      this.http.get('eclaims/eclaims-upload', { params }).subscribe({
        next: (data: any) => {
          this.total_print_page = data.meta.last_page;
          this.current_print_page = page;

          const filteredData = data.data.map((item: any, index: number) => {
            const programDates = this.getDates(item);
            current_number += 1;
            return {
              'No.': current_number,
              'Series No': item.pClaimSeriesLhio,
              'Name': item.patient.first_name+' '+item.patient.middle_name+' '+item.patient.last_name,
              'Admission Date': programDates.admission_date,
              'Discharge Date': programDates.discharge_date,
              'Received Date': item.pTransmissionDate,
              'Caserate Amount': item.caserate.caserate_fee,
              'Status': item.pStatus,
            }
          });

          this.allEclaimsArray.push(...filteredData);

          if( page < data.meta.last_page ) {
            fetchPage( page + 1 );
          } else {
            this.exportToExcel(this.allEclaimsArray);
            this.printing = false;
          }
        }
      });
    };

    fetchPage(1);
  }

  getDates(data) {
    let admission_date = data.caserate?.caserate_date || '';
    let discharge_date = data.caserate?.caserate_date || '';

    switch (data.program_desc) {
      case 'ab':
        admission_date = data.caserate.patient_ab.ab_post_exposure.day0_date;
        discharge_date = data.caserate.patient_ab.ab_post_exposure.day7_date;
        break;
      case 'cc':
        admission_date = formatDate(data.caserate.patient_cc.admission_date, 'yyyy-MM-dd', 'en');
        discharge_date = formatDate(data.caserate.patient_cc.discharge_date, 'yyyy-MM-dd', 'en');
        break;
      case 'mc':
        if(data.caserate.code === 'ANC01' || data.caserate.code === 'ANC02') {
          let visit1: string = null;
          let visit2: string = null;
          let visit3: string = null;
          let visit4: string = null;

          Object.entries(data.caserate.patient_mc.prenatal).reverse().forEach(([key, value]:any, index) => {
            if(index === 0 && !visit1) visit1 = value.prenatal_date;
            if(index === 1 && !visit2) visit2 = value.prenatal_date;
            if(index === 2 && !visit3) visit3 = value.prenatal_date;

            if((index > 2 && !visit4) && value.trimester === 3) {
              visit4 = value.prenatal_date;
              return true;
            }
          });

          admission_date = visit1;
          discharge_date = visit4;
        } else {
          admission_date = formatDate(data.caserate.patient_mc.post_register.admission_date, 'yyyy-MM-dd', 'en');
          discharge_date = formatDate(data.caserate.patient_mc.post_register.discharge_date, 'yyyy-MM-dd', 'en');
        }
        break;
      case 'tb':
        if(data.caserate.code === '89221') {
          let cont_date = new Date(data.caserate.patient_tb.tb_case_holding.continuation_start);
          cont_date.setDate(cont_date.getDate()-1);

          admission_date = formatDate(data.caserate.patient_tb.tb_case_holding.treatment_start, 'yyyy-MM-dd', 'en');
          discharge_date = formatDate(cont_date, 'yyyy-MM-dd', 'en');
        } else {
          admission_date = formatDate(data.caserate.patient_tb.tb_case_holding.continuation_start, 'yyyy-MM-dd', 'en');
          discharge_date = formatDate(data.caserate.patient_tb.tb_case_holding.treatment_end, 'yyyy-MM-dd', 'en');
        }
        break;
      default:
        admission_date = data.caserate.caserate_date;
        discharge_date = data.caserate.caserate_date;
        break;
    }

    return { admission_date, discharge_date};
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
      page: page ? page : (this.current_page ? this.current_page : 1),
      per_page: this.per_page,
    }

    if(this.start_date) params['start_date'] = this.start_date;
    if(this.end_date) params['end_date'] = this.end_date;

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
          this.iterateMessage(resp, data, resp.CLAIM['@attributes'].pStatus);
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
        console.log(err)
        if(i >= 0) this.item_status[i] = {icon: faXmarkCircle, status: 'failed'};
        this.http.showError(err.error.text, 'Claims Status - '+ data.pClaimSeriesLhio);
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

  getVoucherDetails(data) {
    console.log(data.voucher_details);
    this.is_refreshing = true;

    if(data.voucher_details) {
      this.toggleModal('voucher-details', data.voucher_details);
      this.is_refreshing = false;
    } else {
      let params = {
        voucherNo: data.pVoucherNo
      };

      this.http.post('eclaims/get-voucher-details', params).subscribe({
        next: (res: any) => {
          console.log(res);
          data.voucher_details = res.CLAIM;
          this.updateUploadClaim(data);
          this.toggleModal('voucher-details', data.voucher_details);
          this.is_refreshing = false;
        },
        error: (err) => {
          console.log(err.error.text);
          this.toastr.error(err.error.text, 'Get Voucher Details');
          this.is_refreshing = false;
        }
      });
    }
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

  showInfoToastr(message, title) {
    this.toastr.info(message, title, {
      closeButton: true,
      positionClass: 'toast-top-center',
      disableTimeOut: true,
      enableHtml: true
    });
  }

  updateUploadClaim(data) {
    console.log(data);
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

  voucher_details: any;
  toggleModal(name, eclaims?) {
    if(name==='voucher-details') {
      this.voucher_details = eclaims;
    } else {
      this.selected_pHospitalTransmittalNo = eclaims?.pHospitalTransmittalNo ?? null;
      this.selected_caserate_code = eclaims?.caserate.caserate_code ?? null;
      this.selected_ticket_number = eclaims?.pReceiptTicketNumber ?? null;
      this.selected_series_lhio = eclaims?.pClaimSeriesLhio ?? null;
    }

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
