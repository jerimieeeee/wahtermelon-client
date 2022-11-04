import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { faChevronCircleDown, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from './shared/services/http.service';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'wahtermelon-client';
  faChevronCircleDown = faChevronCircleDown;
  faBell = faBell;
  faSearch = faSearch;

  isAuthenticated: boolean = false;
  showLogin: boolean = true;

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location
  ) {
    console.log(this.router.url);
   }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string| null>(''),
    password: new FormControl<string| null>(''),
  });

  onSubmit(){
    this.http.post('login', this.loginForm.value).subscribe({
      next: (data: any) => {
        console.log(data.access_token);
        // this.decode(data.access_token);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('name', data.user.last_name + ', ' + data.user.first_name + ' ' + data.user.middle_name + ' ' + data.user.suffix_name);
        this.checkAuth();
      },
      error: err => console.log(err),
      complete: () => { }
    });
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
    console.log(url)
    if(localStorage.getItem('access_token')){
      this.isAuthenticated = true;
    }

    if(this.isAuthenticated == false && url != '/login') {
      this.showLogin = true;
      this.router.navigate(['/login']);
    }

    if(this.isAuthenticated == false && url == '/login') {
      this.showLogin = true;
    }

    if(this.isAuthenticated == true && url == '/login') {
      this.showLogin = false;
      this.router.navigate(['/home']);
    }

    if(this.isAuthenticated == true && url != '/login') {
      console.log(4);
      this.showLogin = false;
    }
  }

  ngOnInit(): void {
    this.checkAuth();

    this.loginForm = this.formBuilder.nonNullable.group({
      email: ['christian.santos37@gmail.com', [Validators.required, Validators.minLength(2), Validators.email]],
      password: ['Ellechir_55', [Validators.required, Validators.minLength(2)]],
    });
  }
}
