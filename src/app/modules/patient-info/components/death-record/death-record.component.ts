import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-death-record',
  templateUrl: './death-record.component.html',
  styleUrls: ['./death-record.component.scss']
})
export class DeathRecordComponent implements OnInit {
  @Output() toggleAccordion = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Input() accordions;

  faPlusCircle = faPlusCircle;

  toggle(name) {
    this.toggleAccordion.emit(name);
  }

  modalToggle(name) {
    this.toggleModal.emit(name);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
