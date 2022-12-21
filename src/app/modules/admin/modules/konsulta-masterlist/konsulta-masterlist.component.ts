import { Component, OnInit } from '@angular/core';
import { faAnglesLeft, faAnglesRight, faCalendarDays, faChevronLeft, faChevronRight, faRotate, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-konsulta-masterlist',
  templateUrl: './konsulta-masterlist.component.html',
  styleUrls: ['./konsulta-masterlist.component.scss']
})
export class KonsultaMasterlistComponent implements OnInit {
  faSpinner = faSpinner;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faSearch = faSearch;
  faRotate = faRotate;
  faCalendarDays = faCalendarDays;

  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  search_item: string;
  submit_error: any;

  konsulta_list: any = [];

  modal: any = [];

  toggleModal(name: string){
    this.modal[name] = !this.modal[name];
  }

  showList(data) {
    this.konsulta_list = data.ASSIGNMENT;
    console.log(this.konsulta_list);
  }

  loadList(page?: number){
    let params = {params: { }};
    if (this.search_item) params['params']['filter[search]'] = this.search_item;
    if (page) params['params']['page'] = page;
    params['params']['per_page'] = this.per_page;

    console.log(params)
    this.http.get('users',params).subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.konsulta_list = data.data;

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
    private http: HttpService
  ) { }

  ngOnInit(): void {
  }
}
