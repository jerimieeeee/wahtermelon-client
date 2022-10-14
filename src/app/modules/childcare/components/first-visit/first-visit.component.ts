import { Component, OnInit, ViewChild } from '@angular/core';
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


  visitForm: FormGroup = new FormGroup({
    admission_date: new FormControl<string| null>(''),
    discharged_date: new FormControl<string| null>(''),
    weight: new FormControl<string| null>(''),
    mothers_name: new FormControl<string| null>(''),
  });


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

  saveAdmission(){
    this.form_saving = true;
    this.is_saving = true;
    this.is_saving2 = false;
    localStorage.setItem('form-data', JSON.stringify(this.visitForm.value));
    setTimeout(() => {
      this.is_saving = false;
      this.is_saving2 = true;
    }, 5000);
  }

  validateForm(){
    this.visitForm = this.formBuilder.group({
      admission_date: ['', [Validators.required]],
      discharged_date: ['', [Validators.required]],
      weight: ['', [Validators.required, Validators.minLength(1)]],
      mothers_name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  getData(){
    const values = JSON.parse(localStorage.getItem("form-data"));
    this.visitForm = new FormGroup({
      admission_date: new FormControl(values['admission_date']),
      discharged_date: new FormControl(values['discharged_date']),
      weight: new FormControl(values['weight']),
      mothers_name: new FormControl(values['mothers_name'])
    });
    console.log(values)
  }

  // onSelect(selectedPatient){
  //   /* this.searchInput$.next(null);
  //   // this.loadPatients(); */
  //   if(selectedPatient) this.router.navigate(['/itr', {id: selectedPatient.id}]);
  //   this.selectedPatient = null;
  //   this.loadPatients();
  // }

  getPatient(term: string = null): Observable<any> {
    return this.http.get('patient', {params:{'filter[search]':term}})
    .pipe(map((resp:any) => {
      console.log(resp.data);
      return resp.data;
    }))
  }
  
  changeFn(val) {
    console.log(val);
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
    this.getData();
    this.saved = true;
    this.loadPatients();
   
  }

}
