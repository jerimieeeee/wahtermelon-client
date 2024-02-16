import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  faCircleNotch = faCircleNotch;

  reportForm: FormGroup = new FormGroup({
    start_date: new FormControl<string| null>(''),
    end_date: new FormControl<string| null>(''),
    report_type: new FormControl<string| null>(''),
    report_class: new FormControl<string| null>(''),
    barangay_code: new FormControl<[]| null>([]),
    municipality_code: new FormControl<string| null>(''),
    month: new FormControl<string| null>(''),
    year: new FormControl<string| null>('')
  });

  current_date = formatDate(new Date, 'yyyy', 'en', 'Asia/Manila');

  fhsis2018 = [
    { id: 'fhsis2018-cc', desc: 'Child Care', url: 'reports-2018/child-care/m1'},
    { id: 'fhsis2018-mc', desc: 'Maternal Care', url: 'reports-2018/maternal-care/m1'},
    { id: 'fhsis2018-tb', desc: 'TB Dots', url: 'reports-2018/tb-dots/m1'},
    { id: 'fhsis2018-ncd', desc: 'NCD', url: 'reports-2018/ncd/m1'},
  ]

  other_stats = [
    { id: 'patient-registered', desc: 'Patient Register', url: 'reports-2018/user/patient-registered'},
    // { id: 'fhsis2018-mc', desc: 'Maternal Care', url: 'reports-2018/maternal-care/m1'},
  ]

  gbv_stats = [
    { id: 'gbv-report', desc: 'GBV Report', url: 'gbv-report/catalyst-report'},
  ]

  diagnosis_stats = [
    { id: 'morbidity-report', desc: 'Morbidity Report', url: 'reports-2018/morbidity/report'},
  ];

  household_stats = [
    { id: 'profiling-report', desc: 'Profiling', url: 'reports-2018/household-profiling/report'},
  ];

  daily_service = [
    { id: 'daily-service', desc: 'Consultation', url: 'reports-2018/daily-service/report'},
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

  fhsis_monthly_arr = ['fhsis2018-cc', 'fhsis2018-mc', 'fhsis2018-tb', 'fhsis2018-ncd', 'patient-registered']
  report_params: any;
  years: any = [];
  selectedBrgy: [];
  brgys: any;
  userInfo: string;
  userLoc: string;
  report_data: any;
  is_fetching: boolean = false;

  onSubmit(){
    this.is_fetching = true;

    let params = {
      month: this.reportForm.value.month ?? null,
      year: this.reportForm.value.year ?? null,
      start_date: this.reportForm.value.start_date ?? null,
      end_date: this.reportForm.value.end_date ?? null
    }

    if (this.reportForm.value.report_class === 'muncity') {
      params['category'] = 'municipality';
      params['code'] = this.reportForm.value.municipality_code;
    } else if (this.reportForm.value.report_class === 'brgys') {
      params['category'] = 'barangay';
      params['code'] = this.selectedBrgy;
    } else {
      params['category'] = this.reportForm.value.report_class;
    }

    this.http.get(this.reportForm.value.report_type.url, {params}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.report_data = data;
        this.is_fetching = false;

        // console.log(this.report_data, 'report_data');
        // console.log(this.selectedBrgy, 'report_data');
      },
      error: err => console.log(err)
    });
  }

  handleReportClass(report_class) {
    if(report_class === "brgys" || report_class === "muncity") {
      if(!this.userLoc) this.userLoc = this.http.getUserFacility();

      this.http.get('libraries/facilities', {params:{'filter[code]': this.userLoc}}).subscribe({
        next: (data: any) => this.getBrgys(data.data[0].municipality.code, report_class),
        error: err => console.log(err)
      })
    } else {
      // all
      this.f['municipality_code'].setValue(null);
      this.f['barangay_code'].setValue(null);
      this.selectedBrgy = null;
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
    let current_year =  formatDate(this.current_date, 'yyyy', 'en', 'Asia/Manila');
    let date = parseInt(current_year);
    for(let year = date; year > date-5; year--) {
      this.years.push(year);
    }
  }

  changeDateOptions(): void {
    console.log(this.reportForm.value.report_type)
    this.report_data= '';
    if(this.fhsis_monthly_arr.find(e => e === this.reportForm.value.report_type.id)) {
      let month = formatDate(this.current_date, 'm', 'en', 'Asia/Manila');
      let year = formatDate(this.current_date, 'yyyy', 'en', 'Asia/Manila');

      this.reportForm.controls.month.enable();
      this.reportForm.controls.year.enable();
      this.reportForm.patchValue({
        month: month,
        year: year
      });
      this.reportForm.controls.start_date.disable();
      this.reportForm.controls.end_date.disable();
    } else if(this.reportForm.value.report_type){
      this.reportForm.controls.start_date.enable();
      this.reportForm.controls.end_date.enable();
      this.reportForm.controls.month.disable();
      this.reportForm.controls.year.disable();
    } else {
      this.reportForm.controls.start_date.disable();
      this.reportForm.controls.end_date.disable();
      this.reportForm.controls.month.disable();
      this.reportForm.controls.year.disable();
    }
  }

  testFunction(){

    this.reportForm = this.formBuilder.nonNullable.group({
      report_type: ['', Validators.required],
      report_class: ['', Validators.required],
      barangay_code: [''],
      municipality_code: [''],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      month: [null, Validators.required],
      year: [null, Validators.required]
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.reportForm.controls;
  }

  ngOnInit(): void {
    this.generateYear();
    this.userInfo = this.http.getUserFromJSON();
    this.current_date;

    this.reportForm = this.formBuilder.nonNullable.group({
      report_type: ['', Validators.required],
      report_class: ['', Validators.required],
      barangay_code: [''],
      municipality_code: [''],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      month: [null, Validators.required],
      year: [null, Validators.required]
    });

    this.changeDateOptions();
  }
}
