import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-case-conference',
  templateUrl: './case-conference.component.html',
  styleUrls: ['./case-conference.component.scss']
})
export class CaseConferenceComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_gbv_intake_id;
  @Input() patient_id;
  @Input() selected_data;

  faCircleNotch = faCircleNotch;
  faSave = faSave;

  is_saving: boolean = false;
  show_error: boolean = false;
  show_form: boolean = false;

  perpetrator_locations: any;
  invites: any = [];
  concerns: any = [];
  mitigations: any = [];
  recommendations: any = [];

  patient_invites: any = [];
  patient_concerns: any = [];
  patient_mitigations: any = [];
  patient_recommendations: any = [];
  patient_conference = {
    id: null,
    patient_id: '',
    patient_gbv_intake_id: '',
    conference_date: '',
    notes: '',
    conference_invitee_remarks: '',
    conference_concern_remarks: '',
    conference_mitigating_factor_remarks: '',
    conference_recommendation_remarks: '',
    invites: [],
    concerns: [],
    mitigations: [],
    recommendations: []
  };

  onSubmit(){
    this.is_saving = true;
    let invites: any = [];
    let concerns: any = [];
    let mitigations: any = [];
    let recommendations: any = [];
    this.patient_conference.patient_id = this.patient_id;
    this.patient_conference.patient_gbv_intake_id = this.patient_gbv_intake_id;

    Object.entries(this.patient_invites).forEach(([key, value]:any, index) => {
      if(value === true) invites.push({invite_code: key});
    });

    Object.entries(this.patient_concerns).forEach(([key, value]:any, index) => {
      console.log(key, value)
      if(value === true) concerns.push({concern_code: key});
    });

    Object.entries(this.patient_mitigations).forEach(([key, value]:any, index) => {
      if(value === true) mitigations.push({factor_code: key});
    });

    Object.entries(this.patient_recommendations).forEach(([key, value]:any, index) => {
      if(value === true) recommendations.push({recommend_code: key});
    });

    this.patient_conference.invites = invites;
    this.patient_conference.concerns = concerns;
    this.patient_conference.mitigations = mitigations;
    this.patient_conference.recommendations = recommendations;

    console.log(this.patient_conference);
    this.http.post('gender-based-violence/patient-gbv-conference', this.patient_conference).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastr.success('Successfully recorded', 'Case Conference');
        this.is_saving = false;
        this.closeModal();
      },
      error: err => console.log(err)
    });
  }

  patchData(){
    if(this.selected_data) {
      this.patient_conference = {...this.selected_data};
      this.patient_conference.conference_date = formatDate(this.selected_data.conference_date, 'yyyy-MM-dd', 'en', 'Asia/Singapore');

      if(this.selected_data.invite) this.patient_invites = this.checkSelection(this.selected_data.invite, 'invite_code');
      if(this.selected_data.concern) this.patient_concerns = this.checkSelection(this.selected_data.concern, 'concern_code');
      if(this.selected_data.mitigating_factor) this.patient_mitigations = this.checkSelection(this.selected_data.mitigating_factor, 'factor_code');
      if(this.selected_data.recommendation) this.patient_recommendations = this.checkSelection(this.selected_data.recommendation, 'recommend_code');

      console.log(this.patient_conference);
    }
    this.show_form = true;
  }

  checkSelection(data, var_name):[] {
    console.log(data, var_name);
    let content: any = [];
    Object.entries(data).forEach(([key, value]: any, index) => {
      content[value[var_name]] = true;
    });

    return content;
  }

  loadLibraries(){
    const getConfInvitee = this.http.get('libraries/gbv-conference-invitee');
    const getConfConcern = this.http.get('libraries/gbv-conference-concern');
    const getConfMitigition = this.http.get('libraries/gbv-conference-mitigating');
    const getConfRecommendation = this.http.get('libraries/gbv-conference-recommendation');

    forkJoin([getConfInvitee, getConfConcern, getConfMitigition, getConfRecommendation]).subscribe({
      next: ([dataConfInvitee, dataConfConcern, dataConfMitigition, dataConfRecommendation]: any) => {
        this.invites = dataConfInvitee.data;
        this.concerns = dataConfConcern.data;
        this.mitigations = dataConfMitigition.data;
        this.recommendations = dataConfRecommendation.data;

        this.patchData();
      },
      error: err => console.log(err)
    })
  }

  closeModal(){
    this.toggleModal.emit('case_conference');
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    console.log(this.selected_data)
    this.loadLibraries();
  }
}
