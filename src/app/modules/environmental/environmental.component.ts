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
