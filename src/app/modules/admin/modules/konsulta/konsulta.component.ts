import { formatDate } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faFileExcel } from '@fortawesome/free-regular-svg-icons';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faCircleNotch, faFilter, faSave, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-konsulta',
    templateUrl: './konsulta.component.html',
    styleUrls: ['./konsulta.component.scss'],
    standalone: false
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
  faCircleNotch = faCircleNotch;
  faFileExcel = faFileExcel;

  current_year = formatDate(new Date, 'yyyy', 'en', 'Asia/Manila')
  years: any = [];

  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  filter_tranche: number = 1;
  filter_status: string ="V";
  filter_year: any;
  forms: any =[];
  form_type: string = "1";
  submit_error: any;

  konsulta_list: any = [];
  konsulta_list_export: any = [];
  save_list: any = [];
  save_list_length: number = 0;

  searching: boolean = false;
  show_return: boolean = false;
  show_list: boolean = false;
  is_saving: boolean = false;

  return_value: any;
  patient_list: any;
  search: string;

  start_date: any;
  end_date: any;

  exportAsExcel: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'submitted',
    options: { }
  }

  excel_exporting: boolean = false;

  loadList(page?: number, export_list?){
    this.forms = [];
    this.searching = true;

    let query;

    let params = {params: { }};
    if (page) params['params']['page'] = page;
    params['params']['per_page'] = export_list ? 'all' : this.per_page;
    params['params']['search'] = this.search ?? '';

    if(this.form_type === "1"){
      if (this.filter_tranche) params['params']['tranche'] = this.filter_tranche;
      params['params']['effectivity_year'] = this.filter_year;
      query = this.http.get('konsulta/generate-data',params);
    } else {
      if (this.filter_tranche) params['params']['filter[tranche]'] = this.filter_tranche;
      if (this.filter_status) params['params']['filter[xml_status]'] = this.filter_status;
      if(this.start_date) params['params']['start_date'] = this.start_date;
      if(this.end_date) params['params']['end_date'] = this.end_date;
      params['params']['effectivity_year'] = this.filter_year;

      // params['params']['include'] = 'patient'
      query = this.http.get('konsulta/validated-xml',params);
    }

    query.subscribe({
      next: (data: any) => {
        if(export_list) {
          this.konsulta_list_export = data.data;
        } else {
          this.konsulta_list = data.data;
        }

        if(this.form_type === "1") {
          this.forms['for_validation'] = true;
        } else {
          this.forms['validated_list'] = true;

          if(export_list) {
            this.excel_exporting = true;
            console.log('test')
            setTimeout(() => {
              this.exportAsService.save(this.exportAsExcel, 'Submitted').subscribe(() => {
                this.excel_exporting = false;
              });
            })
          }
        }
        this.searching = false;
        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
      },
      error: err => {
        this.toastr.error(err.error.message, 'Konsulta List')
      }
    })
  }

  printing: boolean = false;
  allListArray!: any[];
  total_print_page: number = 0;
  current_print_page: number = 1;
  getAllList() {
    this.printing = true;
    /* let params = {params: { }};

    if (this.search_item) params['params']['search'] = this.search_item;
    if (this.search_pin) params['params']['filter[philhealth_id]'] = this.search_pin;
    if (this.tranche !== 'null') params['params']['tranche'] = this.tranche;
    if (this.selected_brgy) params['params']['barangay_code'] = this.selected_brgy;
    if (this.start_date) params['params']['start_date'] = this.start_date;
    if (this.end_date) params['params']['end_date'] = this.end_date; */

    let params = {params: { }};
    // if (page) params['params']['page'] = page;
    // params['params']['per_page'] = export_list ? 'all' : this.per_page;

    if (this.filter_tranche) params['params']['filter[tranche]'] = this.filter_tranche;
    if (this.filter_status) params['params']['filter[xml_status]'] = this.filter_status;
    if (this.start_date) params['params']['start_date'] = this.start_date;
    if (this.end_date) params['params']['end_date'] = this.end_date;
    if (this.search) params['params']['search'] = this.search;

    params['params']['effectivity_year'] = this.filter_year;
    params['params']['per_page'] = 40;
    params['params']['reconcillation'] = 1;

    this.allListArray = [];
    let current_number = 0;

    const fetchPage = (page: number) => {
      params['params']['page'] = page;

      this.http.get('konsulta/validated-xml', params).subscribe({
        next: (data: any) => {
          this.total_print_page = data.meta.last_page;
          this.current_print_page = page;
          console.log(data)
          const filteredData = data.data.map((item: any, index: number) => {
            current_number += 1;
            return {
              'Item No.': current_number,
              'Patient Case No': item.patient[0].laravel_through_key,
              'Patient\'s PIN': item.patient[0].philhealth[0].philhealth_id,
              'Registration Date': formatDate(item.patient[0].philhealth[0].enlistment_date, 'MM/dd/yyyy', 'en'),
              'Health and Assessment (FPE) Date': formatDate(item.patient[0].consult[0].consult_date, 'MM/dd/yyyy', 'en'),
              'EKAS Date': formatDate(item.patient[0].consult[0].consult_date, 'MM/dd/yyyy', 'en'),
              'With Lab': '',
              'Epress Date': ''
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

    this.saveAsExcelFile(excelBuffer, 'Konsulta Summary Report');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, `${fileName}.xlsx`);
  }

  createExportList(){
    this.excel_exporting = true;
    let params = {params: { }};
    params['params']['per_page'] ='all';
    params['params']['search'] = this.search ?? '';

    if (this.filter_tranche) params['params']['filter[tranche]'] = this.filter_tranche;
    if (this.filter_status) params['params']['filter[xml_status]'] = this.filter_status;
    if(this.start_date) params['params']['start_date'] = this.start_date;
    if(this.end_date) params['params']['end_date'] = this.end_date;
    params['params']['effectivity_year'] = this.filter_year;

    this.http.get('konsulta/validated-xml',params).subscribe({
      next: (data: any) => {
        this.konsulta_list_export = data.data;

        setTimeout(() => {
          this.exportAsService.save(this.exportAsExcel, 'Submitted').subscribe(() => {
            this.excel_exporting = false;
          });
        })
      },
      error: err => {
        this.toastr.error(err.error.message, 'Konsulta List');
        this.excel_exporting = false;
      }
    })
  }

  showReturn(data?){
    this.return_value = data.data;
    this.show_return = !this.show_return;

    if(data.save !== 0) {
      this.loadList();
    }
  }

  showList(data?) {
    this.patient_list = data;
    this.toggleList();
  }

  toggleList() {
    this.show_list = !this.show_list;
  }

  toggleModal(){
    this.show_return = !this.show_return;
  }

  generateYear(){
    let date = parseInt(this.current_year);
    for(let year = date; year > date-5; year--) {
      this.years.push(year);
    }
  }

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

    let params = new HttpParams({
      fromObject: {
        'patient_id[]': patient_id,
        'tranche': this.filter_tranche,
        'revalidate': 0,
        'save': 1
      }
    });

    this.http.get('konsulta/validate-report', {params}).subscribe({
      next: (data: any) => {
        this.is_saving = false;
        if(data.errors) {
          this.toastr.error('Validation failed','Error')
          this.showReturn({data: data})
        } else {
          this.toastr.success('Success!', 'Record Validation')
          this.showReturn({data: data})
        }
        this.loadList();
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private exportAsService: ExportAsService
  ) { }

  ngOnInit(): void {
    this.generateYear();
    this.filter_year = this.current_year;

    this.loadList();
  }

}
