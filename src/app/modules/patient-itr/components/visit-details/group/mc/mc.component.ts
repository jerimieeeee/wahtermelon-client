import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-mc',
  templateUrl: './mc.component.html',
  styleUrls: ['./mc.component.scss']
})
export class McComponent implements OnInit, OnChanges {
  @Input() selected_visit
  patient_mc_list: any;

  constructor() { }

  ngOnChanges (): void {
    if(this.selected_visit[0]) {
      this.patient_mc_list = [this.selected_visit[0]];
      console.log(typeof this.patient_mc_list, this.patient_mc_list)
    }
  }

  ngOnInit(): void {
  }

}
