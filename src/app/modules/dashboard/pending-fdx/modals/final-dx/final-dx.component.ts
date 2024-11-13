import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import {faAnglesLeft, faAnglesRight, faCircleXmark, faSearch} from "@fortawesome/free-solid-svg-icons";
import {HttpService} from "../../../../../shared/services/http.service";
import {
  catchError,
  concat,
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap
} from "rxjs";
import { AgeService } from 'app/shared/services/age.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {pendingFdxForm} from "./pending-fdx-form";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-final-dx',
  templateUrl: './final-dx.component.html',
  styleUrls: ['./final-dx.component.scss']
})
export class FinalDxComponent implements OnChanges {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() show_patient_data: any;
  @Input() show_previous_dx: any;
  @Input() pending_fdx: any;
  @Input() consult_id: any;
  @Input() consult_date: any;

  methodForm: FormGroup = new FormGroup({
      id: new FormControl<string| null>(null),
      notes_id: new FormControl<string| null>(null),

      icd10_code: new FormControl<string| null>(null)
    });

  data: any;
  patient_age: any;
  fdx$: Observable<any>;
  searchInput$ = new Subject<string>();
  selectedFdx: any;
  minLengthTerm = 3;
  fdx_remarks: string;
  fdxremarks2: any;
  fdxLoading: boolean = false;
  final_dx: any;
  notes_id: any;
  previous: any;

  closeModal() {
    this.toggleModal.emit();

  }

  constructor (
    private http: HttpService,
    private ageService: AgeService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { }

  getAge(){
    if(this.data && this.data.patient.birthdate){
      let age_value = this.ageService.calcuateAge(this.data.patient.birthdate);
      this.patient_age = age_value;
      return age_value.age;
    }
  }

  show_form: boolean = false;
  icd10: any[] = [];

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

  lodFormLibraries() {
    const getIcd10 = this.http.get('libraries/icd10');

    forkJoin([
      getIcd10,
    ]).subscribe({
      next: (icd10: any) => {
        this.icd10 = icd10.data;
        this.show_form = true;

        this.validateForm();
      },
      error: err => { this.http.showError(err.error.message, 'Icd10 Library'); }
    })
  }


  validateForm() {
    this.methodForm = this.formBuilder.nonNullable.group({
      id: [''],
      notes_id: [this.notes_id, [Validators.required]],
      final_diagnosis: {
        icd10_code: this.selectedFdx
      }, // Initialize as empty FormArray
    });
  }

  onSubmit(){
    console.log(this.fdxremarks2, 'reamrks')
    this.is_saving = true;
    if(this.selectedFdx && Object.keys(this.selectedFdx).length > 0) {
      let fdx = {
        notes_id: this.notes_id,
        final_diagnosis: this.selectedFdx
      };

      this.http.post('consultation/final-diagnosis', fdx).subscribe({
        next: (data: any) => {
          // console.log(data);
          this.saveNotes();
          this.endVisit()
        },
        error: err => console.log(err)
      })
    } else {
      this.saveNotes();
    }
  }

  saveNotes() {
      let notes_remarks = {
        consult_id: this.consult_id,
        fdx_remarks: this.fdxremarks2
      }

      this.http.update('consultation/notes/', this.notes_id, notes_remarks).subscribe({
        next: (data: any) => {/* console.log(data);  */this.showToastr();},
        error: err => console.log(err)
      });
  }

  endVisit() {
    let end_visit = {
      id: this.consult_id,
      consult_date: this.data.consult_date,
      patient_id: this.data.patient_id,
      pt_group: 'cn',
      consult_done: '1'
    }

    this.http.update('consultation/records/', this.consult_id, end_visit).subscribe({
      next: (data: any) => {/* console.log(data);  */this.showToastr();},
      error: err => console.log(err)
    });
  }

  pe_array: any[] = [];
/*  iteratePE() {
    if(this.data.physica_exam) {
      let pe_content: any[] = [];

      Object.entries(this.data.physica_exam).forEach(([key, value]: any => {

      }))
    }

  }*/
  showToastr(){
    this.is_saving = false;
    this.toastr.success('Successfully updated!','Final Diagnosis')
  }

  get finalDiagnosisArray() {
    return this.methodForm.get('final_diagnosis') as FormArray;
  }

  addFinalDiagnosis() {
    this.finalDiagnosisArray.push(this.formBuilder.control('', Validators.required));
  }

  removeFinalDiagnosis(index: number) {
    this.finalDiagnosisArray.removeAt(index);
  }

  is_saving: boolean = false;

  ngOnInit(): void {
    this.data = this.show_patient_data.data[0];
    this.previous = this.show_patient_data.previous_diagnosis;
    this.notes_id = this.data.consult_notes.id;
    this.loadSelected();
    console.log(this.previous, 'previous ito');
    console.log(this.data, 'present ito');
  }

  ngOnChanges(changes){
      this.loadSelected();
  }

  // protected readonly icd10forms = icd10forms;
  protected readonly faAnglesRight = faAnglesRight;
  protected readonly faAnglesLeft = faAnglesLeft;
  protected readonly Number = Number;
  protected readonly faCircleXmark = faCircleXmark;
  protected readonly faSearch = faSearch;
}
