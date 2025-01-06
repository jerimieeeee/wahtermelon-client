import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faAnglesLeft, faAnglesRight, faCircleXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import { HttpService} from "../../../../../shared/services/http.service";
import { catchError, concat, debounceTime, distinctUntilChanged, filter, forkJoin, map, Observable, of, Subject, switchMap, tap } from "rxjs";
import { AgeService } from 'app/shared/services/age.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-final-dx',
    templateUrl: './final-dx.component.html',
    styleUrls: ['./final-dx.component.scss'],
    standalone: false
})
export class FinalDxComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() show_patient_data: any;
  @Input() show_previous_dx: any;
  @Input() pending_fdx: any;
  @Input() consult_id: any;
  @Input() consult_date: any;

  faAnglesRight = faAnglesRight;
  faAnglesLeft = faAnglesLeft;
  faCircleXmark = faCircleXmark;
  faSearch = faSearch;

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
      next: () => {
        this.endVisit();
        this.showToastr();
      },
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
      next: () => this.showToastr(),
      error: err => console.log(err)
    });
  }

  showToastr(){
    this.is_saving = false;
    this.toastr.success('Successfully updated!','Final Diagnosis')
  }

  is_saving: boolean = false;
  pe_array!: any[];
  peCatArray: any = [
    {category_id: 'ABDOMEN',        remarks_var: 'abdomen_remarks' },
    {category_id: 'BARTHOLINS',     remarks_var: 'bartholins_remarks' },
    {category_id: 'BREAST',         remarks_var: 'breast_remarks' },
    {category_id: 'CHEST',          remarks_var: 'chest_remarks' },
    {category_id: 'CONJUNCTIVA',    remarks_var: 'conjunctiva_remarks' },
    {category_id: 'EXTREMITIES',    remarks_var: 'extremities_remarks' },
    {category_id: 'GENITOURINARY',  remarks_var: 'genitourinary_remarks' },
    {category_id: 'HEART',          remarks_var: 'heart_remarks' },
    {category_id: 'HEENT',          remarks_var: 'heent_remarks' },
    {category_id: 'NECK',           remarks_var: 'neck_remarks' },
    {category_id: 'NEURO',          remarks_var: 'neuro_remarks' },
    {category_id: 'PELVIC',         remarks_var: 'pelvic_remarks' },
    {category_id: 'RECTAL',         remarks_var: 'rectal_remarks' },
    {category_id: 'SKIN',           remarks_var: 'skin_remarks' },
    {category_id: 'SPECULUM',       remarks_var: 'speculum_remarks' },
    {category_id: 'THORAX',         remarks_var: 'thorax_remarks' },
  ];

  iteratePE() {
    this.pe_array = [];
    if (this.data.consult_notes.physical_exam) {
      Object.entries(this.data.consult_notes.physical_exam).forEach(([key, value]: any) => {
        if(this.pe_array[value.lib_physical_exam.category_id]) {
          this.pe_array[value.lib_physical_exam.category_id].push(value.lib_physical_exam.pe_desc);
        } else {
          this.pe_array[value.lib_physical_exam.category_id] = [value.lib_physical_exam.pe_desc]
        }
      });
    }

    console.log(this.pe_array);
  }

  ngOnInit(): void {
    this.data = this.show_patient_data.data[0];
    this.previous = this.show_patient_data.previous_diagnosis;
    this.notes_id = this.data.consult_notes.id;
    // this.loadSelected();
    this.loadFdx([]);
    this.iteratePE();
    console.log(this.previous, 'previous ito');
    console.log(this.data, 'present ito');
  }
}
