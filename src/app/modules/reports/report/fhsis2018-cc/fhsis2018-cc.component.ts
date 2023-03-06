import { Component, Input, OnChanges } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-fhsis2018-cc',
  templateUrl: './fhsis2018-cc.component.html',
  styleUrls: ['./fhsis2018-cc.component.scss']
})

export class Fhsis2018CcComponent implements OnChanges {
  @Input() report_params;

  stats : any;
  showForm: boolean = false;
  name_list: any = [];

  constructor(
    private http: HttpService
  ) { }

  generateReport() {
    this.report_params;
    if(this.report_params){
      let params = {
        year: this.report_params.year,
        month: this.report_params.month
      };

      if(this.report_params.report_class === 'muncity') {
        let user = this.http.getUserFacility();
        this.http.get('libraries/facilities', {params:{'filter[code]': user}}).subscribe({
          next: (data: any) => {
            // console.log(data.data)
            params['municipality_code'] = data.data[0].municipality.code;
            this.getReport(params)
          },
          error: err => console.log(err)
        })
      } else {
        this.getReport(params);
      }
    }
  }

  getReport(params){
    this.http.get('reports-2018/child-care/m1', {params})
    .subscribe({
      next: (data: any) => {
        this.stats = data;
        this.showForm = true;

        console.log(this.stats, 'cc reports');
      },
      error: err => console.log(err)
    });
  }

  openList:boolean = false;
  toggleModal(name_list, name_list2?){
    let list = [];
    if(name_list2) {
      list = name_list.concat(name_list2)
    } else {
      list = name_list
    }

    console.log(typeof name_list)
    this.name_list = list;
    this.openList = !this.openList;
  }

  ngOnChanges(): void {
    this.generateReport();
  }
}
