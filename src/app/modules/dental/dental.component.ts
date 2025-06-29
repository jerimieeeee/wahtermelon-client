import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleNotch, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
    selector: 'app-dental',
    templateUrl: './dental.component.html',
    styleUrls: ['./dental.component.scss'],
    standalone: false
})
export class DentalComponent implements OnInit {
  consult_details: any;
  user_facility: any;
  selected_visit: any = null;

  pages: number = 1;
  module: number = 1;

  faDoorClosed = faDoorClosed;
  faCircleNotch = faCircleNotch;
  patient_dental_history: any = [];
  enable_edit: boolean = false;
  referred_to: any;
  consult_id: any;
  allowed_to_edit: boolean = true;
  toggle_content: boolean = true;
  have_complaint: boolean = false;
  user_id: string;

  loadSelectedConsult() {
    let params = {
      id: this.selected_visit.id,
      pt_group: 'dn',
      disable_filter: 1
    }

    this.http.get('consultation/records', {params}).subscribe({
      next: (data: any) => {
        this.consult_details[this.item_index] = data.data[0];
        this.selected_visit = data.data[0];
      },
      error: err => { this.http.showError(err.error.message, 'Dental Consult') }
    });
  }

  loadConsult(){
    let patient_id = this.route.snapshot.paramMap.get('id');

    let params = {
      pt_group: 'dn',
      disable_filter: 1,
      patient_id: patient_id,
      sort: '-consult_date'
    }

    this.http.get('consultation/records', {params}).subscribe({
      next: (data: any) => {
        this.consult_details = data.data;
      },
      error: err => { this.http.showError(err.error.message, 'Dental Consult') }
    });
  }

  modals: any = [];
  toggleModal(name) {
    this.modals[name] = !this.modals[name];
  }

  item_index: number = null;
  switchPage(page, data?, item_index?){
    if(page === 2) {
      this.item_index = item_index;
      this.router.navigate(['/patient/dn', {id: data.patient.id, consult_id: data.id}]);
    } else {
      this.module = 1;
    }
    this.pages = page;
    // this.selected_visit = data ? data : null;
    if(data) this.selected_visit = data;
    console.log(this.selected_visit, 'selected visit');
  }

  switchTab(tab){
    this.module = tab;
  }

  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user_id = this.http.getUserID();
    this.module = 1;
    this.loadConsult();
    this.user_facility = this.http.getUserFacility();
  }
}
