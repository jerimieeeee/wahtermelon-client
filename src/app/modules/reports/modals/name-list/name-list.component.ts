import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-name-list',
    templateUrl: './name-list.component.html',
    styleUrls: ['./name-list.component.scss'],
    standalone: false
})
export class NameListComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() name_list;

  closeModal(){
    this.toggleModal.emit();
  }

  ngOnInit(): void {
      console.log(this.name_list);
  }
}
