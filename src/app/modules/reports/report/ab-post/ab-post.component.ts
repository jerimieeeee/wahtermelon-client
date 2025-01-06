import { Component, Input, OnChanges } from '@angular/core';
import { faFileExcel, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as-17';

@Component({
    selector: 'app-ab-post',
    templateUrl: './ab-post.component.html',
    styleUrls: ['./ab-post.component.scss'],
    standalone: false
})
export class AbPostComponent implements OnChanges {
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
  info : any;
  convertedMonth : any;
  brgys_info : any;
  name_list: any = [];
  params: any = [];
  url: any = 'reports-2018/animal-bite/cohort-name-list';

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

  var_list:any = [
    {name: 'Total Category II',                   var_name: 'total_cat2'},
    {name: 'Total Category III',                  var_name: 'total_cat3'},
    {name: 'Total Category II and Category III',  var_name: 'total_cat2_and_cat3'}
  ];

  exportX() {
    this.exportAsService.save(this.exportAsExcel, 'Post-Exposure').subscribe(() => {
      // save started
    });
  }

  pdf_exported: boolean = false;
  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'Post-Exposure').subscribe(() => {
      // save started
    });
  }

  openList:boolean = false;

  toggleModal(){
    let list = [];

    this.name_list = list;
    this.openList = !this.openList;
  }

  constructor(
    private exportAsService: ExportAsService
  ) { }

  show_stats: boolean = false;
  ngOnChanges(): void {
    this.stats = this.report_data[0];
    this.reportform_data = this.reportForm;
    this.selected_barangay = this.selectedBrgy;
    this.info = this.userInfo;
    this.brgys_info = this.brgys;
    this.pdf_exported = false;
    this.show_stats = true;

    console.log(this.stats)
    console.log(this.info)
  }
}
