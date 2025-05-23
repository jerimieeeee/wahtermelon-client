import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-asrh-masterlist',
  templateUrl: './asrh-masterlist.component.html',
  styleUrl: './asrh-masterlist.component.scss',
  standalone: false
})
export class AsrhMasterlistComponent implements OnChanges, OnInit {
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

  constructor(
      private http: HttpService,
      private router: Router,
      private exportAsService: ExportAsService,

    ) { }

  show_form: boolean = false;
  stats : any;

  pararams: any;

  exporting: boolean = false;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faFileExcel = faFileExcel

  url= 'reports-2018/asrh/masterlist';

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
    this.http.get(this.url, {params}).subscribe({
      next: (data: any) => {
        // console.log(data);
        // this.show_form = true;
        this.stats = data
        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
        console.log(this.stats, 'chart history')
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


exportX() {
  this.exportAsService.save(this.exportAsExcel, 'ASRH Masterlist').subscribe({
    next: () => {
    this.exporting = true;
    },
    complete: () => {
    this.exporting = false;
    }
  });
  }



  ngOnChanges(): void {
    this.stats = this.report_data;
    this.pararams = this.reportForm;
    console.log(this.pararams, 'params');
    // const normal = this.isPhysicalExamNormal(this.stats.data.physical_exam);
    // console.log(normal, 'normal');
  }



  ngOnInit(): void {
    this.stats = this.report_data;
    console.log(this.selectedCode)

    // console.log(this.report_data.data, 'selected report data');
  }
}
