import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faFileExcel } from '@fortawesome/free-regular-svg-icons';
import { faAnglesLeft, faAnglesRight, faCalendarDays, faChevronLeft, faChevronRight, faRotate, faSearch, faSpinner, faArrowsRotate, faArrowUpFromBracket, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as-17';

@Component({
    selector: 'app-konsulta-masterlist',
    templateUrl: './konsulta-masterlist.component.html',
    styleUrls: ['./konsulta-masterlist.component.scss'],
    standalone: false
})
export class KonsultaMasterlistComponent implements OnInit {
  faSpinner = faSpinner;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faSearch = faSearch;
  faRotate = faRotate;
  faCalendarDays = faCalendarDays;
  faArrowsRotate = faArrowsRotate;
  faFileExcel = faFileExcel;
  faCircleNotch = faCircleNotch;

  tranches = [
    {code: 0, desc: 'No Submission'},
    {code: 1, desc: 'Tranche 1 Only'},
    {code: 2, desc: 'Tranche 2 Only'},
    {code: 3, desc: 'Both Tranche'},
    {code: 4, desc: 'No Record'},
  ];

  current_year = formatDate(new Date(), 'YYYY', 'en', 'Asia/Manila');
  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  search_item: string;
  search_pin: string;
  search_year: string;
  tranche: string;

  konsulta_list: any = [];
  years: any = [];
  modal: any = [];
  selected_brgy: [];
  brgys: any;

  export_list: any = [];

  excel_exporting: boolean = false;

  exportAsExcel: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'masterlistForm',
    options: {

    }
  }

  toggleModal(name: string){
    this.modal[name] = !this.modal[name];
  }

  showList(data) {
    this.konsulta_list = data.ASSIGNMENT;
  }

  loadBrgy(userMun){
    this.http.get('libraries/municipalities/'+userMun, {params:{include: 'barangays'}}).subscribe({
      next: (data: any) => {
        this.brgys = data.data.barangays;
        this.loadList(null, 'konsulta_list');
      },
      error: err => console.log(err)
    })
  }

  loadList(page?: number, variable?: string, per_page?: any){
    console.log(this.tranche)
    this.excel_exporting = true;
    let params = {params: { }};
    if (this.search_item) params['params']['search'] = this.search_item;
    if (this.search_pin) params['params']['filter[philhealth_id]'] = this.search_pin;
    if (this.search_year) params['params']['filter[effectivity_year]'] = this.search_year;
    if (this.tranche !== 'null') params['params']['tranche'] = this.tranche;
    if (page) params['params']['page'] = page;
    if (this.selected_brgy) params['params']['barangay_code'] = this.selected_brgy;

    params['params']['per_page'] = per_page ? 'all' : this.per_page;

    this.http.get('konsulta/registration-lists',params).subscribe({
      next: (data: any) => {
        this[variable] = data.data;

        if(this[variable] && variable === 'export_list') {
          setTimeout(() => {
            this.exportAsService.save(this.exportAsExcel, 'Masterlist').subscribe(() => {
              this.excel_exporting = false;
            });
          })
        } else {
          this.current_page = data.meta.current_page;
          this.last_page = data.meta.last_page;
          this.from = data.meta.from;
          this.to = data.meta.to;
          this.total = data.meta.total;
          this.excel_exporting = false;
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }

  constructor(
    private http: HttpService,
    private exportAsService: ExportAsService
  ) { }


  ngOnInit(): void {
    for (let year = Number(this.current_year); year >= 2018; year--) {
      this.years.push(year);
    }
    this.search_year = this.current_year;
    let userFacility = this.http.getUserFromJSON();
    this.loadBrgy(userFacility.facility.municipality.code);
  }
}
