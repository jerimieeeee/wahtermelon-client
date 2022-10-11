import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-death-modal',
  templateUrl: './death-modal.component.html',
  styleUrls: ['./death-modal.component.scss']
})
export class DeathModalComponent implements OnInit {
  @Output() toggleDeathRecordModal = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal(){
    this.toggleDeathRecordModal.emit();
  }
}
