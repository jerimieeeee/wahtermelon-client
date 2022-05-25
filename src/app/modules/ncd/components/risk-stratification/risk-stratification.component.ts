import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus,faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-risk-stratification',
  templateUrl: './risk-stratification.component.html',
  styleUrls: ['./risk-stratification.component.scss']
})
export class RiskStratificationComponent implements OnInit {

  faInfoCircle = faInfoCircle;

  constructor() { }

  ngOnInit(): void {
  }

}
