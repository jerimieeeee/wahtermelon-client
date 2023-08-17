import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCircleNotch, faDoorClosed, faPersonWalking, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-tbdots',
  templateUrl: './tbdots.component.html',
  styleUrls: ['./tbdots.component.scss']
})
export class TbdotsComponent implements OnInit {
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

  patient_tb_history: any = [];
  selected_tb_consult: any;

  max_date = formatDate(new Date(), 'yyyy-MM-dd', 'en', 'Asia/Manila');
  openTbConsult(data) {
    this.selected_tb_consult = data;
    // if(data.treatment_done === 1) this.consult_details = null;
    this.pages = 2;
  }

  getPatientTbHistory(){
    this.selected_tb_consult = null;
    this.fetching_history = true;
    let params = {
      patient_id: this.patient_id,
      per_page: 'all'
    };

    this.http.get('tbdots/patient-tb', {params}).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.patient_tb_history = data.data;
        // console.log(this.patient_tb_history.length);
        if(this.patient_tb_history[0] && this.patient_tb_history[0].treatment_done === 0) this.selected_tb_consult = data.data[0];
        console.log(this.selected_tb_consult)
        this.fetching_history = false;
        // this.pages = 2;
        // this.module = 8;
      },
      error: err => console.log(err)
    });
  }

  switchPage(page) {
    if(page === 1) this.getPatientTbHistory();
    this.pages = page;
  }

  switchTab(tab) {
    this.module = tab;
  }

  modals: any = [];

  toggleModal(modal_name) {
    // console.log(modal_name)
    this.modals[modal_name] = !this.modals[modal_name];
    // console.log(this.modals[modal_name])
  }

  loadConsult(){
    let params = {
      id: this.consult_id,
      pt_group: 'tb'
    };

    this.http.get('consultation/records', {params}).subscribe({
      next: (data: any) => {
        this.consult_details = data.data[0];
        this.getPatientTbHistory();
      },
      error: err => console.log(err)
    });
  }

  constructor(
    private http: HttpService,
    private route: ActivatedRoute
  ) { }

  user_facility: string;
  ngOnInit(): void {
    this.user_facility = this.http.getUserFacility();
    this.patient_id = this.route.snapshot.paramMap.get('id');
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');

    this.loadConsult();
  }
}
