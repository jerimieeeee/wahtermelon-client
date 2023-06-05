import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faCircleNotch, faDoorClosed, faSave } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-facility-config',
  templateUrl: './facility-config.component.html',
  styleUrls: ['./facility-config.component.scss']
})
export class FacilityConfigComponent implements OnInit {
  current_year = formatDate(new Date(), 'yyyy', 'en');

  pages: number = 1;
  module: number = 1;

  user_facility: string;
  selected_gbv_case: any;
  consult_details: any;

  show_form: boolean = false;
  fetching_history: boolean = true;

  patient_gbv_history: any;
  patient_id: string;

  faSave = faSave;
  faCircleNotch = faCircleNotch;
  faDoorClosed = faDoorClosed;

  barangays: any = [];
  catchment_barangays: any = [];
  selected_catchment: any = [];
  selected_year: any;
  modals: any = [];
  all_selected: string;


  switchPage(page) {
    this.pages = page;
  }

  switchTab(tab) {
    this.module = tab;
  }

  onSubmit() {
    let barangays: any = [];
    Object.entries(this.selected_catchment).forEach(([key, value]: any, index) => {
      if(value) barangays.push({barangay_code: key});
    });

    let params = {
      year: this.current_year,
      barangay: barangays
    };

    this.http.post('settings/catchment-barangay', params).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastr.success('Successfully recorded', 'Catchment Barangay');
        this.getCatchmentBarangay(this.selected_year);
      },
      error: err => console.log(err)
    })
  }

  checkBehavior(){

  }

  getCatchmentBarangay(year?) {
    this.http.get('settings/catchment-barangay',{params:{'filter[year]': year ?? this.current_year}}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.catchment_barangays = data;
        if(Object.keys(this.catchment_barangays[this.selected_year].data).length > 0) {
          this.loadCatchment(this.catchment_barangays[this.selected_year].data);
        } else {
          this.selected_catchment = [];
        }
        // this.pages = 2;
      },
      error: err => console.log(err)
    });
  }

  loadCatchment(data){
    console.log(data)
    Object.entries(data).forEach(([key, value]: any, index) => {
      this.selected_catchment[value.barangay.code] = true;
    });
  }

  loadBarangays(){
    this.http.get('libraries/municipalities/'+this.municipality_code,{params:{include:'barangays'}}).subscribe({
      next: (data: any) => {
        this.barangays = data.data.barangays;
        this.getCatchmentBarangay();
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
  ) { }

  municipality_code: string;
  facility_code: string;
  years: any = [];
  ngOnInit(): void {

    let facility = this.http.getUserFromJSON().facility;
    console.log(facility)
    this.municipality_code = facility.municipality_code ?? facility.municipality.code;
    this.facility_code = facility.code ?? facility.facility.code;
    this.loadBarangays();

    this.selected_year = this.current_year;
    for(let year = Number(this.current_year); year > 2017; year--) {
      this.years.push(year);
    }
  }
}
