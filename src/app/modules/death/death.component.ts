import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-death',
  templateUrl: './death.component.html',
  styleUrls: ['./death.component.scss']
})
export class DeathComponent implements OnInit {

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
