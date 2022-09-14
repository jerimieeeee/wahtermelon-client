import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dental',
  templateUrl: './dental.component.html',
  styleUrls: ['./dental.component.scss']
})
export class DentalComponent implements OnInit {
  module: number = 0;

  constructor() { }

  switchTab(tab){
    this.module = tab;
  }

  ngOnInit(): void {
    this.module = 1;
  }
}
