import { Component, Input, OnChanges } from '@angular/core';
import { faFileExcel, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';

@Component({
  selector: 'app-household-profiling',
  templateUrl: './household-profiling.component.html',
  styleUrls: ['./household-profiling.component.scss']
})
export class HouseholdProfilingComponent implements OnChanges{
  @Input() report_data;

  faFilePdf = faFilePdf;

  faFileExcel = faFileExcel;

  stats : any;

  entries: any;

  barangay_list: any;

  pdf_exported: boolean = false;

  getReport(){
    const entries = Object.entries(this.stats['Sexual Abuse'].female_age_0_to_5);
    this.barangay_list = entries
    console.log(entries);
  }

  exportAsExcel: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'profilingReport',
    options: {

    }
  }

  exportAsPdf: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'profilingReport',
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
    this.exportAsService.save(this.exportAsPdf, 'Household Profiling').subscribe(() => {
      // save started
    });
  }

  exportX() {
    this.exportAsService.save(this.exportAsExcel, 'Household Profiling').subscribe(() => {
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
    console.log(this.stats);
  }
}
