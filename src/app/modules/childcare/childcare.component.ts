import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-childcare',
  templateUrl: './childcare.component.html',
  styleUrls: ['./childcare.component.scss']
})
export class ChildcareComponent implements OnInit {


  services : any



  faSearch = faSearch;
  faBalanceScale = faBalanceScale;
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
  
  showBreastfeedingModal = false;
  toggleBreastfeedingModal(){
    this.showBreastfeedingModal = !this.showBreastfeedingModal;
  }

  
  

  constructor() { 

this.services=[
{
  
  "name":"Complimentary Feeding",
  "date": 12/21/2020
},

{
  
  "name":"Dental Check-up",
  "date": 12/21/2020
},

{
  
  "name":"Newborn Hearing Screening",
  "date": 12/21/2020
},

{
  
  "name":"Iron Intake",
  "date": 12/21/2020
},

{
  
  "name":"Received MNP",
  "date": 12/21/2020
},

{
  
  "name":"Newborn Screening",
  "date": 12/21/2020
},

{
  
  "name":"Weighing",
  "date": 12/21/2020
}

]


  }

  ngOnInit(): void {
  }

}

