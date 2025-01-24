import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { faArrowLeft, faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    standalone: false
})
export class ResetPasswordComponent implements OnInit {
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  faSpinner = faSpinner;
  faArrowLeft = faArrowLeft;

  is_saving: boolean = false;
  show_pass: boolean = false;
  is_updated: boolean = false;
  attempt_error: boolean = false;

  timeout: number;

  submit_errors: any;

  userForm: FormGroup = new FormGroup({
    email: new FormControl<string| null>(''),
    password: new FormControl<string| null>(''),
    password_confirmation: new FormControl<string| null>(''),
    token: new FormControl<string| null>('')
  });

  onSubmit(){
    console.log(this.userForm);
    this.is_saving = true;
    if(this.userForm.valid){
      this.http.post('reset-password', this.userForm.value).subscribe({
        next: (data: any) => {
          this.is_saving = false;
          this.is_updated = true;
          this.attemptLogin();
        },
        error: err => {
          console.log(err);
          this.submit_errors = err.error.errors;
        }
      })
    } else {
      this.is_saving = false;
    }
  }

  attemptLogin(){
    this.http.login(this.userForm.value).subscribe({
      next: (data: any) => {
        localStorage.setItem('access_token', data.access_token);
        this.http.saveUserToLocalStorage(data.user);

        this.is_saving = false;
        this.router.navigate(['/']);
      },
      error: err => { console.log(err); this.is_saving = false; this.attempt_error = true;},
      complete: () => { }
    });
  }

  backToLogin(){
    this.router.navigate(['/']);
  }

  get passwordMatchError() {
    return ((this.userForm.controls.password.value != this.userForm.controls.password_confirmation.value) && this.userForm.get('password_confirmation')?.dirty);
  }

  constructor(
    private http: HttpService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  ngOnInit(): void {
    let email: string;
    let token: string;

    this.route.queryParamMap.subscribe(queryParams => {
      email = queryParams.get("email");
      token = queryParams.get("token");
    })

    this.userForm = this.formBuilder.nonNullable.group({
      email: [email],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$')]],
      password_confirmation: ['', Validators.required],
      token: [token],
    });
  }
}
