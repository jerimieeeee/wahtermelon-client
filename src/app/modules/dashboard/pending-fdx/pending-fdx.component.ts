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

  per_page: number = 5;
  current_page: number = 1;
  last_page: number;
  from: number;
  to: number;
  total: number;
  isLoading: boolean = false;

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
    this.show_form = false;
    page = page ?? 1;
    if (this.isLoading) return;
    let params = {params: { }};
    params['page'] = !page ? this.current_page : page;
    if (this.patient_search) params['search'] = this.patient_search;

    this.isLoading = true;
    this.http.get('reports-2018/pending-fdx/report', { params })
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (data: any) => {
          this.pending_fdx = data.data;
          this.current_page = data.current_page;
          this.last_page = data.last_page;
          this.from = data.from;
          this.to = data.to;
          this.total = data.total;
          this.show_form = true;
        },
        error: err => console.log(err)
      })
  }

  getData(patient_id: any, notes_id: any, consult_id: any) {
    console.log(notes_id, 'notes_id');
    console.log(consult_id, 'consult_id');
    let params = {
      patient_id: patient_id,
      };
      this.http.get('reports-2018/pending-fdx/get-consultation', { params })
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe({
      next: (data: any) => {
        this.show_patient_data = data;
        this.current_page = data.current_page;
        this.last_page = data.last_page;
        this.openList = true;
      },
      error: err => console.log(err)
    });
  }

  ngOnInit(): void {
    this.current_page = 1;
    this.getPatient();
  }

  protected readonly faSearch = faSearch;
  protected readonly Number = Number;
  protected readonly faStethoscope = faStethoscope;
}
