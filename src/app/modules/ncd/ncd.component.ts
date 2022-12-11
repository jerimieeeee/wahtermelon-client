import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ncd',
  templateUrl: './ncd.component.html',
  styleUrls: ['./ncd.component.scss']
})
export class NcdComponent implements OnInit {
  module: Number;
  modules: Number;
  constructor(
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.module=6;
    this.modules=2;

    this.patient_id = this.route.snapshot.paramMap.get('id');
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');
  }

  switchTab(tab){
    this.module = 0;
    this.module = tab;
  }

  switchTabs(tabs){
    this.modules = 0;
    this.modules = tabs;
  }

  patient_id:string;
  consult_id: string;
}
