import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eclaims',
  templateUrl: './eclaims.component.html',
  styleUrls: ['./eclaims.component.scss']
})
export class EclaimsComponent implements OnInit {

  pending_list: any = [];
  modal: any = [];

  toggleModal(name) {
    this.modal[name] = !this.modal[name];
  }

  constructor() { }

  ngOnInit(): void {
  }

}
