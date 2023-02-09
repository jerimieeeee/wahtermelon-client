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

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.generateReport();
  }
}
