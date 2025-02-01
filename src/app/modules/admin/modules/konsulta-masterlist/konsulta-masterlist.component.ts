import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faFileExcel } from '@fortawesome/free-regular-svg-icons';
import { faAnglesLeft, faAnglesRight, faCalendarDays, faChevronLeft, faChevronRight, faRotate, faSearch, faSpinner, faArrowsRotate, faArrowUpFromBracket, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
  tranche: string | null;

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

  printing: boolean = false;
  allListArray!: any[];
  total_print_page: number = 0;
  current_print_page: number = 1;
  // current_year: new Date().getFullYear();
  start_date: string | null;
  end_date: string | null;

  getAllList() {
    this.printing = true;
    let params = {params: { }};

    if (this.search_item) params['params']['search'] = this.search_item;
    if (this.search_pin) params['params']['filter[philhealth_id]'] = this.search_pin;
    if (this.tranche !== 'null') params['params']['tranche'] = this.tranche;
    if (this.selected_brgy) params['params']['barangay_code'] = this.selected_brgy;
    if (this.start_date) params['params']['start_date'] = this.start_date;
    if (this.end_date) params['params']['end_date'] = this.end_date;

    params['params']['per_page'] = 500;

    this.allListArray = [];

    const fetchPage = (page: number) => {
      params['params']['page'] = page;

      this.http.get('konsulta/registration-lists', params).subscribe({
        next: (data: any) => {
          this.total_print_page = data.meta.last_page;
          this.current_print_page = page;
          console.log(data)
          const filteredData = data.data.map((item: any, index: number) => {
            return {
              'Assigned Date': item.assigned_date,
              'Name': item.first_name + ' ' + item.middle_name + ' ' + item.last_name,
              'Birthdate': item.birthdate,
              'Gender': item.gender,
              'PhilHealth PIN': item.philhealth_id,
              'Membership Type': item.membership_type_id === 'MM' ? 'Member' : 'Dependent',
              'Primary Name': item.member_last_name + ', ' + item.member_first_name + ' ' + item.member_middle_name,
              'Primary PhilHealth PIN': item.member_philhealth_id,
              'Primary Birthdate': item.member_birthdate,
              'Primary Gender': item.member_gender
            }
          });

          this.allListArray.push(...filteredData);
          if( page < data.meta.last_page ) {
            fetchPage( page + 1 );
          } else {
            this.exportToExcel(this.allListArray);
            this.printing = false;
          }
        },
        error: err => console.log(err)
      });
    };

    fetchPage(1);
  }

  exportToExcel(data: {any}[]) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    const columnWidths = Object.keys(data[0] || {}).map((key) => {
      const maxLength = Math.max(
        key.length,
        ...data.map((row) => (row[key] ? row[key].toString().length : 0))
      );
      return { wch: maxLength + 2 };
    });
    worksheet['!cols'] = columnWidths;

    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data'],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    this.saveAsExcelFile(excelBuffer, 'E-Claims Summary Report');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, `${fileName}.xlsx`);
  }

  loadList(page?: number, variable?: string, per_page?: any){
    console.log(this.tranche)
    this.excel_exporting = true;
    let params = {params: { }};
    if (this.search_item) params['params']['search'] = this.search_item;
    if (this.search_pin) params['params']['filter[philhealth_id]'] = this.search_pin;
    // if (this.search_year) params['params']['filter[effectivity_year]'] = this.search_year;
    if (this.tranche !== 'null') params['params']['tranche'] = this.tranche;
    if (page) params['params']['page'] = page;
    if (this.selected_brgy) params['params']['barangay_code'] = this.selected_brgy;
    if(this.start_date) params['params']['start_date'] = this.start_date;
    if(this.end_date) params['params']['end_date'] = this.end_date;

    params['params']['per_page'] = per_page ? 'all' : this.per_page;

    console.log(params)
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
    this.start_date = `${this.current_year}-01-01`;
    this.end_date = `${this.current_year}-12-31`;
    for (let year = Number(this.current_year); year >= 2018; year--) {
      this.years.push(year);
    }
    this.search_year = this.current_year;
    let userFacility = this.http.getUserFromJSON();
    this.loadBrgy(userFacility.facility.municipality.code);
  }
}
