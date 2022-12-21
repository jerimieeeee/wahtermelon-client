import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-ncd',
  templateUrl: './ncd.component.html',
  styleUrls: ['./ncd.component.scss']
})
export class NcdComponent implements OnInit {
  module: Number;
  modules: Number;

  vitals: any;
  patient_info: any;

  patient_id:string;
  consult_id: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) {

  }

  ncd_details: any;
  loadNCD(){
    let params = { consult_id: this.consult_id }
    this.http.get('non-communicable-disease/risk-assessment', {params}).subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.ncd_details = data.data;
      },
      error: err => console.log(err)
    })
  }

  patientInfo(info) {
    this.patient_info = info;
    console.log(this.patient_info)
  }

  patientVitals(vitals) {
    this.vitals = vitals;
  }

  ngOnInit(): void {
    this.module=1;
    this.modules=2;

    this.patient_id = this.route.snapshot.paramMap.get('id');
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');

    // this.loadNCD();
  }

  switchTab(tab){
    console.log(tab)
    this.module = 0;
    this.module = tab;
  }

  switchTabs(tabs){
    console.log(tabs)
    this.modules = 0;
    this.modules = tabs;
  }

}
