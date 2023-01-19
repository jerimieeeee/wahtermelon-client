import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { faChevronCircleDown, faBell, faSearch, faGear, faHome, faRightFromBracket, faAddressBook, faUser, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { concat, Observable, of, Subject } from 'rxjs';
import { Router } from '@angular/router';

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
  faSquarePollVertical = faSquarePollVertical;

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
    suffix_name: ''
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
    /* {
      name: 'Account List',
      location: 'account-list',
      icon: faAddressBook
    }, */
    {
      name: 'Settings',
      location: 'admin',
      icon: faGear
    },
  ]

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  dummy_patient = [
    'ln twenty',
    'aolastname',
    'ln eight'
  ];

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
          let in_arr: boolean = false;
          let in_store: boolean = false;
          if(this.dummy_patient.includes(term)){
            in_arr = true;
            in_store = this.checkLocalStore(term)
          } else {
            in_arr = false;
          }
          console.log(in_store)
          if(in_arr === false) {
            return this.getPatient(term).pipe(
              catchError(() => of([])),
              tap(() => this.patientLoading = false)
            )
          } else {
            if(in_store === true) {
              return this.getPatient(term).pipe(
                catchError(() => of([])),
                tap(() => this.patientLoading = false)
              )
            } else {
              this.patientLoading = false;
              this.showCreate = true
              return of([]);
            }
          }
        })
      )
    );
  }

  checkLocalStore(term){
    // return false
    let ret_val: boolean = false;
    if(localStorage.getItem('uploaded-xml')) {
      let list = JSON.parse(localStorage.getItem('uploaded-xml'));

      Object.entries(list).forEach(([key, value], index) => {
        let val: any = value;

        if(ret_val !== true) {
          if(val.attr.pPatientLname.search(term.toUpperCase()) > -1) {
            console.log(term)
            ret_val = true;
          }
        }
      })
    }

    return ret_val;
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  onSelect(selectedPatient){
    if(selectedPatient) {
      // this.patientInfo.getPatient(selectedPatient.id);
      this.router.navigate(['/patient/itr', {id: selectedPatient.id}]);
    }
    this.selectedPatient = null;
    this.loadPatients();
  }

  getPatient(term: string = null): Observable<any> {
    return this.http.get('patient', {params:{'filter[search]':term, per_page: 'all'}})
    .pipe(map((resp:any) => {
      // console.log(resp);
      this.showCreate = resp.data.length == 0 ? true : false;
      console.log(this.showCreate)
      return resp.data;
    }))
  }

  navigateTo(loc){
    this.toggleMenu();
    this.router.navigate(['/'+loc]);
  }

  getInitials(string) {
    return [...string.matchAll(/\b\w/g)].join('')
  }

  logout(){
    this.http.logout().subscribe({
      next: () => {
        this.http.removeLocalStorageItem();
        this.router.navigate(['/']);
      },
      error: err => console.log(err)
    });
  }


  ngOnInit(): void {
    this.loadPatients();
    let val = this.http.getUserFromJSON();

    this.user.last_name = val.last_name;
    this.user.first_name = val.first_name;
    this.user.middle_name = val.middle_name === 'NA' ? '' : val.middle_name;
    this.user.suffix_name = val.suffix_name === 'NA' ? '' : val.suffix_name;
  }

}
