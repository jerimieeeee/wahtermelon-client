import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCircleNotch, faDoorClosed, faPersonWalking } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-animalbite',
  templateUrl: './animalbite.component.html',
  styleUrls: ['./animalbite.component.scss']
})
export class AnimalbiteComponent implements OnInit{
  patient_id: any;
  consult_id: any;

  faPersonWalking = faPersonWalking;
  faDoorClosed = faDoorClosed;
  faCircleNotch = faCircleNotch;

  pages: number = 1;
  module: number = 1;
  show_end: boolean = false;
  fetching_history: boolean = true;

  consult_details: any;

  patient_ab_history: any = [];
  modals: any = [];
  selected_ab_consult: any;
  user_facility: string;

  max_date = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  openAbConsult(data) {
    this.selected_ab_consult = data;
    if(data.treatment_done === 1) this.consult_details = null;
    this.pages = 2;
  }

  getAbHistory(){
    this.selected_ab_consult = null;
    this.fetching_history = true;
    let params = {
      patient_id: this.patient_id
    };

    this.http.get('animal-bite/patient-ab', {params}).subscribe({
      next: (data: any) => {
        this.patient_ab_history = data.data;
        if(this.patient_ab_history[0] && !this.patient_ab_history[0].ab_treatment_outcome) this.selected_ab_consult = data.data[0];
        console.log(data.data)
        this.fetching_history = false;
        // this.pages = 2;
      },
      error: err => console.log(err)
    });
  }

  switchPage(page) {
    if(page === 1) this.getAbHistory();
    this.pages = page;
  }

  switchTab(tab) {
    this.module = tab;
  }

  toggleModal(modal_name) {
    this.modals[modal_name] = !this.modals[modal_name];
  }

  loadConsult(){
    let params = {
      id: this.consult_id,
      pt_group: 'ab'
    };

    this.http.get('consultation/records', {params}).subscribe({
      next: (data: any) => {
        this.consult_details = data.data[0];
        this.getAbHistory();
      },
      error: err => console.log(err)
    });
  }

  constructor(
    private http: HttpService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user_facility = this.http.getUserFacility();
    this.patient_id = this.route.snapshot.paramMap.get('id');
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');

    this.loadConsult();
  }
}
