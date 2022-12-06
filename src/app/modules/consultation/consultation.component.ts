import { Component, OnInit } from '@angular/core';
import { faChevronDown, faChevronUp, faCircleNotch, faDoorClosed, faPlus, faPlusSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { concat, Observable, of, Subject } from 'rxjs';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {

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

  patient_details: any;
  visit_list: any;
  vitals: any;

  toggleAll(){
    this.toggle_content = !this.toggle_content;
  }
  patientVitals(vitals) {
    this.vitals = vitals;
  }

  onSubmit(table){
    console.log(table)
  }

  endVisit() {
    console.log(this.consult_id);
  }

  patientInfo(info){
    this.patient_details = info;
    this.loadVisitHistory();
  }

  loadVisitHistory(){
    // console.log(this.patient_details);
    this.http.get('consultation/cn-records',{params:{patient_id: this.patient_details.id, per_page: 'all', sort: '-consult_date'}}).subscribe({
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

    console.log(params)
    this.http.get('consultation/cn-records', {params}).subscribe({
      next: (data: any) => {
        console.log(data.data);
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService,
    private route: ActivatedRoute
  ) { }

  consult_id: string;
  patient_id: string;

  ngOnInit(): void {
    this.patient_id = this.route.snapshot.paramMap.get('id');
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');

    this.loadConsult();
  }

}
