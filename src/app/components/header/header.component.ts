import { Component, OnInit, ViewChild } from '@angular/core';
import { faChevronCircleDown, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { concat, Observable, of, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;

  faChevronCircleDown = faChevronCircleDown;
  faBell = faBell;
  faSearch = faSearch;

  patients$: Observable<any>;
  patientLoading = false;
  searchInput$ = new Subject<string>();
  selectedPatient: any;
  minLengthTerm = 3;

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  loadPatients() {
    this.patients$ = concat(
      of([]), // default items
      this.searchInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.patientLoading = true),
        switchMap(term => {
          return this.getPatient(term).pipe(
            catchError(() => of([])),
            tap(() => this.patientLoading = false)
          )
        })
      )
    );
  }

  onSelect(selectedPatient){
    /* this.searchInput$.next(null);
    // this.loadPatients(); */
    if(selectedPatient) this.router.navigate(['/itr', {id: selectedPatient.id}]);
    this.selectedPatient = null;
    this.loadPatients();
  }

  getPatient(term: string = null): Observable<any> {
    return this.http.get('patient', {params:{'filter[search]':term}})
    .pipe(map((resp:any) => {
      console.log(resp.data);
      return resp.data;
    }))
  }

  ngOnInit(): void {
    this.loadPatients();
  }

}
