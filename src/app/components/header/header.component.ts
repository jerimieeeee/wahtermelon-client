import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { faChevronCircleDown, faBell, faSearch, faGear, faHome, faRightFromBracket, faAddressBook, faUser, faSquarePollVertical, faCalendarDay, faFlask, faChartLine, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';

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
  faFlask = faFlask;
  faChartLine = faChartLine;
  faCircleQuestion = faCircleQuestion;
  // patients$: Observable<any>;
  patients$ = new BehaviorSubject<any[]>([]);
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
    facility: {facility_name:''},
    designation_code: ''
  };

  showMenu: boolean = false;
  patientLoading:boolean = false;
  showCreate:boolean = false;

  user_menu = [
    /* {
      name: 'Help & Support',
      location: 'support',
      icon: faCircleQuestion
    }, */
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
    private cookieService: CookieService,
    private location: Location,
  ) { }

  current_page: number = 1;
  current_term: string;

  from: number = 0;
  last_page: number = 0;
  to: number = 0;
  total: number = 0;

  loadPatients(page?) {
    const current_page = page ?? this.current_page;
    let current_item = this.patients$.getValue();

    this.searchInput$.pipe(
      filter(res => res !== null && res.length >= this.minLengthTerm),
      distinctUntilChanged(),
      debounceTime(3000),
      tap(() => this.patientLoading = true),
      switchMap(term => {
        this.current_term = term;
        return this.getPatient(term, page).pipe(
          catchError(() => of([])),
          tap(() => this.patientLoading = false)
        );
      })
    ).subscribe(newPatients => {
      // Reload patient list base on search item
      this.patients$.next(newPatients);
    });

    // Fetch additional patient
    if(current_page > 1 && current_page <= this.last_page){
      this.getPatient(this.current_term, current_page).subscribe(initialPatients => {
        const allPatients = [...current_item, ...initialPatients];
        this.patients$.next(allPatients);
        this.patientLoading = false;
      });
    }
  }

  onScrollEnd() {
    this.patientLoading = true
    this.current_page++;
    this.loadPatients( this.current_page );
  }

  getPatient(term: string = null, page?): Observable<any> {
    let current_page = page ? 1 : page;
    return this.http.get('patient', {params:{'filter[search]':term, page: current_page, per_page: 10}})
    .pipe(map((resp:any) => {
      this.showCreate = resp.data.length == 0 ? true : false;

      this.from = resp.meta.from;
      this.to = resp.meta.to;
      this.last_page = resp.meta.last_page;
      this.total = resp.meta.total;

      return resp.data;
    }))
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

  resetList(){
    this.selectedPatient = null;
    this.showCreate = false;
    this.patientLoading = false;
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
  }
  navigationEnd$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    tap(() => {
      this.current_url = this.location.path();
    })
  );

  current_url: string;
  ngOnInit(): void {
    this.navigationEnd$.subscribe();
    this.loadPatients();
    let val = this.http.getUserFromJSON();

    this.user = {
      last_name:        val.last_name,
      first_name:       val.first_name,
      middle_name:      val.middle_name === 'NA' ? '' : val.middle_name,
      suffix_name:      val.suffix_name === 'NA' ? '' : val.suffix_name,
      facility:         {facility_name: val.facility.facility_name},
      designation_code: val.designation ? val.designation.code : val.designation_code
    };
  }

}
