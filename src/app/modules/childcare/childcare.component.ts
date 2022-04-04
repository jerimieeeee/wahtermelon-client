import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-childcare',
  templateUrl: './childcare.component.html',
  styleUrls: ['./childcare.component.scss']
})
export class ChildcareComponent implements OnInit {


  showBreastfeedingModal = false;
  toggleBreastfeedingModal(){
    this.showBreastfeedingModal = !this.showBreastfeedingModal;
  }

  constructor() { 

  }

  ngOnInit(): void {
  }

}

