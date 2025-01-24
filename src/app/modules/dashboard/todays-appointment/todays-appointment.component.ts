import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { switchMap, finalize } from 'rxjs/operators';

@Component({
    selector: 'app-todays-appointment',
    templateUrl: './todays-appointment.component.html',
    styleUrls: ['./todays-appointment.component.scss'],
    standalone: false
})
export class TodaysAppointmentComponent implements OnInit {
  @Input() date_today;
  faCircleNotch = faCircleNotch;
  faAnglesLeft = faAnglesLeft;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesRight = faAnglesRight;

  todays_appointment: any;
  show_form: boolean = false;

  per_page: number = 5;
  current_page: number = 1;
  last_page: number;
  from: number;
  to: number;
  total: number;
  isLoading: boolean = false;

  openItr(patient_id, ptgroup, id){
    // console.log(patient_id)
    if(ptgroup === 'itr'){
      this.router.navigate(['/patient/'+ptgroup, {id: patient_id}]);
    } else {
      this.router.navigate(['/patient/'+ptgroup, {id: patient_id, consult_id: id}]);
    }
  }

  appointment_length: number = 0;
  loadAppointments(page?: number){
    this.show_form = false;
    if (this.isLoading) return;
    let params = {params: { }};
    params['params']['page'] = !page ? this.current_page : page;
    params['params']['facility_code'] = this.http.getUserFacility();
    params['params']['per_page'] = this.per_page;
    params['params']['consult_done'] = 0;

    this.isLoading = true;
    // console.log(params, page, this.current_page)
    this.http.get('appointment/schedule', params)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
      next: (data: any) => {

        this.todays_appointment = data[0].data;
        // console.log(this.todays_appointment)
        // this.appointment_length = Object.keys(this.todays_appointment).length;
        // console.log(Object.keys(this.todays_appointment))
        // console.log(this.todays_appointment && this.todays_appointment?.length === 0);

        this.current_page = data[0].current_page;
        this.last_page = data[0].last_page;
        this.from = data[0].from;
        this.to = data[0].to;
        this.total = data[0].total;
        this.show_form = true;
      },
      error: err => console.log(err)
    })
  }

  constructor (
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAppointments()
  }
}
