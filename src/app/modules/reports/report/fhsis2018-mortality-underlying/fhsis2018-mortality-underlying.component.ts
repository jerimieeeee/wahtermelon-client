import { Component, Input, OnChanges } from '@angular/core';
import { faFileExcel, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { dateHelper } from 'app/shared/services/date-helper.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';

@Component({
    selector: 'app-fhsis2018-mortality-underlying',
    templateUrl: './fhsis2018-mortality-underlying.component.html',
    styleUrls: ['./fhsis2018-mortality-underlying.component.scss'],
    standalone: false
})
export class Fhsis2018MortalityUnderlyingComponent implements OnChanges{
  @Input() report_data;
  @Input() reportForm;
  @Input() selectedBrgy;
  @Input() selectedCode!: any;
  @Input() brgys;
  @Input() facility;
  @Input() submit_flag;
  current_submit_flag: boolean = false;
  show_stats: boolean = false;
  // @Input() name_list_params: any;

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
  loc: '';
  url: any = 'reports-2018/mortality/m1-underlying-name-list';

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

  indicator_var = [
    { var_name: 'male_0_to_6_days' },           { var_name: 'female_0_to_6_days' },
    { var_name: 'male_7_to_28_days' },          { var_name: 'female_7_to_28_days' },
    { var_name: 'male_29_days_to_11_months' },  { var_name: 'female_29_days_to_11_months' },
    { var_name: 'male_1_to_4_years' },          { var_name: 'female_1_to_4_years' },
    { var_name: 'male_5_to_9_years' },          { var_name: 'female_5_to_9_years' },
    { var_name: 'male_10_to_14_years' },        { var_name: 'female_10_to_14_years' },
    { var_name: 'male_15_to_19_years' },        { var_name: 'female_15_to_19_years' },
    { var_name: 'male_20_to_24_years' },        { var_name: 'female_20_to_24_years' },
    { var_name: 'male_25_to_29_years' },        { var_name: 'female_25_to_29_years' },
    { var_name: 'male_30_to_34_years' },        { var_name: 'female_30_to_34_years' },
    { var_name: 'male_35_to_39_years' },        { var_name: 'female_35_to_39_years' },
    { var_name: 'male_40_to_44_years' },        { var_name: 'female_40_to_44_years' },
    { var_name: 'male_45_to_49_years' },        { var_name: 'female_45_to_49_years' },
    { var_name: 'male_50_to_54_years' },        { var_name: 'female_50_to_54_years' },
    { var_name: 'male_55_to_59_years' },        { var_name: 'female_55_to_59_years' },
    { var_name: 'male_60_to_64_years' },        { var_name: 'female_60_to_64_years' },
    { var_name: 'male_65_to_69_years' },        { var_name: 'female_65_to_69_years' },
    { var_name: 'male_70_years_above' },        { var_name: 'female_70_years_above' },
    { var_name: 'male_age_total' },             { var_name: 'female_age_total' },
  ]
  name_list_params: {};

  showNameList(params, icd10: any) {
    this.params = params;
    /* this.name_list_params = {
      month: this.reportForm.value.month ,
      year: this.reportForm.value.year,
      category: this.reportForm.value.report_class,
      params: this.params,
      per_page: 10,
    }; */

    this.name_list_params = {
      icd10_code: icd10,
      start_date: this.reportForm.value.start_date,
      end_date: this.reportForm.value.end_date,
      category: this.reportForm.value.report_class,
      params: this.params,
      per_page: 10,
    };
    this.openList = true;
  };

  exportX() {
    console.log('exporting in excel')
    this.exportAsService.save(this.exportAsExcel, 'Mortality and Natality M1').subscribe(() => {
      // save started
    });
  }

  pdf_exported: boolean = false;
  exportP() {
    console.log('exporting in pdf')
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'Mortality and Natality M1').subscribe(() => {
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

  /* convertDate(){
    this.convertedMonth = moment(this.reportForm.value.month, 'M').format('MMMM');
  } */

  convertBrgy(){
    this.brgy_result = this.selected_barangay?.map((code) => this.brgys.find((el) => el.code == code).name);
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
      console.log(this.label_value, this.report_data)
      if(this.selectedBrgy) this.convertBrgy();

      this.show_stats = true;
    }
  }
}
