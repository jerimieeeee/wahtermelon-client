import { Component, Input, OnChanges } from '@angular/core';
import { faFileExcel, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';

@Component({
  selector: 'app-fhsis2018-morbidity',
  templateUrl: './fhsis2018-morbidity.component.html',
  styleUrls: ['./fhsis2018-morbidity.component.scss']
})
export class Fhsis2018MorbidityComponent implements OnChanges {
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

  headers = [
    '0-6 Days', '7-28 Days', '29 Days - 11 Months', '1-4',
    '5-9', '10-14', '15-19', '20-24',
    '25-29', '30-34', '35-39', '40-44',
    '45-49', '50-54', '55-59', '60-64',
    '65-69', '70 Above', 'Total'
  ];

  indicator_var = [
    'male_age_0_to_6_days', 'female_age_0_to_6_days',
    'male_age_7_to_28_days', 'female_age_7_to_28_days',
    'male_age_29_days_to_11_months', 'female_age_29_days_to_11_months',
    'male_age_1_to_4_years', 'female_age_1_to_4_years',
    'male_age_5_to_9_years', 'female_age_5_to_9_years',
    'male_age_10_to_14_years', 'female_age_10_to_14_years',
    'male_age_15_to_19_years', 'female_age_15_to_19_years',
    'male_age_20_to_24_years', 'female_age_20_to_24_years',
    'male_age_25_to_29_years', 'female_age_25_to_29_years',
    'male_age_30_to_34_years', 'female_age_30_to_34_years',
    'male_age_35_to_39_years', 'female_age_35_to_39_years',
    'male_age_40_to_44_years', 'female_age_40_to_44_years',
    'male_age_45_to_49_years', 'female_age_45_to_49_years',
    'male_age_50_to_54_years', 'female_age_50_to_54_years',
    'male_age_55_to_59_years', 'female_age_55_to_59_years',
    'male_age_60_to_64_years', 'female_age_60_to_64_years',
    'male_age_65_to_69_years', 'female_age_65_to_69_years',
    'male_age_70_years_above', 'female_age_70_years_above',
    'male_age_total', 'female_age_total'
  ];

  exportX() {
    this.exportAsService.save(this.exportAsExcel, 'Morbidity').subscribe(() => {
      // save started
    });
  }

  pdf_exported: boolean = false;
  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'Morbidity').subscribe(() => {
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

    this.name_list = list;
    this.openList = !this.openList;
  }

  convertDate(){
    this.convertedMonth = moment(this.reportForm.value.month, 'M').format('MMMM');
  }

  convertBrgy(){
    this.brgy_result = this.selected_barangay?.map((code) => this.brgys.find((el) => el.code == code).name);
  }

  splitText(value: string, value_index: number): string {
    let splitString = value.split(';');
    return splitString[value_index];
  }

  show_stats: boolean = false;
  sortResult(data){
    let keyValue: any = Object.entries(data);
    keyValue.sort((a, b) => {
      return (a[1].male_age_total+a[1].female_age_total) - (b[1].male_age_total+b[1].female_age_total)
    });

    this.stats = keyValue;
    console.log(this.report_data)
    console.log(this.stats)
    this.show_stats = true;
  }

  ngOnChanges(): void {
    this.show_stats = false;
    // this.stats = this.report_data;
    this.reportform_data = this.reportForm;
    this.selected_barangay = this.selectedBrgy;
    this.info3 = this.userInfo;
    this.brgys_info = this.brgys;
    this.pdf_exported = false;

    this.sortResult(this.report_data);
    this.convertBrgy();
    // this.convertDate();
  }
}
