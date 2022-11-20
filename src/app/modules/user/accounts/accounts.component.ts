import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  faSpinner = faSpinner;
  account_list: any;

  is_updating: boolean = false;

  loadAccount(){
    this.http.get('users').subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.account_list = data.data;
      },
      error: err => console.log(err)
    })
  }

  submit_error: any;

  updateActive(val, i){
    this.is_updating = true;
    console.log(val);
    let params = val;
      params.birthdate = formatDate(params.birthdate,'Y-MM-dd','en');
      delete params.email;

    this.http.update('users/', val.id, params).subscribe({
      next: (data: any) => {
        console.log(data);
        this.is_updating = false;
      },
      error: err => {
        this.account_list[i].is_active = !params.is_active;
        this.submit_error = err.error.errors;
        this.is_updating = false;
      }
    })
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.loadAccount();
  }

}
