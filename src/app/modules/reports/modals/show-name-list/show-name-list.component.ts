import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {HttpService} from "../../../../shared/services/http.service";
import {faAnglesLeft, faAnglesRight, faCircleNotch, faCircleXmark, faSearch} from "@fortawesome/free-solid-svg-icons";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

interface State {
  page: number;
  pageOffset: number;
}

@Component({
    selector: 'app-show-name-list',
    templateUrl: './show-name-list.component.html',
    styleUrls: ['./show-name-list.component.scss'],
    standalone: false
})
export class ShowNameListComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() name_list_params: any;
  @Input() length: number;
  @Input() pageOffset: number;
  @Input() pageIndex: number;
  @Input() reportForm: any;
  @Input() selectedBrgy: any;
  @Input() selectedCode: any;
  @Input() url: any;
  @Input() loc: any;
  @Input() params: any;

  protected readonly faCircleXmark = faCircleXmark;
  protected readonly faSearch = faSearch;
  protected readonly faAnglesLeft = faAnglesLeft;
  protected readonly faAnglesRight = faAnglesRight;
  protected readonly Number = Number;
  protected readonly faCircleNotch = faCircleNotch;

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
  location: any;

  constructor(
    private http: HttpService,
    private router: Router,

  ) { }

  getList(page?: number) {
    this.is_fetching = true;
    page = page ?? 1;
    let params: any = this.name_list_params;
    params['page'] = !page ? this.current_page : page;
    if (this.search_patient) params['search'] = this.search_patient;

    if (this.name_list_params.category === 'muncity') {
      params['category'] = 'muncity';
    } else if (this.name_list_params.category === 'brgys') {
      params['category'] = 'brgys';
    } else if (this.name_list_params.category === 'fac') {
      params['category'] = 'fac';
    } else {
      params['category'] = this.name_list_params.category;
    }

    if(this.name_list_params.category !== 'all') {
      params['code'] = this.selectedCode;
    }
    this.http.get(this.url, { params }).subscribe({
      next: (data: any) => {
        this.is_fetching = false;
        this.show_nameList = data.data;
        console.log(this.show_nameList, 'amens2u')
        this.current_page = data.current_page;
        this.last_page = data.last_page;
      },
      error: err => console.log(err)
    });
  }

  navigateTo(loc, patient_id, consult_id){
    if (loc === 'cn') {
      this.router.navigate(['/patient/'+loc,{id: patient_id, consult_id: consult_id}])
    } else {
      this.router.navigate(['/patient/'+loc,{id: patient_id}])
    }
  }

  closeModal() {
    this.toggleModal.emit();
  }

  ngOnInit(): void {
    console.log(this.selectedCode)
    this.getList();
  }

}
