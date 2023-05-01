import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  faSpinner = faSpinner;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faSearch = faSearch;

  account_list: any;
  submit_error: any;

  is_updating: boolean = false;

  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  search_item: string;

  loadAccount(page?: number){
    let params = {params: { }};
    if (this.search_item) params['params']['filter[search]'] = this.search_item;
    if (page) params['params']['page'] = page;
    params['params']['per_page'] = this.per_page;

    // console.log(params)
    this.http.get('users',params).subscribe({
      next: (data: any) => {
        // console.log(data.data);
        this.account_list = data.data;

        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
      },
      error: err => console.log(err)
    })
  }

  updateActive(val, i){
    // console.log(val)
    this.is_updating = true;
    let params = val;
    const user_id = params.id
    const temp_email = params.email

    params.birthdate = formatDate(params.birthdate,'yyyy-MM-dd','en');
    params['employer_code'] = params.employer ? params.employer.code : null;
    params['designation_code'] = params.designation ? params.designation.code : null;
    params['facility_code'] = params.facility ? params.facility.code : null;

    delete params.email;
    delete params.id;

    this.http.update('users/', user_id, params).subscribe({
      next: (data: any) => {
        // console.log(data);
        // this.loadAccount()
        this.is_updating = false;
        params.email = temp_email;
        params.id = user_id;
        // console.log(this.account_list)
      },
      error: err => {
        this.account_list[i].is_active = !params.is_active;
        this.submit_error = err.error.errors;
        params.email = temp_email;
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
