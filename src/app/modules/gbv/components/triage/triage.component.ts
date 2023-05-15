import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-triage',
  templateUrl: './triage.component.html',
  styleUrls: ['./triage.component.scss']
})
export class TriageComponent implements OnInit{
  @Output() getPatientTbHistory = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() switchPage = new EventEmitter<any>();
  @Input() selected_gbv_case;
  @Input() patient_id;
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
  patient_complaints_remarks: any = [];
  patient_behavioral: any = [];
  patient_behavioral_remarks: any = [];
  patient_neglect: any = [];
  patient_neglect_remarks: any = [];
  patient_referral = {
    referral_date : '',
    referral_facility_code: '',
    referral_reason: '',
    service_remarks: '',
    referral_remarks: '',
    patient_id: ''
  };

  onSubmit(){
    console.log(this.patient_referral);
    console.log(this.patient_complaints);
    console.log(this.patient_complaints_remarks);
    console.log(this.patient_behavioral);
    console.log(this.patient_behavioral_remarks);
    console.log(this.patient_neglect);
    console.log(this.patient_neglect_remarks);
  }

  loadLibraries(){
    this.http.get('libraries/gbv-neglect').subscribe({
      next: (data: any) => {
        this.neglects = data.data;
      },
      error: err => console.log(err)
    });

    this.http.get('libraries/gbv-behavioral').subscribe({
      next: (data: any) => {
        this.behavioral_changes = data.data;
      },
      error: err => console.log(err)
    });

    this.http.get('libraries/complaint', {params:{query_type:'gbv_complaints'}}).subscribe(
      (data: any) => {
        console.log(data)
        this.complaints = data.data;
        this.show_form = true;
      }
    );

    /* this.http.get('users', {params:{per_page: 'all', designation_code: 'MD'}}).subscribe({
      next: (data: any) => {
        console.log(data.data)
        this.gbv_mdts = data.data;
      },
      error: err => console.log(err)
    }); */
  }

  loadComplaints(){
    /* if(this.gbv_complaints) {
      Object.entries(this.gbv_complaints).forEach(([key, value], index) => {
        let val: any = value
        this.patient_complaints[val] = true
      });
    } */
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
