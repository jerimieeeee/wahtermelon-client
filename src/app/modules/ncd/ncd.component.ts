import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { eventSubscriber } from '../patient-info/emmitter.interface';
import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { AgeService } from 'app/shared/services/age.service';
@Component({
  selector: 'app-ncd',
  templateUrl: './ncd.component.html',
  styleUrls: ['./ncd.component.scss']
})
export class NcdComponent implements OnInit, OnDestroy {
  module: Number;
  modules: Number;

  vitals: any;
  patient_info: any;
  consult_details: any;
  consult_details_temp: any;
  ncd_details: any;
  ncd_list: any;

  patient_id:string;
  consult_id: string;
  show_end: boolean = false;

  faDoorClosed = faDoorClosed;



  ngOnDestroy(): void {
    eventSubscriber(this.patientInfo.reloadNCDVitals, this.loadVitals, true);
  }

  openNCD(ncd){
    this.router.navigate(['/patient/ncd', {id: ncd.patient_id ?? ncd.patient.id, consult_id: ncd.consult_id ?? ncd.id}]);
    this.consult_details = ncd;
    this.modules = 2;
  }


  toggleModal() {
    this.show_end = !this.show_end;
  }

  loadNCD(consult_id, type?) {
    let params = { consult_id: consult_id };

    this.http.get('non-communicable-disease/risk-assessment', {params}).subscribe({
      next: (data: any) => {
        if(data.data.length > 0) {
          data.data[0]['consult_date'] = data.data[0].assessment_date;
          this.consult_details = data.data[0];
        }else {
          this.consult_details = this.consult_details_temp;
        }

        let age = this.ageService.calcuateAge(this.patient_info.birthdate, this.consult_details.consult_date);
        console.log(age)
        if(age.type === 'year' && age.age >= 60) this.show_casdt2 = true;
      },
      error: err => console.log(err)
    })
  }

  risk_list: any;

  loadRisk(){
    //load risk list
    let params = {
      patient_id: this.patient_id,
      sort: '-assessment_date'
    }
    this.http.get('non-communicable-disease/risk-assessment', {params}).subscribe({
      next: (data: any) => {
        this.risk_list = data.data;
        if(this.risk_list) {
          this.fillConsult();
        }
      },
      error: err => console.log(err)
    })
  }

  loadConsult() {
    //load ncd visits
    let params = {
      patient_id: this.patient_id,
      pt_group: 'ncd',
      sort: '-consult_date'
    }

    this.http.get('consultation/records', {params}).subscribe({
      next: (data: any) => {
        this.ncd_list = data.data;
        this.consult_details_temp = data.data[0];

        Object.entries(data.data).forEach(([key, value]: any, index) => {
          if(value.id === Number(this.consult_id)) {
            this.consult_details_temp =  value;
          }
        });

        this.loadRisk();
      },
      error: err => console.log(err)
    })
  }

  fillConsult(){
    Object.entries(this.ncd_list).forEach(([key, value], index) => {
      let values: any = value;
      let result = this.risk_list.find(item => item.consult_id === values.id)

      if(result) {
        this.ncd_list[index] = result;
        this.ncd_list[index]['consult_done'] = values.consult_done;
      }

      if(Object.keys(this.ncd_list).length-1 === index) {
        this.loadNCD(this.consult_id);
      }
    });
  }

  /* patientInfo(info) {
    this.patient_info = info;
  } */

  loadVitals(){
    this.http.get('patient-vitals/vitals', {params:{patient_id: this.patient_id, sort: '-vitals_date', per_page: 15}}).subscribe({
      next: (data: any) => {
        let vitals = data.data;

        if(vitals.length > 0) {
          let orig_systolic = data.data[0].bp_systolic;
          let orig_diastolic = data.data[0].bp_diastolic;

          vitals[0]['bp_systolic'] = orig_systolic;
          vitals[0]['bp_diastolic'] = orig_diastolic;
          // this.show_vitals = true;
          this.vitals = vitals;
        } else {
          // this.show_vitals = true;
        }
      },
      error: err => console.log(err),
    })
  }

  patientVitals(vitals) {
    // this.vitals = vitals;
  }

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private router: Router,
    private patientInfo: PatientInfoComponent,
    private ageService: AgeService
  ) {
    this.loadVitals = this.loadVitals.bind(this);
    eventSubscriber(patientInfo.reloadNCDVitals, this.loadVitals)
  }

  show_casdt2: boolean = false;
  ngOnInit(): void {
    this.show_casdt2 = false;
    this.module=1;
    this.modules=1;

    this.patient_info = this.http.getPatientInfo();

    this.patient_id = this.route.snapshot.paramMap.get('id');
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');
    this.loadConsult();
    this.loadVitals();
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
