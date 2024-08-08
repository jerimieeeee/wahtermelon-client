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
    this.exportAsService.save(this.exportAsExcel, 'Environmental M1').subscribe(() => {
      // save started
    });
  }

  pdf_exported: boolean = false;
  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'Environmental M1').subscribe(() => {
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

    // console.log(typeof name_list)
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
    this.stats = this.report_data;
    this.reportform_data = this.reportForm;
    this.selected_barangay = this.selectedBrgy;
    this.info3 = this.userInfo;
    this.brgys_info = this.brgys;
    this.pdf_exported = false;

    this.convertBrgy();
    // this.convertDate();
  }
}
