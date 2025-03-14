import { Component, OnInit } from '@angular/core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-eclaims-rth',
  standalone: false,
  templateUrl: './eclaims-rth.component.html',
  styleUrl: './eclaims-rth.component.scss'
})
export class EclaimsRthComponent implements OnInit {
  faFilter = faFilter;

  modal: any = [];
  show_form: boolean = false;
  program_desc: string = null;
  patient_search: string = null;
  code_list: any = [];
  pStatus: string = null;
  start_date: string | null = null;
  end_date: string | null = null;
  eclaims_list: any = [];

  program_list = ['ab', 'cc', 'tb', 'mc', 'fp'];
  code_list_ab = ['90375'];
  code_list_cc = ['99432', '99460'];
  code_list_tb = ['89221', '89222'];
  code_list_mc = ['MCP01', 'NSD01', 'ANC01', 'ANC02'];
  code_list_fp = ['FP001', '58300'];

  status_lists = [
    'IN PROCESS',
    'VOUCHERING',
    'WITH VOUCHER',
    'WITH CHEQUE',
    'DENIED',
    'RETURN'
  ];

  getEclaimsList() {

  }

  toggleModal(name: string) {
    this.modal[name] = !this.modal[name];
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

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.show_form = true;
  }
}
