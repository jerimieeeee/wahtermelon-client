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
import { NameHelperService } from 'app/shared/services/name-helper.service';

@Component({
  selector: 'app-patient-itr',
  templateUrl: './patient-itr.component.html',
  styleUrls: ['./patient-itr.component.scss'],
  animations: [openCloseTrigger]
})
export class PatientItrComponent implements OnInit {
  faCircle = faCircle;
  faEye = faEye;
  faFolderOpen = faFolderOpen;
  faFolder = faFolder;
  faStethoscope = faStethoscope;

  show_details:boolean = false;

  visit_list: any;
  latest_vitals: any;
  selected_visit: any;
  selected_id: number;
  patient_id: string;

  loadData(){
    let patient_id = this.route.snapshot.paramMap.get('id');

    if(this.patient_id !== patient_id){
      let params = {
        patient_id: patient_id,
        per_page: '10',
        sort: '-consult_date'
      }
      this.getVisitList(params);
    }
  }

  getVisitList(params, page?){
    this.http.get('consultation/records',{params}).subscribe({
      next: (data: any) => {
        // console.log(data)
        this.visit_list = data.data;
      },
      error: err => console.log(err),
    })
  }

  user_allowed: boolean = false;

  showConsult(details: any){
    // console.log(details)
    if(details.pt_group != 'cn') {
      if(details.facility.code === this.user_location) {
        this.user_allowed = true;
        this.selected_visit = details;
        if(details.vitals) this.getLatestToday(details);
      } else {
        this.user_allowed = false;
        this.show_details = true;
      }
    } else {
      this.user_allowed = true;
      this.selected_visit = details;
      if(details.vitals) this.getLatestToday(details);
    }

  }

  getLatestToday(details){
    this.latest_vitals = this.vitalsCharts.getLatestToday(details.vitals, details.consult_date);

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
    return this.nameHelper.getVisitType(group);
  }

  constructor(
    private router: Router,
    private http: HttpService,
    private vitalsCharts: VitalsChartsService,
    private route: ActivatedRoute,
    private nameHelper: NameHelperService
  ) { }

  navigationEnd$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    tap(() => {
      this.loadData();
      this.show_details = false;
    })
  );

  user_location: string;
  ngOnInit(): void {
    this.user_location = this.http.getUserFacility();
    // this.loadData();
    this.route.params.subscribe(routeParams => {
      this.loadData();
    });
  }
}
