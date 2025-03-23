import {Component, Input} from '@angular/core';
import {ExportAsConfig, ExportAsService} from "ngx-export-as";
import {
  faAnglesLeft, faAnglesRight,
  faChevronLeft,
  faChevronRight,
  faCircleNotch,
  faFileExcel,
  faFilePdf
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-senior-masterlist',
  templateUrl: './senior-masterlist.component.html',
  styleUrl: './senior-masterlist.component.scss',
  standalone: false
})
export class SeniorMasterlistComponent {
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

  ngOnChanges(): void {
    this.stats = this.report_data.data;
    this.pdf_exported = false;
  }

  protected readonly faAnglesLeft = faAnglesLeft;
  protected readonly faChevronRight = faChevronRight;
  protected readonly faChevronLeft = faChevronLeft;
  protected readonly faAnglesRight = faAnglesRight;
  protected readonly Number = Number;
}
