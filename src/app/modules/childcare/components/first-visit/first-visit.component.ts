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
  styleUrls: ['./first-visit.component.scss']
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

  // saveAdmission(){
  //   this.form_saving = true;
  //   this.is_saving = true;
  //   this.is_saving2 = false;
  //   localStorage.setItem('form-data', JSON.stringify(this.visitForm.value));
  //   setTimeout(() => {
  //     this.is_saving = false;
  //     this.is_saving2 = true;
  //   }, 5000);
  // }

  onSubmit(){
    this.visitForm.patchValue({
      admission_date: formatDate(this.visitForm.value.admission_date, 'Y-MM-dd HH:mm:ss' , 'en'),
      discharge_date: formatDate(this.visitForm.value.discharge_date, 'Y-MM-dd HH:mm:ss' , 'en')
    });

    // this.showModal = true;

      this.http.post('child-care/cc-records', this.visitForm.value).subscribe({
        next: (data: any) =>  {
          console.log(data);
          this.loadCcDetails.emit(this.patient_info);
          // this.getccdevDetails(data)
        },
        error: err => {console.log(err),
          this.is_saving = false;
          // this.toggleAlertModal('E')},
          this.showToastrErr()},
        complete: () => {
          this.is_saving = false;
          console.log(this.visitForm.value, 'visit form')

          if (this.patient_info) {
            this.showToastrUpd()
          } else {
            this.showToastr()
          }
          // this.toggleAlertModal('S')
          // this.showToastr()
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

  // getData(){
  //   if(!localStorage.getItem('form-data'))
  //   {
  //     localStorage.setItem('form-data', JSON.stringify([]))
  //   }
  //   const values = JSON.parse(localStorage.getItem("form-data"));
  //   this.visitForm = new FormGroup({
  //     admission_date: new FormControl(values['admission_date']),
  //     discharge_date: new FormControl(values['discharged_date']),
  //     birth_weight: new FormControl(values['weight']),
  //     mothers_id: new FormControl(values['mothers_name'])
  //   });
  //   console.log(values)
  // }

  // onSelect(selectedPatient){
  //   /* this.searchInput$.next(null);
  //   // this.loadPatients(); */
  //   if(selectedPatient) this.router.navigate(['/itr', {id: selectedPatient.id}]);
  //   this.selectedPatient = null;
  //   this.loadPatients();
  // }

  getInitials(string) {
    return [...string.matchAll(/\b\w/g)].join('')
  }

  getccdevDetails(data) {
    this.patient_info = this.ccdev_data ?? data;
    this.getccdevMama();
    this.visitForm.patchValue({...this.patient_info});
    console.log(this.patient_info)
    if(this.patient_info && this.patient_info.status == 'CPAB' ) {
      this.cpab = 'Child Protected at Birth'
    }
    // this.loadCcDetails.emit(this.patient_info);
    /* let params = {
      patient_id: this.ccdev_data.patient_id
    }

    this.http.get('child-care/cc-records',{params}).subscribe({
      next: (data: any) => {
        if(data.data.length > 0) {
          this.patient_info = data.data[0];
          console.log(this.patient_info, 'info ccdev first visit')
          this.getccdevMama()
          this.visitForm.patchValue({...this.patient_info});
          this.checkCCdevDetails.emit(this.patient_info);
          if(this.patient_info.status == 'CPAB' ) {
            this.cpab = 'Child Protected at Birth'
          }
        }
      },
      error: err => console.log(err)
    }); */
  }

  getccdevMama() {
    if(this.patient_info && this.patient_info.mothers_id) {
      this.http.get('patient/'+this.patient_info?.mothers_id)
      .subscribe({
        next: (data: any) => {
          this.patient_info2 = data.data;
          console.log(this.patient_info2, 'info ccdev mama first visit')
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
    console.log('change')
    this.patient_info = this.ccdev_data;
    this.getccdevDetails(null);
  }

  ngOnInit(): void {
    console.log('on init')
    this.validateForm();
    // this.getData();
    console.log(this.ccdev_data)
    this.saved = true;
    this.getccdevDetails(null);
    this.loadPatients();
  }
}
