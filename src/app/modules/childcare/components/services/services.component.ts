import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus,faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup,FormArray,FormControl,Validators,} from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  selectedServiceList = [];
  selectedServiceList2 = [];
  checkedIDs = [];
  checkedIDs2 = [];
  
  x: any;
  z2: any;

  saved: boolean;

  faSearch = faSearch;
  faPlus = faPlus;
  faInfoCircle = faInfoCircle;

  defaultDate = new Date().toISOString().slice(0, 16);

  serviceForm = new FormGroup({
    serviceDate: new FormControl()
  });

  serviceForm2 = new FormGroup({
    serviceDate2: new FormControl()
  });

  services= [
    { id: 1, name: 'Complimentary Feeding', cc_id: 'FEED', ischecked: false},
    { id: 2, name: 'Dental Checkup', cc_id: 'DENTAL', ischecked: false},
    { id: 3, name: 'Newborn Hearing Screening', cc_id: 'NBHS', ischecked: false},
    { id: 4, name: 'Iron Intake', cc_id: 'IRON', ischecked: false},
    { id: 5, name: 'Received Micronutrient Powder', cc_id: 'MNP', ischecked: false},
    { id: 6, name: 'Newborn Screening Done', cc_id: 'NBSDONE', ishecked: false},
    { id: 7, name: 'Newborn Screening Referred', cc_id: 'NBSREF', ischecked: false},
    { id: 8, name: 'Vitamin A', cc_id: 'VITA', ischecked: false},
    { id: 9, name: 'Deworming', cc_id: 'DEWORM', ischecked: false},
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
             cc_id :m.cc_id,
             ischecked: m.ischecked,
         });
     });
     this.eservices2.sort((m, c) => (m.id) - (c.id));this.eservices2.sort
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

  fetchSelectedItems2() {
    this.selectedServiceList2 = this.services.filter((value, index) => {
      return value.ischecked
    });
  }

  submit2() {
    this.selectedServiceList2 = this.services.filter((value, index) => {
      return value.ischecked,
      console.log('Service2 Date:' + this.serviceForm2.get('serviceDate2').value),
      localStorage.setItem('service', JSON.stringify(this.selectedServiceList2)),
      localStorage.setItem('serviceDate2', JSON.stringify(this.serviceForm2.value))
      
    });
  }

  fetchCheckedIDs2() {
    this.checkedIDs2 = []
    this.services.forEach((value, index) => {
      if (value.ischecked) {
        this.checkedIDs2.push(value.id);
      }
    });
  }
 
  changeSelection2() {
    this.fetchSelectedItems2()
  }

  geteServiceName2(){
    this.ccservicename = JSON.parse(localStorage.getItem('service'));
    console.log('retrievedServices: ', this.ccservicename );
    this.ccservicename.forEach(m =>{
      let i = this.services.findIndex(c => c.id === m.id);
       if(i != -1){
         this.services.splice(i,1);
       }
         // this.ccdev= [];
         this.services.push({
             id: m.id,
             name: m.name,
             cc_id :m.cc_id,
             ischecked: m.ischecked,
             
         });
     });
     this.services.sort((m, c) => (m.id) - (c.id));this.services.sort
  }


  constructor() { 

  }

  ngOnInit() {
    this.geteServiceName()
    this.geteServiceName2()
    this.fetchSelectedItems()
    this.fetchSelectedItems2()
    this.fetchCheckedIDs()
    this.serviceForm = new FormGroup({
     serviceDate: new FormControl((new Date()).toISOString().substring(0,10))
    }); 
    this.serviceForm2 = new FormGroup({
      serviceDate2: new FormControl((new Date()).toISOString().substring(0,10))
    });
  }
}
