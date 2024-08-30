import { Component, Input, OnChanges } from '@angular/core';
import { faFileExcel, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { var_list } from './dentalVarList';
import * as moment from 'moment';
import { dateHelper } from 'app/shared/services/date-helper.service';

@Component({
  selector: 'app-fhsis2018-dental-m1',
  templateUrl: './fhsis2018-dental-m1.component.html',
  styleUrls: ['./fhsis2018-dental-m1.component.scss']
})
export class Fhsis2018DentalM1Component implements OnChanges{
  @Input() report_data;
  @Input() reportForm;
  @Input() selectedBrgy;
  @Input() brgys;
  @Input() facility;
  @Input() submit_flag;
  current_submit_flag: boolean = false;
  show_stats: boolean = false;

  faCircleNotch = faCircleNotch;
  faFileExcel = faFileExcel;
  faFilePdf = faFilePdf;

  stats : any;
  brgy_result: any;
  reportform_data : any;
  params: any = [];
  name_list: any = [];
  selected_barangay : any;
  convertedMonth : any;
  brgys_info : any;
  url: any = 'reports-2018/dental/name-list';

  exportAsExcel: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'reportForm',
    options: { }
  }

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

  var_list: any = var_list;
  name_list_params: {};

  exportX() {
    this.exportAsService.save(this.exportAsExcel, 'Dental OHC M1').subscribe(() => {
      // save started
    });
  }

  pdf_exported: boolean = false;
  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'Dental OHC M1').subscribe(() => {
      // save started
    });
  }

  openList:boolean = false;
  toggleModal(){
    let list = [];

    this.name_list = list;
    this.openList = !this.openList;
  }

  showNameList(params, var_lead) {
    if(var_lead === 'data') this.url = 'reports-2018/dental/name-list';
    if(var_lead === 'dental_dmft') this.url = 'reports-2018/dental/name-list-dmft';

    this.params = params;
    this.name_list_params = {
      start_date: this.reportForm.value.start_date,
      end_date: this.reportForm.value.end_date,
      category: this.reportForm.value.report_class,
      params: this.params,
      per_page: 10,
    };
    this.openList = true;
  };

  constructor(
    private exportAsService: ExportAsService,
    private dateHelper: dateHelper
  ) { }

  convertDate(){
    this.convertedMonth = moment(this.reportForm.value.month, 'M').format('MMMM');
  }

  convertBrgy(){
    this.brgy_result = this.selected_barangay?.map((code) => this.brgys.find((el) => el.code == code).name);
  }

  label_value: {};
  ngOnChanges(): void {
    this.current_submit_flag = this.submit_flag;
    if(this.current_submit_flag){
      this.show_stats = false;
      this.stats = this.report_data;
      this.brgys_info = this.brgys;
      this.pdf_exported = false;
      console.log(this.stats, 'amen')
      /* this.convertBrgy();
      this.convertDate(); */
      // console.log(this.stats)
      this.label_value = this.dateHelper.getLabelValue(this.reportForm, this.report_data);
      // console.log(this.label_value, this.report_data)
      if(this.selectedBrgy) this.convertBrgy();

      this.show_stats = true;
    }
  }
}
