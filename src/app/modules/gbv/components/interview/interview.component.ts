import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faEdit, faSave } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit{
  faPlus = faPlus;
  faEdit = faEdit;
  faSave = faSave;
  faCircleNotch = faCircleNotch;
  show_form: boolean = false;

  modals: any = [];

  interviewForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    patient_gbv_intake_id: new FormControl<string| null>(''),

    deferred: new FormControl<boolean| null>(false),
    deferral_reason_id : new FormControl<string| null>(''),
    deferral_previous_interviewer_id : new FormControl<string| null>(''),
    deferral_interviewer_remarks: new FormControl<string| null>(''),

    source_from_victim_flag: new FormControl<boolean| null>(false),
    source_from_historian_flag: new FormControl<boolean| null>(false),
    source_from_sworn_statement_flag: new FormControl<boolean| null>(false),
    mental_age_id: new FormControl<string| null>(''),

    incident_first_datetime: new FormControl<string| null>(''),
    incident_first_remarks : new FormControl<string| null>(''),
    incident_recent_datetime : new FormControl<string| null>(''),
    incident_recent_remarks: new FormControl<string| null>(''),

    abused_episode_id  : new FormControl<string| null>(''),
    abused_episode_count  : new FormControl<number| null>(null),
    abused_site_id : new FormControl<string| null>(''),
    abused_site_remarks : new FormControl<string| null>(''),
    disclosed_flag : new FormControl<boolean| null>(false),
    disclosed_type : new FormControl<string| null>(''),
    disclosed_relation_id : new FormControl<string| null>(''),

    initial_disclosure : new FormControl<string| null>(''),
    relation_to_child : new FormControl<string| null>(''),
    child_behavior_id : new FormControl<string| null>(''),
    child_caretaker_present_flag : new FormControl<boolean| null>(false),
    child_behavior_remarks : new FormControl<string| null>(''),
    dev_screening_id : new FormControl<string| null>(''),
    dev_screening_remarks : new FormControl<string| null>(''),

  });

  abused_episodes: any;
  info_sources: any;
  abused_sites: any;
  disclosed_types: any;
  child_relations: any;
  child_behaviors: any;
  developmental_screenings: any;
  mental_ages: any;
  deferral_reasons: any;
  previous_interviewers: any;

  loadLibraries(){
    const getAbusedEpisode = this.http.get('libraries/gbv-abused-episode');
    const getInfoSource = this.http.get('libraries/gbv-info-source');
    const getAbusedSite = this.http.get('libraries/gbv-abused-site');
    const getDisclosedType = this.http.get('libraries/gbv-disclosed-type');
    const getChildRelation = this.http.get('libraries/child-relation');
    const getChildBehavior = this.http.get('libraries/gbv-child-behavior');
    const getDevScreening = this.http.get('libraries/gbv-developmental-screening');
    const getMentalAge = this.http.get('libraries/gbv-mental-age');
    const getDeferralReason = this.http.get('libraries/gbv-deferral-reason');
    const getPreviousInterviewer = this.http.get('libraries/gbv-previous-interviewer');

    forkJoin([getAbusedEpisode, getInfoSource, getAbusedSite,
              getDisclosedType, getChildRelation, getChildBehavior,
              getDevScreening, getMentalAge, getDeferralReason,
              getPreviousInterviewer]).subscribe({
      next: ([dataAbusedEpisode, dataInfoSource, dataAbusedSite,
              dataDisclosedType, dataChildRelation, dataChildBehavior,
              dataDevScreening, dataMentalAge, dataDeferralReason,
              dataPreviousInterviewer]: any) => {
        this.abused_episodes = dataAbusedEpisode.data;
        this.info_sources = dataInfoSource.data;
        this.abused_sites = dataAbusedSite.data;
        this.disclosed_types = dataDisclosedType.data;
        this.child_relations = dataChildRelation.data;
        this.child_behaviors = dataChildBehavior.data;
        this.developmental_screenings = dataDevScreening.data;
        this.mental_ages = dataMentalAge.data;
        this.deferral_reasons = dataDeferralReason.data;
        this.previous_interviewers = dataPreviousInterviewer.data;

        this.show_form = true;
        // this.toggleModal('abuse_acts', 'Sexual Abuse', 'gbv-sexual-abuse')
      },
      error: err => console.log(err)
    });
  }

  selected_abused = {
    act_title: '',
    url: ''
  }
  toggleModal(name, act?, url?){
    if(name === 'abuse_acts') {
      this.selected_abused = {
        act_title: act,
        url: url
      }
    }
    this.modals[name] = !this.modals[name];
  }


  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // this.toggleModal('add_interview_notes')
    this.loadLibraries();
  }
}
