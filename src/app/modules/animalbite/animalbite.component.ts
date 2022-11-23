import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animalbite',
  templateUrl: './animalbite.component.html',
  styleUrls: ['./animalbite.component.scss']
})
export class AnimalbiteComponent implements OnInit {
  
  module: number;

  constructor() { }

  ngOnInit(): void {
    this.module=1;
  }

  switchTab(tab){
    this.module = 0;
    this.module = tab;
  }
}