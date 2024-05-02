import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {HttpService} from "../../../../shared/services/http.service";
import {faAnglesLeft, faAnglesRight, faCircleNotch, faCircleXmark, faSearch} from "@fortawesome/free-solid-svg-icons";
import {BehaviorSubject} from "rxjs";

interface State {
  page: number;
  pageOffset: number;
}

@Component({
  selector: 'app-show-name-list',
  templateUrl: './show-name-list.component.html',
  styleUrls: ['./show-name-list.component.scss']
})
export class ShowNameListComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() name_list_params: any;
  @Input('length') length: number;
  @Input('pageOffset') pageOffset: number;
  @Input('pageIndex') pageIndex: number;

  paginate = new BehaviorSubject<State>({
    page: 1,
    pageOffset: 10
  });

  search = faSearch;
  show_nameList: any;
  search_patient: string;

  per_page: number = 10;
  current_page: number = 1;
  last_page: number;
  from: number;
  to: number;
  total: number;
  is_fetching: boolean = false;

  constructor(
    private http: HttpService

  ) { }

  getList(page?: number) {
    this.is_fetching = true;
    page = page ?? 1;
    let params: any = this.name_list_params;
    params['page'] = !page ? this.current_page : page;
    if (this.search_patient) params['search'] = this.search_patient;

    this.http.get('reports-2018/fp-namelist/name-list', { params }).subscribe({
      next: (data: any) => {
        this.is_fetching = false;
        this.show_nameList = data;
        this.current_page = data.current_page;
        this.last_page = data.last_page;
        console.log(this.last_page, 'last page itu')
        console.log(this.current_page, 'current page itu')
      },
      error: err => console.log(err)
    });
  }


  closeModal() {
    this.toggleModal.emit();
  }

  ngOnInit(): void {
    this.getList();
  }

  protected readonly faCircleXmark = faCircleXmark;
  protected readonly faSearch = faSearch;
  protected readonly faAnglesLeft = faAnglesLeft;
  protected readonly faAnglesRight = faAnglesRight;
  protected readonly Number = Number;
  protected readonly faCircleNotch = faCircleNotch;
}
