import { Component, OnInit } from '@angular/core';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faSearch, faEdit, faAdd } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss']
})
export class DrugsComponent implements OnInit {
  faAnglesLeft = faAnglesLeft;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesRight = faAnglesRight;
  faSearch = faSearch;
  faEdit = faEdit;
  faAdd = faAdd;

  is_updating: boolean = false;
  show_lib_drug: boolean = false;
  show_drug_form: boolean = true;

  submit_error: any;
  drug_list: any;

  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  search_item: string;

  showEdit() {
    this.show_drug_form = !this.show_drug_form;
  }

  showAdd() {
    this.show_lib_drug = !this.show_lib_drug;
  }

  loadDrugs(page?: number){
    let params = {params: { }};
    if (this.search_item) params['params']['filter[search]'] = this.search_item;
    if (page) params['params']['page'] = page;
    params['params']['per_page'] = this.per_page;

    console.log(params)
    this.http.get('users',params).subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.drug_list = data.data;

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
    // this.loadDrugs();
  }
}
