import { Component, OnInit } from '@angular/core';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-eclaims',
  templateUrl: './eclaims.component.html',
  styleUrls: ['./eclaims.component.scss']
})
export class EclaimsComponent implements OnInit {

  faRotate = faRotate;

  pending_list: any = [];
  modal: any = [];

  is_refreshing: boolean = false;

  refreshClaims(){
    this.is_refreshing = true;
  }

  toggleModal(name) {
    this.modal[name] = !this.modal[name];
  }

  constructor() { }

  ngOnInit(): void {
    console.log('test');
  }

}
