import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faCalendarDay, faPlus, faSave, faTimes, faClose, faTimesCircle, faPencil, faCaretDown, faAngleDown, faInfoCircle, faCaretRight, faSpinner, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fpchart',
  templateUrl: './fpchart.component.html',
  styleUrls: ['./fpchart.component.scss']
})
export class FpchartComponent implements OnInit {
  focused: boolean;
  focused2: boolean;
  modal: boolean;

  faSpinner = faSpinner;

  is_saving: boolean = false;

  faTimes = faTimes;
  faClose = faClose;
  faTimesCircle = faTimesCircle;
  faSave = faSave;
  faPlusSquare = faPlusSquare;
  faPencil = faPencil;
  faAngleDown = faAngleDown;
  faInfoCircle = faInfoCircle;
  faCaretRight = faCaretRight;
  error_message = '';
  public buttons = [];

  public keyUp = [];

  modals: any = [];
  
  toggleModal(name) {
    this.modals[name] = !this.modals[name];
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.error_message = '**please enter numbers only';
  } 
}