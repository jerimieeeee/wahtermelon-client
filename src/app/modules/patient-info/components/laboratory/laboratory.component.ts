
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.scss']
})
export class LaboratoryComponent implements OnInit, OnDestroy {
  @Output() toggleAccordion = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() navigateTo = new EventEmitter<any>();
  @Output() setLabList = new EventEmitter<any>();
  @Input() accordions;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  lab_request: boolean = false;
  show_form: boolean = false;
  lab_list: any;

  loadData(patient_id) {
    let params = {
      patient_id: patient_id,
      sort: '-request_date',
      include: 'laboratory'
    }
    this.http.get('laboratory/consult-laboratories', {params}).subscribe({
      next: (data: any) => {
        // console.log(data)
        this.lab_list = data.data;
        this.setLabList.emit(this.lab_list);
        // this.getResults()
      },
      error: err => console.log(err)
    })
  }

  getResults(){
    Object.entries(this.lab_list).forEach(([key, value], index) => {
      let val: any = value;
      let url = this.http.getURL(val.laboratory.code)
      if(url !== '') {
        this.http.get(url, {params: {request_id: val.id}}).subscribe({
          next: (data: any) => {
            // console.log(data)
            this.lab_list[key]['result'] = data.data[0];
            if(Object.keys(this.lab_list).length - 1 === index) {
              this.show_form = true;
              this.setLabList.emit(this.lab_list);
            }
          },
          error: err => console.log(err)
        })
      }else{
        if(Object.keys(this.lab_list).length - 1 === index) {
          this.show_form = true;
          this.setLabList.emit(this.lab_list);
        }
      }
    })
  }

  navigate(loc) {
    this.navigateTo.emit(loc)
  }

  toggle(name) {
    this.toggleAccordion.emit(name);
  }

  modalToggle(name) {
    this.toggleModal.emit(name);
  }

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

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

}
