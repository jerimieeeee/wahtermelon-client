import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { faChevronCircleDown, faChevronCircleUp, faPlusSquare, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { catchError, concat, debounceTime, distinctUntilChanged, filter, map, Observable, of, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-initial-dx',
  templateUrl: './initial-dx.component.html',
  styleUrls: ['./initial-dx.component.scss']
})
export class InitialDxComponent implements OnChanges, OnDestroy {
  @Input() toggle_content;
  @Input() consult_details;

  faPlusSquare = faPlusSquare;
  faSave = faSave;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;
  faSpinner = faSpinner;

  toastr_message: string = null;
  toastr_type: string = null;

  idxLoading: boolean = false;
  show_content: boolean = true;
  is_saving: boolean = false;

  idx$: Observable<any>;
  searchInput$ = new Subject<string>();
  selectedIdx: any;
  minLengthTerm = 3;

  idx_remarks: string;
  initial_dx: any;

  onSubmit(){
    this.is_saving = true;

    if(Object.keys(this.selectedIdx).length > 0) {
      let idx = {
        notes_id: this.consult_details.consult_notes.id,
        initial_diagnosis: this.selectedIdx
      };

      this.http.post('consultation/initial-diagnosis', idx).subscribe({
        next: (data: any) => {
          console.log(data);
          this.saveNotes();
        },
        error: err => console.log(err)
      })
    } else {
      this.saveNotes();
    }
  }


  saveNotes() {
    if(this.idx_remarks) {
      let notes_remarks = {
        consult_id: this.consult_details.id,
        patient_id: this.consult_details.patient.id,
        idx_remarks: this.idx_remarks
      }

      this.http.update('consultation/notes/', this.consult_details.consult_notes.id, notes_remarks).subscribe({
        next: (data: any) => {
          console.log(data);
          this.showToastr();
          this.is_saving = false;
        },
        error: err => console.log(err)
      })
    } else {
      this.is_saving = false;
    }
  }

  toastr = { type: null, message: null }
  show_toast: boolean = false;
  show_timer;
  showToastr(){
    this.toastr = this.http.toastr('success', 'Initial diagnosis was successfully updated!');
    this.show_toast = true;
    this.show_timer = setTimeout(() => {
      this.show_toast = false;
    }, 5000);
  }

  loadIdx(val) {
    this.idx$ = concat(
      of(val), // default items
      this.searchInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(400),
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

  loadSelected(){
    let selected_idx = [];
    let temp_idx = [];

    if(this.initial_dx && Object.keys(this.initial_dx).length > 0){
      Object.entries(this.initial_dx).forEach(([key, value], index) => {
        let val: any = value;
        selected_idx.push(val.class_id.toString());
        temp_idx.push(val.diagnosis);
      });

      this.loadIdx(temp_idx);
      this.selectedIdx = selected_idx;
    } else {
      this.loadIdx([]);
    };
  }

  ngOnChanges(changes){
    this.show_content = this.toggle_content;
    if(this.consult_details) {
      this.initial_dx = this.consult_details.consult_notes.initialdx;
      this.idx_remarks = this.consult_details.consult_notes.idx_remarks;
      this.loadSelected();
    }
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnDestroy(): void {
    clearTimeout(this.show_timer);
  }
}
