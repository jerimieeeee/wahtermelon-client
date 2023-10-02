import { Component, OnInit, ViewChild } from '@angular/core';
import { openCloseTrigger } from './declarations/animation';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, tap } from "rxjs/operators";
import { HttpService } from 'app/shared/services/http.service';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faCircle, faFolder, faStethoscope } from '@fortawesome/free-solid-svg-icons';
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
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;

  show_details:boolean = false;

  visit_list: any;
  latest_vitals: any;
  selected_visit: any;
  selected_id: number;
  patient_id: string;


  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  loadData(page? : number){
    let patient_id = this.route.snapshot.paramMap.get('id');

    if(page) this.show_details = false;

    if(this.patient_id !== patient_id){
      let params = {
        patient_id: patient_id,
        per_page: this.per_page,
        sort: '-consult_date',
        disable_filter: 1,
        page: page ?? 1
      }
      this.getVisitList(params);
    }
  }

  getVisitList(params, page?){
    this.http.get('consultation/records',{params}).subscribe({
      next: (data: any) => {
        // console.log(data)
        this.visit_list = data.data;

        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
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
