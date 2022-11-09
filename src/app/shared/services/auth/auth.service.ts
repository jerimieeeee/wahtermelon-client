import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  login(){

  }

  logout(){
    localStorage.removeItem('access_token');
    return 'logout successful';
    //this.router.navigate(['/login'])
  }
}
