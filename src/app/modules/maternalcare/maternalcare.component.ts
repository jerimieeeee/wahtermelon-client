import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maternalcare',
  templateUrl: './maternalcare.component.html',
  styleUrls: ['./maternalcare.component.scss']
})
export class MaternalcareComponent implements OnInit {

  constructor() { }
  module: number;
  ngOnInit(): void {
    this.module = 2;
  }

  switchTab(tab) {
    this.module = 0;
    this.module = tab;
    console.log(this.module);
  }
}
