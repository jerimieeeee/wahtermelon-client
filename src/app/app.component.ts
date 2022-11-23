import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { faChevronCircleDown, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from './shared/services/http.service';
import { Location } from '@angular/common';
import { filter, tap } from 'rxjs/operators';
import { openCloseTrigger } from './modules/patient-registration/declarations/animation';

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

  isAuthenticated: boolean = false;
  showLogin: boolean = true;
  is_saving: boolean = false;
  auth_error: boolean = false;
  showPrivacyStatement: boolean = false;

  auth_error_message: string;
  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location
  ) {

  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string| null>(''),
    password: new FormControl<string| null>(''),
  });

  onSubmit(){
    this.is_saving = true;
    this.auth_error = false;
    if(!this.loginForm.invalid){
      this.http.post('login', this.loginForm.value).subscribe({
        next: (data: any) => {
          // this.decode(data.access_token);
          // console.log(data.user);
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('user_last_name', data.user.last_name);
          localStorage.setItem('user_first_name', data.user.first_name);
          localStorage.setItem('user_middle_name', data.user.middle_name);
          localStorage.setItem('user_id', data.user.id);
          localStorage.setItem('facility_code', data.user.facility.code);
          this.is_saving = false;
          this.checkAuth();
        },
        error: err => { console.log(err); this.auth_error = true; this.auth_error_message = err.error.message },
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

  checkAuth(){
    const url = this.location.path();
    if(localStorage.getItem('access_token')){
      this.isAuthenticated = true;
      this.http.get('users/'+localStorage.getItem('user_id')).subscribe({
        next: (data: any) => {
          console.log(data.data);
          // localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('user_last_name', data.data.last_name);
          localStorage.setItem('user_first_name', data.data.first_name);
          localStorage.setItem('user_middle_name', data.data.middle_name);
          localStorage.setItem('user_id', data.data.id);
          localStorage.setItem('facility_code', data.data.facility.code);
        },
        error: err => console.log(err)
      })
    } else {
      this.isAuthenticated = false;
    }

    if(this.isAuthenticated == false) {
      if(url == '/user-registration'){
        this.showLogin = false;
        // this.router.navigate(['/user-registration']);
      }else{
        this.showLogin = true;
        this.router.navigate(['/']);
      }
    }

    if(this.isAuthenticated == true) {
      this.showLogin = false;
      if(url == '/login' || url == '/' || url == ''){
        this.router.navigate(['/home']);
      }
    }
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
