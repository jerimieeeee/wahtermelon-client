import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-ncd',
  templateUrl: './ncd.component.html',
  styleUrls: ['./ncd.component.scss']
})
export class NcdComponent implements OnInit, OnChanges {
  module: Number;
  modules: Number;

  vitals: any;
  patient_info: any;
  consult_details: any;
  ncd_details: any;

  patient_id:string;
  consult_id: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) { }

  loadNCD(){
    let params = { consult_id: this.consult_id }
    this.http.get('non-communicable-disease/risk-assessment', {params}).subscribe({
      next: (data: any) => {
        console.log(data.data);
        if(data.data.length > 0) {
          data.data[0]['consult_date'] = data.data[0].assessment_date
          this.consult_details = data.data[0];
        } else {
          this.loadConsult();
        }
      },
      error: err => console.log(err)
    })
  }

  loadConsult() {
    let params = {
      id: this.consult_id,
      pt_group: 'ncd',
    }

    this.http.get('consultation/records', {params}).subscribe({
      next: (data: any) => {
        this.consult_details = data.data[0];

      },
      error: err => console.log(err)
    })
  }

  patientInfo(info) {
    this.patient_info = info;
  }

  patientVitals(vitals) {
    this.vitals = vitals;
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.module=3;
    this.modules=2;

    this.patient_id = this.route.snapshot.paramMap.get('id');
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');

    this.loadNCD();
  }

  switchTab(tab){
    this.module = 0;
    this.module = tab;
  }

  switchTabs(tabs){
    this.modules = 0;
    this.modules = tabs;
  }

}
