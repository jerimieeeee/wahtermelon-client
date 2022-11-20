import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  account_list: any;

  loadAccount(){
    this.http.get('users').subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.account_list = data.data;
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.loadAccount();
  }

}
