import { Component, Input, OnChanges } from '@angular/core';
import { faFileExcel, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { var_list } from './dentalVarList';

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
  url: any = 'reports-2018/fp-namelist/name-list';

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

  var_list: any = var_list;

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

  constructor(
    private exportAsService: ExportAsService
  ) { }

  ngOnChanges(): void {
    this.current_submit_flag = this.submit_flag;
    if(this.current_submit_flag){
      this.stats = this.report_data[0];
      this.reportform_data = this.reportForm;
      this.selected_barangay = this.selectedBrgy;
      this.info3 = this.userInfo;
      this.brgys_info = this.brgys;
      this.pdf_exported = false;
      /* this.convertBrgy();
      this.convertDate(); */
      // console.log(this.stats)
    }
  }
}
