import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
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
  ncd_list: any;

  patient_id:string;
  consult_id: string;
  show_end: boolean = false;

  faDoorClosed = faDoorClosed;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private router: Router
  ) { }

  openNCD(patient_id, consult_id){
    console.log(patient_id)
    console.log(consult_id)
    this.router.navigate(['/ncd', {id: patient_id, consult_id: consult_id}]);
  }

  toggleModal() {
    this.show_end = !this.show_end;
  }

  loadNCD(){
    let params = { consult_id: this.consult_id }
    this.http.get('non-communicable-disease/risk-assessment', {params}).subscribe({
      next: (data: any) => {
        console.log(data.data);
        if(data.data.length > 0) {
          this.ncd_list = data.data;
          let risk_val = data.data[0];
          risk_val['consult_date'] = risk_val.assessment_date
          this.consult_details = risk_val;
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
    this.module=1;
    this.modules=1;

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
