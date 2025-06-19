import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mental-health',
  standalone: false,
  templateUrl: './mental-health.component.html',
  styleUrl: './mental-health.component.scss'
})
export class MentalHealthComponent implements OnInit {
  page: number = 1;
  module!: number;

  selected_mh_consult: any;
  consult_details: any;
  user_facility: any;

  treatments: any = [];
  modals: string[] = [];

  show_form: boolean = false;

  switchPage(page?: number, data?: any) {
    this.page = page || 1;
    this.selected_mh_consult = data || [];
  }

  switchTab(page?: number) {
    this.page = 2;
    this.module = page || 1;
  }

  toggleModal(name: string) {
    this.modals[name] = !this.modals[name];
  }

  getMentalHealthRecords() {
    this.http.get('mental-health/records', {params: { patient_id: this.http.get}}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.treatments = data.data;
        this.user_facility = data.user_facility;
      },
      error: err => {
        this.toastr.error(err.error.message, 'Error');
      }
    });
  }

  getConsultDetails() {
    this.http.get('consultation/records', { params: { id: this.http.getUrlParams().consult_id } }).subscribe({
      next: (data: any) => {
        console.log(data);
        this.consult_details = data.data[0];
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
    this.getConsultDetails();
  }
}
