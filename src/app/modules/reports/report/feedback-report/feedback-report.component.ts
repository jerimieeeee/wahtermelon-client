import { Component, Input, OnChanges } from '@angular/core';
import { faCircleNotch, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';

@Component({
    selector: 'app-feedback-report',
    templateUrl: './feedback-report.component.html',
    styleUrls: ['./feedback-report.component.scss'],
    standalone: false
})
export class FeedbackReportComponent implements OnChanges {
  @Input() report_data;
  @Input() reportForm;
  @Input() selectedBrgy;
  @Input() selectedCode!: any;
  @Input() brgys;
  @Input() userInfo;
  @Input() start_date;
  @Input() end_date;

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
    this.exportAsService.save(this.exportAsExcel, 'Morbidity').subscribe(() => {
      // save started
    });
  }

  pdf_exported: boolean = false;
  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'Morbidity').subscribe(() => {
      // save started
    });
  }

  constructor(
    private exportAsService: ExportAsService
  ) { }

  openList:boolean = false;
  toggleModal(name_list, name_list2?){
    let list = [];
    if(name_list2) {
      list = name_list.concat(name_list2)
    } else {
      list = name_list
    }

    this.name_list = list;
    this.openList = !this.openList;
  }

  convertBrgy(){
    this.brgy_result = this.selected_barangay?.map((code) => this.brgys.find((el) => el.code == code).name);
  }

  splitText(value: string, value_index: number): string {
    let splitString = value.split(';');
    return splitString[value_index];
  }

  show_stats: boolean = false;

  ngOnChanges(): void {
    this.show_stats = false;
    // this.reportform_data = this.reportForm;
    // this.selected_barangay = this.selectedBrgy;
    // this.info3 = this.userInfo;
    // this.brgys_info = this.brgys;
    // this.pdf_exported = false;

    // this.convertBrgy();
  }
}
