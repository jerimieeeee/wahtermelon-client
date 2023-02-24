import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  reportForm: FormGroup = new FormGroup({
    start_date: new FormControl<string| null>(''),
    end_date: new FormControl<string| null>(''),
    report_type: new FormControl<string| null>(''),
    report_class: new FormControl<string| null>(''),
    month: new FormControl<string| null>(''),
    year: new FormControl<string| null>('')
  });

  current_date = formatDate(new Date, 'yyyy', 'en');

  fhsis2018 = [
    { id: 'fhsis2018-cc', desc: 'Child Care' },
    { id: 'fhsis2018-mc', desc: 'Maternal Care' },
  ]

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

  fhsis_monthly_arr = ['fhsis2018-cc', 'fhsis2018-mc']
  report_params: any;
  years: any = [];

  generateYear(){
    let current_year =  formatDate(this.current_date, 'yyyy', 'en');
    let date = parseInt(current_year);
    for(let year = date; year > date-5; year--) {
      this.years.push(year);
    }
  }

  onSubmit(){
    // console.log(this.reportForm)
    this.report_params = this.reportForm.value;
  }

  constructor(
    private formBuilder: FormBuilder
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.reportForm.controls;
  }

  changeDateOptions(): void {
    if(this.fhsis_monthly_arr.find(e => e === this.reportForm.value.report_type)) {
      let month = formatDate(this.current_date, 'm', 'en');
      let year = formatDate(this.current_date, 'yyyy', 'en');

      this.reportForm.controls.month.enable();
      this.reportForm.controls.year.enable();
      this.generateYear();
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

  ngOnInit(): void {
    this.current_date;

    this.reportForm = this.formBuilder.nonNullable.group({
      report_type: ['', Validators.required],
      report_class: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required]
    });

    this.changeDateOptions();
  }
}
