import {Component, Input, OnChanges} from '@angular/core';
import { faCircleNotch, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import {ExportAsConfig, ExportAsService} from "ngx-export-as";
import * as moment from "moment/moment";

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
  name_list: any = [];

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

  cu_beginning_month_total = {
    current_user_beginning_month_10_to_14: 0,
    current_user_beginning_month_15_to_19: 0,
    current_user_beginning_month_20_to_49: 0,
  }

  countCUBeginningMonthTotal(indicator_name, value) {
    this.cu_beginning_month_total[indicator_name] += value;
  }

  na_previous_month_total = {
    new_acceptor_previous_month_10_to_14: 0,
    new_acceptor_previous_month_15_to_19: 0,
    new_acceptor_previous_month_20_to_49: 0,
  }

  countNAPreviousMonthTotal(indicator_name, value) {
    this.na_previous_month_total[indicator_name] += value;
  }

  fp_total_users = {
    // Current User (Beginning Month)
    current_user_beginning_month_10_to_14: 0,
    current_user_beginning_month_15_to_19: 0,
    current_user_beginning_month_20_to_49: 0,

    //New Acceptors (Previous Month)
    new_acceptor_previous_month_10_to_14: 0,
    new_acceptor_previous_month_15_to_19: 0,
    new_acceptor_previous_month_20_to_49: 0,

    //Other Acceptors (Previous Month)
    other_acceptor_present_month_10_to_14: 0,
    other_acceptor_present_month_15_to_19: 0,
    other_acceptor_present_month_20_to_49: 0,

    //Dropout (Present Month)
    dropout_present_month_10_to_14: 0,
    dropout_present_month_15_to_19: 0,
    dropout_present_month_20_to_49: 0,

    //Current User (End of Month)
    cu_end_month_10_to_14: 0,
    cu_end_month_15_to_19: 0,
    cu_end_month_20_to_49: 0,

    //New Acceptors (Present Month)
    new_acceptor_present_month_10_to_14: 0,
    new_acceptor_present_month_15_to_19: 0,
    new_acceptor_present_month_20_to_49: 0,
  }

  countFpTotalUsers(indicator_name, value) {
    this.fp_total_users[indicator_name] += value;
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

  countTotalSummary(indicator_name, value) {
    this.total_count[indicator_name] += value;
  }
  exportX() {
    this.exportAsService.save(this.exportAsExcel, 'Family Planning M1').subscribe(() => {
      // save started
    });
  }

  pdf_exported: boolean = false;
  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'Family Planning M1').subscribe(() => {
      // save started
    });
  }

  constructor(
    private exportAsService: ExportAsService
  ) { }

  openList:boolean = false;
  toggleModal(name_list, name_list2?, name_list3?){
    let list = [];
    if(name_list2) {
      list = name_list.concat(name_list2)
    }
    else if (name_list3) {
      list = name_list.concat(name_list3)
    }
    else {
      list = name_list
    }

    // console.log(typeof name_list)
    this.name_list = list;
    this.openList = !this.openList;
  }

  countTotal(var_name: string) {
    this[var_name] += 1;
    // console.log(this[var_name]);
  }

  convertDate(){
    this.convertedMonth = moment(this.reportForm.value.month, 'M').format('MMMM');
  }

  convertBrgy(){
    this.brgy_result = this.selected_barangay?.map((code) => this.brgys.find((el) => el.code == code).name);
  }

  ngOnChanges(): void {
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
