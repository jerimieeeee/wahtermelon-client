import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = 'https://apiwahtermelon-staging.wah.ph/api/v1/'; //staging-api
  // baseUrl = 'https://api.wah.ph/api/v1/'; //api
  // baseUrl = 'http://127.0.0.1:8000/api/v1/'; //local api
  // baseUrl = 'http://wahtermelon.test/api/v1/'; //local api


  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) { }

  user_json: any;

  downloadXML(url){
    return `${this.baseUrl}`+url;
  }

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
    return this.http.get(`${this.baseUrl}`+'logout')
  }

  saveUserToLocalStorage(user) {
    // console.log(user)
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeLocalStorageItem(){
    if(localStorage.getItem('user')) localStorage.removeItem('user');
    if(this.cookieService.get('access_token')) {
      this.logout().subscribe({
        next: () => {
          this.cookieService.delete('access_token')
          window.location.reload();
        },
        error: err => console.log(err)
      });
    } else {
      window.location.reload();
    }
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

  /* toastr(type: string, message: string) {
    return {
      type: type,
      message: message
    }
  } */

  /* getURL(lab_code): string{
    switch (lab_code) {
      case 'CBC':
        return 'laboratory/consult-laboratory-cbc'
      case 'CRTN':
        return 'laboratory/consult-laboratory-creatinine'
      case 'CXRAY':
        return 'laboratory/consult-laboratory-chestxray'
      case 'ECG':
        return 'laboratory/consult-laboratory-ecg'
      case 'FBS':
        return 'laboratory/consult-laboratory-fbs'
      case 'RBS':
        return 'laboratory/consult-laboratory-rbs'
      case 'HBA':
        return 'laboratory/consult-laboratory-hba1c'
      case 'PSMR':
        return 'laboratory/consult-laboratory-papsmear'
      case 'PPD':
        return 'laboratory/consult-laboratory-ppd'
      case 'SPTM':
        return 'laboratory/consult-laboratory-sputum'
      case 'FCAL':
        return 'laboratory/consult-laboratory-fecalysis'
      case 'LPFL':
        return 'laboratory/consult-laboratory-lipid-profile'
      case 'URN':
        return 'laboratory/consult-laboratory-urinalysis'
      case 'OGTT':
        return 'laboratory/consult-laboratory-oral-glucose'
      case 'FOBT':
        return 'laboratory/consult-laboratory-fecal-occult'
      case 'GRMS':
        return 'laboratory/consult-laboratory-gram-stain'
      default:
        return '';
    }
  } */

  getUrlParams() {
    let patient_id;
    let consult_id;
    let loc;

    let values = this.router.url.split(';');
    if(values) {
      let id = values[1].split('=');

      patient_id = id[1];
      let location = values[0].split('/');
      loc = location[2]
      if(values[2]) {
        let consult = values[2].split('=');
        consult_id = consult[1];
      }
    } else {
      patient_id = null;
      consult_id = null;
      loc = null;
    }


    return {
      patient_id: patient_id,
      consult_id: consult_id,
      loc: loc
    }
  }

  patient_info: any;
  setPatientInfo(data){
    this.patient_info = data;
    // console.log(this.patient_info)
  }

  getPatientInfo(){
    return this.patient_info;
  }

  philhealth_info: any;
  setPhilhealhtInfo(data) {
    this.philhealth_info = data;
  }

  getPhilhealhtInfo(){
    return this.philhealth_info;
  }

  showError(message, title) {
    this.toastr.error(message, title, {
      closeButton: true,
      positionClass: 'toast-top-center',
      disableTimeOut: true
    });
  }
}
