import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft, faSpinner, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  suffix_names: any;

  showModal: boolean = false;
  is_saving: boolean = false;
  loading: boolean = false;
  showPrivacyStatement: boolean = false;
  show_form: boolean = false;

  faSpinner = faSpinner;
  faArrowLeft = faArrowLeft;
  faPenToSquare = faPenToSquare;

  required_message: string = "Required field";
  date;
  submit_errors: any;

  regions: object;
  provinces: object;
  municipalities: object;
  facilities: object;
  designations: object;
  employers: object;

  orig_value: any;

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
    photo_url: new FormControl<string| null>(''),
    facility_code: new FormControl<string| null>(''),
    region: new FormControl<string| null>(''),
    province: new FormControl<string| null>(''),
    municipality: new FormControl<string| null>(''),
    designation_code: new FormControl<string| null>(''),
    employer_code: new FormControl<string| null>(''),
  });

  enbaleEdit(){
    if(this.userForm.disabled){
      this.userForm.enable();
    } else {
      this.userForm.disable();
      this.userForm.patchValue({...this.orig_value});
    }
  }

  onSubmit(){
    this.is_saving = true;
    this.loading = true;

    let user_id = this.http.getUserID();
    if(!this.userForm.invalid){
      this.http.update('users/', user_id, this.userForm.value).subscribe({
        next: (data:any) => {
          console.log(data);
          this.loading = false;
          this.is_saving = false;
          this.loadUser();
          this.showModal = true;
        },
        error: err => {
          this.submit_errors = err.error.errors;
          this.loading = false;
          this.is_saving = false;
        }
      })
    } else {
      this.loading = false;
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  get passwordMatchError() {
    return ((this.userForm.controls.password.value != this.userForm.controls.password_confirmation.value) && this.userForm.get('password_confirmation')?.touched);
  }

  backToLogin(){
    this.showModal = !this.showModal;
    this.userForm.disable();
    this.userForm.markAsPristine();
    this.createForm();
    // window.location.reload();
    // this.router.navigate(['/home']);
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
        next: (data: any) => this[obj.var_name] = data.data,
        error: err => console.log(err)
      })
    });
  }

  loadFacilities(municipality){
    if(municipality !== '0') {
      this.f['facility_code'].enable();
      this.http.get('libraries/facilities', {params:{'filter[municipality_code]':municipality, 'per_page': 'all'}}).subscribe({
        next: (data: any) => {
          this.facilities = data.data;
        },
        error: err => console.log(err)
      })
    } else {
      this.facilities = null;
      this.userForm.patchValue({facility_code: '0'})
      this.f['facility_code'].disable();
    }
  }

  loadDemog(loc, code, include){
    if(code !== '0') {
      this.http.get('libraries/'+loc+'/'+code,{params:{'include':include}}).subscribe({
        next: (data: any) => {
          this[include] = data.data[include];
          this.disaledSelection(loc, code);
        },
        error: err => console.log(err)
      });
    } else {
      this.disaledSelection(loc, code);
    }
  }

  disaledSelection(loc, code) {
    if(loc == 'regions') {
      if(this.orig_value.facility.region.code !== code) this.userForm.patchValue({province: '0'})
      this.municipalities = null;
      this.facilities = null;

      this.f['municipality'].disable();
      this.f['facility_code'].disable();
      if(code === '0') {
        this.f['province'].disable();
      } else {
        if(this.userForm.enabled) this.f['province'].enable();
      }
    } else if (loc == 'provinces') {
      if(this.orig_value.facility.province.code !== code) this.userForm.patchValue({municipality: '0'})
      this.facilities = null;

      this.f['facility_code'].disable();
      if(code === '0') {
        this.f['municipality'].disable();
      } else {
        if(this.userForm.enabled) this.f['municipality'].enable();
      }
    }
  }

  createForm(){
    this.userForm = this.formBuilder.nonNullable.group({
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      middle_name: ['', [Validators.required, Validators.minLength(1)]],
      suffix_name: ['NA'],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      contact_number: ['', Validators.required],
      photo_url: [''],
      facility_code: [''],
      region: ['', Validators.required],
      province: ['', Validators.required],
      municipality: ['', Validators.required],
      designation_code: ['', Validators.required],
      employer_code: ['', Validators.required],
    });
    this.userForm.disable();

    this.loadUser();
  }

  loadUser(){
    let user_id = this.http.getUserID();
    this.http.get('users/'+user_id).subscribe({
      next: (data: any) => {
        this.orig_value = data.data;
        this.orig_value.birthdate = formatDate(this.orig_value.birthdate,'yyyy-MM-dd','en')
        this.userForm.patchValue({...this.orig_value});

        this.loadDemog('regions', this.orig_value.facility.region.code, 'provinces');
        this.userForm.patchValue({region: this.orig_value.facility.region.code});
        this.loadDemog('provinces', this.orig_value.facility.province.code, 'municipalities');
        this.userForm.patchValue({province: this.orig_value.facility.province.code});
        this.loadFacilities(this.orig_value.facility.municipality.code);
        this.userForm.patchValue({municipality: this.orig_value.facility.municipality.code});
        this.userForm.patchValue({facility_code: this.orig_value.facility.code});

        this.userForm.patchValue({designation_code: this.orig_value.designation.code})
        this.userForm.patchValue({employer_code: this.orig_value.employer.code})

        this.orig_value['facility_code'] = this.orig_value.facility?.code;

        this.http.saveUserToLocalStorage(data.data);
        this.http.userToJSON();
      },
      error: err => console.log(err)
    })
  }

  ngOnInit(): void {
    this.loadLibraries();
    this.createForm();
    this.date = new Date().toISOString().slice(0,10);
  }
}
