import { Component, OnInit } from '@angular/core';
import { faCircleNotch, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mental-health',
  standalone: false,
  templateUrl: './mental-health.component.html',
  styleUrl: './mental-health.component.scss'
})
export class MentalHealthComponent implements OnInit {
  faDoorClosed = faDoorClosed;
  faCircleNotch = faCircleNotch;

  page: number = 1;
  module!: number;

  selected_mh_consult: any;
  consult_details: any;
  user_facility: any;

  treatments: any = [];
  modals: string[] = [];

  show_form: boolean = false;

  allowed_to_edit: boolean = true
  have_complaint: boolean = false;
  toggle_content: boolean = true;

  updateSelectedMh(data: any){
    if(data) {
      this.selected_mh_consult = data;
      this.treatments[this.index_ofSelectedMh] = data;
    }
  }

  index_ofSelectedMh!: number;
  switchPage(page?: number, data?: any, i?: number) {
    this.page = page || 1;
    if(page === 2) this.module = 1;
    if(data) {
      this.selected_mh_consult = data;
      this.index_ofSelectedMh = i;
    }
  }

  switchTab(page?: number) {
    this.page = 2;
    this.module = page || 1;
  }

  toggleModal(name: string) {
    this.modals[name] = !this.modals[name];
  }

  is_loading: boolean =true;

  getMentalHealthRecords() {
    this.http.get('mental-health/records', {params: { patient_id: this.http.getUrlParams().patient_id}}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.treatments = data.data;
        this.user_facility = data.user_facility;
        this.is_loading = false;
      },
      error: err => {
        this.toastr.error(err.error.message, 'Error');
      }
    });
  }

  loadConsult() {
    this.http.get('consultation/records', { params: { id: this.http.getUrlParams().consult_id } }).subscribe({
      next: (data: any) => {
        console.log(data);
        this.consult_details = data.data[0];
        this.getMentalHealthRecords();
      },
      error: err => {
        this.toastr.error(err.error.message, 'Error');
      }
    })
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.is_loading = true;
    this.loadConsult();
  }
}
