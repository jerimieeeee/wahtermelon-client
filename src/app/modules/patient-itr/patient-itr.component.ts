import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import { openCloseTrigger } from './declarations/animation';
import { BmiChart, ChartOptions, WeightChart } from './declarations/chart-options';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, tap } from "rxjs/operators";
import { HttpService } from 'app/shared/services/http.service';
import { formatDate } from '@angular/common';
import { faCircle, faFolder, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faEye, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { VitalsChartsService } from 'app/shared/services/vitals-charts.service';

@Component({
  selector: 'app-patient-itr',
  templateUrl: './patient-itr.component.html',
  styleUrls: ['./patient-itr.component.scss'],
  animations: [openCloseTrigger]
})
export class PatientItrComponent implements OnInit {
  @ViewChild("bp-chart") bp_chart: ChartComponent;
  @ViewChild("weight-chart") weight_chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public WeightChart: Partial<WeightChart>;
  public BmiChart: Partial<BmiChart>;

  show_details:boolean = false;
  showModal:boolean = false;
  showChart: boolean = false;
  show_bmi: boolean = false;
  show_bp: boolean = false;
  show_weight: boolean = false;

  selected_chart: any;
  visit_list: any;
  patient_details: any;
  latest_vitals: any;

  faCircle = faCircle;
  faEye = faEye;
  faFolderOpen = faFolderOpen;
  faFolder = faFolder;
  faStethoscope = faStethoscope;

  vitals_graph = {
    systolic: [],
    diastolic: [],
    weight: [],
    bp_date: [],
    weight_date: [],
    bmi: [],
    bmi_date: []
  }

  patientInfo(info){
    this.patient_details = info;
    // this.loadVisitHistory();
  }

  patientVitals(vitals){
    this.vitals_graph.systolic = [];
    this.vitals_graph.diastolic = [];
    this.vitals_graph.bp_date = [];
    this.vitals_graph.weight = [];
    this.vitals_graph.weight_date = [];

    // console.log(vitals)
    Object.entries(vitals).forEach(([key, value], index) => {
      let val: any = value;
      // console.log(val)
      if(val.bp_systolic){
        this.vitals_graph.systolic.push(val.bp_systolic);
        this.vitals_graph.diastolic.push(val.bp_diastolic);
        this.vitals_graph.bp_date.push(val.vitals_date);
      }

      if(val.patient_weight){
        // console.log(val)
        this.vitals_graph.weight.push(val.patient_weight);
        this.vitals_graph.weight_date.push(val.vitals_date);
      }

      if(val.patient_bmi){
        this.vitals_graph.bmi.push(val.patient_bmi);
        this.vitals_graph.bmi_date.push(val.vitals_date);
      }
    })

    if(this.vitals_graph.systolic.length > 0 || this.vitals_graph.diastolic.length > 0){
      this.selected_chart = 'bp_weight_chart';
      // this.loadChart();
    } else {
      this.showChart = false;
    }
  }

  navigationEnd$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    tap(() => {
      this.loadData();
      this.show_details = false;
    })
  );



  patient_id: string;
  loadData(){
    let patient_id = this.route.snapshot.paramMap.get('id');

    if(this.patient_id !== patient_id){
      this.http.get('consultation/records',{params:{patient_id: patient_id, per_page: 'all', sort: '-consult_date'}}).subscribe({
        next: (data: any) => {
          // console.log(data);
          this.visit_list = data.data;
        },
        error: err => console.log(err),
      })
    }
  }

  selected_visit: any;
  showConsult(details: any){
    console.log(details)
    if(details.vitals) this.getLatestToday(details);
    let query: any;
    let params: any;
    switch (details.pt_group) {
      case 'ncd':
        params = {consult_id: details.id, sort: '-assessment_date'};
        query = this.http.get('non-communicable-disease/risk-assessment', {params});
        this.getSelected(query, details.pt_group);
        break;
      case 'cc':
        query = this.http.get('child-care/cc-records/'+details.patient.id);
        this.getSelected(query, details.pt_group);
        break;
      case 'mc':
        query = this.http.get('maternal-care/mc-records', {params:{type: 'all', patient_id: details.patient.id}});
        this.getSelected(query, details.pt_group);
        break;
      default:
        this.selected_visit = details;
        break;
    }
  }

  getSelected(query, group){
    query.subscribe({
      next: (data: any) => {
        console.log(data.data)
        if(group === 'cc' || group === 'mc') {
          this.selected_visit = data.data;
        }else {
          this.selected_visit = data.data[0];
        }

        this.selected_visit['pt_group'] = group;
      },
      error: err => console.log(err)
    })
  }

  selected_id: number;

  getLatestToday(details){
    this.latest_vitals = this.vitalsCharts.getLatestToday(details.vitals, details.consult_date);
    console.log(this.latest_vitals)

    if(this.selected_id){
      if(this.selected_id === details.id){
        this.selected_id = undefined;
        this.show_details = false;
      } else {
        this.selected_id = details.id;
        this.show_details = true;
      }
    } else {
      this.selected_id = details.id;
      this.show_details = true;
    }
  }

  getVisitType(group){
    switch(group){
      case 'cn':
        return 'Consultation';
      case 'cc':
        return 'Child Care';
      case 'mc':
        return 'Maternal Care';
      case 'dn':
        return 'Dental';
      case 'ncd':
        return 'Non Communicable Disease';
    }
  }

  constructor(
    private router: Router,
    private http: HttpService,
    private vitalsCharts: VitalsChartsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // console.log(this.router.url)
    this.loadData();
    this.navigationEnd$.subscribe();
  }
}
