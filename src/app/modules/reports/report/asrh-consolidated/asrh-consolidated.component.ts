import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import {faAnglesLeft, faAnglesRight, faCircleNotch, faCircleXmark, faSearch, faChevronLeft, faChevronRight, faFileExcel} from "@fortawesome/free-solid-svg-icons";
import { HttpService } from 'app/shared/services/http.service';
import {ExportAsService, ExportAsModule, ExportAsConfig} from "ngx-export-as";
import { is } from 'date-fns/locale';
import { report } from 'process';
import {BehaviorSubject} from "rxjs";


interface State {
  page: number;
  pageOffset: number;
}

@Component({
  selector: 'app-asrh-consolidated',
  templateUrl: './asrh-consolidated.component.html',
  styleUrl: './asrh-consolidated.component.scss',
  standalone: false
})
export class AsrhConsolidatedComponent implements OnChanges, OnInit {
  @Input() report_data;
  @Input() reportForm;
  @Input() selectedBrgy;
  @Input() selectedCode!: any;
  @Input() brgys;
  @Input() facility;
  @Input() submit_flag;
  // @Input() name_list_params: any;
  @Input() length: number;
  @Input() pageOffset: number;
  @Input() pageIndex: number;
  // @Input() url: any;
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
   name_list_params: any = {
     category: 'all',
     per_page: 15
   };

   exportAsExcel: ExportAsConfig = {
       type: 'xlsx',
       elementIdOrContent: 'reportForm',
       options: { }
     }

   per_page: number = 10;
   current_page: number = 1;
   last_page: number;
   from: number;
   to: number;
   total: number;
   is_fetching: boolean = false;
   location: any;
   userInfo: any = {};
   name_list: any = [];

  constructor(
      private http: HttpService,
      private router: Router,
      private exportAsService: ExportAsService,

    ) { }

  show_form: boolean = false;
  main : any;
  top5 : any;
  visits: any;
  prenatal: any;
  fp: any;
  social_histories: any;
  iron: any;
  dm_hypn: any;
  vitals: any;

  pararams: any;

  exporting: boolean = false;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faFileExcel = faFileExcel

  url2= 'reports-2018/asrh/masterlist';
  url= 'reports-2018/asrh/name-list';

  //  showNameList(patient_initials: string) {
  //   this.name_list_params = {
  //     initials: patient_initials,
  //     category: this.reportForm.value.report_class,
  //     per_page: 10,
  //   };
  //   this.openList = true;
  // }

  // openList:boolean = false;
  // toggleModal(){
  //   let list = [];

  //   this.show_nameList = list;
  //   this.openList = !this.openList;
  // }

  getChartHistory(page?: number){
    // console.log('query')
    let params = {
      start_date: this.reportForm.value.start_date,
      end_date: this.reportForm.value.end_date,
      per_page: 15,
      page: !page ? this.current_page : page
    }

    // params['params']['page'] = !page ? this.current_page : page;
    // if (this.selected_physician !== 'all') params['params']['physician_id'] = this.selected_physician;
    // params['params']['per_page'] = this.per_page;
    // params['params']['patient_id'] = this.fp_visit_history_details.patient_id;
    // params['params']['consult_done'] = 0;

    // console.log(params, page, this.current_page)
    this.http.get(this.url2, {params}).subscribe({
      next: (data: any) => {
        // console.log(data);
        // this.show_form = true;
        this.main = data
        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
        console.log(this.main, 'chart history')
      },
      error: err => console.log(err)
    })
  }

  navigateTo(patient_opd_id: string){
    console.log(patient_opd_id, 'patient')

       this.router.navigate(['/patient/itr',{id: patient_opd_id}])

  }

  openPatientDetails(patient_opd_id: any) {
    if (patient_opd_id) {
      this.navigateTo(patient_opd_id);
    }
  }

isPhysicalExamNormal(peList: any[]): boolean {
  if (!Array.isArray(peList)) {
    return false;
  }

  // Check if there are any physical exam records
  if (peList.length === 0) {
    return false;
  }

  // Check each physical exam record for the patient
  return peList.every(pe => {
    if (!pe || !pe.lib_physical_exam) {
      return false;
    }
    return pe.lib_physical_exam.pe_desc === 'Essentially Normal';
  });
}

isDiagnosis(peList: any[]): boolean {
  if (!Array.isArray(peList)) {
    return false;
  }

  // Check if there are any physical exam records
  if (peList.length === 0) {
    return false;
  }

  // Check each physical exam record for the patient
  return peList.every(pe => {
    if (!pe || !pe.lib_icd10) {
      return false;
    }
    return pe.lib_icd10.pe_des === 'Essentially Normal';
  });
}


// exportX() {
//   this.exportAsService.save(this.exportAsExcel, 'ASRH Consolidated').subscribe({
//     next: () => {
//     this.exporting = true;
//     },
//     complete: () => {
//     this.exporting = false;
//     }
//   });
//   }

