import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = 'https://apiwahtermelon-staging.wah.ph/api/v1/';

  // public options = new HttpHeaders({
  //   'Content-Type' : 'application/json; charset=utf-8',
  //   'Access-Control-Allow-Origin': '*',
  //   'Authorization': `Bearer ${localStorage.getItem('token')}`,
  // });

  constructor(private http: HttpClient) { }

  user_json: any;

  get(loc, data?) {
    return this.http.get(`${this.baseUrl}` + loc, data ? data : '')
  }

  post(loc, data) {
    return this.http.post(`${this.baseUrl}` + loc, data)
  }

  update(loc, id, data) {
    return this.http.put(`${this.baseUrl}` + loc + id, data)
  }

  test(loc, data?) {
    return this.http.get('https://apiwahtermelon-staging.wah.ph/api/' + loc, data ? data : '')
  }

  delete(loc, id) {
    return this.http.delete(`${this.baseUrl}` + loc + id)
  }

  login(data) {
    return this.http.post(`${this.baseUrl}`+'login', data)
  }

  logout() {
    return this.http.post(`${this.baseUrl}`+'logout', localStorage.getItem('access_token'))
  }

  saveUserToLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  removeLocalStorageItem(){
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    return 'Items removed';
  }

  userToJSON(){
    this.user_json = JSON.parse(localStorage.getItem('user'));
  }

  getUserID(){
    if(!this.user_json) {
      this.userToJSON()
    }

    return this.user_json.id;
  }

  getUserFromJSON() {
    if(!this.user_json) {
      this.userToJSON()
    }

    return this.user_json;
  }

  getUserFacility() {
    if(!this.user_json) {
      this.userToJSON()
    }

    return this.user_json.facility_code;
  }

  toastr(type: string, message: string) {
    return {
      type: type,
      message: message
    }
  }
}
