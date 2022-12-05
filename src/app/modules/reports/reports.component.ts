import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    report_class: new FormControl<string| null>('')
  });

  fhsis2018 = [
    { id: 'fhsis2018-cc', desc: 'Child Care' },
    { id: 'fhsis2018-mc', desc: 'Maternal Care' },
  ]

  report_params: any;

  onSubmit(){
    console.log(this.reportForm.value)
    this.report_params = this.reportForm.value;
  }

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.reportForm = this.formBuilder.nonNullable.group({
      report_type: ['', Validators.required],
      report_class: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    });
  }
}
