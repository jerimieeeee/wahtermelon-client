import { Component, OnInit } from '@angular/core';
import { DentalModalService } from '../../services/dental-modal.service';
@Component({
  selector: 'app-chart-adult',
  templateUrl: './chart-adult.component.html',
  styleUrls: ['./chart-adult.component.scss']
})
export class AdultChartComponent implements OnInit {
  test_case: boolean = true;
  showModal: boolean = false;
  adult_tooth_conditions = [
    [
      {tooth_number: 18, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 17, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 16, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 15, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 14, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 13, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 12, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 11, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 21, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 22, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 23, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 24, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 25, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 26, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 27, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 28, condition: {1: null, 2: null, 3: null, 4: null, 5: null}}
    ],
    [
      {tooth_number: 48, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 47, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 46, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 45, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 44, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 43, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 42, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 41, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 31, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 32, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 33, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 34, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 35, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 36, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 37, condition: {1: null, 2: null, 3: null, 4: null, 5: null}},
      {tooth_number: 38, condition: {1: null, 2: null, 3: null, 4: null, 5: null}}
    ]
  ];

  constructor(
    private dentalModalService: DentalModalService
  ) { }

  ngOnInit(): void {

  }

  onClick(id){
    alert('click ' + id);
  }

  onRightClick(id){
    alert('right click ' + id);
    return false;
  }

  modals: any = [];
  openModal(name: string){
    this.modals[name] = !this.modals[name];
    console.log(name);
    console.log(this.modals[name]);
  }
}
