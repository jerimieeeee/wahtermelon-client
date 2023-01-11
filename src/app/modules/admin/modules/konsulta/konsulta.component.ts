import { formatDate } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faFilter, faSave, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-konsulta',
  templateUrl: './konsulta.component.html',
  styleUrls: ['./konsulta.component.scss']
})
export class KonsultaComponent implements OnInit {
  faSpinner = faSpinner;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faSearch = faSearch;
  faFilter = faFilter;
  faSave = faSave;

  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  submit_error: any;
  filter_tranche: number = 1;
  filter_status: string ="V";
  filter_year: any;

  konsulta_list: any = [];

  searching: boolean = false;

  forms: any =[];
  form_type: string = "1";

  loadList(page?: number){
    this.forms = [];
    this.searching = true;

    let query;

    let params = {params: { }};
    if (page) params['params']['page'] = page;
    params['params']['per_page'] = this.per_page;

    if(this.form_type === "1"){
      if (this.filter_tranche) params['params']['tranche'] = this.filter_tranche;
      params['params']['effectivity_year'] = this.filter_year;
      query = this.http.get('konsulta/generate-data',params);
    } else {
      if (this.filter_tranche) params['params']['filter[tranche]'] = this.filter_tranche;
      if (this.filter_status) params['params']['filter[xml_status]'] = this.filter_status;
      query = this.http.get('konsulta/validated-xml',params);
    }

    query.subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.konsulta_list = data.data;

        if(this.form_type === "1") {
          this.forms['for_validation'] = true;
        } else {
          this.forms['validated_list'] = true;
        }
        this.searching = false;
        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
      },
      error: err => console.log(err)
    })
  }

  show_return: boolean = false;
  return_value: any;
  showReturn(data?){
    this.return_value = data.data;
    this.show_return = !this.show_return;

    if(data.save !== 0) {
      this.loadList();
    }
  }

  toggleModal(){
    this.show_return = !this.show_return;
  }

  current_year = formatDate(new Date, 'yyyy', 'en')
  years: any = [];
  generateYear(){
    let date = parseInt(this.current_year);
    for(let year = date; year > date-5; year--) {
      this.years.push(year);
    }
  }

  save_list: any = [];
  is_saving: boolean = false;
  save_list_length: number = 0;

  addSaving(data){
    this.save_list = data;
    this.save_list_length = Object.keys(this.save_list).length;
  }

  validateNewList(){
    this.is_saving = true;
    let patient_id = [];
    Object.entries(this.save_list).forEach(([key, value], index) => {
      patient_id.push(key)
    })

    // console.log(patient_id)
    let params = new HttpParams({
      fromObject: {
        'patient_id[]': patient_id,
        'tranche': this.filter_tranche,
        'revalidate': 0
      }
    });

    // console.log(params)
    this.http.get('konsulta/validate-report', {params}).subscribe({
      next: (data: any) => {
        console.log(data)
        this.is_saving = false;
        if(data.errors) {
          this.toastr.error('Validation failed','Error')
          this.showReturn(data)
        } else {
          this.toastr.success('Success!', 'Record Validation')
        }
        this.loadList();
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.generateYear();
    this.filter_year = this.current_year;

    this.loadList();
  }

}
