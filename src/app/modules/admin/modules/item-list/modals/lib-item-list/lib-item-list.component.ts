import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faCircleXmark, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-lib-item-list',
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './lib-item-list.component.html',
  styleUrl: './lib-item-list.component.scss'
})
export class LibItemListComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>()
  @Input() search_item;

  faAnglesLeft = faAnglesLeft;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesRight = faAnglesRight;
  faSearch = faSearch;
  faEdit = faEdit;
  faAdd = faAdd;
  faCircleXmark = faCircleXmark;

  is_updating: boolean = false;
  is_loading: boolean = false;
  show_lib_drug: boolean = false;

  submit_error: any;
  item_list: any;

  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  // search_item: string;

  closeModal(data?) {
    let emit_data;

    if(data) {
      emit_data = {data: data, name: 'item-lib'};
    } else {
      emit_data = 'item-lib';
    }

    this.toggleModal.emit(emit_data);
  }

  loadItem(page?: number){
    this.is_loading = true;
    let params = {params: { }};
    if (this.search_item) params['params']['filter[search]'] = this.search_item;
    if (page) params['params']['page'] = page;
    params['params']['per_page'] = this.per_page;

    this.http.get('libraries/item-claims',params).subscribe({
      next: (data: any) => {
        this.item_list = data.data;

        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
        this.is_loading = false;
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.loadItem();
  }
}
