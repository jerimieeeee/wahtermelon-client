import { Component, OnInit } from '@angular/core';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faPenToSquare, faPlus, faRotate, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-facilit-accred',
  templateUrl: './facilit-accred.component.html',
  styleUrls: ['./facilit-accred.component.scss']
})
export class FacilitAccredComponent implements OnInit {
  faSpinner = faSpinner;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faSearch = faSearch;
  faRotate = faRotate;
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;

  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  search_item: string;
  submit_error: any;

  konsulta_list: any = [];

  extractReg(){
    let params = {
      pStartDate: '',
      pEndDate: ''
    }

    this.http.post('extract url', {params}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.loadList();
      },
      error: err => console.log(err)
    })
  }

  accred_list: any;
  modals: any = [];

  credential_to_edit: any;

  openEdit(name, data){
    this.credential_to_edit = data;
    this.modals[name] = !this.modals[name];
  }

  toggleModal(name, ){
    this.modals[name] = !this.modals[name];

    if(this.modals['add'] === false) {
      this.credential_to_edit = null
      this.loadList();
    }
  }

  loadList(page?: number){
    let params = {params: { }};
    // if (this.search_item) params['params']['filter[search]'] = this.search_item;
    if (page) params['params']['page'] = page;
    params['params']['per_page'] = this.per_page;

    this.http.get('settings/philhealth-credentials', params).subscribe({
      next: (data: any) => {
        this.accred_list = data.data
        console.log(data.data)

        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
      },
      error: err => console.log(err)
    })
  }


  loadAccount(page?: number){
    let params = {params: { }};
    if (this.search_item) params['params']['filter[search]'] = this.search_item;
    if (page) params['params']['page'] = page;
    params['params']['per_page'] = this.per_page;

    console.log(params)
    this.http.get('users',params).subscribe({
      next: (data: any) => {
        console.log(data.data);
        // this.account_list = data.data;

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
    this.loadList()
  }
}
