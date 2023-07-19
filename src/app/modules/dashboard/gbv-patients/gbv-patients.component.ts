import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-gbv-patients',
  templateUrl: './gbv-patients.component.html',
  styleUrls: ['./gbv-patients.component.scss']
})
export class GbvPatientsComponent implements OnInit{
  @Input() date_today;
  faCircleNotch = faCircleNotch;
  faAnglesLeft = faAnglesLeft;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesRight = faAnglesRight;

  gbv_lists: any;
  show_form: boolean = false;

  per_page: number = 5;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  openItr(patient_id, ptgroup, id){
    this.router.navigate(['/patient/'+ptgroup, {id: patient_id}]);
  }

  getList(page?: number) {
    this.show_form = false;
    let params = {params: { }};
    params['params']['page'] = !page ? this.current_page : page;
    params['params']['per_page'] = this.per_page;
    params['params']['disable_filter'] = 1;

    this.http.get('gender-based-violence/patient-gbv-list', params).subscribe({
      next: (data:any) => {
        console.log(data);
        this.gbv_lists = data.data;

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

  constructor (
    private http: HttpService,
    private router: Router
  ) { }

  pos: any;
  arr_allowed = ['MD','WCPD','MSWDO'];
  enable_gbv: boolean = false;

  ngOnInit(): void {
    let user = this.http.getUserFromJSON();
    this.pos = user.designation_code ? user.designation_code : user.designation.code;

    if(this.arr_allowed.indexOf(this.pos) > -1) {
      this.enable_gbv = true;
      this.getList();
    }
  }
}
