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

  faSpinner = faSpinner;
  faArrowLeft = faArrowLeft;
  faPenToSquare = faPenToSquare;

  required_message: string = "Required field";
  date;
  submit_errors: any;

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
    photo_url: new FormControl<string| null>('')
  });

  enbaleEdit(){
    if(this.userForm.disabled){
      this.userForm.enable();
    } else {
      this.userForm.disable();
      this.userForm.patchValue({...this.orig_value});
    }

    console.log(this.userForm);
  }

  onSubmit(){
    this.is_saving = true;
    this.loading = true;

    console.log(this.userForm)
    let user_id = localStorage.getItem('user_id');
    if(!this.userForm.invalid){
      this.http.update('users/', user_id, this.userForm.value).subscribe({
        next: (data:any) => {
          console.log(data.data);

          this.loadUser();
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
    window.location.reload();
    // this.router.navigate(['/home']);
  }

  loadLibraries(){
    this.http.get('libraries/suffix-names').subscribe({
      next: (data: any) => {this.suffix_names = data.data},
      error: err => console.log(err)
    });
  }

  orig_value: any;

  loadUser(){
    this.http.get('users/'+localStorage.getItem('user_id')).subscribe({
      next: (data: any) => {
        console.log(data)
        this.orig_value = data.data;
        this.orig_value.birthdate = formatDate(this.orig_value.birthdate,'Y-MM-dd','en')
        this.userForm.patchValue({...this.orig_value});

        localStorage.setItem('user_last_name', this.orig_value.last_name);
        localStorage.setItem('user_first_name', this.orig_value.first_name);
        localStorage.setItem('user_middle_name', this.orig_value.middle_name);

        // this.orig_value = this.userForm.value;
        this.userForm.disable();
      },
      error: err => console.log(err)
    })
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
      photo_url: ['']
    });

    this.loadUser();
    this.date = new Date().toISOString().slice(0,10);
  }
}
