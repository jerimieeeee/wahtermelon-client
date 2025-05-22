import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faFileExcel, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { forkJoin, map, Observable } from 'rxjs';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
    standalone: false
})
export class ReportsComponent implements OnInit {
  faCircleNotch = faCircleNotch;
  faFilePdf = faFilePdf;
  faFileExcel = faFileExcel;

  paper_width: string = '320.2mm';
  reportForm: FormGroup = new FormGroup({
    start_date: new FormControl<string| null>(''),
    end_date: new FormControl<string| null>(''),
    report_type: new FormControl<string| null>(''),
    report_class: new FormControl<string| null>(''),
    barangay_code: new FormControl<[]| null>([]),
    municipality_code: new FormControl<string| null>(''),
    month: new FormControl<string| null>(''),
    year: new FormControl<string| null>(''),
    quarter: new FormControl<string| null>('')
  });

  fhsis2018 = [
    { id: 'fhsis2018-fp',                   section: 'A', desc: 'Family Planning', url: 'reports-2018/family-planning/m1'},
    { id: 'fhsis2018-mc',                   section: 'B', desc: 'Maternal Care', url: 'reports-2018/maternal-care/m1'},
    { id: 'fhsis2018-cc',                   section: 'C', desc: 'Child Care', url: 'reports-2018/child-care/m1'},
    { id: 'fhsis2018-dental-m1',            section: 'D', desc: 'Dental', url: 'reports-2018/dental/m1'},
    // { id: 'fhsis2018-infectious',            section: 'E', desc: 'Infectious Disease Preventionand Control Services', url: 'reports-2018/dental/m1'},
    { id: 'fhsis2018-tb',                   section: 'E', desc: 'TB Dots', url: 'reports-2018/tb-dots/m1'},
    { id: 'fhsis2018-ncd',                  section: 'F', desc: 'NCD', url: 'reports-2018/ncd/m1'},
    { id: 'fhsis2018-environmental',        section: 'G', desc: 'Environmental and Sanitation', url: 'reports-2018/household-environmental/m1'},
    { id: 'fhsis2018-mortality',            section: 'H', desc: 'Mortality and Natality', url: 'reports-2018/mortality/m1'}, // Section I. Natality
  ];

  fhsis2018_m2 = [
    { id: 'fhsis2018-morbidity',            section: 'A.1', desc: 'Morbidity', url: 'reports-2018/morbidity/report'},
    { id: 'fhsis2018-mortality-underlying', section: 'B', desc: 'Mortality Underlying', url: 'reports-2018/mortality/m1-underlying'},
  ];

  other_stats = [
    { id: 'patient-registered', desc: 'Patient Registered', url: 'reports-2018/user/patient-registered'},
    { id: 'feedback', desc: 'Client Feedback', url: 'reports-2018/feedback/report'},
    { id: 'masterlist', desc: 'Masterlist', url: 'reports-2018/masterlist/list'},
  ];

  ab_stats = [
    // { id: 'ab-report', desc: 'Animal Bite', url: 'reports-2018/animal-bite/patient-registered'},
    // { id: 'ab-post', desc: 'Post-Exposure Prophylaxis Cohort', url: 'reports-2018/animal-bite/post-exposure-cohort'},
    { id: 'ab-pre', desc: 'Rabies and Bite Victim Report Form', url: 'reports-2018/animal-bite/pre-exposure'}
  ];

  asrh_stats = [
    { id: 'asrh-masterlist', desc: 'ASRH Masterlist', url: 'reports-2018/asrh/masterlist'},
  ];

  gbv_stats = [
    { id: 'gbv-report', desc: 'GBV Report', url: 'gbv-report/catalyst-report'},
  ]

  household_stats = [
    { id: 'profiling-report', desc: 'Profiling', url: 'reports-2018/household-profiling/report'},
  ];

  daily_service = [
    { id: 'daily-service', desc: 'Consultation', url: 'reports-2018/daily-service/report'},
  ];

