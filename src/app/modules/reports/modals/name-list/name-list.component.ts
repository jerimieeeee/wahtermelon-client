import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-name-list',
  templateUrl: './name-list.component.html',
  styleUrls: ['./name-list.component.scss']
})
export class NameListComponent {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() name_list;

  closeModal(){
    this.toggleModal.emit();
  }
}
