import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { faChevronCircleDown, faBell, faSearch, faGear, faHome, faRightFromBracket, faAddressBook, faUser, faSquarePollVertical, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { CookieService } from 'ngx-cookie-service';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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

  patients$ = new BehaviorSubject<any[]>([]);
  searchInput$ = new Subject<string>();
  selectedPatient: any;
  minLengthTerm = 3;
  user = {
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix_name: '',
    facility: { facility_name: '' }
  };
  showMenu: boolean = false;
  patientLoading: boolean = false;
  showCreate: boolean = false;

  constructor(
    private http: HttpService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.loadPatients();
    let val = this.http.getUserFromJSON();

    this.user.last_name = val.last_name;
    this.user.first_name = val.first_name;
    this.user.middle_name = val.middle_name === 'NA' ? '' : val.middle_name;
    this.user.suffix_name = val.suffix_name === 'NA' ? '' : val.suffix_name;
    this.user.facility.facility_name = val.facility.facility_name;
  }

  loadPatients(page: number = 1) {
    this.searchInput$.pipe(
      filter(term => term !== null && term.length >= this.minLengthTerm),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.patientLoading = true),
      switchMap(term => this.getPatient(term, page)),
      catchError(() => of([])),
    ).subscribe(patients => {
      if (page === 1) {
        this.patients$.next(patients);
      } else {
        const currentPatients = this.patients$.getValue();
        this.patients$.next([...currentPatients, ...patients]);
      }
      this.patientLoading = false;
    });
  }

  getPatient(term: string, page: number): Observable<any[]> {
    return this.http.get('patient', { params: { 'filter[search]': term, page: page, per_page: 10 } })
      .pipe(
        map((resp: any) => {
          this.showCreate = resp.data.length === 0;
          return resp.data;
        })
      );
  }

  onScrollEnd() {
    if (!this.patientLoading) {
      const currentPage = this.patients$.getValue().length / 10 + 1;
      this.loadPatients(currentPage);
    }
  }

  onSelect(selectedPatient) {
    this.selectedPatient = null;
    if (selectedPatient) {
      this.mySelect.blur();
      this.mySelect.handleClearClick();
      this.router.navigate(['/patient/itr', { id: selectedPatient.id }]);
    }
  }

  resetList() {
    this.selectedPatient = null;
    this.showCreate = false;
    this.patientLoading = false;
    this.loadPatients();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  navigateTo(loc) {
    this.selectedPatient = null;
    if (loc !== 'registration') {
      this.toggleMenu();
    } else {
      this.mySelect.blur();
      this.mySelect.close();
    }
    this.router.navigate(['/' + loc]);
  }

  getInitials(string) {
    return [...string.matchAll(/\b\w/g)].join('');
  }

  logout() {
    this.http.removeLocalStorageItem();
  }
}
