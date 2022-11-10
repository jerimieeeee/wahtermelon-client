import { Component, OnInit } from '@angular/core';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-childcare',
  templateUrl: './childcare.component.html',
  styleUrls: ['./childcare.component.scss']
})
export class ChildcareComponent implements OnInit {

  faDoorClosed = faDoorClosed;
  
  module: Number;

  patient_details: any;


  // Section 2
  constructor() { 
   
  }

  patientInfo(info){
   this.patient_details = info;
    console.log(this.patient_details, 'get patient');
  }

  ngOnInit(): void {
    this.module=1;
  }

  switchTab(tab){
    this.module = 0;
    this.module = tab;
  }
}
