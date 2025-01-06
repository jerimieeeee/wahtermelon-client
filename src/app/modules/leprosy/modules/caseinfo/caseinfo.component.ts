import { Component, OnInit } from '@angular/core';
import { faAngleDown, faCalendarDay, faCaretRight, faClose, faInfoCircle, faPencil, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-caseinfo',
    templateUrl: './caseinfo.component.html',
    styleUrls: ['./caseinfo.component.scss'],
    standalone: false
})
export class CaseinfoComponent implements OnInit {
  
  faCalendarDay = faCalendarDay;
  faTimes = faTimes;
  faClose = faClose;
  faTimesCircle = faTimesCircle;
  faSave = faSave;
  faPencil = faPencil;
  faAngleDown = faAngleDown;
  faInfoCircle = faInfoCircle;
  faCaretRight = faCaretRight;
  error_message = '';

  focused: boolean;
  constructor() { }

  ngOnInit(): void {
     this.focused = false;
  }

  patternMaker(val) {
    console.log(val);
    
  }
}
