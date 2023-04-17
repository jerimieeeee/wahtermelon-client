import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-todays-appointment',
  templateUrl: './todays-appointment.component.html',
  styleUrls: ['./todays-appointment.component.scss']
})
export class TodaysAppointmentComponent implements OnInit {
  todays_appointment: any = [];
  show_form: boolean = false;

  per_page: number = 5;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

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
        // console.log(data);
        this.todays_appointment = data[0];
        this.show_form = true;

        /* this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total; */
      },
      error: err => console.log(err)
    })

    /* let params = {
      facility_code: this.http.getUserFacility()
    };

    this.http.get('appointment/schedule', {params}).subscribe({
      next: (data: any) => {
        console.log(data[0])
        this.todays_appointment = data[0];
        this.show_form = true;
        console.log(this.todays_appointment)
      },
      error: err => console.log(err)
    }) */
  }

  constructor (
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAppointments()
  }
}
