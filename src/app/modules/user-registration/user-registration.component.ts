import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { openCloseTrigger } from '../patient-registration/declarations/animation';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
  animations: [openCloseTrigger]
})

export class UserRegistrationComponent implements OnInit {
  suffix_names: any;

  showModal: boolean = false;
  is_saving: boolean = false;
  loading: boolean = false;
  showPrivacyStatement: boolean = false;

  faSpinner = faSpinner;
  faArrowLeft = faArrowLeft;
  required_message: string = "Required field";
  date;
  submit_errors: any;

  regions: object;
  provinces: object;
  municipalities: object;
  facilities: object;
  designations: object;
  employers: object;

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  userForm: FormGroup = new FormGroup({
    last_name: new FormControl<string| null>(''),
    first_name: new FormControl<string| null>(''),
    middle_name: new FormControl<string| null>(''),
    suffix_name: new FormControl<string| null>(''),
    birthdate: new FormControl<string| null>(''),
    gender: new FormControl<string| null>(''),
    contact_number: new FormControl<number| null>(null),
    email: new FormControl<string| null>(''),
    is_active: new FormControl<number| null>(null),
    photo_url: new FormControl<string| null>(''),
    password: new FormControl<string| null>(''),
    password_confirmation: new FormControl<string| null>(''),
    privacy: new FormControl<boolean| null>(false),
    facility_code: new FormControl<string| null>(''),
    region: new FormControl<string| null>(''),
    province: new FormControl<string| null>(''),
    municipality: new FormControl<string| null>(''),
    designation_code: new FormControl<string| null>(''),
    employer_code: new FormControl<string| null>(''),
  });

  onSubmit(){
    this.is_saving = true;
    this.loading = true;

    // console.log(this.userForm)
    if(!this.userForm.invalid){
      this.http.post('register', this.userForm.value).subscribe({
        next: (data:any) => {
          console.log(data);
          this.loading = false;
          this.is_saving = false;
          this.showModal = true;
        },
        error: err => {
          this.submit_errors = err.error.errors;
          this.loading = false;
          this.is_saving = false;
        },
        complete: () => console.log('complete')
      })
    } else {
      this.loading = false;
    }
  }

  loadDemog(loc, code, include){
    if(loc == 'regions') {
      this.municipalities = null;
      this.facilities = null;
    }else if (loc == 'provinces') {
      this.facilities = null;
    }

    this.http.get('libraries/'+loc+'/'+code,{params:{'include':include}}).subscribe({
      next: (data: any) => {console.log(data.data); this[include] = data.data[include]},
      error: err => console.log(err)
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  get passwordMatchError() {
    return ((this.userForm.controls.password.value != this.userForm.controls.password_confirmation.value) && this.userForm.get('password_confirmation')?.touched);
  }

  backToLogin(){
    this.router.navigate(['/']);
  }

  libraries = [
    {var_name: 'suffix_names', location: 'suffix-names'},
    {var_name: 'regions', location: 'regions'},
    {var_name: 'designations', location: 'designations'},
    {var_name: 'employers', location: 'employers'},
  ]

  loadLibraries(){
    this.libraries.forEach(obj => {
      this.http.get('libraries/'+obj.location).subscribe({
        next: (data: any) => {this[obj.var_name] = data.data; console.log(obj.var_name, data.data)},
        error: err => console.log(err)
      })
    });
  }

  loadFacilities(municipality){
    console.log(municipality);
    this.http.get('libraries/facilities', {params:{'filter[municipality_code]':municipality, 'per_page': 'all'}}).subscribe({
      next: (data: any) => {
        console.log(data)
        this.facilities = data.data;
      },
      error: err => console.log(err)
    })
  }

  showPrivacyModal(){

  }

  ngOnInit(): void {
    this.loadLibraries();

    this.userForm = this.formBuilder.nonNullable.group({
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      middle_name: ['', [Validators.required, Validators.minLength(1)]],
      suffix_name: ['NA'],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      contact_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      is_active: [0],
      photo_url: [''],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$')]],
      password_confirmation: ['', Validators.required],
      privacy: [false, Validators.requiredTrue],
      facility_code: [''],
      region: ['', Validators.required],
      province: ['', Validators.required],
      municipality: ['', Validators.required],
      designation_code: ['', Validators.required],
      employer_code: ['', Validators.required],
    });

    this.date = new Date().toISOString().slice(0,10);
  }

}
