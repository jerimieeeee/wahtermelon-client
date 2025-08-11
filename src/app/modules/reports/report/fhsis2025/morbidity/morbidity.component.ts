import {Component, Input} from '@angular/core';
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ReportsModule} from "../../../reports.module";

@Component({
  selector: 'app-morbidity',
    imports: [
        DecimalPipe,
        FaIconComponent,
        NgForOf,
        NgIf,
    ],
  templateUrl: './morbidity.component.html',
  styleUrl: './morbidity.component.scss',
})
export class MorbidityComponent {
  @Input() report_data;
  @Input() reportForm;
  @Input() selectedBrgy;
  @Input() selectedCode!: any;
  @Input() brgys;
  @Input() facility;
  @Input() submit_flag;
  @Input() length: number;
  @Input() pageOffset: number;
  @Input() pageIndex: number;
  @Input() loc: any;
  @Input() params: any;

  current_submit_flag: boolean = false;
  show_stats: boolean = false;

  stats : any;
  brgy_result: any;
  convertedMonth : any;
  brgys_info : any;
  name_list: any = [];
  url: any = 'reports-2018/morbidity-namelist/name-list';

  headers = [
    '0-6 days Male',
    '0-6 days Female',
    '0-6 days Total',

    '7-28 days Male',
    '7-28 days Female',
    '7-28 days Total',

    '29 days to 11 months Male',
    '29 days to 11 months Female',
    '29 days to 11 months Total',

    '1-4 years old Male',
    '1-4 years old Female',
    '1-4 years old Total',

    '5-9 years old Male',
    '5-9 years old Female',
    '5-9 years old Total',

    '10-14 years old Male',
    '10-14 years old Female',
    '10-14 years old Total',

    '15-19 years old Male',
    '15-19 years old Female',
    '15-19 years old Total',

    '20-24 years old Male',
    '20-24 years old Female',
    '20-24 years old Total',

    '25-29 years old Male',
    '25-29 years old Female',
    '25-29 years old Total',

    '30-34 years old Male',
    '30-34 years old Female',
    '30-34 years old Total',

    '35-39 years old Male',
    '35-39 years old Female',
    '35-39 years old Total',

    '40-44 years old Male',
    '40-44 years old Female',
    '40-44 years old Total',

    '45-49 years old Male',
    '45-49 years old Female',
    '45-49 years old Total',

    '50-54 years old Male',
    '50-54 years old Female',
    '50-54 years old Total',

    '55-59 years old Male',
    '55-59 years old Female',
    '55-59 years old Total',

    '60 years and above Male',
    '60 years and above Female',
    '60 years and above Total',

    'Grand Total Male',
    'Grand Total Female',

    'Grand Total Both Sexes',
  ];

