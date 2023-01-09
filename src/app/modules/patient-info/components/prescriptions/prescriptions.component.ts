import { Component, Output, Input, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit, OnDestroy {
  @Output() toggleAccordion = new EventEmitter<any>();
  @Output() navigateTo = new EventEmitter<any>();
  @Input() accordions;
  @Input() consult_id;
  @Input() patient_info;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  prescriptions: any;

  toggle(name) {
    this.toggleAccordion.emit(name);
  }

  navigate(location) {
    this.navigateTo.emit(location);
  }

  libraries = {
    konsulta_medicine_code: {var_name: 'medicine_desc',     location: 'konsulta-medicines',   value: ''}
  }

  identify(index, item) {
    return item.id
  }


  loadData(patient_id) {
    let params = {
      patient_id: patient_id,
      status: 'dispensing'
    }

    this.http.get('medicine/prescriptions', {params}).subscribe({
      next: (data: any) => {
        // console.log(data)
        this.prescriptions = data.data;
      },
      error: err => console.log(err)
    })
  }

  loadPrescriptions(){
    if(this.patient_info){
      let params = {patient_id: this.patient_info.id, status: 'dispensing'};

      this.http.get('medicine/prescriptions', {params}).subscribe({
        next: (data: any) => {
          // console.log(data.data)
          this.prescriptions = data.data;
        },
        error: err => console.log(err)
      });
    }
  }

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  no_pres_form = ['dispensing', 'cn'];
  active_loc_id: any;
  navigationEnd$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    tap(() => {
      this.active_loc_id = this.http.getUrlParams()
    })
  );

  navi_end
  ngOnInit(): void {
    this.active_loc_id = this.http.getUrlParams()
    this.navi_end = this.navigationEnd$.subscribe();
  }

  ngOnDestroy() {
    this.navi_end.unsubscribe();
  }
  /* ngOnChanges(changes: SimpleChanges): void {
    // this.loadPrescriptions();
    this.active_loc_id = this.http.getUrlParams()
  } */

}
