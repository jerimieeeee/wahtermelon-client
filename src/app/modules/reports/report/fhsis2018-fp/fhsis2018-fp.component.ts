import {Component, Input, OnChanges} from '@angular/core';
import { faCircleNotch, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import {ExportAsConfig, ExportAsService} from "ngx-export-as";
import * as moment from "moment/moment";
import {HttpService} from "../../../../shared/services/http.service";

@Component({
  selector: 'app-fhsis2018-fp',
  templateUrl: './fhsis2018-fp.component.html',
  styleUrls: ['./fhsis2018-fp.component.scss']
})
export class Fhsis2018FpComponent implements OnChanges {
  @Input() report_data;
  @Input() reportForm;
  @Input() selectedBrgy;
  @Input() brgys;
  @Input() userInfo;
  @Input() submit_flag;

  faCircleNotch = faCircleNotch;
  faFileExcel = faFileExcel;
  faFilePdf = faFilePdf;

  stats : any;
  brgy_result: any;
  reportform_data : any;
  selected_barangay : any;
  info3 : any;
  convertedMonth : any;
  brgys_info : any;
  show_nameList: any = [];
  current_submit_flag: boolean = false;

  exportAsExcel: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'reportForm',
    options: {

    }
  }

  sub_total_arr = ['IUD_total', 'PILLS_total']

  exportAsPdf: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'reportForm',
    options: {
      image: { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 3},
      margin:  [1, 1, 1, 1],
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      jsPDF: {
        orientation: 'landscape',
        format: 'a4',
        precision: 16
      }
    }
  }

  total_count = {
    // Current User (Beginning Month)
    cubm_10_14: 0,
    cubm_15_19: 0,
    cubm_20_49: 0,
    // New Acceptor (Previous Month)
    napr_10_14: 0,
    napr_15_19: 0,
    napr_20_49: 0,
    // Other Acceptor (Present Month)
    oapm_10_14: 0,
    oapm_15_19: 0,
    oapm_20_49: 0,
    //Dropout (Present Month)
    dopm_10_14: 0,
    dopm_15_19: 0,
    dopm_20_49: 0,
    //Current User (End Month)
    cuem_10_14: 0,
    cuem_15_19: 0,
    cuem_20_49: 0,
    //New Acceptor (Present Month)
    napm_10_14: 0,
    napm_15_19: 0,
    napm_20_49: 0,
  }

  method_list = [
    {method_id: 'FSTRBTL',  desc: 'a. BTL - Total'},
    {method_id: 'MSV',      desc: 'b. NSV - Total'},
    {method_id: 'CONDOM',   desc: 'c. Condom - Total'},
    {method_id: 'IUD_total', desc: 'd. IUD (I & PP)- Total'},
    {method_id: 'IUD',      desc: 'd.1. IUD-I - Total'},
    {method_id: 'IUDPP',    desc: 'd.2. IUD-PP - Total'},
    {method_id: 'PILLS_total', desc: 'e. Pills (POP & COC) - Total'},
    {method_id: 'PILLSPOP', desc: 'e.1. Pills-POP - Total'},
    {method_id: 'PILLS',    desc: 'e.2. Pills-COC - Total'},
    {method_id: 'DMPA',     desc: 'f. Injectables (DMPA/CIC) - Total'},
    {method_id: 'IMPLANT',  desc: 'g. Implant - Total'},
    {method_id: 'NFPCM',    desc: 'h. NFP-CMM – Total'},
    {method_id: 'NFPBBT',   desc: 'i. NFP-BBT – Total'},
    {method_id: 'NFPSTM',   desc: 'j. NFP-STM – Total'},
    {method_id: 'NFPSDM',   desc: 'k. NFP-SDM - Total'},
    {method_id: 'NFPLAM',   desc: 'l. NFP-LAM - Total'},
  ]

  countTotalSummary(indicator_name, value, last?: boolean) {
    if(this.current_submit_flag) this.total_count[indicator_name] += value;
    if(last) this.current_submit_flag = false
  }
  exportX() {
    this.exportAsService.save(this.exportAsExcel, 'Family Planning M1').subscribe(() => {
      // save started
    });
  }

  name_list_params: {};

  showNameList(clientCode: string, methodId: string, minAge: number, maxAge: number) {
    this.name_list_params = {
      client_code: clientCode,
      method: methodId,
      month: this.reportForm.value.month,
      year: this.reportform_data.value.year,
      'age[0]': minAge,
      'age[1]': maxAge,
      category: this.reportForm.value.report_class,
      per_page: 10,
    };
    this.openList = true;
  }


    pdf_exported: boolean = false;
  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'Family Planning M1').subscribe(() => {
      // save started
    });
  }

  constructor(
    private exportAsService: ExportAsService,
    private http: HttpService,
  ) { }

  openList:boolean = false;
  toggleModal(){
    let list = [];

    this.show_nameList = list;
    this.openList = !this.openList;
  }

  convertDate(){
    this.convertedMonth = moment(this.reportForm.value.month, 'M').format('MMMM');
  }

  convertBrgy(){
    this.brgy_result = this.selected_barangay?.map((code) => this.brgys.find((el) => el.code == code).name);
  }

  ngOnChanges(): void {
    this.current_submit_flag = this.submit_flag;
    if(this.current_submit_flag){
      this.stats = this.report_data;
      this.reportform_data = this.reportForm;
      this.selected_barangay = this.selectedBrgy;
      this.info3 = this.userInfo;
      this.brgys_info = this.brgys;
      this.pdf_exported = false;
      this.convertBrgy();
      this.convertDate();
    }
  }
}
