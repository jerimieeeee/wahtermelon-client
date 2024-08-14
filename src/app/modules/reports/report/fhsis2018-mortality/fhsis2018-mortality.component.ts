import { Component, Input, OnChanges } from '@angular/core';
import { faFileExcel, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';

@Component({
  selector: 'app-fhsis2018-mortality',
  templateUrl: './fhsis2018-mortality.component.html',
  styleUrls: ['./fhsis2018-mortality.component.scss']
})
export class Fhsis2018MortalityComponent implements OnChanges{
  @Input() report_data;
  @Input() reportForm;
  @Input() selectedBrgy;
  @Input() brgys;
  @Input() userInfo;
  // @Input() name_list_params: any;

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
  params: any = [];
  loc: '';
  url: any = 'reports-2018/mortality/name-list';

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

  name_list_params: {};

  showNameList(params) {
    this.params = params;
    this.name_list_params = {
      month: this.reportForm.value.month ,
      year: this.reportForm.value.year,
      category: this.reportForm.value.report_class,
      params: this.params,
      per_page: 10,
    };
    this.openList = true;
  };

  exportX() {
    this.exportAsService.save(this.exportAsExcel, 'Mortality and Natality M1').subscribe(() => {
      // save started
    });
  }

  pdf_exported: boolean = false;
  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'Mortality and Natality M1').subscribe(() => {
      // save started
    });
  }

  constructor(
    private exportAsService: ExportAsService
  ) { }

  openList:boolean = false;
  toggleModal(){
    let list = [];

    this.name_list = list;
    this.openList = !this.openList;
  }

  /* convertDate(){
    this.convertedMonth = moment(this.reportForm.value.month, 'M').format('MMMM');
  } */

  convertBrgy(){
    this.brgy_result = this.selected_barangay?.map((code) => this.brgys.find((el) => el.code == code).name);
  }

  ngOnChanges(): void {
    this.stats = this.report_data[0];
    this.reportform_data = this.reportForm;
    this.selected_barangay = this.selectedBrgy;
    this.info3 = this.userInfo;
    this.brgys_info = this.brgys;
    this.pdf_exported = false;
    this.convertBrgy();
  }
}
