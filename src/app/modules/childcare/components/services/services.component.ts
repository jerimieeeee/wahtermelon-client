import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  services : any
  services2 : any

  faSearch = faSearch;
  faPlus = faPlus;

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
  

  constructor() { 

    this.services = [
      { name: 'Cord Clamping', selected: false },
      { name: 'Drying', selected: false },
      { name: 'Non-Separation', selected: false },
      { name: 'Prophylaxis', selected: false },
      { name: 'Skin to Skin', selected: false },
      { name: 'Vitamin K', selected: false },
      { name: 'Weighing', selected: false },
      { name: 'Select ALL', selected: false },
    ]

this.services2=[
  {
    
    "name":"Complimentary Feeding",
    "date": 12/21/2022
  },
  
  {
    
    "name":"Dental Check-up",
    "date": 12/21/2022
  },
  
  {
    
    "name":"Newborn Hearing Screening",
    "date": 12/21/2022
  },
  
  {
    
    "name":"Iron Intake",
    "date": 12/21/2022
  },
  
  {
    
    "name":"Received Micronutrient Powder (MNP)",
    "date": 12/21/2022
  },
  
  {
    
    "name":"Newborn Screening (Referred)",
    "date": 12/21/2022
  },
  
  {
    
    "name":"Newborn Screening (Done)",
    "date": 12/21/2022
  },

  {
    
    "name":"Vitamin A",
    "date": 12/21/2022
  },

  {
    
    "name":"Deworming",
    "date": 12/21/2022
  }
  
  ]


  }

  ngOnInit(): void {
  }

}