  indicator_var = [
    {var_name: 'male_0_to_6_days',                    gender: 'M',   start: 0,  end: 6,   type: 'days'},
    {var_name: 'female_0_to_6_days',                  gender: 'F',   start: 0,  end: 6,   type: 'days'},
    {var_name: 'male_female_0_to_6_days',             gender: 'M-F', start: 0,  end: 6,   type: 'days'},

    {var_name: 'male_7_to_28_days',                   gender: 'M',   start: 7,  end: 28,  type: 'days'},
    {var_name: 'female_7_to_28_days',                 gender: 'F',   start: 7,  end: 28,  type: 'days'},
    {var_name: 'male_female_7_to_28_days',            gender: 'M-F', start: 7,  end: 28,  type: 'days'},

    {var_name: 'male_29_days_to_11_months',           gender: 'M',   start: 29, end: 364, type: 'days'},
    {var_name: 'female_29_days_to_11_months',         gender: 'F',   start: 29, end: 364, type: 'days'},
    {var_name: 'male_female_29_days_to_11_months',    gender: 'M-F', start: 29, end: 364, type: 'days'},

    {var_name: 'male_1_to_4_years',                   gender: 'M',   start: 1, end: 4,   type: 'years'},
    {var_name: 'female_1_to_4_years',                 gender: 'F',   start: 1, end: 4,   type: 'years'},
    {var_name: 'male_female_1_to_4_years',            gender: 'M-F', start: 1, end: 4,   type: 'years'},

    {var_name: 'male_5_to_9_years',                   gender: 'M',   start: 5, end: 9,   type: 'years'},
    {var_name: 'female_5_to_9_years',                 gender: 'F',   start: 5, end: 9,   type: 'years'},
    {var_name: 'male_female_5_to_9_years',            gender: 'M-F', start: 5, end: 9,   type: 'years'},

    {var_name: 'male_10_to_14_years',                 gender: 'M',   start: 10, end: 14, type: 'years'},
    {var_name: 'female_10_to_14_years',               gender: 'F',   start: 10, end: 14, type: 'years'},
    {var_name: 'male_female_10_to_14_years',          gender: 'M-F', start: 10, end: 14, type: 'years'},

    {var_name: 'male_15_to_19_years',                 gender: 'M',   start: 15, end: 19, type: 'years'},
    {var_name: 'female_15_to_19_years',               gender: 'F',   start: 15, end: 19, type: 'years'},
    {var_name: 'male_female_15_to_19_years',          gender: 'M-F', start: 15, end: 19, type: 'years'},

    {var_name: 'male_20_to_24_years',                 gender: 'M',   start: 20, end: 24, type: 'years'},
    {var_name: 'female_20_to_24_years',               gender: 'F',   start: 20, end: 24, type: 'years'},
    {var_name: 'male_female_20_to_24_years',          gender: 'M-F', start: 20, end: 24, type: 'years'},

    {var_name: 'male_25_to_29_years',                 gender: 'M',   start: 25, end: 29, type: 'years'},
    {var_name: 'female_25_to_29_years',               gender: 'F',   start: 25, end: 29, type: 'years'},
    {var_name: 'male_female_25_to_29_years',          gender: 'M-F', start: 25, end: 29, type: 'years'},

    {var_name: 'male_30_to_34_years',                 gender: 'M',   start: 30, end: 34, type: 'years'},
    {var_name: 'female_30_to_34_years',               gender: 'F',   start: 30, end: 34, type: 'years'},
    {var_name: 'male_female_30_to_34_years',          gender: 'M-F', start: 30, end: 34, type: 'years'},

    {var_name: 'male_35_to_39_years',                 gender: 'M',   start: 35, end: 39, type: 'years'},
    {var_name: 'female_35_to_39_years',               gender: 'F',   start: 35, end: 39, type: 'years'},
    {var_name: 'male_female_35_to_39_years',          gender: 'M-F', start: 35, end: 39, type: 'years'},

    {var_name: 'male_40_to_44_years',                 gender: 'M',   start: 40, end: 44, type: 'years'},
    {var_name: 'female_40_to_44_years',               gender: 'F',   start: 40, end: 44, type: 'years'},
    {var_name: 'male_female_40_to_44_years',          gender: 'M-F', start: 40, end: 44, type: 'years'},

    {var_name: 'male_45_to_49_years',                 gender: 'M',   start: 45, end: 49, type: 'years'},
    {var_name: 'female_45_to_49_years',               gender: 'F',   start: 45, end: 49, type: 'years'},
    {var_name: 'male_female_45_to_49_years',          gender: 'M-F', start: 45, end: 49, type: 'years'},

    {var_name: 'male_50_to_54_years',                 gender: 'M',   start: 50, end: 54, type: 'years'},
    {var_name: 'female_50_to_54_years',               gender: 'F',   start: 50, end: 54, type: 'years'},
    {var_name: 'male_female_50_to_54_years',          gender: 'M-F', start: 50, end: 54, type: 'years'},

    {var_name: 'male_55_to_59_years',                 gender: 'M',   start: 55, end: 59, type: 'years'},
    {var_name: 'female_55_to_59_years',               gender: 'F',   start: 55, end: 59, type: 'years'},
    {var_name: 'male_female_55_to_59_years',          gender: 'M-F', start: 55, end: 59, type: 'years'},

    {var_name: 'male_60_above',                       gender: 'M',    type: '>=60'},
    {var_name: 'female_60_above',                     gender: 'F',    type: '>=60'},
    {var_name: 'male_female_60_above',                gender: 'M-F',  type: '>=60'},

    {var_name: 'grand_total_male',                    gender: 'M',    type: '>=0'},
    {var_name: 'grand_total_female',                  gender: 'F',    type: '>=0'},

    {var_name: 'grand_total_both_sexes',              gender: 'M-F',  type: '>=0'},
  ]

  icd10_codes = [
    {var_name: 'Cholera', icd10_code: 'A00', range1: 'A00', range2: 'A00.99'},
    {var_name: 'Typhoid and paratyphoid fevers', range1: 'A01', range2: 'A01.99'},
    {var_name: 'Shigellosis', range1: 'A03', range2: 'A03.99'},
    {var_name: 'Amoebiasis', range1: 'A06', range2: 'A06.99'},
    {var_name: 'Diarrhea and gastroenteritis of presumed infectious origin', range1: 'A09', range2: 'A09.99'},
  ]


  label_value: {};
  ngOnChanges(): void {
    this.current_submit_flag = this.submit_flag;
    if(this.current_submit_flag){
      this.show_stats = false;
      this.stats = this.report_data.data;
      this.brgys_info = this.brgys;
      // console.log(this.stats)
      this.show_stats = true;
    }
  }
}
