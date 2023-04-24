import { Component, OnInit, ViewChild } from '@angular/core';
import { faChevronDown, faChevronUp, faDoorClosed, faFile } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ActivatedRoute } from '@angular/router';
import { GraphsComponent } from './components/graphs/graphs.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {
  @ViewChild(GraphsComponent) graph: GraphsComponent;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faDoorClosed = faDoorClosed;
  faFile = faFile;

  is_saving: boolean = false;
  show_item: boolean = true;
  toggle_content: boolean = true;
  open_consult: boolean = true;
  have_complaint:boolean = false;
  show_end: boolean = false;
  enable_edit: boolean = false;
  show_ekas: boolean = false;

  modules: Number;

  patient_details: any;
  lab_list: any;
  visit_list: any;
  vitals: any;
  consult_details: any;
  consult_id: string;
  patient_id: string;

  referred_to = {
    id: ''
  };
  physicians: any;

  switchTabs(tabs){
    this.modules = 0;
    this.modules = tabs;
  }

  toggleAll(){
    this.toggle_content = !this.toggle_content;
  }

  patientVitals(vitals) {
    this.graph.patientVitals(vitals);
  }

  patientInfo(info){
    this.patient_details = info;
  }

  toggleModal(){
    this.show_end = !this.show_end;
  }

  openEkas() {
    let params = {
      patient_id: this.patient_id,
      sort: '-request_date',
      include: 'laboratory'
    }
    this.http.get('laboratory/consult-laboratories', {params}).subscribe({
      next: (data: any) => {
        this.lab_list = data.data;
        this.show_ekas = !this.show_ekas;
      },
      error: err => console.log(err)
    })
  }

  toggleEkas(){
    this.show_ekas = !this.show_ekas;
  }

  loadVisitHistory(){
    this.http.get('consultation/records',{params:{patient_id: this.patient_id, per_page: 'all', sort: '-consult_date'}}).subscribe({
      next: (data: any) => {
        this.visit_list = data.data;
        console.log(data.data);
      },
      error: err => console.log(err),
    })
  }

  with_credentials: boolean = false;
  allowed_to_edit: boolean = false;
  loadConsult(){
    let params = {
      id: this.consult_id,
      pt_group: 'cn',
    }

    this.http.get('consultation/records', {params}).subscribe({
      next: (data: any) => {
        // console.log(data)
        this.consult_details = data.data[0];
        this.allowed_to_edit = this.http.getUserFacility() === this.consult_details.facility_code ? true : false;
        // console.log(this.consult_details)
        if(this.consult_details.consult_notes.complaint || this.consult_details.consult_notes.complaints.length > 0  || this.consult_details.consult_notes.history) {
          this.have_complaint = true;
          this.loadUsers();

          if(this.consult_details.physician) {
            this.referred_to = this.consult_details.physician;
            this.enable_edit = true;
          }
        }
      },
      error: err => console.log(err)
    });

    let info = this.http.getUserFromJSON();
    this.with_credentials = info.konsulta_credential ? true : false;
  }

  referTo(){
    if(this.enable_edit) {
      this.enable_edit = false;
    } else {
      let params = {
        patient_id: this.consult_details.patient.id,
        consult_date: this.consult_details.consult_date,
        pt_group: 'cn',
        consult_done: false,
        physician_id: this.referred_to.id
      }

      this.http.update('consultation/records/', this.consult_details.id, params).subscribe({
        next: (data: any) => {
          this.toastr.success('Patient was referred','Referral');
          this.consult_details['physician'] = this.referred_to;
        },
        error: err => console.log(err)
      })
    }
  }

  loadUsers(){
    this.http.get('users', {params:{per_page: 'all', designation_code: 'MD'}}).subscribe({
      next: (data: any) => {
        // console.log(data.data)
        this.physicians = data.data
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.patient_id = this.route.snapshot.paramMap.get('id');
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');
    // console.log(this.consult_id)
    this.modules = 1;
    this.loadConsult();
    // this.loadUsers()
  }
}
