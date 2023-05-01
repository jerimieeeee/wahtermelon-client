import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-todays-stats',
  templateUrl: './todays-stats.component.html',
  styleUrls: ['./todays-stats.component.scss']
})
export class TodaysStatsComponent implements OnInit {
  @Input() date_today;
  faChevronDown = faChevronDown;
  faFolderOpen = faFolderOpen;

  constructor(
    private http: HttpService,
    private router: Router,
  ) { }

  side_stats: any;

  openLink(patient_id) {
    console.log(patient_id);
    // this.router.navigate(['/patient/itr', {id: patient_id}]);
  }

  loadStats(){
    this.http.get('consultation/stats').subscribe({
      next: (data:any) => {
        // console.log(data);
        this.side_stats = data;
        // this.loadAppointments();
      },
      error: err => console.log(err)
    })
  }

  appointment_list: any = [];

  /* loadAppointments(){
    let params = {
      facility_code: this.http.getUserFacility()
    };

    this.http.get('appointment/schedule', {params}).subscribe({
      next: (data: any) => {
        this.appointment_list = data[0][formatDate(new Date(), 'yyyy-MM-dd', 'en')];
        console.log(this.appointment_list)
      },
      error: err => console.log(err)
    })
  } */

  ngOnInit(): void {
    // console.log(this.cookieService.get('access_token'))
    this.loadStats()
  }

}
