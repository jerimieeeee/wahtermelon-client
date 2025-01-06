import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-name-list',
    templateUrl: './name-list.component.html',
    styleUrls: ['./name-list.component.scss'],
    standalone: false
})
export class NameListComponent {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() name_list;

  openItr(id) {
    this.router.navigate(['/patient/itr', {id: id}]);
  }

  closeModal(){
    this.toggleModal.emit();
  }

  constructor (
    private router: Router
  ) { }
}
