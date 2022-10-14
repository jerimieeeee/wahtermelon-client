import { Component, OnInit } from '@angular/core';
import { faPersonWalking } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-maternalcare',
  templateUrl: './maternalcare.component.html',
  styleUrls: ['./maternalcare.component.scss']
})
export class MaternalcareComponent implements OnInit {

  faPersonWalking = faPersonWalking;

  constructor(private http: HttpService) { }
  module: number;

  libraries = [
    {var_name: 'risk_factors', location: 'mc-risk-factors'},
    {var_name: 'fetals', location: 'mc-presentations'},
    {var_name: 'fhr_lib', location: 'mc-locations'},
    {var_name: 'delivery_location', location: 'regions'},
    {var_name: 'attendants', location: 'mc-attendants'},
    {var_name: 'preg_outcome', location: 'mc-outcomes'},
  ]

  ngOnInit(): void {
    this.module = 1;
    this.post_value =false;
    this.loadLibraries();
    
  }

  switchTab(tab) {
    this.module = 0;
    this.module = tab;
    console.log(this.module);
  }
  post_value: boolean;
 postValue(post_data) {
   
  if(post_data){
    this.post_value =true;
  }
 }

 loadLibraries(){
  this.libraries.forEach(obj => {
    this.http.get('libraries/'+obj.location).subscribe({
      next: (data: any) => this[obj.var_name] = data.data,
      error: err => console.log(err),
    })
  });
  
}

  
}
