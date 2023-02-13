import { Component, OnInit } from '@angular/core';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pregnancy-history',
  templateUrl: './pregnancy-history.component.html',
  styleUrls: ['./pregnancy-history.component.scss']
})
export class PregnancyHistoryComponent implements OnInit {

  faMinus = faMinus;
  constructor() { }

  ngOnInit(): void {
  }

}
