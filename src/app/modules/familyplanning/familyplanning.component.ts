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
  constructor() { }

  openModal() {
    
    this.showModal = !this.showModal;
  }


  ngOnInit(): void {
  }

}
