import {Component, Input, OnInit} from '@angular/core';
import {
  faAnglesLeft,
  faAnglesRight,
  faChevronLeft,
  faChevronRight,
  faCircleNotch,
  faSearch, faStethoscope
} from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-pending-fdx',
  templateUrl: './pending-fdx.component.html',
  styleUrls: ['./pending-fdx.component.scss']
})
export class PendingFdxComponent implements OnInit {
  @Input() get_patient_data: any;
  faCircleNotch = faCircleNotch;
  faAnglesLeft = faAnglesLeft;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesRight = faAnglesRight;

  show_patient_data: any = [];
  pending_fdx: any;
  show_form: boolean = false;
  patient_search: string;
  show_data: any = [];
  show_previous_dx: any;
  selected_physician: string = "all";
  physicians: [];

  per_page: number = 5;
  current_page: number = 1;
  last_page: number;
  from: number;
  to: number;
  total: number;
  isLoading: boolean = false;
  fdx_consult_date: any;
  consult_id: any;

  constructor(
    private http: HttpService

  ) { }

  openList:boolean = false;
  toggleModal(){
    let list = [];
    this.show_data = list;
    this.openList = !this.openList;
    console.log(this.show_patient_data);
  }


  getPatient(page?: number) {
    this.isLoading = true;
    this.show_form = false;

    let params = {params: { }};
    params['page'] = !page ? this.current_page : page;

    if (this.selected_physician !== 'all') {
      params['params']['physician_id'] = this.selected_physician;
    }

    if (params['params']['physician_id']) {
      delete params['params']['physician_id'];
    }

    if (this.patient_search) params['search'] = this.patient_search;
    this.http.get('reports-2018/pending-fdx/report', { params })
      .subscribe({
        next: (data: any) => {
          this.pending_fdx = data.data;
          this.current_page = data.meta.current_page;
          this.last_page = data.meta.last_page;
          this.from = data.meta.from;
          this.to = data.meta.to;
          this.total = data.meta.total;
          this.isLoading = false;
          this.show_form = true;
        },
        error: err => console.log(err)
      })
  }

  getData(patient_id: any, consult_date: any, consult_id: any) {
    let params = {
      patient_id: patient_id,
      consult_id: consult_id
      };
      this.http.get('reports-2018/pending-fdx/get-consultation', { params })
        .subscribe({
      next: (data: any) => {
        this.show_patient_data = data;
        this.show_previous_dx = data;
        this.current_page = data.current_page;
        this.last_page = data.last_page;
        this.openList = true;
        this.fdx_consult_date = consult_date;
        this.consult_id = consult_id;
      },
      error: err => console.log(err)
    });
  }

  loadPhysicians(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get('users', {params:{per_page: 'all', designation_code: 'MD'}}).subscribe({
        next: (data: any) => {
          this.physicians = data.data;
          let user_info = this.http.getUserFromJSON();
          this.selected_physician = user_info.designation_code === 'MD' ? user_info.id : 'all';
          // console.log(user_info);

          resolve(); // Resolve the promise once loading is done
        },
        error: err => {
          console.log(err);
          reject(err); // Reject the promise if there's an error
        }
      });
    });
  }

  ngOnInit(): void {
    this.loadPhysicians();
    this.current_page = 1;
    this.getPatient();
  }

  protected readonly faSearch = faSearch;
  protected readonly Number = Number;
  protected readonly faStethoscope = faStethoscope;
}
