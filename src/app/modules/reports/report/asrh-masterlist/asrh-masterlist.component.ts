import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { is } from 'date-fns/locale';
import { report } from 'process';

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
  @Input() name_list_params: any;
  @Input() length: number;
  @Input() pageOffset: number;
  @Input() pageIndex: number;
  @Input() url: any;
  @Input() loc: any;
  @Input() params: any;

  search = faSearch;
    show_nameList: any;
    search_patient: string;

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

    ) { }

  stats : any;

   showNameList(patient_initials: string) {
    this.name_list_params = {
      initials: patient_initials,
      category: this.reportForm.value.report_class,
      per_page: 10,
    };
    this.openList = true;
  }

  openList:boolean = false;
  toggleModal(){
    let list = [];

    this.show_nameList = list;
    this.openList = !this.openList;
  }

  getList() {
    this.is_fetching = true;

    let params: any = this.name_list_params;

    if (this.search_patient) params['search'] = this.search_patient;

    if (this.name_list_params.category === 'muncity') {
      params['category'] = 'muncity';
    } else if (this.name_list_params.category === 'brgys') {
      params['category'] = 'brgys';
    } else if (this.name_list_params.category === 'fac') {
      params['category'] = 'fac';
    } else {
      params['category'] = this.name_list_params.category;
    }

    if(this.name_list_params.category !== 'all') {
      params['code'] = this.selectedCode;
    }
    this.http.get(this.url, { params }).subscribe({
      next: (data: any) => {
        this.is_fetching = false;
        this.show_nameList = data.data;
        console.log(this.show_nameList, 'amens2u')
        this.current_page = data.current_page;
        this.last_page = data.last_page;
      },
      error: err => console.log(err)
    });
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






  ngOnChanges(): void {
    this.stats = this.report_data;
    console.log(this.stats.data);
    // const normal = this.isPhysicalExamNormal(this.stats.data.physical_exam);
    // console.log(normal, 'normal');
  }



  ngOnInit(): void {
    this.stats = this.report_data;
    console.log(this.selectedCode)

    // console.log(this.report_data.data, 'selected report data');
  }
}
