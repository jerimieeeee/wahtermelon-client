import { Component, OnInit, ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { faSearch, faPlus, faCalendar, faInfoCircle, faCircleNotch, faFloppyDisk,} from '@fortawesome/free-solid-svg-icons';
import { faSave, faPenToSquare, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { concat, Observable, of, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-first-visit',
  templateUrl: './first-visit.component.html',
  styleUrls: ['./first-visit.component.scss']
})


export class FirstVisitComponent implements OnInit {

  faSearch = faSearch;
  faPlus = faPlus;
  faCalendar = faCalendar;
  faInfoCircle = faInfoCircle;
  faSpinner = faCircleNotch;
  faFloppyDisk = faFloppyDisk;
  faSave = faSave;

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


  visitForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(''),
    admission_date: new FormControl<string| null>(''),
    discharge_date: new FormControl<string| null>(''),
    birth_weight: new FormControl<string| null>(''),
    mothers_id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    nbs_filter: new FormControl<string| null>(''),
  });

  @Input() patient_details: any;
  patient_listing: any;
  hideName: boolean;



  // Section 2
  constructor(private formBuilder: FormBuilder, private http: HttpService,
    private router: Router) { }



  get f(): { [key: string]: AbstractControl } {
    return this.visitForm.controls;
  }

  showAdmissionModal = false;

  toggleAdmissionModal(){
    this.showAdmissionModal = !this.showAdmissionModal;
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

    console.log(this.visitForm.value);
    console.log(this.visitForm.invalid);
    this.form_saving = true;
    this.is_saving = true;

    // this.showModal = true;

      this.http.post('child-care/cc-records', this.visitForm.value).subscribe({
        next: (data: any) =>  this.getccdevDetails(),
        error: err => {console.log(err),
          this.is_saving = false;
          alert('Update patient details or input the required fields')},
        complete: () => {
          this.is_saving = false;
          console.log(this.visitForm.value, 'visit form')

      alert('saving success!')
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

  getPatient(term: string = null): Observable<any> {
    return this.http.get('patient', {params:{'filter[search]':term}})
    .pipe(map((resp:any) => {
      this.patient_listing = resp.data;
      return resp.data;
    }))
  }

  getccdevDetails() {
    this.http.get('child-care/cc-records/'+this.patient_details.id)
    .subscribe({
      next: (data: any) => {
        this.patient_info = data.data;
        console.log(this.patient_info, 'info ccdev first visit')
        this.getccdevMama()
        this.visitForm.patchValue({...this.patient_info});
      },
      error: err => console.log(err)
    });
  }

  getccdevMama() {
    this.http.get('patient/'+this.patient_info?.mothers_id)
    .subscribe({
      next: (data: any) => {
        this.patient_info2 = data.data;
        console.log(this.patient_info2, 'info ccdev mama first visit')
      },
      error: err => console.log(err)
    });
  }

  hideItemName(){
    if(this.patient_listing != 0){
      this.hideName = true
      console.log('name hidden')
    }else{
      this.hideName = false
      console.log('name is visible')
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

  // saveBirth(){
  //   console.log(this.visitForm);
  //   this.is_saving3 = true;
  //   this.is_saving4 = false;
  //   setTimeout(() => {
  //     this.is_saving3 = false;
  //     this.is_saving4 = true;
  //   }, 5000);
  // }



  ngOnInit(): void {
    this.validateForm();
    // this.getData();
    this.saved = true;
    this.loadPatients();
    this.getccdevDetails();

  }

}
