import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = '';

  // public options = new HttpHeaders({
  //   'Content-Type' : 'application/json; charset=utf-8',
  //   'Access-Control-Allow-Origin': '*',
  //   'Authorization': `Bearer ${localStorage.getItem('token')}`,
  // });

  constructor(private http: HttpClient) { }

  get(loc, data) {
    return this.http.get(`${this.baseUrl}` + loc + data)
  }

  post(loc, data) {
    return this.http.post(`${this.baseUrl}` + loc, data)
  }

  update(loc, id, data) {
    return this.http.patch(`${this.baseUrl}` + loc + id, data)
  }
}
