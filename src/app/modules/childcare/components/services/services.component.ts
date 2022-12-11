import { Component, Input, OnInit } from '@angular/core';
import { faSearch, faPlus, faInfoCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup,FormArray,FormControl,Validators,} from '@angular/forms';
import { faPenToSquare, faPlusSquare, faSave } from '@fortawesome/free-regular-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { Services } from './data/service'
import { DatePipe } from '@angular/common';

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
  faSave = faSave;

  is_saving: boolean = false;

  // defaultDate = new Date().toISOString().slice(0, 16);
  defaultDate = new Date().toLocaleDateString('en-CA')

  services= [
    { id: 1, name: 'Complementary Feeding', cc_id: 'FEED', date: 'Mar 24 2012 10:00:00 AM', ischecked: false, service_date: '', done_outside: ''},
    { id: 2, name: 'Dental Checkup', cc_id: 'DENTAL', date: 'Mar 12 2012 10:00:00 AM', ischecked: false, service_date: '', done_outside: ''},
    { id: 3, name: 'Deworming', cc_id: 'DEWORM', date: 'Mar 01 2012 10:00:00 AM', ischecked: false, service_date: '', done_outside: ''},
    { id: 4, name: 'Iron Intake', cc_id: 'IRON', date: 'Mar 26 2012 10:00:00 AM', ischecked: false, service_date: '', done_outside: ''},
    { id: 5, name: 'Newborn Hearing Screening',  cc_id: 'NBHS', date: 'Mar 14 2012 10:00:00 AM', ischecked: false, service_date: '', done_outside: ''},
    { id: 6, name: 'Newborn Screening Done', cc_id: 'NBSDONE', date: 'Mar 12 2012 10:00:00 AM', ishecked: false, service_date: '', done_outside: ''},
    { id: 7, name: 'Newborn Screening Referred', cc_id: 'NBSREF', date: 'Mar 15 2012 10:00:00 AM', ischecked: false, service_date: '', done_outside: ''},
    { id: 8, name: 'Received Micronutrient Powder', cc_id: 'MNP', date: 'Mar 09 2012 10:00:00 AM', ischecked: false, service_date: '', done_outside: ''},
    { id: 9, name: 'Vitamin A', cc_id: 'VITA', date: 'Mar 13 2012 10:00:00 AM', ischecked: false, service_date: '', done_outside: ''},
    
  ];

 

 eservices2= [
    { id: 1, name: 'Cord Clamping', cc_id: 'CLAMP', ischecked: false, service_date: ''},
    { id: 2, name: 'Drying', cc_id: 'DRYING', ischecked: false, service_date: ''},
    { id: 3, name: 'Non-Separation', cc_id: 'NONSEP', ischecked: false, service_date: ''},
    { id: 4, name: 'Prophylaxis', cc_id: 'PROP', ischecked: false, service_date: ''},
    { id: 5, name: 'Skin to Skin', cc_id: 'SKIN', ischecked: false, service_date: ''},
    { id: 6, name: 'Vitamin K', cc_id: 'VITK', ishecked: false, service_date: ''},
    { id: 7, name: 'Weighing', cc_id: 'WEIGHT', ischecked: false, service_date: ''},
  ];

  // newarr = this.services.sort((a, b) => a.id - b.id);
  libReasons = [
    {value: 'R', id: '1', desc:'infant nutrition'},
    {value: 'W', id: '2', desc:'maternal illness'},
    {value: 'W', id: '2', desc:'infant illness'},
    {value: 'W', id: '2', desc:'lactation and milk-pumping problems'},
    {value: 'W', id: '2', desc:'mother returns to work'},
    {value: 'W', id: '2', desc:'introduced water or solid food'},
    ];

    libOptions = [
      {value: 'YPR', id: '1', desc:'Yes - Private'},
      {value: 'YPB', id: '2', desc:'Yes - Public'},
      {value: 'N', id: '3', desc:'No'},
      
      ];

 showEssentialModal = false;

  ccservicename: any;
  lib_ccservices: any;
  patient_info: any;
  cc_newborn: any;

  serviceForm: any = {
    service_status: [] ,
    service_date: []
  };
  services_given= [];
  service_list = Services;
  modalFilter: any;
  alertFilter: any;
  showAlert = false;

  toggleAlertModal(value: any){
    this.alertFilter = value;
    this.showAlert = !this.showAlert;
  }

  toggleEssentialModal(value: any){
    console.log('toggleEssentialModal');
    this.modalFilter = value;
    this.showEssentialModal = !this.showEssentialModal;
    this.loadServicesTest()
    this.getccdevDetails()
  }

  showServiceModal = false;
  toggleServiceModal(){
    this.showServiceModal = !this.showServiceModal;
    this.getServices();
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
    
    if(!localStorage.getItem('eservice'))
    {
      localStorage.setItem('eservice', JSON.stringify([]))
    }
      
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
   
    if(!localStorage.getItem('service'))
    {
      localStorage.setItem('service', JSON.stringify([]))
    }

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
           date: m.date,
           done_outside : m.done_outside
         });
     });
     this.services.sort((m, c) => (m.id) - (c.id));this.services.sort
  }

  fetchSelectedItems() {

    this.selectedServiceList = this.eservices2.filter((value, index) => {
      
      if(!value.ischecked){
        this.eservices2[index].service_date=''
      }
      console.log('fetchSelectedItems');
      
      return value.ischecked
    });
    
  }

  setDate(i: any) {
    this.selectedServiceList = this.lib_ccservices.filter((value, index) => {
      if(value.ischecked && index == i){
        this.lib_ccservices[index].service_date=this.defaultDate
      }else if(!value.ischecked && index == i){
        this.lib_ccservices[index].service_date=''
      }
      return value.ischecked
    });
    
  }

  setDate2(i: any) {
    this.selectedServiceList = this.services.filter((value, index) => {
      if(value.ischecked && index == i){
        this.services[index].service_date=this.defaultDate
      }else if(!value.ischecked && index == i){
        this.services[index].service_date=''
      }
      return value.ischecked
    });
    
  }
  
  fetchSelectedItems2() {
    this.selectedServiceList2 = this.services.filter((value, index) => {
      if(!value.ischecked){
        this.services[index].service_date=''
        this.services[index].done_outside=''
      }
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
 
  changeSelection(i: any) {
    // this.fetchSelectedItems()
    this.setDate(i)
    // console.log(this.selectedServiceList, 'sadsad')
  }

  changeSelection2(i:any) {
    this.setDate2(i)
    this.fetchSelectedItems2()
  }

  checkUncheckAll(evt) {
    this.eservices2.forEach((c) => (c.ischecked = evt.target.checked));
  }

  @Input() patient_details: any;
  
  constructor(private http: HttpService) { 
    this.services.sort(function(a,b){
      return a.date.localeCompare(b.date);
    })
  }

  loadCCLibraries(){
    this.loadServices()
    this.http.get('libraries/cc-services').subscribe((data: any) => {
      this.lib_ccservices = data.data
      console.log(this.lib_ccservices, 'cc dev services library');
      // console.log(this.patient_details.id, 'awaw')
    });
  }

  // onSubmit(){
  //   this.selectedServiceList = this.lib_ccservices.filter((value, index) => {
  //     return value.ischecked
  //   });

  //   let user_id = localStorage.getItem('user_id');
  //   var newborndata ={
     
  //     patient_id: this.patient_details.id,
  //     user_id: user_id,
  //     services: this.selectedServiceList
  //   }

  //   console.log(newborndata);

  //   this.http.post('child-care/cc-services', newborndata).subscribe({
  //     next: (data: any) => console.log(data.status, 'check status'),
  //     error: err => console.log(err),
  //     complete: () => {
  //       // this.loadLibraries();
  //       console.log('essential newborn data saved')
  //       this.loadServices()
  //     }
  //   })

  // }
  onChange(){
    console.log(this.serviceForm.service_status, 'ng model check')
    console.log(this.serviceForm.service_date, 'ng model check')
  }

  submitNBS(){
    
  
 
    var nbsfilter ={
      nbs_filter: this.patient_info.nbs_filter,
    }

    console.log(nbsfilter);

    this.http.update('child-care/cc-records/', this.patient_info.id, nbsfilter).subscribe({
      // next: (data: any) => console.log(data.status, 'check status'),
      error: err => console.log(err),
      complete: () => {
        // this.loadLibraries();
        console.log(nbsfilter,'nbs filter data saved')
        this.is_saving = false;
      }
    })
  }


  onSubmit(){
    this.submitNBS()
    var service_arr = [];

    console.log(this.serviceForm)
    Object.entries(this.serviceForm.service_status).forEach(([key, value], index) => {
      if(value != '-'){
        let service = {
          service_id: key,
          service_date: this.serviceForm.service_date[key] ? this.serviceForm.service_date[key] : null,
          status_id: value
        };

        service_arr.push(service);
      }
    })

    if(service_arr.length > 0){
      let user_id =this.http.getUserID();
      // let user_id = localStorage.getItem('user_id');
      let patient_id = this.patient_details.id
      var serv_form ={
        essential: this.modalFilter,
        patient_id: patient_id,
        user_id: user_id,
        services: service_arr
      }

      console.log(serv_form, 'ito ung isusubmit')

      this.http.post('child-care/cc-services', serv_form).subscribe({
        next: (data: any) => { console.log(data.data, 'display lahat ng services') },
        error: err => {console.log(err),
          this.toggleAlertModal('E')},
        complete: () => this.toggleAlertModal('S')
      })
    }
  }

  checkServiceStatus(services){
    var new_serv = [];
    Object.entries(services).reverse().forEach(([key, value], index) => {
      var val:any = value
      if(!new_serv[val.services.service_id]) new_serv[val.services.service_id] = []

      let vax = {
        id: val.id,
        service_id: val.services.service_id,
        service_date: val.service_date,
        dose: this.getNumberSuffix(Object.keys(new_serv[val.services.service_id]).length + 1)
      }

      new_serv[val.services.service_id][val.id] = vax
    })

    this.services_given = new_serv;
    this.addDose(new_serv)
  }

  getNumberSuffix(i){
    var j = i % 10,
    k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
  }

  addDose(new_serv){
    Object.entries(this.service_list).forEach(([key, value], index) => {
      var val:any = value;

      this.service_list[key]['dose'] = new_serv[val.services.service_id][val.id].dose;
    });
  }

  findEssential(service_list: any[]): any[] {
    return service_list.filter(e => e.services.essential == 'Y');
  }

  findServices(service_list: any[]): any[] {
    return service_list.filter(e => e.services.essential == 'N');
  }

  loadServicesTest(){
    this.http.get('child-care/cc-services', {params:{patient_id: this.patient_details.id, sort:'service_id'}}).subscribe({
      next: (data: any) => {
        console.log(data)
        this.service_list = data.data;
      //   data.data.sort(function(a, b) { 
      //     return (a.services.service_name - b.services.service_name) || a.services.service_name.localeCompare(b.services.service_id); 
      // });
      
        
        this.serviceForm = {
          service_status: [],
          service_date: []
        }
        data.data.forEach((value) => {
          // console.log(value)
          this.serviceForm.service_status[value.service_id] = value.status_id;
          this.serviceForm.service_date[value.service_id] = value.service_date;
          // serv2.service_date['value.status_id'] = value.s
        })

        // this.serviceForm = serv2;
        // console.log(this.serviceForm.service_status.CC);
        // console.log(this.serviceForm, 'test serv 2')
      },
      error: err => console.log(err),
      complete: () => console.log(this.service_list,'services loaded')
      
    })
  }
 


  loadServices(){

    this.http.get('child-care/cc-services', {params:{patient_id: this.patient_details.id, sort:'service_id'}}).subscribe({
      next: (data: any) => {
        this.cc_newborn = data.data;
      },
  
      error: err => console.log(err),
      complete: () => {
        // this.loadLibraries();
        // console.log(this.cc_newborn, 'data ng cc new born');
      }
    })
  }

  getccdevDetails() {
    this.http.get('child-care/cc-records/'+this.patient_details.id)
    .subscribe({
      next: (data: any) => {
        this.patient_info = data.data;
        // console.log(this.patient_info, 'info ccdev first visit')
        
      },
      error: err => {console.log(err) }
    });
  }
  

  ngOnInit() {
    // this.geteServiceName()
    // this.getServices()
    // this.fetchSelectedItems()
    // this.fetchSelectedItems2()
    // this.fetchCheckedIDs()
    // this.fetchCheckedIDs2()
    this.loadCCLibraries()
    // this.getccdevDetails()
    if(this.patient_details.id) this.loadServicesTest()
  }
}
