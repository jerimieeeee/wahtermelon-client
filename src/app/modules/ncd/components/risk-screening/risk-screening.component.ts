import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus,faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-risk-screening',
  templateUrl: './risk-screening.component.html',
  styleUrls: ['./risk-screening.component.scss']
})
export class RiskScreeningComponent implements OnInit {

  constructor() { }

  faInfoCircle = faInfoCircle;

  ngOnInit(): void {
  }

}
