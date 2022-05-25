import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ncd',
  templateUrl: './ncd.component.html',
  styleUrls: ['./ncd.component.scss']
})
export class NcdComponent implements OnInit {

  module: Number;
  constructor() { }

  ngOnInit(): void {
    this.module=1;
  }

  switchTab(tab){
    this.module = 0;
    this.module = tab;
  }
}
