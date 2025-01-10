import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-facility-config',
    templateUrl: './facility-config.component.html',
    styleUrls: ['./facility-config.component.scss'],
    standalone: false
})
export class FacilityConfigComponent implements OnInit {

  modules: number = 0;

  constructor() { }

  switchTabs(tab){
    this.modules = 0
    this.modules = tab;
  }

  ngOnInit(): void {
    this.modules = 1;
    
  }
}