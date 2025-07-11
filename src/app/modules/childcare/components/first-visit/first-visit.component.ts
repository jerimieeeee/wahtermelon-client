import { Component, OnInit, ViewChild, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { faSearch, faPlus, faCalendar, faInfoCircle, faCircleNotch, faFloppyDisk, faSpinner,} from '@fortawesome/free-solid-svg-icons';
import { faSave, faPenToSquare, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { concat, Observable, of, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';



@Component({
    selector: 'app-first-visit',
    templateUrl: './first-visit.component.html',
    styleUrls: ['./first-visit.component.scss'],
    standalone: false
})


export class FirstVisitComponent implements OnInit, OnChanges {
  @Output() loadCcDetails = new EventEmitter<any>();
  @Input() ccdev_data;
  @Input() patient_details;

  faSave = faSave;
  faSpinner = faSpinner;

  patients$: Observable<any>;
  patientLoading = false;
  searchInput$ = new Subject<string>();
  selectedPatient: any;
  minLengthTerm = 3;

  is_saving: boolean = false;
  is_saving2: boolean = true;

  is_saving3: boolean = false;
  is_saving4: boolean = true;

  form_saving: boolean = false;

  saved: boolean;

  required_message = 'This field is required.';

  patient_info: any;
  patient_info2: any;

  curr_name: any;

  modalFilter: any;

  cpab: any;


  visitForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(''),
    admission_date: new FormControl<string| null>(''),
    discharge_date: new FormControl<string| null>(''),
    birth_weight: new FormControl<string| null>(''),
    mothers_id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    nbs_filter: new FormControl<string| null>(''),
  });

  patient_listing: any;
  hideName: boolean;



  // Section 2
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.visitForm.controls;
  }

  showAlert = false;

  toggleAlertModal(value: any){
    this.modalFilter = value;
    this.showAlert = !this.showAlert;
  }

  onSubmit(){
    this.visitForm.patchValue({
      admission_date: formatDate(this.visitForm.value.admission_date, 'yyyy-MM-dd HH:mm:ss' , 'en', 'Asia/Manila'),
      discharge_date: formatDate(this.visitForm.value.discharge_date, 'yyyy-MM-dd HH:mm:ss' , 'en', 'Asia/Manila')
    });

    this.http.post('child-care/cc-records', this.visitForm.value).subscribe({
      next: (data: any) =>  {
        this.loadCcDetails.emit(this.patient_info);
      },
      error: err => {console.log(err),
        this.is_saving = false;
        this.showToastrErr()},
      complete: () => {
        this.is_saving = false;

        if (this.patient_info) {
          this.showToastrUpd()
        } else {
          this.showToastr()
        }
      }
    })
  }


  validateForm(){
    let user_id = this.http.getUserID();
    this.visitForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      admission_date: ['', [Validators.required]],
      discharge_date: ['', [Validators.required]],
      birth_weight: ['', [Validators.required, Validators.minLength(1)]],
      mothers_id: ['', [Validators.required, Validators.minLength(2)]],
      patient_id: [this.patient_details.id, [Validators.required, Validators.minLength(2)]],
      user_id: [user_id, [Validators.required, Validators.minLength(2)]],
      ccdev_ended: ['0', [Validators.required, Validators.minLength(2)]],
      nbs_filter: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  getInitials(string) {
    return [...string.matchAll(/\b\w/g)].join('')
  }

  getccdevDetails(data) {
    this.patient_info = this.ccdev_data ?? data;
    this.getccdevMama();
    this.visitForm.patchValue({...this.patient_info});
    // console.log(this.patient_info)
    if(this.patient_info && this.patient_info.status == 'CPAB' ) {
      this.cpab = 'Child Protected at Birth'
    }
  }

  getccdevMama() {
    if(this.patient_info && this.patient_info.mothers_id) {
      this.http.get('patient/'+this.patient_info?.mothers_id)
      .subscribe({
        next: (data: any) => {
          this.patient_info2 = data.data;
          // console.log(this.patient_info2, 'info ccdev mama first visit')
        },
        error: err => console.log(err)
      });
    }
  }

  hideItemName(){
    if(this.patient_listing != 0){
      this.hideName = true
    }else{
      this.hideName = false
    }
  }

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
          return this.getPatient(term).pipe(
            catchError(() => of([])),
            tap(() => this.patientLoading = false)
          )
        })
      )
    );
  }

  getPatient(term: string = null): Observable<any> {
    return this.http.get('patient', {params:{'filter[search]':term}})
    .pipe(map((resp:any) => {
      this.patient_listing = resp.data;
      return resp.data;
    }))
  }

  showToastr(){
    this.toastr.success('Successfully saved!','Admission Info');
  }

  showToastrUpd(){
    this.toastr.success('Successfully Updated!','Admission Info');
  }

  showToastrErr(){
    this.toastr.warning('Error in Saving!','Admission Info');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.patient_info = this.ccdev_data;
    this.getccdevDetails(null);
  }

  ngOnInit(): void {
    this.validateForm();

    this.saved = true;
    this.getccdevDetails(null);
    this.loadPatients();
  }
}
