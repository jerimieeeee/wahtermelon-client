import { Component, OnInit, ViewChild } from '@angular/core';
import { faChevronCircleDown, faBell, faSearch, faGear } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { concat, Observable, of, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToothServicesComponent } from 'app/modules/dental/modals/tooth-services/tooth-services.component';
import { AuthService } from 'app/shared/services/auth/auth.service';

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
  faGear = faGear;

  patients$: Observable<any>;
  patientLoading = false;
  searchInput$ = new Subject<string>();
  selectedPatient: any;
  minLengthTerm = 3;
  user_info: any;

  constructor(
    private http: HttpService,
    private router: Router,
    private authService: AuthService
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

  showMenu: boolean = false;
  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  onSelect(selectedPatient){
    /* this.searchInput$.next(null);
    // this.loadPatients(); */
    if(selectedPatient) this.router.navigate(['/itr', {id: selectedPatient.id}]);
    this.selectedPatient = null;
    this.loadPatients();
  }

  showCreate:boolean = false;

  getPatient(term: string = null): Observable<any> {
    return this.http.get('patient', {params:{'filter[search]':term}})
    .pipe(map((resp:any) => {
      this.showCreate = resp.data.length == 0 ? true : false;
      console.log(this.showCreate)
      return resp.data;
    }))
  }

  logout(){
    localStorage.removeItem('access_token');
    window.location.reload();
    /* this.authService.logout().subscribe({
      next: res => this.router.navigate(['/login']),
      error: err => console.log(err)
    }); */
  }

  ngOnInit(): void {
    this.loadPatients();
    this.user_info = localStorage.getItem('name');
  }

}
