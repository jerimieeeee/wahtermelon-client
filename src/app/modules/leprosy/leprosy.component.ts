import { Component, OnInit } from '@angular/core';
import { faPersonWalking } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-leprosy',
  templateUrl: './leprosy.component.html',
  styleUrls: ['./leprosy.component.scss']
})
export class LeprosyComponent implements OnInit {

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
