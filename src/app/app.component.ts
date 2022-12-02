import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { faChevronCircleDown, faBell, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from './shared/services/http.service';
import { Location } from '@angular/common';
import { filter, tap } from 'rxjs/operators';
import { openCloseTrigger } from './modules/patient-registration/declarations/animation';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [openCloseTrigger]
})
export class AppComponent implements OnInit{
  title = 'wahtermelon-client';
  faChevronCircleDown = faChevronCircleDown;
  faBell = faBell;
  faSearch = faSearch;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faSpinner = faSpinner;

  isAuthenticated: boolean = false;
  showLogin: boolean = true;
  is_saving: boolean = false;
  auth_error: boolean = false;
  showPrivacyStatement: boolean = false;
  show_pass: boolean = false;

  auth_error_message: string;
  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private auth: AuthService
  ) {

  }

 /*  showPass(){
    this.show_pass = !this
  } */

  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string| null>(''),
    password: new FormControl<string| null>(''),
  });

  onSubmit(){
    this.is_saving = true;
    this.auth_error = false;
    if(this.loginForm.valid){
      this.http.login(this.loginForm.value).subscribe({
        next: (data: any) => {
          localStorage.setItem('access_token', data.access_token);
          this.http.saveUserToLocalStorage(data.user);

          this.is_saving = false;
          this.router.navigate(['/']);
          this.checkAuth();
        },
        error: err => { console.log(err); this.auth_error = true; this.is_saving = false; this.auth_error_message = err.error.message },
        complete: () => { }
      });
    }
  }

  decode(access_token){
    const base64Url = access_token.split('.')[1];
    if (base64Url === null || base64Url === undefined) {
      return null;
    }
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    console.log(JSON.parse(window.atob(base64)));
  }

  verify_url: {};
  reset_url: {};

  checkAuth(){
    const url = this.location.path();

    if(localStorage.getItem('access_token')){
      this.isAuthenticated = true;
    } else {
      this.verify_url = this.location.path().split(';');
      this.isAuthenticated = false;
    }

    if(this.isAuthenticated == false) {
      console.log(this.verify_url)
      if(url == '/user-registration' || url == '/forgot-password'){
        this.showLogin = false;
      } else if (this.verify_url[0] == '/verify') {
        this.showLogin = true;
        this.activateUser(this.verify_url[1].slice(3));
      } else {
        this.reset_url = this.location.path().split('?');
        if(this.reset_url[0] == '/reset-password'){
          this.showLogin = false;
        } else {
          this.showLogin = true;
          this.router.navigate(['/']);
        }
      }
    }

    if(this.isAuthenticated == true) {
      this.showLogin = false;
      if(url == '/login' || url == '/' || url == ''){
        this.router.navigate(['/home']);
      }
    }
  }

  show_activated: boolean = false;

  activateUser(params){
    console.log(params)
    this.http.get('email/verify/'+params).subscribe({
      next: (data:any) => {
        this.show_activated = true;
        console.log(data)
      },
      error: err => console.log(err)
    })
  }

  navigationEnd$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    tap(() => {
      this.checkAuth();
    })
  );

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.checkAuth();
    this.navigationEnd$.subscribe();

    this.loginForm = this.formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.minLength(2), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
}
function swithMap(arg0: () => any): import("rxjs").OperatorFunction<Object, unknown> {
  throw new Error('Function not implemented.');
}

