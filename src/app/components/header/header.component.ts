import { Component, OnInit } from '@angular/core';
import { faChevronCircleDown, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { catchError, concat, debounceTime, distinctUntilChanged, filter, Observable, of, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faChevronCircleDown = faChevronCircleDown;
  faBell = faBell;
  faSearch = faSearch;

  selectedPatient: any;
  searchInput$ = new Subject<string>();

  patients$: Observable<any>;
  moviesLoading = false;
  minLengthTerm = 3;
  patient_list = [
    {
        id: 1,
        last_name: 'Santos',
        first_name: 'Mark Christian',
        birthdate: '07/23/1989',
        brgy: 'San Rafael',
        muncity: 'Tarlac'
    },
    {
      id: 2,
      last_name: 'Garcia',
      first_name: 'Ian',
      birthdate: '07/23/1989',
      brgy: 'San Rafael',
      muncity: 'Tarlac'
    },
    {
      id: 3,
      last_name: 'Mercado',
      first_name: 'Gio',
      birthdate: '07/23/1989',
      brgy: 'San Rafael',
      muncity: 'Tarlac'
    },
    {
      id: 4,
      last_name: 'Perez',
      first_name: 'Emmanuel',
      birthdate: '07/23/1989',
      brgy: 'San Rafael',
      muncity: 'Tarlac'
    },
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
        tap(() => this.moviesLoading = true),
        switchMap(term => {
          return this.patients$ = this.getPatient(term).pipe(
            catchError(() => of([])),
            tap(() =>  this.moviesLoading = false)
          );
        })
      )
    );
  }

  onSelect(selectedPatient){
    console.log(selectedPatient);
    this.selectedPatient = '';
  }

  getPatient(term: string = null) {
    console.log(term)
    return of(this.patient_list);
  }

  constructor() { }

  ngOnInit(): void {
    this.loadPatients();
  }

}
