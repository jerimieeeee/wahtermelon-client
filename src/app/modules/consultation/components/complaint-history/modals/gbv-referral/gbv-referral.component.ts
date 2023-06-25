import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-gbv-referral',
  templateUrl: './gbv-referral.component.html',
  styleUrls: ['./gbv-referral.component.scss']
})
export class GbvReferralComponent implements OnInit{
  @Output() getPatientTbHistory = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() switchPage = new EventEmitter<any>();
  @Input() patient_id;
  @Input() max_date;
  @Input() gbv_complaints;

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  is_saving: boolean = false;
  show_form: boolean = false

  neglects: any;
  sexual_abuses: any;
  behavioral_changes: any;
  complaints: any;
  gbv_mdts: any = [];

  patient_complaints: any = [];
  patient_behavior: any = [];
  patient_neglect: any = [];
  patient_gbv = {
    patient_id: '',
    gbv_date: '',
    gbv_complaint_remarks: '',
    gbv_behavioral_remarks: '',
    gbv_neglect_remarks: '',
    referral_facility_code: '',
    referral_reason: 'For GBV Assessment',
    service_remarks: '',
    referral_remarks: '',
    referral_date : '',
    complaint: [],
    behavior: [],
    neglect: []
  };

  onSubmit(){
    let complaints: any =[];
    let behaviorals: any =[];
    let neglects: any =[];
    this.patient_gbv.patient_id = this.patient_id;
    this.patient_gbv.referral_date = this.patient_gbv.gbv_date;

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
        this.closeModal();
      },
      error: err => console.log(err)
    })
  }

  loadLibraries(){
    const getNeglect = this.http.get('libraries/gbv-neglect');
    const getBehavioral = this.http.get('libraries/gbv-behavioral');
    const getComplaints = this.http.get('libraries/complaint', {params:{query_type:'gbv_complaints'}});
    const getMdt = this.http.get('gender-based-violence/patient-gbv-user', {params: {per_page: 'all'}});

    forkJoin([getNeglect, getBehavioral, getComplaints, getMdt]).subscribe({
      next: ([dataNeglect, dataBehavioral, dataComplaints, dataMdt]: any) => {
        this.neglects = dataNeglect.data;
        this.behavioral_changes = dataBehavioral.data;
        this.complaints = dataComplaints.data;
        this.gbv_mdts = dataMdt.data;

        this.loadDefaultComplaint();
        this.show_form = true;
      },
      error: err => console.log(err)
    });
  }

  loadDefaultComplaint(){
    if(this.gbv_complaints) {
      Object.entries(this.gbv_complaints).forEach(([key, value]: any, index) => {
        this.patient_complaints[value] = true
      });
    }
  }

  closeModal(){
    this.toggleModal.emit('gbv_referral');
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
    // console.log(this.selected_tb_consult);
    // this.createForm();
  }
}
