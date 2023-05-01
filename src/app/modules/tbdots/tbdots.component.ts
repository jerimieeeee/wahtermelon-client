import { Component, OnInit } from '@angular/core';
import { faPersonWalking } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tbdots',
  templateUrl: './tbdots.component.html',
  styleUrls: ['./tbdots.component.scss']
})
export class TbdotsComponent implements OnInit {
  faPersonWalking = faPersonWalking;

  constructor() { }
  module: number;
  ngOnInit(): void {
    this.module = 1;
  }

  switchTab(tab) {
    this.module = 0;
    this.module = tab;
    console.log(this.module);
  }
}
