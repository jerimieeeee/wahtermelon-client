import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-allergies-modal',
    templateUrl: './allergies-modal.component.html',
    styleUrls: ['./allergies-modal.component.scss'],
    standalone: false
})
export class AllergiesModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();

  allergies = [
    {id: 1, name: 'Drug'},
    {id: 2, name: 'Food'},
    {id: 3, name: 'Insect'},
    {id: 4, name: 'Latex'},
    {id: 5, name: 'Mold'},
    {id: 6, name: 'Pet'},
    {id: 7, name: 'Pollen'}
  ]
  constructor() { }

  onSubmit(){
    console.log('test');
  }

  closeModal(){
    this.toggleModal.emit('allergies-modal');
  }

  ngOnInit(): void {
  }
}
