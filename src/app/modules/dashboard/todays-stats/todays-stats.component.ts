import { Component, OnInit } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-todays-stats',
  templateUrl: './todays-stats.component.html',
  styleUrls: ['./todays-stats.component.scss']
})
export class TodaysStatsComponent implements OnInit {
  faChevronDown = faChevronDown;

  constructor(
    private http: HttpService
  ) { }

  side_stats: any;

  loadStats(){
    this.http.get('consultation/cn-stats').subscribe({
      next: (data:any) => {
        // console.log(data);
        this.side_stats = data;
      },
      error: err => console.log(err)
    })
  }
  ngOnInit(): void {
    this.loadStats()
  }

}
