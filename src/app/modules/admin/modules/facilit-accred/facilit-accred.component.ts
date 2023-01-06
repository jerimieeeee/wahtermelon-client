import { Component, OnInit } from '@angular/core';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faRotate, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-facilit-accred',
  templateUrl: './facilit-accred.component.html',
  styleUrls: ['./facilit-accred.component.scss']
})
export class FacilitAccredComponent implements OnInit {
  faSpinner = faSpinner;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faSearch = faSearch;
  faRotate = faRotate;

  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  search_item: string;
  submit_error: any;

  konsulta_list: any = [];

  extractReg(){
    let params = {
      pStartDate: '',
      pEndDate: ''
    }

    this.http.post('extract url', {params}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.loadList();
      },
      error: err => console.log(err)
    })
  }

  loadList(){
    this.http.get('settings/philhealth-credentials').subscribe({
      next: (data: any) => {
        console.log(data.data)
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.loadList()
  }
}
