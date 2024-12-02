import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { faCircleNotch, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { options } from 'app/modules/patient-registration/patient-registration.module';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as-17';
import moment from 'moment';

@Component({
  selector: 'app-daily-service',
  templateUrl: './daily-service.component.html',
  styleUrls: ['./daily-service.component.scss']
})

export class DailyServiceComponent implements OnChanges {
  @Input() report_data;
  @Input() reportForm;
  @Input() selectedBrgy;
  @Input() selectedCode!: any;
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
    this.exportAsService.save(this.exportAsExcel, 'Daily Service').subscribe(() => {
      // save started
    });
  }

  pdf_exported: boolean = false;
  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'Daily Service').subscribe(() => {
      // save started
    });
  }

  constructor(
    private exportAsService: ExportAsService
  ) { }

  count_male: number = 0;
  count_female: number = 0;
  count_konsulta: number = 0;
  count_consent: number = 0;
  count_philhealth: number = 0;
  countedConditions: string[] = [];
  // countTotal(var_name: string) {
  //   this[var_name] += 1;
  //   // console.log(this[var_name]);
  // }

  current_submit_value: boolean = false;
  countTotal(var_name: string, last?) {
    if(this.current_submit_value === true) {
      this[var_name] += 1;
      this.countedConditions.push(var_name);
    }

    if(last) this.current_submit_value = false;
  }
  convertDate(){
    this.convertedMonth = moment(this.reportForm.value.month, 'M').format('MMMM');
  }

  convertDate2(){
    this.convertedMonth = moment(this.reportForm.value.patient.birthdate, 'Y').format('YYYY');
  }

  convertBrgy(){
    this.brgy_result = this.selected_barangay?.map((code) => this.brgys.find((el) => el.code == code).name);
  }

  ngOnChanges(): void {
    this.current_submit_value = this.submit_flag;

    if(this.submit_flag) {
      this.count_male = 0;
      this.count_female = 0;
      this.count_konsulta = 0;
      this.count_consent  = 0;
      this.count_philhealth = 0;
      this.reportform_data = this.reportForm.data;
      this.stats = this.report_data.data;
      this.selected_barangay = this.selectedBrgy;
      this.info3 = this.userInfo;
      this.brgys_info = this.brgys;
      this.pdf_exported = false;
      this.convertBrgy();
      this.convertDate();
    }
  }
}
