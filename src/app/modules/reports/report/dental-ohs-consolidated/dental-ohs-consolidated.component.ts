import {Component, Input, OnChanges} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgForOf, NgIf} from "@angular/common";
import { faFileExcel, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { dateHelper } from 'app/shared/services/date-helper.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as-17';
import {ReportsModule} from "../../reports.module";
import {ShowNameListComponent} from "../../modals/show-name-list/show-name-list.component";

@Component({
  selector: 'app-dental-ohs-consolidated',
  templateUrl: './dental-ohs-consolidated.component.html',
  styleUrl: './dental-ohs-consolidated.component.scss'
})
export class DentalOhsConsolidatedComponent implements OnChanges {
  @Input() report_data;
  @Input() reportForm;
  @Input() selectedBrgy;
  @Input() brgys;
  @Input() facility;
  @Input() submit_flag;
  current_submit_flag: boolean = false;
  show_stats: boolean = false;

  stats : any;
  selected_barangay : any;
  temporary: any;
  adult: any;
  service: any;
  tooth: any;
  attended_examined: any;
  name_list: any = [];
  params: any = [];
  loc: '';
  url: any = 'reports-2018/dental/dental-consolidated-name-list';


  name_list_params: {};
  showNameList(indicator: string, params: string, gender: string, age: string) {
    this.name_list_params = {
      start_date: this.reportForm.value.start_date,
      end_date: this.reportForm.value.end_date,
      indicator: indicator,
      params: params,
      gender: gender,
      age: age,
      category: this.reportForm.value.report_class,
      per_page: 10,
    };
    this.openList = true;
  };

  openList:boolean = false;
  toggleModal(){
    let list = [];

    this.name_list = list;
    this.openList = !this.openList;
  }

  pregnantVar: any = [
    {title: 'pregnant_women_10_14_year_old', age: '10'},
    {title: 'pregnant_women_15_19_year_old', age: '15'},
    {title: 'pregnant_women_20_49_year_old', age: '20'},
  ];

  infantVar: any = [
    {title: 'male_infant', gender: 'M'},
    {title: 'female_infant', gender: 'F'},
  ];

  underFiveVar: any = [
    {title: 'male_1_year_old', gender: 'M', age: '1'},
    {title: 'female_1_year_old', gender: 'F', age: '1'},

    {title: 'male_2_year_old', gender: 'M', age: '2'},
    {title: 'female_2_year_old', gender: 'F', age: '2'},

    {title: 'male_3_year_old', gender: 'M', age: '3'},
    {title: 'female_3_year_old', gender: 'F', age: '3'},

    {title: 'male_4_year_old', gender: 'M', age: '4'},
    {title: 'female_4_year_old', gender: 'F', age: '4'},

    {title: 'male_total_underfive', gender: 'M', age: 'total'},
    {title: 'female_total_underfive', gender: 'F', age: 'total'},
  ];

  schoolAgeVar: any = [
    {title: 'male_5_year_old', gender: 'M', age: '5'},
    {title: 'female_5_year_old', gender: 'F', age: '5'},

    {title: 'male_6_year_old', gender: 'M', age: '6'},
    {title: 'female_6_year_old', gender: 'F', age: '6'},

    {title: 'male_7_year_old', gender: 'M', age: '7'},
    {title: 'female_7_year_old', gender: 'F', age: '7'},

    {title: 'male_8_year_old', gender: 'M', age: '8'},
    {title: 'female_8_year_old',  gender: 'F', age: '8'},

    {title: 'male_9_year_old', gender: 'M', age: '9'},
    {title: 'female_9_year_old', gender: 'F', age: '9'},

    {title: 'male_total_school_age', gender: 'M', age: 'total'},
    {title: 'female_total_school_age', gender: 'F', age: 'total'},
  ];

  adolescentVar: any = [
    {title: 'male_adolescent', gender: 'M'},
    {title: 'female_adolescent', gender: 'F'},
  ];

  adultVar: any = [
    {title: 'male_adult', gender: 'M'},
    {title: 'female_adult', gender: 'F'},
  ];

  seniorVar: any = [
    {title: 'male_senior', gender: 'M'},
    {title: 'female_senior', gender: 'F'},
  ];

  allAgeVar: any = [
    {title: 'male_all_age', gender: 'M'},
    {title: 'female_all_age', gender: 'F'},
  ];

  grand_total: any = ['grand_total']

  attendedExamined: any = [
    {title:"NO. OF PERSON ATTENDED", varTrail: '_attended', params: 'attended'},
    {title:"NO. OF PERSON EXAMINED", varTrail: '_examined', params: 'examined'},
  ];

  medHistory: any = [
    {title:"1. Total No. with Allergies", varTrail: '_with_allergies', params: 'allergies'},
    {title:"2. Total No. with Hypertension/ CVA", varTrail: '_with_hypertension', params: 'hypertension'},
    {title:"3. Total No. with Diabetes Mellitus", varTrail: '_with_diabetes', params: 'diabetes'},
    {title:"4. Total No. with Blood Disorders", varTrail: '_with_blood_disorder', params: 'blood_disorder'},
    {title:"5. Total No. with Cardiovascular/Heart", varTrail: '_with_heart_disease', params: 'heart_disease'},
    {title:"6. Total No. with Thyroid Disorders", varTrail: '_with_thyroid', params: 'thyroid'},
    {title:"7. Total No. with Hepatitis", varTrail: '_with_hepatitis', params: 'hepatitis'},
    {title:"8. Total No. with Malignancy", varTrail: '_with_malignancy', params: 'malignancy'}
  ];

  hospitalization= [
    {title:"10. Total No. with Blood Transfusion", varTrail: '_with_blood_transfusion', params: 'blood_transfusion'},
    {title:"11. Total No. with Tattoo", varTrail: '_with_tattoo', params: 'tattoo'},
  ]

  dietary= [
    {title:"1. Total No. of Sugar Sweetened Beverages/Food Drinker/Eater", varTrail: '_with_sugar_sweetened', params: 'sweet'},
    {title:"2. Total No. of Alcohol Drinker", varTrail: '_with_alcohol', params: 'alcohol'},
    {title:"3. Total No. of Tobacco User", varTrail: '_with_tobacco', params: 'tobacco'},
    {title:"4. Total No. of Betel Nut Chewer", varTrail: '_with_nut', params: 'nut'},
  ]

  oralHealth= [
    {title:"1. Total No. with Dental Caries", varTrail: '_with_dental_carries', params: 'dental_carries'},
    {title:"2. Total No. with Gingivitis", varTrail: '_with_gingivitis', params: 'gingivitis'},
    {title:"3. Total No. with Periodontal Disease", varTrail: '_with_periodontal', params: 'periodontal'},
    {title:"4. Total No. with Oral Debris", varTrail: '_with_debris', params: 'debris'},
    {title:"5. Total No. with Calculus", varTrail: '_with_calculus', params: 'calculus'},
    {title:"6. Total No. with Dento Facial Anomalies (cleft lip/palate, Malocclusion, etc)", varTrail: '_with_dento_facial', params: 'dento_facial'},
  ]

  df= [
    {title:"a. Total decayed (d)", varTrail: 'decayed_tooth_', params: 'temp_decayed'},
    {title:"b. Total filled (f)", varTrail: 'filled_tooth_', params: 'temp_filled'},
  ]

  dmf= [
    {title:"a. Total Decayed (D)", varTrail: 'decayed_tooth_', params: 'decayed'},
    {title:"b. Total Missing (M)", varTrail: 'missing_tooth_', params: 'missing'},
    {title:"c. Total Filled (F)", varTrail: 'filled_tooth_', params: 'filled'},
  ]

  dentalServices= [
    {title:"1. No. Given OP / Scaling", varTrail: '_with_op_scaling', params: 'op_scaling'},
    {title:"2. No. Given Permanent Fillings", varTrail: '_with_permanent_filling', params: 'permanent_filling'},
    {title:"3. No. Given Temporary Fillings", varTrail: '_with_temporary_filling', params: 'temporary_filling'},
    {title:"4. No. Given Extraction", varTrail: '_with_extraction', params: 'extraction'},
    {title:"5. No. Given Gum Treatment", varTrail: '_with_gum_treatment', params: 'gum_treatment'},
    {title:"6. No. Given Sealant", varTrail: '_with_sealant', params: 'sealant'},
    {title:"7. No. Completed Flouride Therapy", varTrail: '_with_flouride', params: 'flouride'},
    {title:"8. No. Given Post-Operative Treatment", varTrail: '_with_post_operative', params: 'post_operative'},
    {title:"9. No. of Patient with Oral Abscess Drained", varTrail: '_with_abscess', params: 'abscess'},
    {title:"10. No. Given Other Services", varTrail: '_with_other_services', params: 'other_services'},
    {title:"11. No. Referred", varTrail: '_with_referred', params: 'referred'},
    {title:"12. No. Given Counseling / Education on Tobacco, Oral Health, Diet, Etc.", varTrail: '_with_counseling', params: 'counseling'},
    {title:"13. No. of Under Six Children Completed", varTrail: '_with_completed', params: 'completed'},
  ]

  ofc= [
    {title:"1. OFC Upon Oral Examination", varTrail: '_with_orally_fit', params: 'orally_fit'},
    {title:"2. OFC Upon Complete Oral Rehabilitation", varTrail: '_with_oral_rehab', params: 'oral_rehab'},
  ]

  ngOnChanges(): void {
    this.stats = this.report_data.data;
    this.temporary = this.report_data.temporary_tooth_condition;
    this.adult = this.report_data.adult_tooth_condition;
    this.service = this.report_data.dental_services;
    this.tooth = this.report_data.tooth_service;
    this.attended_examined = this.report_data.attended_examined;
  }

}
