import { Component, OnInit } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-todays-stats',
  templateUrl: './todays-stats.component.html',
  styleUrls: ['./todays-stats.component.scss']
})
export class TodaysStatsComponent implements OnInit {
  faChevronDown = faChevronDown;

  constructor(
    private http: HttpService,
    private cookieService: CookieService
  ) { }

  side_stats: any;

  loadStats(){
    this.http.get('consultation/stats').subscribe({
      next: (data:any) => {
        // console.log(data);
        this.side_stats = data;
        this.loadAppointments();
      },
      error: err => console.log(err)
    })
  }

  loadAppointments(){
    // console.log(this.http.getUserFacility());
    let params = {
      facility_code: this.http.getUserFacility()
    };

    this.http.get('appointment/schedule', {params}).subscribe({
      next: (data: any) => {
        console.log(data)
      },
      error: err => console.log(err)
    })
  }

  ngOnInit(): void {
    // console.log(this.cookieService.get('access_token'))
    this.loadStats()
  }

}
