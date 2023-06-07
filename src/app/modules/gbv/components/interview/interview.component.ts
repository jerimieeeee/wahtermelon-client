import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faEdit, faSave } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { interviewForm } from './interviewForm';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit{
  @Output() updateSelectedGbv = new EventEmitter<any>();
  @Input() selected_gbv_case;
  @Input() patient_id;
  @Input() pos;

  max_date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  interviewForm:FormGroup=interviewForm();

  faPlus = faPlus;
  faEdit = faEdit;
  faSave = faSave;
  faCircleNotch = faCircleNotch;
  show_form: boolean = false;

  modals: any = [];

  selected_abused = {
    act_title: '',
    url: '',
    save_url: '',
    abused_data: null,
    abused_id_name: ''
  };

  selected_notes = {
    act_title: '',
    data: ''
  }

  selected_perpetrator = {
    act_title: '',
    data: ''
  };

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

  show_error: boolean = false;
  required_info_source: boolean = false;
  required_message: string = 'required field';

  onSubmit(){
    console.log(this.interviewForm);
    if(this.interviewForm.valid && (this.interviewForm.value.source_from_victim_flag || this.interviewForm.value.source_from_historian_flag || this.interviewForm.value.source_from_sworn_statement_flag)) {
      this.show_error = false;
      this.interviewForm.patchValue({
        incident_first_datetime: formatDate(this.interviewForm.value.incident_first_datetime, 'yyyy-MM-dd HH:mm:ss', 'en'),
        incident_recent_datetime: formatDate(this.interviewForm.value.incident_recent_datetime, 'yyyy-MM-dd HH:mm:ss', 'en'),
        recant_datetime: this.interviewForm.value.recant_datetime ? formatDate(this.interviewForm.value.recant_datetime, 'yyyy-MM-dd HH:mm:ss', 'en') : null,
        interview_datetime: this.interviewForm.value.interview_datetime ? formatDate(this.interviewForm.value.interview_datetime, 'yyyy-MM-dd HH:mm:ss', 'en') : null,
        deferral_datetime: this.interviewForm.value.deferral_datetime ? formatDate(this.interviewForm.value.deferral_datetime, 'yyyy-MM-dd HH:mm:ss', 'en') : null,
      });

      this.saveForm();
    } else {
      if(!this.interviewForm.value.source_from_victim_flag && !this.interviewForm.value.source_from_historian_flag && !this.interviewForm.value.source_from_sworn_statement_flag){
        this.required_info_source = true;
      }
      this.show_error = true;
    }
  }

  saveForm(){
    let query;

    if(this.interviewForm.value.id) {
      query = this.http.update('gender-based-violence/patient-gbv-interview/', this.interviewForm.value.id, this.interviewForm.value);
    } else {
      query = this.http.post('gender-based-violence/patient-gbv-interview', this.interviewForm.value)
    }

    query.subscribe({
      next: (data: any) => {
        // console.log(data);
        this.toastr.success('Successfully recorded.', 'Interview');
        this.patchData(data.data);
      },
      error: err => console.log(err)
    });
  }

  reloadData(){
    let params = {
      id: this.selected_gbv_case.id,
      // patient_id: this.selected_gbv_case.patient_id
    }
    // console.log(params)
    this.http.get('gender-based-violence/patient-gbv', {params}).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.selected_gbv_case = data.data[0];
        this.updateSelectedGbv.emit(this.selected_gbv_case);
        this.patchData();
      },
      error: err => console.log(err)
    });
  }

  checkRequired(type: string){
    console.log(this.interviewForm.value.incident_first_unknown);
    if(!this.interviewForm.value.incident_first_unknown) {
      this.f.incident_first_datetime.setValidators([Validators.required]);
    } else {
      this.f.incident_first_datetime.clearValidators();
      this.interviewForm.patchValue({incident_first_datetime: null});
    }

    console.log(this.interviewForm.value.incident_recent_unknown);
    if(!this.interviewForm.value.incident_recent_unknown) {
      this.f.incident_recent_datetime.setValidators([Validators.required]);
    } else {
      this.f.incident_recent_datetime.clearValidators();
      this.interviewForm.patchValue({incident_recent_datetime: null});
    }

    if(type === 'first') {
      console.log(type);
      this.f.incident_first_datetime.updateValueAndValidity();
    } else {
      console.log(type);
      this.f.incident_recent_datetime.updateValueAndValidity();
    }
  }

  patchData(data?) {
    if(data) {
      this.interviewForm.patchValue({...data});
    } else {
      if(this.selected_gbv_case.gbvIntake.interview) {
        this.interviewForm.patchValue({...this.selected_gbv_case.gbvIntake.interview})
      }

      this.loadAbuses(this.selected_gbv_case.gbvIntake.interview_sexual_abuses, 'sexual_abuses', 'sexual');
      this.loadAbuses(this.selected_gbv_case.gbvIntake.interview_physical_abuses, 'physical_abuses', 'physical');
      this.loadAbuses(this.selected_gbv_case.gbvIntake.interview_neglect_abuses, 'neglect_abuses', 'neglect');
      this.loadAbuses(this.selected_gbv_case.gbvIntake.interview_emotional_abuses, 'emotional_abuses', 'emotional_abuse');
      this.loadSummaries(this.selected_gbv_case.gbvIntake.interview_summaries)
      this.show_form = true;
    }

    this.checkIncidents();
    this.checkRequired('first');
    this.checkRequired('recent');
  }

  interview_summaries: any = [];
  interview_social_notes: any = [];

  loadSummaries(data){
    this.interview_summaries = [];
    this.interview_social_notes = [];

    Object.entries(data).forEach(([key, value]: any, index) => {
      this[value.summary_type==='IS'?'interview_summaries':'interview_social_notes'].push(value);
    });
  }

  sexual_abuses: any = [];
  physical_abuses: any =[];
  neglect_abuses: any = [];
  emotional_abuses: any =[];

  loadAbuses(data, var_name, lib_var) {
    let abuses: any = [];
    Object.entries(data).forEach(([key, value]: any, index) => {
      if(!abuses[value[lib_var].desc]) {
        abuses[value[lib_var].desc] = [];
      }
      abuses[value[lib_var].desc][value.info_source_id] = true;
    });

    this[var_name] = abuses;
  }

  checkIncidents(){
    if(this.interviewForm.value.incident_first_unknown) {
      this.f.incident_first_datetime.disable();
    } else {
      this.f.incident_first_datetime.enable();
    }

    if(this.interviewForm.value.incident_recent_unknown) {
      this.f.incident_recent_datetime.disable();
    } else {
      this.f.incident_recent_datetime.enable();
    }
  }

  createForm(){
    this.interviewForm = this.formBuilder.group({
      id: [null],
      patient_id: [this.patient_id],
      patient_gbv_intake_id: [this.selected_gbv_case.gbvIntake.id],
      recant_flag:[false],
      recant_datetime: [null],
      recant_remarks: [null],
      interview_datetime: [null],
      deferred: [null],
      deferral_datetime: [null],
      deferral_reason_id: [null],
      deferral_previous_interviewer_id : [null],
      deferral_interviewer_remarks: [null],

      source_from_victim_flag: [false],
      source_from_historian_flag: [false],
      source_from_sworn_statement_flag: [false],
      mental_age_id: [null],

      incident_first_unknown: [false],
      incident_first_datetime: [null, Validators.required],
      incident_first_remarks : [null],
      incident_recent_unknown: [false],
      incident_recent_datetime : [null, Validators.required],
      incident_recent_remarks: [null],

      abused_episode_id: [null, Validators.required],
      abused_episode_count  : [null],
      abused_site_id : [null, Validators.required],
      abused_site_remarks : [null],
      disclosed_flag : [false, Validators.required],
      disclosed_type : [null],
      disclosed_relation_id : [null],
      initial_disclosure : [null],

      relation_to_child : [null],
      child_behavior_id : [null],
      child_caretaker_present_flag : [false],
      child_behavior_remarks : [null],
      dev_screening_id : [null],
      dev_screening_remarks : [null],
    });

    this.patchData();
  }

  toggleModal(name, act?, url?, save_url?, data?, abused_id_name?){
    switch(name) {
      case 'abuse_acts': {
        this.selected_abused = {
          act_title: act,
          url: url,
          save_url: save_url,
          abused_data: data,
          abused_id_name: abused_id_name
        }
        // this.reloadData()
        break;
      }
      case 'interview_notes': {
        // console.log(act)
        this.selected_notes = {
          act_title: act,
          data: data
        }
        break;
      }
      case 'perpetrators': {
        this.selected_perpetrator = {
          act_title: act,
          data: data
        }
        break;
      }
      default: {

        break;
      }
    }
    this.modals[name] = !this.modals[name];
    if(name==='abuse_acts' && !this.modals[name]) this.reloadData();
    if(name==='interview_notes' && !this.modals[name]) this.reloadData();
    if(name==='perpetrators' && !this.modals[name]) this.reloadData();
  }

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

        this.createForm();
      },
      error: err => console.log(err)
    });
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.interviewForm.controls;
  }

  ngOnInit(): void {
    this.loadLibraries();
    console.log(this.selected_gbv_case)
  }
}
