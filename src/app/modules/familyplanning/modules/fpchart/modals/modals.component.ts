import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent {
  @Output() toggleModal = new EventEmitter<any>();
  
  is_saving: boolean = false;

  closeModal(){
    this.toggleModal.emit('modals');
    // console.log('check modal')
  }
  
}
