import {Component, Input, OnChanges} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgForOf, NgIf} from "@angular/common";
import { faFileExcel, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { dateHelper } from 'app/shared/services/date-helper.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import {ReportsModule} from "../../reports.module";
import {ShowNameListComponent} from "../../modals/show-name-list/show-name-list.component";

@Component({
    selector: 'app-dental-ohs-consolidated',
    templateUrl: './dental-ohs-consolidated.component.html',
    styleUrl: './dental-ohs-consolidated.component.scss',
    standalone: false
})
export class DentalOhsConsolidatedComponent implements OnChanges {
  @Input() report_data;
  @Input() reportForm;
  @Input() selectedBrgy;
  @Input() selectedCode!: any;
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

  indicatorVar: any = [
    {title: 'pregnant_women_10_14_year_old', gender: 'F', age: '10', namelist_var: 'pregnant'},
    {title: 'pregnant_women_15_19_year_old', gender: 'F', age: '15', namelist_var: 'pregnant'},
    {title: 'pregnant_women_20_49_year_old', gender: 'F', age: '20', namelist_var: 'pregnant'},
    {title: 'male_infant', gender: 'M', age: null, namelist_var: 'infant'},
    {title: 'female_infant', gender: 'F', age: null, namelist_var: 'infant'},
    {title: 'male_1_year_old', gender: 'M', age: '1', namelist_var: 'underfive'},
    {title: 'female_1_year_old', gender: 'F', age: '1', namelist_var: 'underfive'},
    {title: 'male_2_year_old', gender: 'M', age: '2', namelist_var: 'underfive'},
    {title: 'female_2_year_old', gender: 'F', age: '2', namelist_var: 'underfive'},
    {title: 'male_3_year_old', gender: 'M', age: '3', namelist_var: 'underfive'},
    {title: 'female_3_year_old', gender: 'F', age: '3', namelist_var: 'underfive'},
    {title: 'male_4_year_old', gender: 'M', age: '4', namelist_var: 'underfive'},
    {title: 'female_4_year_old', gender: 'F', age: '4', namelist_var: 'underfive'},
    {title: 'male_total_underfive', gender: 'M', age: 'total', namelist_var: 'underfive'},
    {title: 'female_total_underfive', gender: 'F', age: 'total', namelist_var: 'underfive'},
    {title: 'male_5_year_old', gender: 'M', age: '5', namelist_var: 'school_age'},
    {title: 'female_5_year_old', gender: 'F', age: '5', namelist_var: 'school_age'},
    {title: 'male_6_year_old', gender: 'M', age: '6', namelist_var: 'school_age'},
    {title: 'female_6_year_old', gender: 'F', age: '6', namelist_var: 'school_age'},
    {title: 'male_7_year_old', gender: 'M', age: '7', namelist_var: 'school_age'},
    {title: 'female_7_year_old', gender: 'F', age: '7', namelist_var: 'school_age'},
    {title: 'male_8_year_old', gender: 'M', age: '8', namelist_var: 'school_age'},
    {title: 'female_8_year_old',  gender: 'F', age: '8', namelist_var: 'school_age'},
    {title: 'male_9_year_old', gender: 'M', age: '9', namelist_var: 'school_age'},
    {title: 'female_9_year_old', gender: 'F', age: '9', namelist_var: 'school_age'},
    {title: 'male_total_school_age', gender: 'M', age: 'total', namelist_var: 'school_age'},
    {title: 'female_total_school_age', gender: 'F', age: 'total', namelist_var: 'school_age'},
    {title: 'male_adolescent', gender: 'M', age: null, namelist_var: 'adolescent'},
    {title: 'female_adolescent', gender: 'F', age: null, namelist_var: 'adolescent'},
    {title: 'male_adult', gender: 'M', age: null, namelist_var: 'adult'},
    {title: 'female_adult', gender: 'F', age: null, namelist_var: 'adult'},
    {title: 'male_senior', gender: 'M', age: null, namelist_var: 'senior'},
    {title: 'female_senior', gender: 'F', age: null, namelist_var: 'senior'},
    {title: 'male_all_age', gender: 'M', age: null, namelist_var: 'all_age'},
    {title: 'female_all_age', gender: 'F', age: null, namelist_var: 'all_age'},
    {title: 'grand_total', gender: 'M,F', age: null, namelist_var: 'grand_total'},
  ];

  headerList: any  = [
    { title: 'A. MEDICAL HISTORY STATUS', id: 'medHistory', level: 1, para: 'stats'},
    { title: 'Hospitalization', id: 'hospitalization', level: 2, para: 'stats'},
    { title: 'B. DIETARY / SOCIAL HISTORY STATUS', id: 'dietary', level: 1, para: 'stats'},
    { title: 'C. ORAL HEALTH STATUS', id: 'oralHealth', level: 1, para: 'stats'},
    { title: '7. Total (d/f)', id: 'df', level: 2, para: 'temporary'},
    { title: '8. Total (D/M/F)', id: 'dmf', level: 2, para: 'adult'},
    { title: 'D. SERVICES RENDERED', id: 'dentalServices', level: 1, para: 'service'},
    { title: 'E. NO OF ORALLY FIT CHILDREN (OFC)', id: 'ofc', level: 1, para: 'stats'},
  ];

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
    {title:"a. Total decayed (d)", varTrail: '_temp_decayed_tooth', params: 'temp_decayed'},
    {title:"b. Total filled (f)", varTrail: '_temp_filled_tooth', params: 'temp_filled'},
  ]

  dmf= [
    {title:"a. Total Decayed (D)", varTrail: '_decayed_tooth', params: 'decayed'},
    {title:"b. Total Missing (M)", varTrail: '_missing_tooth', params: 'missing'},
    {title:"c. Total Filled (F)", varTrail: '_filled_tooth', params: 'filled'},
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
  ];

  blank_arr = ['male_infant_with_tattoo', 'female_infant_with_tattoo', 'male_1_year_old_with_tattoo', 'female_1_year_old_with_tattoo',
    'male_2_year_old_with_tattoo', 'female_2_year_old_with_tattoo', 'male_3_year_old_with_tattoo', 'female_3_year_old_with_tattoo',
    'male_4_year_old_with_tattoo', 'female_4_year_old_with_tattoo', 'male_total_underfive_with_tattoo', 'female_total_underfive_with_tattoo',

    'male_infant_with_alcohol', 'female_infant_with_alcohol', 'male_1_year_old_with_alcohol', 'female_1_year_old_with_alcohol',
    'male_2_year_old_with_alcohol', 'female_2_year_old_with_alcohol', 'male_3_year_old_with_alcohol', 'female_3_year_old_with_alcohol',
    'male_4_year_old_with_alcohol', 'female_4_year_old_with_alcohol', 'male_total_underfive_with_alcohol', 'female_total_underfive_with_alcohol',

    'male_infant_with_tobacco', 'female_infant_with_tobacco', 'male_1_year_old_with_tobacco', 'female_1_year_old_with_tobacco',
    'male_2_year_old_with_tobacco', 'female_2_year_old_with_tobacco', 'male_3_year_old_with_tobacco', 'female_3_year_old_with_tobacco',
    'male_4_year_old_with_tobacco', 'female_4_year_old_with_tobacco', 'male_total_underfive_with_tobacco', 'female_total_underfive_with_tobacco',
    'male_infant_with_nut', 'female_infant_with_nut', 'male_1_year_old_with_nut', 'female_1_year_old_with_nut',
    'male_2_year_old_with_nut', 'female_2_year_old_with_nut', 'male_3_year_old_with_nut', 'female_3_year_old_with_nut',
    'male_4_year_old_with_nut', 'female_4_year_old_with_nut', 'male_total_underfive_with_nut', 'female_total_underfive_with_nut',

    'pregnant_women_10_14_year_old_temp_decayed_tooth', 'pregnant_women_15_19_year_old_temp_decayed_tooth', 'pregnant_women_20_49_year_old_temp_decayed_tooth',
    'pregnant_women_10_14_year_old_temp_filled_tooth', 'pregnant_women_15_19_year_old_temp_filled_tooth', 'pregnant_women_20_49_year_old_temp_filled_tooth',

    'male_adult_temp_decayed_tooth', 'female_adult_temp_decayed_tooth', 'male_senior_temp_decayed_tooth', 'female_senior_temp_decayed_tooth',
    'male_adult_temp_filled_tooth', 'female_adult_temp_filled_tooth', 'male_senior_temp_filled_tooth', 'female_senior_temp_filled_tooth',

    'male_infant_decayed_tooth', 'female_infant_decayed_tooth', 'male_1_year_old_decayed_tooth', 'female_1_year_old_decayed_tooth',
    'male_2_year_old_decayed_tooth', 'female_2_year_old_decayed_tooth', 'male_3_year_old_decayed_tooth', 'female_3_year_old_decayed_tooth',
    'male_4_year_old_decayed_tooth', 'female_4_year_old_decayed_tooth', 'male_total_underfive_decayed_tooth', 'female_total_underfive_decayed_tooth',

    'male_infant_missing_tooth', 'female_infant_missing_tooth', 'male_1_year_old_missing_tooth', 'female_1_year_old_missing_tooth',
    'male_2_year_old_missing_tooth', 'female_2_year_old_missing_tooth', 'male_3_year_old_missing_tooth', 'female_3_year_old_missing_tooth',
    'male_4_year_old_missing_tooth', 'female_4_year_old_missing_tooth', 'male_total_underfive_missing_tooth', 'female_total_underfive_missing_tooth',

    'male_infant_filled_tooth', 'female_infant_filled_tooth', 'male_1_year_old_filled_tooth', 'female_1_year_old_filled_tooth',
    'male_2_year_old_filled_tooth', 'female_2_year_old_filled_tooth', 'male_3_year_old_filled_tooth', 'female_3_year_old_filled_tooth',
    'male_4_year_old_filled_tooth', 'female_4_year_old_filled_tooth', 'male_total_underfive_filled_tooth', 'female_total_underfive_filled_tooth',

    'pregnant_women_10_14_year_old_with_sealant', 'pregnant_women_15_19_year_old_with_sealant', 'pregnant_women_20_49_year_old_with_sealant',
    'male_infant_with_sealant', 'female_infant_with_sealant', 'male_1_year_old_with_sealant', 'female_1_year_old_with_sealant',
    'male_2_year_old_with_sealant', 'female_2_year_old_with_sealant', 'male_3_year_old_with_sealant', 'female_3_year_old_with_sealant',
    'male_4_year_old_with_sealant', 'female_4_year_old_with_sealant', 'male_total_underfive_with_sealant', 'female_total_underfive_with_sealant',
    'male_adolescent_with_sealant', 'female_adolescent_with_sealant',
    'male_adult_with_sealant', 'female_adult_with_sealant', 'male_senior_with_sealant', 'female_senior_with_sealant',

    'pregnant_women_10_14_year_old_with_flouride', 'pregnant_women_15_19_year_old_with_flouride', 'pregnant_women_20_49_year_old_with_flouride',
    'male_infant_with_flouride', 'female_infant_with_flouride',
    'male_adult_with_flouride', 'female_adult_with_flouride', 'male_senior_with_flouride', 'female_senior_with_flouride',

    'male_infant_with_counseling', 'female_infant_with_counseling',
    'male_1_year_old_with_counseling', 'female_1_year_old_with_counseling', 'male_2_year_old_with_counseling', 'female_2_year_old_with_counseling',

    'pregnant_women_10_14_year_old_with_completed', 'pregnant_women_15_19_year_old_with_completed', 'pregnant_women_20_49_year_old_with_completed',
    'male_infant_with_completed', 'female_infant_with_completed',
    'male_1_year_old_with_completed', 'female_1_year_old_with_completed', 'male_2_year_old_with_completed', 'female_2_year_old_with_completed',
    'male_6_year_old_with_completed','female_6_year_old_with_completed','male_7_year_old_with_completed','female_7_year_old_with_completed',
    'male_8_year_old_with_completed','female_8_year_old_with_completed','male_9_year_old_with_completed','female_9_year_old_with_completed',

    'pregnant_women_10_14_year_old_with_orally_fit', 'pregnant_women_15_19_year_old_with_orally_fit', 'pregnant_women_20_49_year_old_with_orally_fit',
    'male_infant_with_orally_fit', 'female_infant_with_orally_fit',
    'male_5_year_old_with_orally_fit', 'female_5_year_old_with_orally_fit', 'male_6_year_old_with_orally_fit', 'female_6_year_old_with_orally_fit',
    'male_7_year_old_with_orally_fit', 'female_7_year_old_with_orally_fit', 'male_8_year_old_with_orally_fit', 'female_8_year_old_with_orally_fit',
    'male_9_year_old_with_orally_fit', 'female_9_year_old_with_orally_fit', 'male_total_school_age_with_orally_fit', 'female_total_school_age_with_orally_fit',
    'male_adolescent_with_orally_fit', 'female_adolescent_with_orally_fit',
    'male_adult_with_orally_fit', 'female_adult_with_orally_fit',
    'male_senior_with_orally_fit', 'female_senior_with_orally_fit',

    'pregnant_women_10_14_year_old_with_oral_rehab', 'pregnant_women_15_19_year_old_with_oral_rehab', 'pregnant_women_20_49_year_old_with_oral_rehab',
    'male_infant_with_oral_rehab', 'female_infant_with_oral_rehab',
    'male_5_year_old_with_oral_rehab', 'female_5_year_old_with_oral_rehab', 'male_6_year_old_with_oral_rehab', 'female_6_year_old_with_oral_rehab',
    'male_7_year_old_with_oral_rehab', 'female_7_year_old_with_oral_rehab', 'male_8_year_old_with_oral_rehab', 'female_8_year_old_with_oral_rehab',
    'male_9_year_old_with_oral_rehab', 'female_9_year_old_with_oral_rehab', 'male_total_school_age_with_oral_rehab', 'female_total_school_age_with_oral_rehab',
    'male_adolescent_with_oral_rehab', 'female_adolescent_with_oral_rehab',
    'male_adult_with_oral_rehab', 'female_adult_with_oral_rehab',
    'male_senior_with_oral_rehab', 'female_senior_with_oral_rehab',
  ];


  //
  isBlank(age_group: string, trail: string) {
    let age_trail = `${age_group}${trail}`;
    const exists = this.blank_arr.find(e => e === age_trail);

    return !!exists;
  }

  ngOnChanges(): void {
    this.stats = this.report_data.data;
    this.temporary = this.report_data.temporary_tooth_condition;
    this.adult = this.report_data.adult_tooth_condition;
    this.service = this.report_data.dental_services;
    this.tooth = this.report_data.tooth_service;
    this.attended_examined = this.report_data.attended_examined;
  }

}
