import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faCalendarDay, faPlus, faSave, faTimes, faClose, faTimesCircle, faPencil, faCaretDown, faAngleDown, faInfoCircle, faCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-firsvisit',
  templateUrl: './firsvisit.component.html',
  styleUrls: ['./firsvisit.component.scss']
})
export class FirsvisitComponent implements OnInit {
  focused: boolean;
  focused2: boolean;
  modal: boolean;

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
  fv_form: FormGroup;
  alc: Number = new Number();
  dlc: Number = new Number();
  bi: Number = new Number();
  ami: Number = new Number();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.error_message = '**please enter numbers only';
    this.createForm();
    !this.focused;
    this.fv_form.reset();
    //this.fv_form.disable();
    //  console.log( this.fv_form.value + ' this is my fv_form');
  }
  cancel() {
    this.keyUp = [];
    this.createForm();
  }
  createForm() {
    this.fv_form = new FormGroup({
      alc: new FormControl(this.alc),
      dlc: new FormControl(this.dlc),
      bi: new FormControl(this.bi),
      ami: new FormControl(this.ami),
    });
  }

  saveForm(data) {
    this.fv_form.setValue({
      alc: data.alc,
      dlc: data.dlc,
      bi: data.bi,
      ami: data.ami
    });
    this.fv_form.disable();
   
  }

  flip(): void {
    this.focused = !this.focused;
    this.keyUp = [];
    this.buttons = [];
    this.buttons.push('save');
   // this.fv_form.reset();
  }

  edit() {
    this.fv_form.enable();
  }

  clearForm(id) {
    this.fv_form.get(id).reset();
    this.keyUp.splice(this.keyUp.indexOf(id), 1);
    // this.onKeyUp('', id);
  }
  onKeyUp(data_input: string, id: string) {
    // console.log(data_input + ' this is my data input');

    if (this.keyUp.includes(id)) {
      if (data_input == '') {
        this.keyUp.splice(this.keyUp.indexOf(id), 1);
      }
    } else {
      this.keyUp.push(id);

    }

  }
  buttonShow(name) {
    this.buttons = [];
    if (!this.buttons.includes(name)) {
      this.buttons.push(name);
    }
    // console.log(this.buttons);

  }

}
