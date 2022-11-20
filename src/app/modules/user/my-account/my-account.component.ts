import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  showModal: boolean = false;

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    // this.http.get('')
  }

}
