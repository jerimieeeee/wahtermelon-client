import { Component, OnInit } from '@angular/core';
import { faSearch, faPlus, faInfoCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup,FormArray,FormControl,Validators,} from '@angular/forms';
import { faPenToSquare, faPlusSquare } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  
  x: any;
  cservices: any;

  selectedServiceList = [];
  selectedServiceList2 = [];
  checkedIDs = [];
  checkedIDs2 = [];


  saved: boolean;

  faSearch = faSearch;
  faPlus = faPlus;
  faInfoCircle = faInfoCircle;
  faSpinner = faCircleNotch;
  faPlusSquare = faPlusSquare;
  faPenToSquare = faPenToSquare;

  is_saving: boolean = false;

  defaultDate = new Date().toISOString().slice(0, 16);

  services= [
    { id: 1, name: 'Complimentary Feeding', cc_id: 'FEED', date: 'Mar 24 2012 10:00:00 AM', ischecked: false, service_date: 'N/A'},
    { id: 2, name: 'Dental Checkup', cc_id: 'DENTAL', date: 'Mar 12 2012 10:00:00 AM', ischecked: false, service_date: 'N/A'},
    { id: 3, name: 'Deworming', cc_id: 'DEWORM', date: 'Mar 01 2012 10:00:00 AM', ischecked: false, service_date: 'N/A'},
    { id: 4, name: 'Iron Intake', cc_id: 'IRON', date: 'Mar 26 2012 10:00:00 AM', ischecked: false, service_date: 'N/A'},
    { id: 5, name: 'Newborn Hearing Screening',  cc_id: 'NBHS', date: 'Mar 14 2012 10:00:00 AM', ischecked: false, service_date: 'N/A'},
    { id: 6, name: 'Newborn Screening Done', cc_id: 'NBSDONE', date: 'Mar 12 2012 10:00:00 AM', ishecked: false, service_date: 'N/A'},
    { id: 7, name: 'Newborn Screening Referred', cc_id: 'NBSREF', date: 'Mar 15 2012 10:00:00 AM', ischecked: false, service_date: 'N/A'},
    { id: 8, name: 'Received Micronutrient Powder', cc_id: 'MNP', date: 'Mar 09 2012 10:00:00 AM', ischecked: false, service_date: 'N/A'},
    { id: 9, name: 'Vitamin A', cc_id: 'VITA', date: 'Mar 13 2012 10:00:00 AM', ischecked: false, service_date: 'N/A'},
    
  ];

 

 eservices2= [
    { id: 1, name: 'Cord Clamping', cc_id: 'CLAMP', ischecked: false, service_date: 'October 3,2022'},
    { id: 2, name: 'Drying', cc_id: 'DRYING', ischecked: false, service_date: 'October 3,2022'},
    { id: 3, name: 'Non-Separation', cc_id: 'NONSEP', ischecked: false, service_date: 'October 3,2022'},
    { id: 4, name: 'Prophylaxis', cc_id: 'PROP', ischecked: false, service_date: 'N/A'},
    { id: 5, name: 'Skin to Skin', cc_id: 'SKIN', ischecked: false, service_date: 'N/A'},
    { id: 6, name: 'Vitamin K', cc_id: 'VITK', ishecked: false, service_date: 'October 3,2022'},
    { id: 7, name: 'Weighing', cc_id: 'WEIGHT', ischecked: false, service_date: 'N/A'},
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
    }, 1500);
  }

  geteServiceName(){
    this.x = JSON.parse(localStorage.getItem('eservice'));
    console.log('retrievedeServices: ', this.x );
    this.x.forEach(m =>{
      let i = this.eservices2.findIndex(c => c.id === m.id);
       if(i != -1){
         this.eservices2.splice(i,1);
       }
         // this.ccdev= [];
         this.eservices2.push({
           id: m.id,
           name: m.name,
           cc_id: m.cc_id,
           ischecked: m.ischecked,
           service_date: m.service_date
         });
     });
     this.eservices2.sort((m, c) => (m.id) - (c.id));this.eservices2.sort
  }

  getServices(){
    this.cservices = JSON.parse(localStorage.getItem('service'));
    console.log('retrievedServices: ', this.cservices );
    this.cservices.forEach(m =>{
      let i = this.services.findIndex(c => c.id === m.id);
       if(i != -1){
         this.services.splice(i,1);
       }
         // this.ccdev= [];
         this.services.push({
           id: m.id,
           name: m.name,
           cc_id: m.cc_id,
           ischecked: m.ischecked,
           service_date: m.service_date,
           date: m.date
         });
     });
     this.services.sort((m, c) => (m.id) - (c.id));this.services.sort
  }

  fetchSelectedItems() {
    this.selectedServiceList = this.eservices2.filter((value, index) => {
      return value.ischecked
    });
  }
  
  fetchSelectedItems2() {
    this.selectedServiceList2 = this.services.filter((value, index) => {
      return value.ischecked
    });
  }

  submit() {
    this.selectedServiceList = this.eservices2.filter((value, index) => {
      return value.ischecked,
      localStorage.setItem('eservice', JSON.stringify(this.selectedServiceList)),
     this.x = this.selectedServiceList 
    });
  }

  submit2() {
    this.selectedServiceList2 = this.services.filter((value, index) => {
      return value.ischecked,
      localStorage.setItem('service', JSON.stringify(this.selectedServiceList2)),
     this.cservices = this.selectedServiceList2
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

  fetchCheckedIDs2() {
    this.checkedIDs = []
    this.services.forEach((value, index) => {
      if (value.ischecked) {
        this.checkedIDs.push(value.id);
      }
    });
  }
 
  changeSelection() {
    this.fetchSelectedItems()
  }

  changeSelection2() {
    this.fetchSelectedItems2()
  }


  constructor() { 
    this.services.sort(function(a,b){
      return a.date.localeCompare(b.date);
    })
  }

  ngOnInit() {
    this.geteServiceName()
    this.getServices()
    this.fetchSelectedItems()
    this.fetchSelectedItems2()
    this.fetchCheckedIDs()
    this.fetchCheckedIDs2()
  }
}
