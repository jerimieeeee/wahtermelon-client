import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss']
})
export class PhotoModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_info;

  onSubmit(){

  }

  closeModal(){
    this.toggleModal.emit('vaccine-moodal');
  }

  constructor() { }

  ngOnInit(): void {
  }

}
