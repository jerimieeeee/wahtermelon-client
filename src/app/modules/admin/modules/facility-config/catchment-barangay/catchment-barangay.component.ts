import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faCircleNotch, faSave } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-catchment-barangay',
  templateUrl: './catchment-barangay.component.html',
  styleUrls: ['./catchment-barangay.component.scss']
})
export class CatchmentBarangayComponent implements OnInit {
  faSave = faSave;
  faCircleNotch = faCircleNotch;

  current_year = formatDate(new Date(), 'yyyy', 'en', 'Asia/Singapore');
  barangays: any = [];
  selected_catchment: any = [];
  all_selected: string;

  show_form: boolean = false;

  onSubmit() {
    console.log(this.selected_catchment);
    let barangays: any = [];
    Object.entries(this.selected_catchment).forEach(([key, value]: any, index) => {
      if(value) barangays.push({barangay_code: key});
    });

    let params = {
      year: this.current_year,
      barangay: barangays
    };


    console.log(params);

    this.http.post('settings/catchment-barangay', params).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: err => console.log(err)
    })
  }

  checkBehavior(){

  }

  getCatchmentBarangay() {
    this.http.get('settings/catchment-barangay').subscribe({
      next: (data: any) => {
        console.log(data);
        if(Object.keys(data.data).length > 0) this.loadCatchment(data.data);
      },
      error: err => console.log(err)
    });
  }

  loadCatchment(data){
    Object.entries(data).forEach(([key, value]: any, index) => {
      this.selected_catchment[value.barangay.code] = true;
    });
  }

  loadBarangays(){
    this.http.get('libraries/municipalities/'+this.municipality_code,{params:{include:'barangays'}}).subscribe({
      next: (data: any) => {
        this.barangays = data.data.barangays
        console.log(this.barangays);
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

  ngOnInit(): void {

    let facility = this.http.getUserFromJSON().facility;
    console.log(facility)
    this.municipality_code = facility.municipality_code ?? facility.municipality.code;
    this.loadBarangays();
  }
}
