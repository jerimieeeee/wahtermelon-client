import { Component, Input, OnChanges } from '@angular/core';
import { faCircleNotch, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-fhsis2018-mc',
  templateUrl: './fhsis2018-mc.component.html',
  styleUrls: ['./fhsis2018-mc.component.scss']
})
export class Fhsis2018McComponent implements OnChanges {
  @Input() report_data;

  faCircleNotch = faCircleNotch;
  faFileExcel = faFileExcel;
  faFilePdf = faFilePdf;

  stats : any;
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
    private exportAsService: ExportAsService
  ) { }

  openList:boolean = false;
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

  ngOnChanges(): void {
    this.stats = this.report_data;
    this.pdf_exported = false;
  }
}
