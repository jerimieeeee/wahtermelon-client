import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facility-config',
  templateUrl: './facility-config.component.html',
  styleUrls: ['./facility-config.component.scss']
})
export class FacilityConfigComponent implements OnInit {

  modules: number = 0;

  constructor() { }

  switchTabs(tab){
    this.modules = tab;
  }

  ngOnInit(): void {
    this.modules = 1;
  }
}