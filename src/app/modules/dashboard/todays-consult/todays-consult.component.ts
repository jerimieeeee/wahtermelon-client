import { Component, OnInit } from '@angular/core';
import { faQuestionCircle, faChevronDown, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todays-consult',
  templateUrl: './todays-consult.component.html',
  styleUrls: ['./todays-consult.component.scss']
})
export class TodaysConsultComponent implements OnInit {
  faQuestionCircle = faQuestionCircle;
  faChevronDown = faChevronDown;
  faFolderOpen = faFolderOpen;

  constructor() { }

  ngOnInit(): void {
  }

}
