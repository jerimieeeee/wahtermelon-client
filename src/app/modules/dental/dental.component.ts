import { Component, OnInit } from '@angular/core';
import { faCircleNotch, faDoorClosed } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dental',
  templateUrl: './dental.component.html',
  styleUrls: ['./dental.component.scss']
})
export class DentalComponent implements OnInit {
  selected_dental_consult: any;
  consult_details: any;
  user_facility: any;

  pages: number = 2;
  module: number = 1;

  faDoorClosed = faDoorClosed;
  faCircleNotch = faCircleNotch;
  patient_dental_history: any = [];
  constructor() { }

  switchPage(page){
    this.pages = page;
  }

  switchTab(tab){
    this.module = tab;
  }

  ngOnInit(): void {
    this.module = 1;
  }
}
