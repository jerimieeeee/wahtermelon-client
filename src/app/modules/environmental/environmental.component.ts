import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-environmental',
  templateUrl: './environmental.component.html',
  styleUrls: ['./environmental.component.scss']
})
export class EnvironmentalComponent implements OnInit {

  household_id: string;

  fetchData(id) {

  }

  env_results: {};
  env_sewages: {};
  env_toilet_facilities: {};
  env_waste_managements: {};
  env_water_types: {};

  ans_yn = [
    {desc: 'Yes', value: true},
    {desc: 'No', value: false}
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

  onSubmit(){

  }

  createForm(){

  }

  loadLibraries() {
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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.http.getUrlParams())
    this.household_id = this.http.getUrlParams().patient_id; //url params is the id of households, the naming convention on the function just returns it as patient id
    this.fetchData(this.household_id)
  }
}
