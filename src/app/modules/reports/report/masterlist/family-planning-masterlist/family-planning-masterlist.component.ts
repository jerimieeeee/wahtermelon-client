import {Component, Input, OnChanges} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ExportAsConfig, ExportAsService} from "ngx-export-as";
import { faCircleNotch, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-family-planning-masterlist',
  templateUrl: './family-planning-masterlist.component.html',
  styleUrl: './family-planning-masterlist.component.scss',
  standalone: false,
})

export class FamilyPlanningMasterlistComponent implements OnChanges {
  @Input() report_data;
  @Input() reportForm;
  @Input() selectedBrgy;
  @Input() selectedCode!: any;
  @Input() brgys;
  @Input() facility;
  @Input() submit_flag;
  @Input() start_date;
  @Input() end_date;

  current_submit_flag: boolean = false;
  show_stats: boolean = false;

  faCircleNotch = faCircleNotch;
  faFileExcel = faFileExcel;
  faFilePdf = faFilePdf;

  stats : any;
  name_list: any = [];

  exportAsExcel: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'reportForm'
  }

  exportAsPdf: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'reportForm',
    options: {
      image: { type: 'jpeg', quality: 1 },
      jsPDF: {
        orientation: 'landscape',
        format: 'a4',
        precision: 16
      }
    }
  }

  exportX() {
    this.exportAsService.save(this.exportAsExcel, 'test').subscribe(() => {
      // save started
    });
  }

  pdf_exported: boolean = false;
  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'test').subscribe(() => {
      // save started
    });
  }

  constructor(
    private exportAsService: ExportAsService
  ) { }

  openList:boolean = false;

  ngOnChanges(): void {
    this.stats = this.report_data.data;
    this.pdf_exported = false;
    console.log(this.reportForm.value, "etoo")
  }

}
