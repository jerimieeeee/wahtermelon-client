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
}
