import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus,faInfoCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup,FormArray,FormControl,Validators,} from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  
  x: any;
  z2: any;


  saved: boolean;

  faSearch = faSearch;
  faPlus = faPlus;
  faInfoCircle = faInfoCircle;
  faSpinner = faCircleNotch;

  is_saving: boolean = false;

  defaultDate = new Date().toISOString().slice(0, 16);

  services= [
    { id: 1, name: 'Complimentary Feeding', cc_id: 'FEED', date: 'Mar 24 2012 10:00:00 AM', ischecked: false},
    { id: 2, name: 'Dental Checkup', cc_id: 'DENTAL', date: 'Mar 12 2012 10:00:00 AM', ischecked: false},
    { id: 3, name: 'Deworming', cc_id: 'DEWORM', date: 'Mar 01 2012 10:00:00 AM', ischecked: false},
    { id: 4, name: 'Iron Intake', cc_id: 'IRON', date: 'Mar 26 2012 10:00:00 AM', ischecked: false},
    { id: 5, name: 'Newborn Hearing Screening',  cc_id: 'NBHS', date: 'Mar 14 2012 10:00:00 AM', ischecked: false},
    { id: 6, name: 'Newborn Screening Done', cc_id: 'NBSDONE', date: 'Mar 12 2012 10:00:00 AM', ishecked: false},
    { id: 7, name: 'Newborn Screening Referred', cc_id: 'NBSREF', date: 'Mar 15 2012 10:00:00 AM', ischecked: false},
    { id: 8, name: 'Received Micronutrient Powder', cc_id: 'MNP', date: 'Mar 09 2012 10:00:00 AM', ischecked: false},
    { id: 9, name: 'Vitamin A', cc_id: 'VITA', date: 'Mar 13 2012 10:00:00 AM', ischecked: false},
    
  ];

 

 eservices2= [
    { id: 1, name: 'Cord Clamping', cc_id: 'CLAMP', ischecked: false},
    { id: 2, name: 'Drying', cc_id: 'DRYING', ischecked: false},
    { id: 3, name: 'Non-Separation', cc_id: 'NONSEP', ischecked: false},
    { id: 4, name: 'Prophylaxis', cc_id: 'PROP', ischecked: false},
    { id: 5, name: 'Skin to Skin', cc_id: 'SKIN', ischecked: false},
    { id: 6, name: 'Vitamin K', cc_id: 'VITK', ishecked: false},
    { id: 7, name: 'Weighing', cc_id: 'WEIGHT', ischecked: false},
  ];

  // newarr = this.services.sort((a, b) => a.id - b.id);
  

 showEssentialModal = false;

  ccservicename: any;

  toggleEssentialModal(){
    this.showEssentialModal = !this.showEssentialModal;
  }

  showServiceModal = false;
  toggleServiceModal(){
    this.showServiceModal = !this.showServiceModal;
  }

  showVaccineModal = false;
  toggleVaccineModal(){
    this.showVaccineModal = !this.showVaccineModal;
  }

  saveModal(){
    this.is_saving = true;

    setTimeout(() => {
      this.is_saving = false;
    }, 5000);
  }

  constructor() { 
    this.services.sort(function(a,b){
      return a.date.localeCompare(b.date);
    })
  }

  ngOnInit() {
    
  }
}
