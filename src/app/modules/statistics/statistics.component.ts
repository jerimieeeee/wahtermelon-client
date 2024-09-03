import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

  dashboardForm: FormGroup = new FormGroup({
    
    dashboard_type: new FormControl<string| null>('')

  });

  dashboard_type = [
    {id: '1', desc:'Health Financing'},
    {id: '2', desc:'Konsulta'},
    {id: '3', desc:'End-User Statistics'},
  ]; 

  onSubmit(){
    
  }

}
