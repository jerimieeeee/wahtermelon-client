import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-methods-modal',
  templateUrl: './methods-modal.component.html',
  styleUrls: ['./methods-modal.component.scss']
})
export class MethodsModalComponent {
  @Output() toggleModal = new EventEmitter<any>();
  
  is_saving: boolean = false;

  closeModal(){
    this.toggleModal.emit('methods-modal');
    // console.log('check modal')
  }
}
