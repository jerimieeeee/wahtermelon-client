import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, concat, debounceTime, distinctUntilChanged, filter, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { faPlusSquare, faSave } from '@fortawesome/free-regular-svg-icons';
import { faChevronCircleDown, faChevronCircleUp, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-final-dx',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, NgSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './final-dx.component.html',
  styleUrls: ['./final-dx.component.scss']
})
export class FinalDxComponent implements OnChanges {
  @Output() loadConsult = new EventEmitter<any>();
  @Input() toggle_content;
  @Input() consult_details;
  @Input() allowed_to_edit;

  faPlusSquare = faPlusSquare;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown =  faChevronCircleDown;
  faSave = faSave;
  faSpinner = faSpinner;

  fdxLoading: boolean = false;
  show_content: boolean = true;
  is_saving: boolean = false;
  consult_done: boolean = false;

  fdx$: Observable<any>;
  searchInput$ = new Subject<string>();
  selectedFdx: any;
  minLengthTerm = 3;
  fdx_remarks: string;

  final_dx: any;

  onSubmit(){
    this.is_saving = true;
    let fdx = {
      notes_id: this.consult_details.consult_notes.id,
      final_diagnosis: this.selectedFdx
    };

    this.http.post('consultation/final-diagnosis', fdx).subscribe({
      next: (data: any) => {
        this.saveNotes();
      },
      error: err => console.log(err)
    })
  }

  saveNotes() {
    if(this.fdx_remarks) {
      let notes_remarks = {
        consult_id: this.consult_details.id,
        patient_id: this.consult_details.patient.id,
        fdx_remarks: this.fdx_remarks
      }

      this.http.update('consultation/notes/', this.consult_details.consult_notes.id, notes_remarks).subscribe({
        next: () => { this.showToastr(); this.loadConsult.emit(); },
        error: err => console.log(err)
      });
    } else {
      this.showToastr();
    }
  }

  showToastr(){
    this.is_saving = false;
    this.toastr.success('Successfully updated!','Final Diagnosis')
  }

  loadFdx(val) {
    this.fdx$ = concat(
      of(val),
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

  loadSelected(){
    let selected_fdx = [];
    let temp_fdx = [];

    if(this.final_dx && Object.keys(this.final_dx).length > 0){
      Object.entries(this.final_dx).forEach(([key, value], index) => {
        let val: any = value;
        selected_fdx.push(val.icd10_code.toString());
        temp_fdx.push(val.lib_icd10);
      });

      this.loadFdx(temp_fdx);
      this.selectedFdx = selected_fdx;
    } else {
      this.loadFdx([]);
    };
  }

  ngOnChanges(changes){
    this.show_content = this.toggle_content;
    if(this.consult_details && this.consult_details.consult_notes) {
      this.final_dx = this.consult_details.consult_notes.finaldx;
      this.fdx_remarks = this.consult_details.consult_notes.fdx_remarks;
      this.consult_done = this.consult_details.consult_done;
      this.loadSelected();
    } else {
      this.loadFdx([]);
    }
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }
}
