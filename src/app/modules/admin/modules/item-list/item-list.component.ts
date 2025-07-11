import { Component, OnInit } from '@angular/core';
import { faAdd, faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faCircleNotch, faEdit, faSearch, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
  standalone: false
})
export class ItemListComponent implements OnInit{
  faSearch = faSearch;
  faAdd = faAdd;
  faEdit = faEdit;
  faTrashCan = faTrashCan;
  faCircleNotch = faCircleNotch;
  faAnglesLeft = faAnglesLeft;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesRight = faAnglesRight;

  modals: any = [];
  item_list: any = [];
  is_loading: boolean = false;
  search_item: string;
  submit_error: boolean = false;
  selected_item: any;
  delete_id: string;
  delete_desc: string;
  url: string;

  toggleDelete(data) {
    this.delete_id = data.id;
    this.delete_desc = 'Item Supplies';
    this.url = 'item-lists/item-list/';

    this.modals['delete-item'] = !this.modals['delete-item'];
    this.loadItem();
  }

  toggleModal(item:any) {
    console.log(item);
    if(item.data) {
      this.selected_item = item.data;
      this.modals[item.name] = !this.modals[item.name];
      if(item.name == 'item-lib') this.modals['item-list'] = true;
    } else {
      this.modals[item] = !this.modals[item];
    }

    if(this.modals[item] === false) {
      this.selected_item = null;
      this.loadItem();
    }
  }

  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;
  per_page: number = 10;

  loadItem(page?: number) {
    this.is_loading = true;

    let params = { params: { page: page ? page : 1, per_page: this.per_page } };
    if(this.search_item) params['params']['filter[search]'] = this.search_item;

    this.http.get('item-lists/item-list', params).subscribe({
      next: (data: any) => {
        console.log(data);
        this.item_list = data.data;
        this.is_loading = false;

        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
      },
      error: err => {
        console.log(err.error.message);
        this.is_loading = false;
        // this.submit_error = err.error.message;
      }
    });
  }

  constructor (
    private http: HttpService,
  ) { }

  ngOnInit(): void {
    this.loadItem();
  }
}
