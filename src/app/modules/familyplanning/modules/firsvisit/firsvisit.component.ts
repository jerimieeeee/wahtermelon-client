import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faCalendarDay, faPlus, faSave, faTimes, faClose, faTimesCircle, faPencil, faCaretDown, faAngleDown, faInfoCircle, faCaretRight, faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-firsvisit',
  templateUrl: './firsvisit.component.html',
  styleUrls: ['./firsvisit.component.scss']
})
export class FirsvisitComponent implements OnInit {
  focused: boolean;
  focused2: boolean;
  modal: boolean;

  faSpinner = faSpinner;

  is_saving: boolean = false;

  faTimes = faTimes;
  faClose = faClose;
  faTimesCircle = faTimesCircle;
  faSave = faSave;
  faPencil = faPencil;
  faAngleDown = faAngleDown;
  faInfoCircle = faInfoCircle;
  faCaretRight = faCaretRight;
  error_message = '';
  public buttons = [];

  public keyUp = [];
  

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.error_message = '**please enter numbers only';
  } 
}
