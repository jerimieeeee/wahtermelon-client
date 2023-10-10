import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dental',
  templateUrl: './dental.component.html',
  styleUrls: ['./dental.component.scss']
})
export class DentalComponent implements OnInit {
  selected_dental_consult: any;
  consult_details: any;
  user_facility: any;

  pages: number = 1;
  module: number = 1;

  constructor() { }

  switchPage(page){

  }

  switchTab(tab){
    this.module = tab;
  }

  ngOnInit(): void {
    this.module = 1;
  }
}
