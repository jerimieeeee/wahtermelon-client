import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-fhsis2018-cc',
  templateUrl: './fhsis2018-cc.component.html',
  styleUrls: ['./fhsis2018-cc.component.scss']
})

export class Fhsis2018CcComponent implements OnInit {
  @Input() report_params;

  generateReport() {
    console.log(this.report_params);
  }

  stats : any;
  test_year = '2023'
  test_month = '01'
  test1 : any;
  test2 : any;
  test3 : any;

  modalFilter : any;
  showAlert = false;

  constructor(
    private http: HttpService
  ) { }

  getccreport() {
    this.http.get('childcare-report/stats', {params:{year: this.test_year, month: this.test_month}})
    .subscribe({
      next: (data: any) => {
        this.stats = data;
        console.log(this.stats, 'cc reports');
        // this.test1 = this.stats.BCG_Female.length;
        // this.test2 = this.stats.BCG_Male.length;
        // this.test3 = (this.test1 + this.test2)
      },
      error: err => console.log(err)
    });
  }

  toggleAlertModal(){
    // this.modalFilter = value;
    console.log('Test Modal')
  }

  ngOnInit(): void {
    // this.generateReport();
    this.getccreport();
  }
}
