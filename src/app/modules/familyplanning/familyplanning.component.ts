import { Component, OnInit } from '@angular/core';
import { faCalendar, faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-familyplanning',
  templateUrl: './familyplanning.component.html',
  styleUrls: ['./familyplanning.component.scss']
})
export class FamilyplanningComponent implements OnInit {
  faCalendar = faCalendar;
  faTimes = faTimes;
  showModal: boolean = false;
  hideButton: boolean = true;
  constructor() { }



  openModal() {
    
    this.showModal = !this.showModal;
    this.hideButton = !this.hideButton;
  }


  ngOnInit(): void {
  }

}
