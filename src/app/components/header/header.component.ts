import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { faChevronCircleDown, faBell, faSearch, faGear, faHome, faRightFromBracket, faAddressBook, faUser, faSquarePollVertical, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { concat, Observable, of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;
  @ViewChild('mySelect') mySelect: NgSelectComponent;
  @Input() user_info;

  faChevronCircleDown = faChevronCircleDown;
  faBell = faBell;
  faSearch = faSearch;
  faGear = faGear;
  faHome = faHome;
  faRightFromBracket = faRightFromBracket;
  faAddressBook = faAddressBook;
  faUser = faUser;
  faSquarePollVertical = faSquarePollVertical;
  faCalendarDay = faCalendarDay;

  patients$: Observable<any>;
  searchInput$ = new Subject<string>();
  selectedPatient: any;
  minLengthTerm = 3;
  user_last_name: string;
  user_first_name: string;
  user_middle_name: string;

  user = {
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix_name: '',
    facility: {facility_name:''}
  };

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
      name: 'Admin',
      location: 'admin',
      icon: faGear
    },
  ]

  constructor(
    private http: HttpService,
    private router: Router,
    private cookieService: CookieService
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
    this.selectedPatient = null;
    if(selectedPatient) {
      this.mySelect.blur();
      this.mySelect.handleClearClick();
      this.router.navigate(['/patient/itr', {id: selectedPatient.id}]);
    }
  }

  getPatient(term: string = null): Observable<any> {
    return this.http.get('patient', {params:{'filter[search]':term, per_page: 'all'}})
    .pipe(map((resp:any) => {
      this.showCreate = resp.data.length == 0 ? true : false;
      return resp.data;
    }))
  }

  resetList(){
    this.selectedPatient = null;
    this.showCreate = false;
    this.loadPatients();
  }

  navigateTo(loc){
    this.selectedPatient = null;
    if(loc !== 'registration') {
      this.toggleMenu();
    } else {
      this.mySelect.blur();
      this.mySelect.close();
    }
    this.router.navigate(['/'+loc]);
  }

  getInitials(string) {
    return [...string.matchAll(/\b\w/g)].join('')
  }

  logout(){
    this.http.removeLocalStorageItem();
    /* if(this.cookieService.get('access_token')) {
      this.http.logout().subscribe({
        next: () => {
          this.http.removeLocalStorageItem();
          window.location.reload();
        },
        error: err => console.log(err)
      });
    } else {
      window.location.reload();
    } */
  }


  ngOnInit(): void {
    this.loadPatients();
    let val = this.http.getUserFromJSON();

    // console.log(val)
    this.user.last_name = val.last_name;
    this.user.first_name = val.first_name;
    this.user.middle_name = val.middle_name === 'NA' ? '' : val.middle_name;
    this.user.suffix_name = val.suffix_name === 'NA' ? '' : val.suffix_name;
    this.user.facility.facility_name = val.facility.facility_name;
  }

}
