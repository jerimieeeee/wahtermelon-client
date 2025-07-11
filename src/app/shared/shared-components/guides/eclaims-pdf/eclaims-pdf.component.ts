import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-eclaims-pdf',
  imports: [],
  templateUrl: './eclaims-pdf.component.html',
  styleUrl: './eclaims-pdf.component.scss'
})
export class EclaimsPdfComponent {
  @Output() toggleModal = new EventEmitter<any>();

  closeModal() {
    this.toggleModal.emit('eclaims_guide');
  }
}
