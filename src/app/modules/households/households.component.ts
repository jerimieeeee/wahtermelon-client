import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPenToSquare, faSearch, faChevronLeft, faChevronRight, faAnglesLeft, faAnglesRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-households',
  templateUrl: './households.component.html',
  styleUrls: ['./households.component.scss']
})
export class HouseholdsComponent implements OnInit {
  household_list: any;
  search_item: string;

  faSearch = faSearch;
  faPenToSquare = faPenToSquare;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faUser = faUser;

  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  navigateTo(loc, data){
    // console.log(data)
    this.router.navigate(['/'+loc, {id: data.id}])
  }

  loadHouseholds(page?: number){
    let params = {params: { }};
    if (this.search_item) params['params']['filter[search]'] = this.search_item;
    if (page) params['params']['page'] = page;
    params['params']['include'] = 'barangay';
    params['params']['per_page'] = this.per_page;
    params['params']['effectivity_year'] = formatDate(new Date, 'yyyy', 'en', 'Asia/Manila');

    this.http.get('households/household-folders',params).subscribe({
      next: (data: any) => {
        // console.log(data)
        this.household_list = data.data;
        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadHouseholds();
  }
}