   dental_consolidated = [
    { id: 'dental-ohs-consolidated', desc: 'Dental Consolidated OHS', url: 'reports-2018/dental/dental-consolidated'},
  ];

  months = [
    {
      value: 1,
      name: 'Jan'
    },
    {
      value: 2,
      name: 'Feb'
    },
    {
      value: 3,
      name: 'Mar'
    },
    {
      value: 4,
      name: 'Apr'
    },
    {
      value: 5,
      name: 'May'
    },
    {
      value: 6,
      name: 'Jun'
    },
    {
      value: 7,
      name: 'Jul'
    },
    {
      value: 8,
      name: 'Aug'
    },
    {
      value: 9,
      name: 'Sep'
    },
    {
      value: 10,
      name: 'Oct'
    },
    {
      value: 11,
      name: 'Nov'
    },
    {
      value: 12,
      name: 'Dec'
    },
  ];

  quarters = [
    { desc: '1st Quarter', value: 1 },
    { desc: '2nd Quarter', value: 2 },
    { desc: '3rd Quarter', value: 3 },
    { desc: '4th Quarter', value: 4 }
  ];

  fhsis_monthly_arr = ['fhsis2018-consolidated', 'fhsis2018-fp', 'patient-registered'];
  current_date = formatDate(new Date, 'yyyy', 'en', 'Asia/Manila');
  submit_flag: boolean = false;
  quarterly_arr = ['ab-pre'];
  report_params: any;
  years: number[] = [];
  selectedBrgy!: [];
  selectedMuncity!: [];
  selectedFacilities!: [];
  brgys!: any;
  muncity!: any;
  facilities!: any;
  userInfo: any = {};
  userLoc: string;
  report_data: any;
  is_fetching: boolean = false;
  reportFlag: string;
  selectedCode!: string;
  stats : any;
  meta_info: any;

