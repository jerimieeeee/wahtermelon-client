import { Component, OnInit } from '@angular/core';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { faChevronCircleDown, faChevronCircleUp, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { catchError, concat, debounceTime, distinctUntilChanged, filter, map, Observable, of, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-initial-dx',
  templateUrl: './initial-dx.component.html',
  styleUrls: ['./initial-dx.component.scss']
})
export class InitialDxComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  faFloppyDisk = faFloppyDisk;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;

  idxLoading: boolean = false;
  show_content: boolean = true;

  idx$: Observable<any>;
  searchInput$ = new Subject<string>();
  selectedIdx: any;
  minLengthTerm = 3;
  user_last_name: string;
  user_first_name: string;
  user_middle_name: string;

  onSubmit(){

  }

  loadIdx() {
    this.idx$ = concat(
      of([]), // default items
      this.searchInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.idxLoading = true),
        switchMap(term => {
          return this.getIdx(term).pipe(
            catchError(() => of([])),
            tap(() => this.idxLoading = false)
          )
        })
      )
    );
  }

  getIdx(term: string = null): Observable<any> {
    return this.http.get('libraries/diagnosis', {params:{'filter[search]':term}})
    .pipe(map((resp:any) => {
      // console.log(resp);
      /* this.showCreate = resp.data.length == 0 ? true : false;
      console.log(this.showCreate) */
      return resp.data;
    }))
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.loadIdx();
  }
}
