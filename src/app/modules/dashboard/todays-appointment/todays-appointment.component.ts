import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-todays-appointment',
  templateUrl: './todays-appointment.component.html',
  styleUrls: ['./todays-appointment.component.scss']
})
export class TodaysAppointmentComponent implements OnInit {
  faCircleNotch = faCircleNotch;

  todays_appointment: any;
  show_form: boolean = false;

  per_page: number = 5;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  today = formatDate(new Date(), 'MM/dd/yyyy', 'en');
  openItr(patient_id, ptgroup, id){
    console.log(patient_id)
    if(ptgroup === 'itr'){
      this.router.navigate(['/patient/'+ptgroup, {id: patient_id}]);
    } else {
      this.router.navigate(['/patient/'+ptgroup, {id: patient_id, consult_id: id}]);
    }
  }

  loadAppointments(page?: number){
    this.show_form = false;
    let params = {params: { }};
    params['params']['page'] = !page ? this.current_page : page;
    params['params']['facility_code'] = this.http.getUserFacility();
    params['params']['per_page'] = this.per_page;
    params['params']['consult_done'] = 0;

    // console.log(params, page, this.current_page)
    this.http.get('appointment/schedule', params).subscribe({
      next: (data: any) => {
        this.todays_appointment = data[0];
        // console.log(this.todays_appointment && this.todays_appointment?.length === 0);
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
