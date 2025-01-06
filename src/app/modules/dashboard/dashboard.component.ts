import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: false
})
export class DashboardComponent implements OnInit {
  date_today = formatDate(new Date(), 'MM/dd/yyyy', 'en', 'Asia/Manila');

  user_designation!: string;

  constructor (
    private http: HttpService
  ) { }

  ngOnInit(): void {
    const user = this.http.getUserFromJSON();
    this.user_designation = user.designation ? user.designation.code : user.designation_code;
  }
}
