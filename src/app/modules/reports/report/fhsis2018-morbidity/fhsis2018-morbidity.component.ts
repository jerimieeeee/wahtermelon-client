import { formatDate } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { faFileExcel, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { dateHelper } from 'app/shared/services/date-helper.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as-17';

@Component({
  selector: 'app-fhsis2018-morbidity',
  templateUrl: './fhsis2018-morbidity.component.html',
  styleUrls: ['./fhsis2018-morbidity.component.scss']
})
export class Fhsis2018MorbidityComponent implements OnChanges {
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
  brgy_result: any;
  convertedMonth : any;
  brgys_info : any;
  name_list: any = [];
  params: any = [];
  loc: 'cn';
  url: any = 'reports-2018/morbidity-namelist/name-list';

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
    '0-6 days', '7-28 days', '29 days-11 mos', '1-4 y/o',
    '5-9 y/o', '10-14 y/o', '15-19 y/o', '20-24 y/o',
    '25-29 y/o', '30-34 y/o', '35-39 y/o', '40-44 y/o',
    '45-49 y/o', '50-54 y/o', '55-59 y/o', '60-64 y/o',
    '65-69 y/o', '≥ 70 y/o', 'TOTAL', 'TOTAL Both Sex'
  ];

  name_list_params: {};

  showNameList(params, icd10: any) {
    this.params = params;
    this.name_list_params = {
      icd10: icd10,
      type: params.type,
      gender:params.gender,
      start_date: this.reportForm.value.start_date ,
      end_date: this.reportForm.value.end_date,
      'age[0]': params.start,
      'age[1]': params.end,
      category: this.reportForm.value.report_class,
      per_page: 10,
    };
    this.openList = true;
    };

  indicator_var = [
    {var_name: 'male_age_0_to_6_days',             gender: 'M', start: 0, end: 6,   type: 'days'},
    {var_name: 'female_age_0_to_6_days',           gender: 'F', start: 0, end: 6,   type: 'days'},
    {var_name: 'male_age_7_to_28_days',            gender: 'M', start: 7, end: 28,  type: 'days'},
    {var_name: 'female_age_7_to_28_days',          gender: 'F', start: 7, end: 28,  type: 'days'},
    {var_name: 'male_age_29_days_to_11_months',    gender: 'M', type: 'days_months'},
    {var_name: 'female_age_29_days_to_11_months',  gender: 'F', type: 'days_months'},
    {var_name: 'male_age_1_to_4_years',            gender: 'M', start: 1, end: 4,   type: 'years'},
    {var_name: 'female_age_1_to_4_years',          gender: 'F', start: 1, end: 4,   type: 'years'},
    {var_name: 'male_age_5_to_9_years',            gender: 'M', start: 5, end: 9,   type: 'years'},
    {var_name: 'female_age_5_to_9_years',          gender: 'F', start: 5, end: 9,   type: 'years'},
    {var_name: 'male_age_10_to_14_years',          gender: 'M', start: 10, end: 14, type: 'years'},
    {var_name: 'female_age_10_to_14_years',        gender: 'F', start: 10, end: 14, type: 'years'},
    {var_name: 'male_age_15_to_19_years',          gender: 'M', start: 15, end: 19, type: 'years'},
    {var_name: 'female_age_15_to_19_years',        gender: 'F', start: 15, end: 19, type: 'years'},
    {var_name: 'male_age_20_to_24_years',          gender: 'M', start: 20, end: 24, type: 'years'},
    {var_name: 'female_age_20_to_24_years',        gender: 'F', start: 20, end: 24, type: 'years'},
    {var_name: 'male_age_25_to_29_years',          gender: 'M', start: 25, end: 29, type: 'years'},
    {var_name: 'female_age_25_to_29_years',        gender: 'F', start: 25, end: 29, type: 'years'},
    {var_name: 'male_age_30_to_34_years',          gender: 'M', start: 30, end: 34, type: 'years'},
    {var_name: 'female_age_30_to_34_years',        gender: 'F', start: 30, end: 34, type: 'years'},
    {var_name: 'male_age_35_to_39_years',          gender: 'M', start: 35, end: 39, type: 'years'},
    {var_name: 'female_age_35_to_39_years',        gender: 'F', start: 35, end: 39, type: 'years'},
    {var_name: 'male_age_40_to_44_years',          gender: 'M', start: 40, end: 44, type: 'years'},
    {var_name: 'female_age_40_to_44_years',        gender: 'F', start: 40, end: 44, type: 'years'},
    {var_name: 'male_age_45_to_49_years',          gender: 'M', start: 45, end: 49, type: 'years'},
    {var_name: 'female_age_45_to_49_years',        gender: 'F', start: 45, end: 49, type: 'years'},
    {var_name: 'male_age_50_to_54_years',          gender: 'M', start: 50, end: 54, type: 'years'},
    {var_name: 'female_age_50_to_54_years',        gender: 'F', start: 50, end: 54, type: 'years'},
    {var_name: 'male_age_55_to_59_years',          gender: 'M', start: 55, end: 59, type: 'years'},
    {var_name: 'female_age_55_to_59_years',        gender: 'F', start: 55, end: 59, type: 'years'},
    {var_name: 'male_age_60_to_64_years',          gender: 'M', start: 60, end: 64, type: 'years'},
    {var_name: 'female_age_60_to_64_years',        gender: 'F', start: 60, end: 64, type: 'years'},
    {var_name: 'male_age_65_to_69_years',          gender: 'M', start: 65, end: 69, type: 'years'},
    {var_name: 'female_age_65_to_69_years',        gender: 'F', start: 65, end: 69, type: 'years'},
    {var_name: 'male_age_70_years_above',          gender: 'M', type: 'above_70'},
    {var_name: 'female_age_70_years_above',        gender: 'F', type: 'above_70'},
    {var_name: 'male_age_total',                   gender: 'M', type: 'total'},
    {var_name: 'female_age_total',                 gender: 'F', type: 'total'},
    {var_name: 'male_female_total',                  type: 'total_both'},
  ]

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
    private exportAsService: ExportAsService,
    private dateHelper: dateHelper
  ) { }

  openList:boolean = false;



  toggleModal(){
    let list = [];

    this.name_list = list;
    this.openList = !this.openList;
  }

  convertDate(){
    this.convertedMonth = formatDate(this.reportForm.value.month, 'MMMM', 'en', 'Asia/Manila')
    // this.convertedMonth = moment(this.reportForm.value.month, 'M').format('MMMM');
  }

  convertBrgy(){
    this.brgy_result = this.selectedBrgy?.map((code) => this.brgys.find((el) => el.code == code).name);
  }

  splitText(value: string, value_index: number): string {
    let splitString = value.split(';');
    return splitString[value_index];
  }

  sortResult(data){
    data.sort((a, b) => {
      return b.male_female_total - a.male_female_total;
    });

    this.show_stats = true;
  }

  label_value: {};
  ngOnChanges(): void {
    this.current_submit_flag = this.submit_flag;
    if(this.current_submit_flag){
      this.show_stats = false;
      this.stats = this.report_data.data;
      this.brgys_info = this.brgys;
      this.pdf_exported = false;
      this.label_value = this.dateHelper.getLabelValue(this.reportForm, this.report_data);
      // console.log(this.stats)
      if(this.selectedBrgy) this.convertBrgy();
      this.sortResult(this.stats)
      this.show_stats = true;
    }
  }
}
