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
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  @Input() pending_fdx: any;
  @Input() consult_id: any;
  @Input() consult_date: any;

  icd10forms:FormGroup=pendingFdxForm();

  data: any;
  patient_age: any;
  fdx$: Observable<any>;
  searchInput$ = new Subject<string>();
  selectedFdx: any;
  minLengthTerm = 3;
  fdx_remarks: string;
  fdxLoading: boolean = false;
  final_dx: any;

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
    if(this.data && this.data[0].birthdate){
      let age_value = this.ageService.calcuateAge(this.data[0].birthdate);
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

/*  lodFormLibraries() {
    const getIcd10 = this.http.get('libraries/icd10');

    forkJoin([
      getIcd10,
    ]).subscribe({
      next: (icd10: any) => {
        this.icd10 = icd10.data;
        this.show_form = true;

        this.createForm();
      },
      error: err => { this.http.showError(err.error.message, 'Icd10 Library'); }
    })
  }*/

/*  createForm() {
    this.icd10forms = this.formBuilder.nonNullable.group({
      id: [''],
      notes_id: [this.pending_fdx.notes_id, [Validators.required]],
      final_diagnosis: this.formBuilder.array([]), // Initialize as empty FormArray
    });
  }*/

/*  get finalDiagnosisArray() {
    return this.icd10forms.get('final_diagnosis') as FormArray;
  }

  addFinalDiagnosis() {
    this.finalDiagnosisArray.push(this.formBuilder.control('', Validators.required));
  }

  removeFinalDiagnosis(index: number) {
    this.finalDiagnosisArray.removeAt(index);
  }*/

  is_saving: boolean = false;
  onSubmit() {


/*    const formData = this.icd10forms.value;

    console.log(this.icd10forms, 'eto');
    console.log(this.icd10forms.value, 'hahah');
    this.is_saving = true;

    if(this.icd10forms.valid){
      this.http.post('non-communicable-disease/risk-casdt2', this.icd10forms.value).subscribe({
        next: (data: any) => {
          this.toastr.success('Recorded successfully!','Casdt2');
          this.is_saving = false;
        },
        error: err => { this.http.showError(err.error.message, 'Casdt2'); }
      })
    }*/
  }

  ngOnInit(): void {
    // this.getData();
    this.data = this.show_patient_data.data;
    // this.lodFormLibraries();
    // this.loadSelected();
    console.log(this.data, 'amen5u');
  }

  ngOnChanges(changes){
      this.loadSelected();
      console.log( this.selectedFdx);
  }

  // protected readonly icd10forms = icd10forms;
  protected readonly faAnglesRight = faAnglesRight;
  protected readonly faAnglesLeft = faAnglesLeft;
  protected readonly Number = Number;
  protected readonly faCircleXmark = faCircleXmark;
  protected readonly faSearch = faSearch;
}
