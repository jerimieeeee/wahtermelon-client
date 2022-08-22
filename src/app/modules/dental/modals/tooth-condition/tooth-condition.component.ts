import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooth-condition',
  templateUrl: './tooth-condition.component.html',
  styleUrls: ['./tooth-condition.component.scss']
})
export class ToothConditionComponent implements OnInit {
  showModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    alert('click')
  }

  onRightClick(){
    alert('right click');
    return false;
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }
}
