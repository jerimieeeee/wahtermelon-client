import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCircleNotch, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gbv',
  templateUrl: './gbv.component.html',
  styleUrls: ['./gbv.component.scss']
})
export class GbvComponent implements OnInit {
  faCircleNotch = faCircleNotch;
  faDoorClosed = faDoorClosed;
  pages: number = 1;
  module: number = 1;

  user_facility: string;
  selected_gbv_case: any;
  consult_details: any;

  show_form: boolean = false;
  fetching_history: boolean = true;

  patient_gbv_history: any;
  patient_id: string;

  selected

  modals: any = [];

  toggleModal(name) {
    this.modals[name] = !this.modals[name];
  }

  switchPage(page) {
    if(page === 1) this.getGbvHistory();
    this.pages = page;
  }

  switchTab(tab) {
    this.module = tab;
  }

  openGbvConsult(data){
    this.selected_gbv_case = data;
    this.pages = 2;
  }

  updateSelectedGbv(data) {
    this.selected_gbv_case = data;
  }

  getGbvHistory(){
    this.fetching_history = true;
    this.selected_gbv_case = undefined;

    // console.log(this.patient_id)
    this.http.get('gender-based-violence/patient-gbv', {params:{patient_id: this.patient_id}}).subscribe({
      next: (data: any) => {
        this.patient_gbv_history = data.data;
        // console.log(typeof this.patient_gbv_history, this.patient_gbv_history);
        if(Object.keys(this.patient_gbv_history).length > 0) {
          this.selected_gbv_case = !this.patient_gbv_history[0].outcome_date ? this.patient_gbv_history[0] : null;
        }
        // console.log(this.selected_gbv_case)

        this.fetching_history = false;
        // this.pages = 2;
        // this.module = 5;
      },
      error: err => console.log(err)
    })
  }


  constructor (
    private http: HttpService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.patient_id = this.route.snapshot.paramMap.get('id');
    this.user_facility = this.http.getUserFacility();
    this.getGbvHistory();
  }
}
