import { Component, OnInit, ViewChild } from '@angular/core';
import { faChevronDown, faChevronUp, faCircleNotch, faDoorClosed, faPlus, faPlusSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { concat, Observable, of, Subject } from 'rxjs';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { GraphsComponent } from './components/graphs/graphs.component';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {
  @ViewChild(GraphsComponent) graph: GraphsComponent;
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

  patient_details: any;
  visit_list: any;
  vitals: any;
  consult_details: any;
  consult_id: string;
  patient_id: string;

  toggleAll(){
    this.toggle_content = !this.toggle_content;
  }

  patientVitals(vitals) {
    // console.log(vitals)
    this.graph.patientVitals(vitals);
  }

  endVisit() {
    // console.log(this.consult_id);
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
    // console.log(this.patient_details);
    this.http.get('consultation/records',{params:{patient_id: this.patient_details.id, per_page: 'all', sort: '-consult_date'}}).subscribe({
      next: (data: any) => {
        this.visit_list = data.data;
        // console.log(data);
      },
      error: err => console.log(err),
    })
  }

  loadConsult(){
    let params = {
      id: this.consult_id,
      pt_group: 'cn',
    }

    // console.log(params)
    this.http.get('consultation/records', {params}).subscribe({
      next: (data: any) => {
        this.consult_details = data.data[0];
        console.log(this.consult_details)
        if(this.consult_details.consult_notes.complaint || this.consult_details.consult_notes.complaints.length > 0  || this.consult_details.consult_notes.history) {
          this.have_complaint = true;
        }
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

    this.loadConsult();
  }

}