  exportAsExcel: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'reportForm',
    options: {
      sheet: {
        '!cols': [{ wch: 15 }], // Adjust column width to avoid auto-formatting
        '!type': 'string' // Forces all cells to be text
      }
    }
  }

  exportAsPdf: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'reportForm',
    options: {
      image: { type: 'jpeg', quality: 1 },
      margin:  [5, 5, 5, 5],
      jsPDF: {
        orientation: 'landscape',
        format: [215.9, 330.2],
        precision: 2,
        pagebreak: { mode: ['avoid-all', 'css'] }
      },
      html2canvas: {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        scrollX: false,
        scrollY: false
      }
    }
  }

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

  pdf_exported: boolean = false;
  exportP(report_name: string) {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, report_name+'_'+this.getTrailName()).subscribe(() => {
      // save started
    });
  }

  fhsis2018_data: any = [];
  onSubmit(page?: number) {
    this.pdf_exported = false;
    console.log(this.reportForm.value?.report_type.id);
    // this.is_fetching = true;

    if(this.reportForm.value.report_type.id === 'fhsis2018-consolidated') {
      this.fhsis2018_data = {}; // Initialize storage

      const fetchObservables = this.fhsis2018.map(report => {
          let params: any = {};
          if(report.id === 'fhsis2018-fp') {
            if (this.reportForm.value.month) params['month'] = this.reportForm.value.month;
            if (this.reportForm.value.year) params['year'] = this.reportForm.value.year;
          } else {
            const monthIndex = this.reportForm.value.month - 1;
            const year = this.reportForm.value.year;

            const firstDay = new Date(year, monthIndex, 1);
            const lastDay = new Date(year, monthIndex + 1, 0);

            params['start_date'] = formatDate(firstDay, 'yyyy-MM-dd', 'en', 'Asia/Manila');
            params['end_date'] = formatDate(lastDay, 'yyyy-MM-dd', 'en', 'Asia/Manila');
          }
          if (this.reportForm.value.quarter) params['quarter'] = this.reportForm.value.quarter;
          if (this.reportForm.value.program) params['program'] = this.reportForm.value.program;
          if (page) params['page'] = page;
          params['category'] = this.reportForm.value.report_class;

          if (this.reportForm.value.report_class === 'fac') params['code'] = this.reportFlag === '1' ? this.selectedFacilities.join(',') : this.userInfo.facility_code;
          if (this.reportForm.value.report_class === 'muncity') params['code'] = this.reportFlag === '1' ? this.selectedMuncity.join(',') : this.reportForm.value.municipality_code;
          if (this.reportForm.value.report_class === 'brgys') params['code'] = this.selectedBrgy.join(',');

          return this.getReport(params, report.url).pipe(
              map(data => ({ id: report.id, data }))
          );
      });

      forkJoin(fetchObservables).subscribe({
          next: (results) => {
              results.forEach(result => {
                  this.fhsis2018_data[result.id] = result.data;
              });
              this.is_fetching = false;
          },
          error: (err) => {
              console.error(err);
              this.is_fetching = false;
          }
      });
    } else {
      let params = {};
      if (this.reportForm.value.month) params['month'] = this.reportForm.value.month;
      if (this.reportForm.value.year) params['year'] = this.reportForm.value.year;
      if (this.reportForm.value.quarter) params['quarter'] = this.reportForm.value.quarter;
      if (this.reportForm.value.start_date) params['start_date'] = this.reportForm.value.start_date;
      if (this.reportForm.value.end_date) params['end_date'] = this.reportForm.value.end_date;
      if (this.reportForm.value.program) params['program'] = this.reportForm.value.program;
      if (page) params['page'] = page;
      params['category'] = this.reportForm.value.report_class;

      if (this.reportForm.value.report_class === 'fac') params['code'] = this.reportFlag === '1' ? this.selectedFacilities.join(',') : this.userInfo.facility_code;
      if (this.reportForm.value.report_class === 'muncity') params['code'] = this.reportFlag === '1' ? this.selectedMuncity.join(',') : this.reportForm.value.municipality_code;
      if (this.reportForm.value.report_class === 'brgys') params['code'] = this.selectedBrgy.join(',');

      this.getReport(params, this.reportForm.value.report_type.url, page).subscribe(data => {
        this.report_data = data;
        this.is_fetching = false;
      });
    }
  }

  getReport(params: any, url: string, page?: number): Observable<any> {
    this.selectedCode = params['code'];

    return new Observable((observer) => {
      this.http.get(url, {params}).subscribe({
        next: (data: any) => {
          if (this.reportForm.value.report_type.id === 'masterlist') this.meta_info = data.meta;
          this.submit_flag = true;
          this.report_data = data;
          observer.next(data);
          observer.complete();
        },
        error: (err) => {
          console.log(err);
          observer.error(err);
        }
      });
    });
  }

  handleReportClass(report_class) {
    this.submit_flag = false;
    if(report_class === "brgys") {
      if(!this.userLoc) this.userLoc = this.http.getUserFacility();
      this.http.get('libraries/facilities', {params:{'filter[code]': this.userLoc}}).subscribe({
        next: (data: any) => this.getBrgys(data.data[0].municipality.code, report_class),
        error: err => console.log(err)
      })
    } else if (report_class === "muncity") {
      this.getMuncities();
    } else if (report_class === "fac") {
      this.getFacilities();
    } else {
      this.f['municipality_code'].setValue(null);
      this.f['barangay_code'].setValue(null);
      this.selectedBrgy = null;
    }
  }

  getFacilities(){
    const userProvinceCode = this.http.getUserFromJSON().facility.province_code;
    if(!this.facilities) {
      let params = { 'filter[province_code]': userProvinceCode, per_page: 'all', facility_list: 1 }
      this.http.get('libraries/facilities', { params }).subscribe({
        next: (data:any) => {
          this.facilities = data.data;
          this.selectedMuncity = null;
          this.selectedBrgy = null;
        },
        error: err => console.log(err)
      })
    }
  }

  getMuncities() {
    if(!this.muncity) {
      this.http.get('libraries/provinces/'+this.userInfo.facility.province.code, {params:{include: 'municipalities'}}).subscribe({
        next: (data: any) => {
          this.selectedBrgy = null;
          this.selectedFacilities = null;
          this.muncity = data.data.municipalities;
        },
        error: err => console.log(err)
      })
    }
  }

  getBrgys(userMun, report_class){
    if(report_class === 'muncity') {
      this.f['municipality_code'].setValue(userMun);
      this.selectedBrgy = null;
      this.f['barangay_code'].setValue(null);
    } else {
      this.f['municipality_code'].setValue(null);

      if(!this.brgys) {
        this.http.get('libraries/municipalities/'+userMun, {params:{include: 'barangays'}}).subscribe({
          next: (data: any) => {
            this.brgys = data.data.barangays;
          },
          error: err => console.log(err)
        })
      }
    }
  }

  generateYear(){
    if(this.years.length === 0) {
      let current_year =  formatDate(this.current_date, 'yyyy', 'en', 'Asia/Manila');
      let date = parseInt(current_year);
      for(let year = date; year > date-5; year--) {
        this.years.push(year);
      }
    }
  }

  changeDateOptions(): void {
    this.submit_flag = false;
    this.report_data= '';

    this.reportForm.controls.start_date.disable();
    this.reportForm.controls.end_date.disable();
    this.reportForm.controls.month.disable();
    this.reportForm.controls.year.disable();
    this.reportForm.controls.quarter.disable();

    if(this.fhsis_monthly_arr.find(e => e === this.reportForm.value.report_type.id)) {
      let month = formatDate(this.current_date, 'm', 'en', 'Asia/Manila');
      let year = formatDate(this.current_date, 'yyyy', 'en', 'Asia/Manila');

      this.reportForm.controls.month.enable();
      this.reportForm.controls.year.enable();
      this.reportForm.patchValue({
        month: month,
        year: year
      });
      this.generateYear();
    }

    if(this.quarterly_arr.find(e => e === this.reportForm.value.report_type.id)) {
      this.reportForm.controls.quarter.enable();
      this.reportForm.controls.year.enable();
      this.generateYear();
    }

    /* console.log(this.reportForm.value.program)
    if(this.reportForm.value.program === 'bt') {
      this.reportForm.controls.start_date.disable();
      this.reportForm.controls.end_date.disable();
    }
    else {
      this.reportForm.controls.report_class.enable();
    } */

    if((!this.fhsis_monthly_arr.find(e => e === this.reportForm.value.report_type.id) &&
        !this.quarterly_arr.find(e => e === this.reportForm.value.report_type.id)) &&
        this.reportForm.value.report_type){
      if(this.reportForm.value.report_type.id === 'feedback') {
        this.reportForm.controls.report_class.disable();
      } else {
        this.reportForm.controls.report_class.enable();
      }

      if(this.reportForm.value.program !== 'bt') {
        this.reportForm.controls.start_date.enable();
        this.reportForm.controls.end_date.enable();
      }
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private exportAsService: ExportAsService,
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.reportForm.controls;
  }

  ngOnInit(): void {
    this.userInfo = this.http.getUserFromJSON();
    // this.current_date;
    this.reportFlag =  this.userInfo.reports_flag === 1 ? '1' : null;
    this.reportForm = this.formBuilder.nonNullable.group({
      report_type: ['', Validators.required],
      report_class: ['', Validators.required],
      barangay_code: [''],
      municipality_code: [this.userInfo.facility.municipality_code],
      quarter: [null, Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      month: [null, Validators.required],
      year: [null, Validators.required],
      program: [''],
    });

    this.changeDateOptions();
  }
}
