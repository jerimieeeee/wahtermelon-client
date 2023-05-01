import { Injectable } from '@angular/core';
import { ToothConditionComponent } from '../modals/tooth-condition/tooth-condition.component';

@Injectable({
  providedIn: 'root'
})
export class DentalModalService {
  showModal:boolean = false;

  constructor(
    // private toothConditionComponent: ToothConditionComponent
  ) { }

  open(){
    // this.toothConditionComponent.toggleModal();
  }
}
