import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-triage',
  templateUrl: './triage.component.html',
  styleUrls: ['./triage.component.scss']
})
export class TriageComponent implements OnInit, OnChanges{
  @Output() getGbvHistory = new EventEmitter<any>();
  @Input() selected_gbv_case;
  @Input() patient_id;
  @Input() pos;
  // @Input() max_date;
  // @Input() gbv_complaints;
  faSave = faSave;
  faCircleNotch = faCircleNotch;

  is_saving: boolean = false;
  show_form: boolean = false;

  neglects: any;
  sexual_abuses: any;
  behavioral_changes: any;
  complaints: any;
  gbv_mdts: any = [];

  patient_complaints: any = [];
  patient_behavior: any = [];
  patient_neglect: any = [];
  patient_gbv = {
    id: null,
    patient_id: '',
    gbv_date: '',
    gbv_complaint_remarks: '',
    gbv_behavioral_remarks: '',
    gbv_neglect_remarks: '',
    referral_reason : '',
    complaint: [],
    behavior: [],
    neglect: [],
    gbvReferral: null,
    // referral_date: null,
  };

  onSubmit(){
    this.is_saving = true;

    let complaints: any =[];
    let behaviorals: any =[];
    let neglects: any =[];
    this.patient_gbv.patient_id = this.patient_id;
    // this.patient_gbv.referral_date = this.patient_gbv.gbv_date;

    Object.entries(this.patient_complaints).forEach(([key, value]:any, index) => {
      if(value === true) complaints.push({complaint_id: key})
    });

    Object.entries(this.patient_behavior).forEach(([key, value]:any, index) => {
      if(value === true) behaviorals.push({behavioral_id: key})
    });

    Object.entries(this.patient_neglect).forEach(([key, value]:any, index) => {
      if(value === true) neglects.push({neglect_id: key})
    });

    this.patient_gbv.complaint = complaints;
    this.patient_gbv.behavior = behaviorals;
    this.patient_gbv.neglect = neglects;

    console.log(this.patient_gbv);
    this.http.post('gender-based-violence/patient-gbv', this.patient_gbv).subscribe({
      next: (data: any) => {
        console.log(data);

        this.toastr.success('Successfully recorded!', 'GBV Referral');
        this.is_saving = false;
        this.getGbvHistory.emit();
      },
      error: err => console.log(err)
    })
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
      },
      error: err => console.log(err)
    });
  }

  loadLibraries(){
    const getNeglect = this.http.get('libraries/gbv-neglect');
    const getBehavioral = this.http.get('libraries/gbv-behavioral');
    const getComplaints = this.http.get('libraries/complaint', {params:{query_type:'gbv_complaints'}});
    const getMdt = this.http.get('users', {params:{per_page: 'all', designation_code: 'MD'}});

    forkJoin([getNeglect, getBehavioral, getComplaints, getMdt]).subscribe({
      next: ([dataNeglect, dataBehavioral, dataComplaints, dataMdt]: any) => {
        this.neglects = dataNeglect.data;
        this.behavioral_changes = dataBehavioral.data;
        this.complaints = dataComplaints.data;
        this.gbv_mdts = dataMdt.data;

        this.checkOpenGbv();
        this.show_form = true;
      },
      error: err => console.log(err)
    });
  }

  checkOpenGbv(){
    if(this.selected_gbv_case) {
      this.patient_gbv = {...this.selected_gbv_case};
      this.patient_gbv.gbv_date = formatDate(this.patient_gbv.gbv_date, 'yyyy-MM-dd', 'en', 'Asia/Manila');
      this.patient_gbv.referral_reason = this.patient_gbv.gbvReferral.length>0 ? this.patient_gbv.gbvReferral[0].referral_reason : null;
      // console.log(this.patient_gbv);
      if(this.selected_gbv_case.gbvComplaint) this.patient_complaints = this.checkSelection(this.selected_gbv_case.gbvComplaint, 'complaint_id');
      if(this.selected_gbv_case.gbvBehavior) this.patient_behavior = this.checkSelection(this.selected_gbv_case.gbvBehavior, 'behavioral_id');
      if(this.selected_gbv_case.gbvNeglect) this.patient_neglect = this.checkSelection(this.selected_gbv_case.gbvNeglect, 'neglect_id');
    }
  }

  checkSelection(data, var_name):[] {
    let content: any = [];
    Object.entries(data).forEach(([key, value]: any, index) => {
      content[value[var_name]] = true;
    });

    return content;
  }

  loadComplaints(){
    /* if(this.gbv_complaints) {
      Object.entries(this.gbv_complaints).forEach(([key, value], index) => {
        let val: any = value
        this.patient_complaints[val] = true
      });
    } */
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkOpenGbv();
  }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
