import { Component, Input, OnChanges } from '@angular/core';
import { faFileExcel, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { dateHelper } from 'app/shared/services/date-helper.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as-17';

@Component({
  selector: 'app-ab-pre',
  templateUrl: './ab-pre.component.html',
  styleUrls: ['./ab-pre.component.scss']
})
export class AbPreComponent implements OnChanges {
  @Input() report_data;
  @Input() reportForm;
  @Input() selectedBrgy;
  @Input() brgys;
  @Input() facility;
  @Input() submit_flag;
  current_submit_flag: boolean = false;
  show_stats: boolean = false;

  faCircleNotch = faCircleNotch;
  faFileExcel = faFileExcel;
  faFilePdf = faFilePdf;

  stats : any;
  brgy_result: any;
  reportform_data : any;
  selected_barangay : any;
  convertedMonth : any;
  brgys_info : any;
  name_list: any = [];
  params: any = [];
  url: any = 'reports-2018/animal-bite/pre-exposure-name-list';

  exportAsExcel: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'reportForm',
    options: { }
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
  showNameList(params, barangay_code) {
    console.log(params)
    this.params = params;
    this.name_list_params = {
      start_date: this.reportForm.value.start_date,
      end_date: this.reportForm.value.end_date,
      category: this.reportForm.value.report_class,
      params: this.params,
      per_page: 10,
      barangay_code: barangay_code
    };
    this.openList = true;
  };

  total: {
    male: 0,
    female: 0,
    less_than_15: 0,
    greater_than_15: 0,
    day0: 0,
    day0_day7: 0,
    day0_day7_day21: 0
  };

  countTotal(var_name, value, last?: boolean) {
    console.log()
    if(this.current_submit_flag) this.total[var_name] += value;
    if(last) this.current_submit_flag = false
  }

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
    private exportAsService: ExportAsService,
    private dateHelper: dateHelper
  ) { }

  label_value: {};
  ngOnChanges(): void {
    this.current_submit_flag = this.submit_flag;
    if(this.current_submit_flag){
      this.total = {
        male: 0,
        female: 0,
        less_than_15: 0,
        greater_than_15: 0,
        day0: 0,
        day0_day7: 0,
        day0_day7_day21: 0
      };
      this.selected_barangay = this.selectedBrgy;
      this.show_stats = false;
      this.stats = this.report_data;
      this.brgys_info = this.brgys;
      this.pdf_exported = false;
      this.label_value = this.dateHelper.getLabelValue(this.reportForm, this.report_data);

      this.show_stats = true;
    }
  }
}
