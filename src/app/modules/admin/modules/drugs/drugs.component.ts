import { Component, OnInit } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faSearch, faEdit, faAdd, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
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
  faCircleNotch = faCircleNotch;
  faTrashCan = faTrashCan;

  is_loading: boolean = false;
  show_lib_drug: boolean = false;
  show_drug_form: boolean = false;

  submit_error: any;
  drug_list: any;

  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  search_item: string;

  showEdit(data?) {
    if(data) {
      this.selected_drug = data;
    }
    this.show_drug_form = !this.show_drug_form;

    if(this.show_drug_form === false) {
      this.search_item = null;
      this.loadDrugs();
    }
  }

  selected_drug: any;
  showAdd(data?) {
    this.selected_drug = null;
    if(data === 'new') {
      this.show_drug_form = true;
    } else if(data) {
      this.selected_drug = data;
      this.show_drug_form = true;
    }
    this.show_lib_drug = !this.show_lib_drug;
  }

  modal: any = [];
  delete_id: string;
  url: string = 'medicine/list/';
  delete_desc: string = 'Medicine List'
  toggleModal(name, data?){
    if(data) this.delete_id = data.id;
    this.modal[name] = !this.modal[name];

    if(name === 'delete-item' && this.modal[name] === false) this.loadDrugs();
  }

  loadDrugs(page?: number){
    this.is_loading = true;

    let params = {params: { }};
    if (this.search_item) params['params']['filter[search]'] = this.search_item;
    if (page) params['params']['page'] = page;
    params['params']['per_page'] = this.per_page;

    this.http.get('medicine/list',params).subscribe({
      next: (data: any) => {
        this.drug_list = data.data;
        // console.log(this.drug_list)
        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;

        this.is_loading = false;
      },
      error: err => {
        this.http.showError(err.error.message, 'Loading list...')
        this.is_loading = false;
      }
    })
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.loadDrugs();
  }
}
