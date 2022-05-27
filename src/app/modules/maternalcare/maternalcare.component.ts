import { Component, OnInit } from '@angular/core';
import { faPersonWalking } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-maternalcare',
  templateUrl: './maternalcare.component.html',
  styleUrls: ['./maternalcare.component.scss']
})
export class MaternalcareComponent implements OnInit {

  faPersonWalking = faPersonWalking;

  constructor() { }
  module: number;
  ngOnInit(): void {
    this.module = 2;
    this.post_value =false;
  }

  switchTab(tab) {
    this.module = 0;
    this.module = tab;
    console.log(this.module);
  }
  post_value: boolean;
 postValue(post_data) {
   
  if(post_data){
    this.post_value =true;
  }
 }
}
