import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { faChevronCircleDown, faChevronCircleUp, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { catchError, concat, debounceTime, distinctUntilChanged, filter, map, Observable, of, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-initial-dx',
  templateUrl: './initial-dx.component.html',
  styleUrls: ['./initial-dx.component.scss']
})
export class InitialDxComponent implements OnInit, OnChanges {
  @Input() toggle_content;
  @Input() consult_details;

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

  idx_remarks: string;

  onSubmit(){
    console.log(this.selectedIdx);
    let idx = {
      notes_id: this.consult_details.consult_notes.id,
      idx: this.selectedIdx
    };

    this.http.post('consultation/cn-idx', idx).subscribe({
      next: (data: any) => {
        console.log(data);
        this.saveNotes
      },
      error: err => console.log(err)
    })
  }

  saveNotes() {
    let notes_remarks = {
      consult_id: this.consult_details.id,
      patient_id: this.consult_details.patient.id,
      idx_remarks: this.idx_remarks
    }

    console.log(notes_remarks);
    this.http.update('consultation/cn-notes/', this.consult_details.consult_notes.id, notes_remarks).subscribe({
      next: (data: any) => {console.log(data); },
      error: err => console.log(err)
    })
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
      console.log(resp.data)
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
    this.loadIdx();
  }
}
