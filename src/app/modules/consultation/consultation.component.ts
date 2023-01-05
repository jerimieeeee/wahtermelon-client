import { Component, OnInit, ViewChild } from '@angular/core';
import { faChevronDown, faChevronUp, faCircleNotch, faDoorClosed, faPlus, faPlusSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { concat, Observable, of, Subject } from 'rxjs';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { GraphsComponent } from './components/graphs/graphs.component';
import { PatientInfoComponent } from 'app/components/patient-info/patient-info.component';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {
  @ViewChild(GraphsComponent) graph: GraphsComponent;
  @ViewChild(PatientInfoComponent) patient_info: PatientInfoComponent;

  faPlusSquare = faPlusSquare;
  faSpinner = faCircleNotch;
  faXmark = faXmark;
  faPlus = faPlus;
  faFloppyDisk = faFloppyDisk;
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faDoorClosed = faDoorClosed;

  is_saving: boolean = false;
  show_item: boolean = true;
  toggle_content: boolean = true;
  open_consult: boolean = true;
  have_complaint:boolean = false;
  show_end: boolean = false;
  enable_edit: boolean = false;

  modules: Number;

  patient_details: any;
  visit_list: any;
  vitals: any;
  consult_details: any;
  consult_id: string;
  patient_id: string;

  referred_to: string = '';
  physicians: any = [
    {
      id: '97d1709c-29e7-4a7b-be3e-71c9ed7183c4',
      last_name: 'Santos',
      first_name: 'Mark Christian',
      middle_name: 'Baustista',
      suffix_name: 'NA'
    },
    {
      id: '97ef7165-5270-407d-b833-fa26bec5ccd6',
      last_name: 'Hagenes',
      first_name: 'Kiley',
      middle_name: 'Feil',
      suffix_name: 'NA'
    },
    {
      id: '97eba43a-dd19-44a8-8db3-044db0f81827',
      last_name: 'Perez',
      first_name: 'Emmanuel',
      middle_name: 'Bildan',
      suffix_name: 'NA'
    },
  ]

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

  reloadData() {
    this.patient_info.loadData('prescription');
  }

  endVisit() {
    let params = {
      patient_id: this.consult_details.patient.id,
      consult_date: this.consult_details.consult_date,
      pt_group: 'cn',
      consult_done: true
    }

    this.http.update('consultation/records/', this.consult_details.id, params).subscribe({
      next: (data: any) => {
        console.log(data)
      },
      error: err => console.log(err)
    })
  }

  patientInfo(info){
    this.patient_details = info;
  }

  toggleModal(){
    this.show_end = !this.show_end;
  }

  loadVisitHistory(){
    this.http.get('consultation/records',{params:{patient_id: this.patient_details.id, per_page: 'all', sort: '-consult_date'}}).subscribe({
      next: (data: any) => {
        this.visit_list = data.data;
      },
      error: err => console.log(err),
    })
  }

  loadConsult(){
    let params = {
      id: this.consult_id,
      pt_group: 'cn',
    }

    this.http.get('consultation/records', {params}).subscribe({
      next: (data: any) => {
        this.consult_details = data.data[0];
        // console.log(this.consult_details)
        if(this.consult_details.consult_notes.complaint || this.consult_details.consult_notes.complaints.length > 0  || this.consult_details.consult_notes.history) {
          this.have_complaint = true;
        }

        if(this.consult_details.physician) {
          this.referred_to = this.consult_details.physician.id;
          this.enable_edit = true;
        }
      },
      error: err => console.log(err)
    })
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
        physician_id: this.referred_to
      }

      this.http.update('consultation/records/', this.consult_details.id, params).subscribe({
        next: (data: any) => {
          console.log(data);
          this.loadConsult();
        },
        error: err => console.log(err)
      })
    }
  }

  loadUsers(){
    this.http.get('users', {params:{per_page: 'all'}}).subscribe({
      next: (data: any) => {
        console.log(data.data)
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.patient_id = this.route.snapshot.paramMap.get('id');
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');

    this.modules = 1;
    this.loadConsult();
  }
}
