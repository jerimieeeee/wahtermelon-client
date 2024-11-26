import { Component, Input, OnChanges } from '@angular/core';
import { faCircleNotch, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@angular/common';
import { dateHelper } from 'app/shared/services/date-helper.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as-17';

@Component({
  selector: 'app-fhsis2018-mc',
  templateUrl: './fhsis2018-mc.component.html',
  styleUrls: ['./fhsis2018-mc.component.scss']
})
export class Fhsis2018McComponent implements OnChanges {
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
  selected_barangay : any;
  convertedMonth : any;
  brgys_info : any;
  name_list: any = [];
  openList:boolean = false;

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
        format: 'legal',
        precision: 16
      }
    }
  }

  exportX() {
    this.exportAsService.save(this.exportAsExcel, 'Materna M1').subscribe(() => {
      // save started
    });
  }

  pdf_exported: boolean = false;
  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'Maternal M1').subscribe(() => {
      // save started
    });
  }

  constructor(
    private exportAsService: ExportAsService,
    private dateHelper: dateHelper
  ) { }

  toggleModal(name_list, name_list2?, name_list3?){
    let list = [];
    if(name_list2 || name_list3) {
      if(name_list2 && name_list3) {
        list = name_list.concat(name_list2,name_list3)
      } else {
        list = name_list2 ? name_list.concat(name_list2) : name_list.concat(name_list3);
      }
    } else {
      list = name_list
    }

    this.name_list = list;
    this.openList = !this.openList;
  }

  convertDate(){
    this.convertedMonth = formatDate(this.reportForm.value.month, 'MMMM', 'en', 'Asia/Manila')
  }

  convertBrgy(){
    this.brgy_result = this.selectedBrgy?.map((code) => this.brgys.find((el) => el.code == code).name);
  }

  // label_value: {};
  ngOnChanges(): void {
    this.current_submit_flag = this.submit_flag;
    if(this.current_submit_flag){
      this.show_stats = false;
      this.stats = this.report_data;
      // this.brgys_info = this.brgys;
      this.pdf_exported = false;
      // this.label_value = this.dateHelper.getLabelValue(this.reportForm, this.report_data);
      // console.log()
      // if(this.selectedBrgy) this.convertBrgy();

      this.show_stats = true;
    }
  }
}
