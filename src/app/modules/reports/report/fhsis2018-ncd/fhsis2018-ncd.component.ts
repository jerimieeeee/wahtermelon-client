import { Component, Input, OnChanges } from '@angular/core';
import { faCircleNotch, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { options } from 'app/modules/patient-registration/patient-registration.module';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as-17';
import moment from 'moment';
import { dateHelper } from 'app/shared/services/date-helper.service';

@Component({
  selector: 'app-fhsis2018-ncd',
  templateUrl: './fhsis2018-ncd.component.html',
  styleUrls: ['./fhsis2018-ncd.component.scss']
})
export class Fhsis2018NcdComponent implements OnChanges {
  @Input() report_data;
  @Input() reportForm;
  @Input() selectedBrgy;
  @Input() selectedCode!: any;
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
  selected_barangay : any;
  info3 : any;
  convertedMonth : any;
  brgys_info : any;
  name_list: any = [];

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

  exportX() {
    this.exportAsService.save(this.exportAsExcel, 'NCD M1').subscribe(() => {
      // save started
    });
  }

  pdf_exported: boolean = false;
  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'NCD M1').subscribe(() => {
      // save started
    });
  }

  constructor(
    private exportAsService: ExportAsService,
    private dateHelper: dateHelper
  ) { }

  openList:boolean = false;
  toggleModal(name_list, name_list2?){
    let list = [];
    if(name_list2) {
      list = name_list.concat(name_list2)
    } else {
      list = name_list
    }

    // console.log(typeof name_list)
    this.name_list = list;
    this.openList = !this.openList;
  }

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
      this.label_value = this.dateHelper.getLabelValue(this.reportForm, this.report_data);
      // console.log(this.label_value, this.report_data)
      if(this.selectedBrgy) this.convertBrgy();

      this.show_stats = true;
    }
  }
}
