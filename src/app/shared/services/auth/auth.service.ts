import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  login(data){
    return this.http.post('login', data)
  }

  logout(){
    // localStorage.removeItem('access_token');
    return this.http.post('logout', localStorage.removeItem('access_token'))
    // return 'logout successful';
    //this.router.navigate(['/login'])
  }

  saveUserToLocalStorage(user) {
    localStorage.setItem('user', user)
  }
}
