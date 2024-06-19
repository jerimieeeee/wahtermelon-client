import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faChevronDown, faChevronUp, faMinus, faPlusCircle, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-surgical-history',
  templateUrl: './surgical-history.component.html',
  styleUrls: ['./surgical-history.component.scss']
})
export class SurgicalHistoryComponent implements OnInit, OnDestroy{
  @Output() toggleAccordion = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() setSurgicalHistory = new EventEmitter<any>();
  @Input() accordions;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faPlusCircle = faPlusCircle;
  faTrashCan = faTrashCan;
  faMinus = faMinus;

  history: [];

  loadData(patient_id){
    this.http.get('patient-surgical-history/history', {params:{patient_id: patient_id, category: '1'}}).subscribe({
      next: (data: any) => {
        // console.log(data)
        this.setSurgicalHistory.emit(data.data);
        this.history = data.data;
      },
      error: err => console.log(err)
    });
  }

  toggle(name) {
    this.toggleAccordion.emit(name);
  }

  modalToggle(name, data?) {
    this.toggleModal.emit({modal_name: name, data: data});
  }

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  no_surgical_form = ['dn'];
  active_loc_id: any;
  navigationEnd$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    tap(() => {
      this.active_loc_id = this.http.getUrlParams()
    })
  );

  navi_end;
  ngOnInit(): void {
    this.active_loc_id = this.http.getUrlParams()
    this.navi_end = this.navigationEnd$.subscribe();
  }

  ngOnDestroy() {
    this.navi_end.unsubscribe();
  }

}
