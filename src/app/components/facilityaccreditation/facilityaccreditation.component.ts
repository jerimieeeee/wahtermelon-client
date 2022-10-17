import { Component, OnInit } from '@angular/core';
import { faCirclePlus, faPencil, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-facilityaccreditation',
  templateUrl: './facilityaccreditation.component.html',
  styleUrls: ['./facilityaccreditation.component.scss']
})
export class FacilityaccreditationComponent implements OnInit {
  faCirclePlus = faCirclePlus;
  faSave = faSave;
  faPencil = faPencil;
  modal: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  addCredentials() {
    this.modal = !this.modal;
  }
}
