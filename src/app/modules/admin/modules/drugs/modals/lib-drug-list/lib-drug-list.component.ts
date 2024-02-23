import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faAdd, faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faEdit, faSearch, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-lib-drug-list',
  templateUrl: './lib-drug-list.component.html',
  styleUrls: ['./lib-drug-list.component.scss']
})
export class LibDrugListComponent implements OnInit {
  @Output() showAdd = new EventEmitter<any>()
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
  show_lib_drug: boolean = false;

  submit_error: any;
  drug_list: any;

  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  // search_item: string;

  selectDrugs(data) {
    console.log(data)
  }

  closeModal(data?) {
    this.showAdd.emit(data);
  }

  loadDrugs(page?: number){
    let params = {params: { }};
    if (this.search_item) params['params']['filter[desc]'] = this.search_item;
    if (page) params['params']['page'] = page;
    params['params']['per_page'] = this.per_page;

    this.http.get('libraries/konsulta-medicines',params).subscribe({
      next: (data: any) => {
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
    this.loadDrugs();
  }
}
