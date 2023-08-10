import { Component, Input, OnChanges } from '@angular/core';
import { faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';

@Component({
  selector: 'app-catalyst-report',
  templateUrl: './catalyst-report.component.html',
  styleUrls: ['./catalyst-report.component.scss']
})
export class CatalystReportComponent implements OnChanges {
  @Input() report_data;

  faFilePdf = faFilePdf;

  faFileExcel = faFileExcel;

  stats : any;

  entries: any;

  barangay_list: any;

  pdf_exported: boolean = false;

  // x = 
  //   {
  //     'sexual_abuse': [
  //       'male_age_0_to_5',
  //       'female_age_0_to_5',

  //       'male_age_6_to_11',
  //       'female_age_6_to_11',        
  //     ],

  //     'economic_abuse': [
  //       'male_age_0_to_5',
  //       'female_age_0_to_5',

  //       'male_age_6_to_11',
  //       'female_age_6_to_11',        
  //     ]
  
  //   }

  getReport(){
    const entries = Object.entries(this.stats['Sexual Abuse'].female_age_0_to_5);
    this.barangay_list = entries
    console.log(entries);
  }

  exportAsExcel: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'catalystForm',
    options: {
      
    }
  }

  exportAsPdf: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'catalystForm',
    options: {
      image: { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 3},
      margin:  [1, 1, 1, 1],
      pagebreak: { mode: ['avoid-all', 'css', 'legacy']},
      jsPDF: {
        orientation: 'landscape',
        format: 'a4',
        precision: 16
      }
    }
  }

  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'GBV Medical').subscribe(() => {
      // save started
    });
  }

  exportX() {
    this.exportAsService.save(this.exportAsExcel, 'GBV Report').subscribe(() => {
      // save started
    });
  }

  returnZero() {
    return 0
    }
  
  constructor(
      private exportAsService: ExportAsService
  ) { }

  ngOnChanges(): void {
    this.stats = this.report_data;
    console.log(this.stats, 'test report data')
    this.getReport();
  }

}
