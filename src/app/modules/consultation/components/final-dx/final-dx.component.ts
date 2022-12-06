import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { faFloppyDisk, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { catchError, concat, debounceTime, distinctUntilChanged, filter, map, Observable, of, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-final-dx',
  templateUrl: './final-dx.component.html',
  styleUrls: ['./final-dx.component.scss']
})
export class FinalDxComponent implements OnInit, OnChanges {
  @Input() toggle_content;

  faPlusSquare = faPlusSquare;
  faFloppyDisk = faFloppyDisk;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown =  faChevronCircleDown;

  fdxLoading: boolean = false;
  show_content: boolean = true;

  fdx$: Observable<any>;
  searchInput$ = new Subject<string>();
  selectedFdx: any;
  minLengthTerm = 3;
  user_last_name: string;
  user_first_name: string;
  user_middle_name: string;

  onSubmit(){

  }

  loadFdx() {
    this.fdx$ = concat(
      of([]),
      this.searchInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.fdxLoading = true),
        switchMap(term => {
          return this.getFdx(term).pipe(
            catchError(() => of([])),
            tap(() => this.fdxLoading = false)
          )
        })
      )
    );
  }

  getFdx(term: string = null): Observable<any> {
    return this.http.get('libraries/icd10', {params:{'filter[search]':term}})
    .pipe(map((resp:any) => {
      return resp.data;
    }))
  }

  ngOnChanges(changes){
    this.show_content = this.toggle_content;
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.loadFdx();
  }
}
