import { Component, OnInit, Input } from '@angular/core';
import { faChevronCircleDown, faBell, faSearch, faGear, faHome, faRightFromBracket, faAddressBook, faUser } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { concat, Observable, of, Subject } from 'rxjs';
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
  @Input() user_info;

  faChevronCircleDown = faChevronCircleDown;
  faBell = faBell;
  faSearch = faSearch;
  faGear = faGear;
  faHome = faHome;
  faRightFromBracket = faRightFromBracket;
  faAddressBook = faAddressBook;
  faUser = faUser;

  patients$: Observable<any>;
  searchInput$ = new Subject<string>();
  selectedPatient: any;
  minLengthTerm = 3;
  user_last_name: string;
  user_first_name: string;
  user_middle_name: string;

  showMenu: boolean = false;
  patientLoading:boolean = false;
  showCreate:boolean = false;

  user_menu = [
    {
      name: 'My Account',
      location: 'my-account',
      icon: faUser
    },
    {
      name: 'Account List',
      location: 'account-list',
      icon: faAddressBook
    },
    {
      name: 'Settings',
      location: 'home',
      icon: faGear
    },
  ]

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

  getPatient(term: string = null): Observable<any> {
    return this.http.get('patient', {params:{'filter[search]':term, per_page: 'all'}})
    .pipe(map((resp:any) => {
      console.log(resp);
      this.showCreate = resp.data.length == 0 ? true : false;
      console.log(this.showCreate)
      return resp.data;
    }))
  }

  navigateTo(loc){
    console.log(loc)
    this.router.navigate(['/'+loc]);
  }

  getInitials(string) {
    return [...string.matchAll(/\b\w/g)].join('')
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
    this.user_last_name = localStorage.getItem('user_last_name');
    this.user_first_name = localStorage.getItem('user_first_name');
    this.user_middle_name = localStorage.getItem('user_middle_name');
  }

}
