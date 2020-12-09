import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-childcare',
  templateUrl: './childcare.component.html',
  styleUrls: ['./childcare.component.scss']
})
export class ChildcareComponent implements OnInit {

  faSearch = faSearch;
  faBalanceScale = faBalanceScale;
  faPlus = faPlus;

  services = [
    {
      id: "cc",
      desc: "cord clamping"
    },
    {
      id: "drying",
      desc: "drying"
    },
    {
      id: "bf",
      desc: "breastfeeding"
    }
  ]
  
  showModal = false;
  toggleModal(){
    this.showModal = !this.showModal;
  }

  showServiceModal = false;
  toggleServiceModal(){
    this.showServiceModal = !this.showServiceModal;
  }

  showVaccineModal = false;
  toggleVaccineModal(){
    this.showVaccineModal = !this.showVaccineModal;
  }
  
  showBreastfeedingModal = false;
  toggleBreastfeedingModal(){
    this.showBreastfeedingModal = !this.showBreastfeedingModal;
  }

  
  

  constructor() { }

  ngOnInit(): void {
  }

}

