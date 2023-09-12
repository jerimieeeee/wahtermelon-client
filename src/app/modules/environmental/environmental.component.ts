import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { environmentalForm } from './environmentalForm';
import { formatDate } from '@angular/common';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { dateHelper } from 'app/shared/services/date-helper.service';

@Component({
  selector: 'app-environmental',
  templateUrl: './environmental.component.html',
  styleUrls: ['./environmental.component.scss']
})
export class EnvironmentalComponent implements OnInit {
  faSave = faSave;
  faCircleNotch = faCircleNotch;

  environmentalForm:FormGroup=environmentalForm();

  household_folder_id: string;
  year = formatDate(new Date(), 'yyyy', 'en');
  years = [];
  selected_year: number;
  selected_profile: any;

  env_results: {};
  env_sewages: {};
  env_toilet_facilities: {};
  env_waste_managements: {};
  env_water_types: {};

  show_form: boolean = false;
  is_saving: boolean = false;

  ans_yn = [
    {desc: 'Yes', value: 1},
    {desc: 'No', value: 0}
  ];

  sanition_flags = [
    {title: 'Using safety managed drinking water services', var_name: 'safety_managed_flag'},
    {title: 'Using managed sanitation services', var_name: 'sanitation_managed_flag'},
    {title: 'Satisfaction solid waste management', var_name: 'satisfaction_management_flag'},
    {title: 'Complete sanitation facilities', var_name: 'complete_sanitation_flag'},
    {title: 'Located within premises', var_name: 'located_premises_flag'},
    {title: 'Available at least 12 hours per day', var_name: 'availability_flag'},
    {title: 'Open Defecation', var_name: 'open_defecation_flag'},
    {title: 'Toilet not shared', var_name: 'toilet_shared_flag'},
  ];

  test_lists = [
    {title: 'Microbiological Validation', date_var: 'validation_date', result_var: 'microbiological_result'},
    {title: 'Physico-chemical test for Arsenic', date_var: 'arsenic_date', result_var: 'arsenic_result'}
  ];

  sw_wm_management_lists = [
    {title: 'Disposal/Treatment of Excreta/Sewage',
    content: [
      {title: 'Sewage/excreta is safely disposed in situ', var_name: 'sw_disposed_flag'},
      {title: 'Sewage/excreta is collected, transported and disposed off site', var_name: 'sw_collected_flag'}
    ]},
    {title: 'Waste Management',
    content: [
      {title: 'Waste Segregation', var_name: 'wm_waste_segration_flag'},
      {title: 'Backyard Composting', var_name: 'wm_backyad_composting_flag'},
      {title: 'Recycling/Reuse', var_name: 'wm_recycling_flag'},
      {title: 'Collected by City/Municipality Collection and Disposal System', var_name: 'wm_collected_flag'},
      {title: 'Others (Burning / Burying, Specify)', var_name: 'wm_others_flag'}
    ]},
  ];

  onSubmit(){
    this.is_saving = true;

    let effectivity_year = formatDate(this.environmentalForm.value.registration_date, 'yyyy', 'en');
    this.environmentalForm.patchValue({effectivity_year: effectivity_year});

    this.http.post('households/environmental/records', this.environmentalForm.value).subscribe({
      next: () => {
        this.toastr.success('Successfully recorded!', 'Environmental');
        this.is_saving = false;
      },
      error: err => this.http.showError(err.error.message, 'Environmental')
    });
  }

  loadSelectedYear() {
    this.show_form = false;
    let params = {
      effectivity_year: this.selected_year,
      household_folder_id: this.household_folder_id
    }

    this.http.get('households/environmental/records', {params}).subscribe({
      next: (data: any) => {
        console.log(data)
        this.selected_profile = data.data[0];
        if(this.selected_profile && Object.keys(this.selected_profile).length > 0) {
          this.environmentalForm.patchValue({...this.selected_profile});
          this.environmentalForm.patchValue({
            validation_date: this.environmentalForm.value.validation_date ? this.dateHelper.dateFormat(this.environmentalForm.value.validation_date) : null,
            arsenic_date: this.environmentalForm.value.arsenic_date ? this.dateHelper.dateFormat(this.environmentalForm.value.arsenic_date) : null
          });
        } else {
          this.emptyForm();
        }
        this.show_form = true;
      },
      error: err => {
        this.http.showError(err.error.message, 'Household Profile');
        this.show_form = true;
      }
    })
  }

  createForm(){
    this.show_form = false;
    this.selected_year = Number(this.year);

    this.emptyForm();
    this.loadSelectedYear();
  }

  emptyForm(){
    this.environmentalForm = this.formBuilder.group({
      id: [null],
      household_folder_id: [this.household_folder_id, Validators.required],
      number_of_families: [null, Validators.required],
      registration_date: [null, Validators.required],
      effectivity_year: [null],
      water_type_code: [null, Validators.required],
      safety_managed_flag: [null, Validators.required],
      sanitation_managed_flag: [null, Validators.required],
      satisfaction_management_flag: [null, Validators.required],
      complete_sanitation_flag: [null, Validators.required],
      located_premises_flag: [null, Validators.required],
      availability_flag: [null, Validators.required],
      microbiological_result: [null],
      validation_date: [null],
      arsenic_result: [null],
      arsenic_date: [null],
      open_defecation_flag: [null, Validators.required],
      toilet_facility_code: [null, Validators.required],
      toilet_shared_flag: [null, Validators.required],
      sw_disposed_flag: [false],
      sw_collected_flag: [false],
      wm_waste_segration_flag: [false],
      wm_backyad_composting_flag: [false],
      wm_recycling_flag: [false],
      wm_collected_flag: [false],
      wm_others_flag: [false],
      wm_others_remarks: [null],
      remarks: [null],
      end_sanitation_flag: [0],
    });
  }

  loadLibraries() {
    this.show_form = false;
    const getEnvironmentalResult = this.http.get('libraries/environmental-result');
    const getEnvironmentalSewage = this.http.get('libraries/environmental-sewage');
    const getEnvironmentalToilet = this.http.get('libraries/environmental-toilet-facility');
    const getEnvironmentalWaste = this.http.get('libraries/environmental-waste-management');
    const getEnvironmentalWater = this.http.get('libraries/environmental-water-type');

    forkJoin([getEnvironmentalResult, getEnvironmentalSewage, getEnvironmentalToilet, getEnvironmentalWaste, getEnvironmentalWater]).subscribe({
      next: ([dataEnvironmentalResult, dataEnvironmentalSewage, dataEnvironmentalToilet, dataEnvironmentalWaste, dataEnvironmentalWater]:any) => {
        this.env_results = dataEnvironmentalResult.data;
        this.env_sewages = dataEnvironmentalSewage.data;
        this.env_toilet_facilities = dataEnvironmentalToilet.data;
        this.env_waste_managements = dataEnvironmentalWaste.data;
        this.env_water_types = dataEnvironmentalWater.data;

        this.createForm();
      }
    })
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private dateHelper: dateHelper
  ) {
    for(let i = Number(this.year); i > 2017; i--){
      this.years.push(i);
    }
  }

  ngOnInit(): void {
    this.household_folder_id = this.http.getUrlParams().patient_id; //url params is the id of households, the naming convention on the function just returns it as patient id
    this.loadLibraries();
  }
}
