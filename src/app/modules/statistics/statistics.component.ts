import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

  userInfo : any;

  dashboardForm: FormGroup = new FormGroup({
    
    dashboard_type: new FormControl<string| null>('')

  });

  dashboard_type = [
    {id: '1', desc:'Facility Statistics'}
  ]; 

  onSubmit(){
    console.log('submit ng dashboard type')
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService
  ) { }

 // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
 ngOnInit(): void {
   
    this.userInfo = this.http.getUserFromJSON();
    console.log(this.userInfo)
 }
}