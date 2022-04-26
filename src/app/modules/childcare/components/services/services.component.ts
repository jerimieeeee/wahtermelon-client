import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup,FormArray,FormControl,Validators,} from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  selectedServiceList = [];
  checkedIDs = [];
  
  z: any;
  z2: any;

  saved: boolean;

  faSearch = faSearch;
  faPlus = faPlus;

  defaultDate = new Date().toISOString().slice(0, 16);

  serviceForm = new FormGroup({
    serviceDate: new FormControl()
  });

  services= [
    { id: 1, name: 'Cord Clamping', cc_id: 'CLAMP', ischecked: false},
    { id: 2, name: 'Drying', cc_id: 'DRYING', ischecked: false},
    { id: 3, name: 'Non-Separation', cc_id: 'NONSEP', ischecked: false},
    { id: 4, name: 'Prophylaxis', cc_id: 'PROP', ischecked: false},
    { id: 5, name: 'Skin to Skin', cc_id: 'SKIN', ischecked: false},
    { id: 6, name: 'Vitamin K', cc_id: 'VITK', ishecked: false},
    { id: 7, name: 'Weighing', cc_id: 'WEIGHT', ischecked: false},
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
  

 showEssentialModal = false;
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

  geteServiceName(){
    this.z = JSON.parse(localStorage.getItem('eservice'));
    console.log('retrievedeServices: ', this.z );
  }

  geteServiceDate(){
    this.z2 = JSON.parse(localStorage.getItem('eserviceDate'));
    console.log('retrievedeServicesDate: ',this.z2 );
  }

  fetchSelectedItems() {
    this.selectedServiceList = this.eservices2.filter((value, index) => {
      return value.ischecked
    });
  }

  submit() {
    this.selectedServiceList = this.eservices2.filter((value, index) => {
      return value.ischecked,
      console.log('Service Date:' + this.serviceForm.get('serviceDate').value),
      localStorage.setItem('eservice', JSON.stringify(this.selectedServiceList)),
      localStorage.setItem('eserviceDate', JSON.stringify(this.serviceForm.value))
      
    });
  }

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.eservices2.forEach((value, index) => {
      if (value.ischecked) {
        this.checkedIDs.push(value.id);
      }
    });
  }
 
  changeSelection() {
    this.fetchSelectedItems()
  }


  constructor() { 

  }

  ngOnInit() {
    this.geteServiceName()
    this.fetchSelectedItems()
    this.fetchCheckedIDs()
    this.serviceForm = new FormGroup({
      serviceDate: new FormControl((new Date()).toISOString().substring(0,10))
    });
  }
}