  exportX(report_name: string) {
    report_name = report_name.substring(0, 4)
    console.log(report_name+'_'+this.getTrailName());
    this.exportAsService.save(this.exportAsExcel, report_name+'_'+this.getTrailName()).subscribe(() => {
      // save started
    });
  }

  getTrailName(): string {
    let trailName: string = '';
    if(this.reportForm.value.start_date) trailName = this.reportForm.value.start_date+'_'+this.reportForm.value.end_date;
    if(this.reportForm.value.month) trailName = this.reportForm.value.month+"_"+this.reportForm.value.year;
    if(this.reportForm.value.quarter) trailName = this.reportForm.value.quarter+"_"+this.reportForm.value.year;

    return trailName
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

      // if (this.filter_tranche) params['params']['filter[tranche]'] = this.filter_tranche;
      // if (this.filter_status) params['params']['filter[xml_status]'] = this.filter_status;
      if (this.reportForm.value.start_date) params['params']['start_date'] = this.reportForm.value.start_date;
      if (this.reportForm.value.end_date) params['params']['end_date'] = this.reportForm.value.end_date;
      // if (this.search) params['params']['search'] = this.search;


      params['params']['per_page'] = 'all';
      // params['params']['reconcillation'] = 1;

      this.allListArray = [];
      let current_number = 0;

      const fetchPage = (page: number) => {
        // params['params']['page'] = page;

        this.http.get(this.url2, params).subscribe({
          next: (data: any) => {
            // this.total_print_page = data.meta.last_page;
            // this.current_print_page = page;
            console.log(data, 'data ng mama');
            const filteredData = data.data.map((item: any, index: number) => {
              current_number += 1;

            });

            this.allListArray.push(...filteredData);

              this.exportToExcel(this.allListArray);
              this.printing = false;

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

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url: string = window.URL.createObjectURL(data);
        const link: HTMLAnchorElement = document.createElement('a');
        link.href = url;
        link.download = `${fileName}.xlsx`;
        link.click();
        window.URL.revokeObjectURL(url);
    }

    dateToday : any;
    getToday(): string {
      const today = new Date();
      this.dateToday = formatDate(today, 'MMMM dd, yyyy HH:mm', 'en-US');
      console.log(this.dateToday, 'today date');
      return

    }


    start_year : any;
    end_year : any;
    getYearFromDates(): { startYear: number, endYear: number } {
      const startDate = new Date(this.reportForm?.value?.start_date);
      const endDate = new Date(this.reportForm?.value?.end_date);
      this.start_year = startDate.getFullYear();
      this.end_year = endDate.getFullYear();
      return {
        startYear: startDate.getFullYear(),
        endYear: endDate.getFullYear()
      };


    }

    start_date : any;
    end_date : any;
    getStartAndEndDate(): { start_date: string, end_date: string } {
     const startDate = new Date(this.reportForm?.value?.start_date);
      const endDate = new Date(this.reportForm?.value?.end_date);
      this.start_date = formatDate(startDate, 'MMMM dd, yyyy', 'en-US');
      this.end_date = formatDate(endDate, 'MMMM dd, yyyy', 'en-US');
      return { start_date: this.start_date,
               end_date: this.end_date };
    }

    name_list_parameters: {};
  openList:boolean = false;

    showNameList(gender: string, indicator: string, age?: string, icd10_code?: string) {
    // Create the name_list_params object dynamically
    this.name_list_parameters = {
      start_date: this.reportForm.value.start_date,
      end_date: this.reportForm.value.end_date,
      category: this.reportForm.value.report_class,
      per_page: 10,
      indicator: indicator,
     ...(age !== undefined && { age: age }), // Add 'age' only if it's defined
     ...(icd10_code !== undefined && { icd10_code: icd10_code }), // Add 'icd10' only if it's defined
      gender: gender,
    };
    this.openList = true;
    console.log(this.name_list_parameters, 'name list params');
  };

   toggleModal(){
    let list = [];

    this.name_list = list;
    this.openList = !this.openList;
  }




  ngOnChanges(): void {
    this.main = this.report_data.data.main;
    this.top5 = this.report_data.data.top5;
    this.visits = this.report_data.data.visits;
    this.prenatal = this.report_data.data.prenatal;
    this.fp = this.report_data.data.fp;
    this.social_histories = this.report_data.data.social_histories;
    this.iron = this.report_data.data.iron;
    this.dm_hypn = this.report_data.data.dm_hypn;
    this.vitals = this.report_data.data.vitals;
    this.pararams = this.reportForm;
    this.getToday();
    this.getYearFromDates();
    this.getStartAndEndDate();
    console.log(this.report_data, 'report data');
    console.log(this.start_date, 'statrs');
    // const normal = this.isPhysicalExamNormal(this.stats.data.physical_exam);
    // console.log(normal, 'normal');
  }



  ngOnInit(): void {
    this.main = this.report_data.data.main;
    this.top5 = this.report_data.data.top5;
    this.userInfo = this.http.getUserFromJSON();
    console.log(this.userInfo, 'user info');

    // console.log(this.report_data.data, 'selected report data');
  }
}
