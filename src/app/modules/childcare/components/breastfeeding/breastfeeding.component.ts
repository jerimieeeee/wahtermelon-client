import { Component, Input, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus, faInfoCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup,FormArray,FormControl,Validators,} from '@angular/forms';
import * as moment from 'moment';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-breastfeeding',
  templateUrl: './breastfeeding.component.html',
  styleUrls: ['./breastfeeding.component.scss']
})
export class BreastfeedingComponent implements OnInit {


  month: any
  selectedItem: any
  selectedItemsList = [];
  selectedMonths = [];
  checkedIDs = [];
  showData: any

  faSearch = faSearch;
  faPlus = faPlus;
  faInfoCircle = faInfoCircle;
  faSpinner = faCircleNotch;
  faPenToSquare = faPenToSquare;

  is_saving: boolean = false;

  todaysDate = new Date();


  showBreastfeedingModal = false;
  lib_reasons: any;

  toggleBreastfeedingModal(){
    this.showBreastfeedingModal = !this.showBreastfeedingModal;
    this.geteServiceName();
  }

  saveModal(){
    this.is_saving = true;

    setTimeout(() => {
      this.is_saving = false;
    }, 5000);
  }

  getSelected(event: any){
    console.log(event.target.value)
    if(event.target.value === 'N')
    {
      this.showData=true;
    }
    else{
      this.showData=false;
    }
}

// changeSelection() {
//   this.fetchSelectedItems()
// }

// fetchSelectedItems() {
//   this.selectedItemsList = this.ccdev.filter((value, index) => {
//     return value.isChecked
//   });
//   console.log(this.selectedItemsList)
// }


  ebf = [
    {code: '1', desc: 'Yes'},
    {code: '0', desc: 'No'},
  ];

  // reasons = [
  //   {code: '00', desc: '-'},
  //   {code: '01', desc:'Infant nutrition'},
  //   {code: '02', desc:'Maternal illness'},
  //   {code: '03', desc:'Infant illness'},
  //   {code: '04', desc:'Lactation and milk-pumping problems'},
  //   {code: '05', desc:'Mother returns to work'},
  //   {code: '06', desc:'Introduced water or solid food'},
  // ];

  ccdev = [
    {"id" : "bfed_month1", "name" : "Month 1", "date" : moment(this.todaysDate).add(1, 'M').format('MMM DD, YYYY'), selected: false, isDefault: 'N/A'},
    {"id" : "bfed_month2", "name" : "Month 2", "date" : moment(this.todaysDate).add(2, 'M').format('MMM DD, YYYY'), selected: false, isDefault: 'N/A'},
    {"id" : "bfed_month3", "name" : "Month 3", "date" : moment(this.todaysDate).add(3, 'M').format('MMM DD, YYYY'), selected: false, isDefault: 'N/A'},
    {"id" : "bfed_month4", "name" : "Month 4", "date" : moment(this.todaysDate).add(4, 'M').format('MMM DD, YYYY'), selected: false, isDefault: 'N/A'},
    {"id" : "bfed_month5", "name" : "Month 5", "date" : moment(this.todaysDate).add(5, 'M').format('MMM DD, YYYY'), selected: false, isDefault: 'N/A'},
    {"id" : "bfed_month6", "name" : "Month 6", "date" : moment(this.todaysDate).add(6, 'M').format('MMM DD, YYYY'), selected: false, isDefault: 'N/A'},
  ];

  ccdevbreast = 21;
  patient_breastfed: any;

  groupList = [];
  groupList2 = [];
  arrayVal:any;

  patient_info: any;


  @Input() patient_details: any;

  constructor(private http: HttpService) {



  }

  submit() {
    this.selectedMonths = this.ccdev.filter((value, index) => {
      return value.selected,
      localStorage.setItem('Breastfeeding Months', JSON.stringify(this.selectedMonths)),
      this.month = this.selectedMonths
    });

  }

  changeSelection(i: any, value: any) {


    this.ccdev[i].selected = value;
    // this.fetchSelectedItems()
    this.getPrev()
    console.log(this.groupList)
  }

  fetchSelectedItems() {
    this.selectedMonths= this.ccdev.filter((value, index) => {
      this.selectedMonths.push(value.selected)
      return value.selected
    });
  }

  getPrev(){
    this.groupList = [];
    this.ccdev.forEach((item, index) => {

    this.groupList.push(item.selected);

    });

    console.log(this.groupList);
    let user_id = localStorage.getItem('user_id');
    var bfedmonths ={
      patient_ccdevs_id: this.patient_info[0].id,
      patient_id: this.patient_info[0].patient_id,
      user_id: user_id,
      bfed_month1: this.groupList[0] == 1 ? 1:0,
      bfed_month2: this.groupList[1] == 1 ? 1:0,
      bfed_month3: this.groupList[2] == 1 ? 1:0,
      bfed_month4: this.groupList[3] == 1 ? 1:0,
      bfed_month5: this.groupList[4] == 1 ? 1:0,
      bfed_month6: this.groupList[5] == 1 ? 1:0,
      reason_id: '',
      ebf_date: '',
    }

    console.log(bfedmonths);

    // this.http.post('child-care/cc-breastfed', bfedmonths).subscribe({
    //   // next: (data: any) => console.log(data.status, 'check status'),
    //   error: err => console.log(err),
    //   complete: () => {
    //     console.log('bfed data saved')
    //     this.is_saving = false;
    //   }
    // })
  }

  onSubmit(){
    this.groupList = [];
    this.ccdev.forEach((item, index) => {

    this.groupList.push(item.selected);

    });

    console.log(this.groupList);
    let user_id = localStorage.getItem('user_id');
    var bfedmonths ={
      patient_ccdevs_id: this.patient_info[0].id,
      patient_id: this.patient_info[0].patient_id,
      user_id: user_id,
      bfed_month1: this.groupList[0] == 1 ? 1:0,
      bfed_month2: this.groupList[1] == 1 ? 1:0,
      bfed_month3: this.groupList[2] == 1 ? 1:0,
      bfed_month4: this.groupList[3] == 1 ? 1:0,
      bfed_month5: this.groupList[4] == 1 ? 1:0,
      bfed_month6: this.groupList[5] == 1 ? 1:0,
      reason_id: '',
      ebf_date: '',
    }

    console.log(bfedmonths);

    this.http.post('child-care/cc-breastfed', bfedmonths).subscribe({
      // next: (data: any) => console.log(data.status, 'check status'),
      error: err => console.log(err),
      complete: () => {
        console.log('bfed data saved')
        this.is_saving = false;
      }
    })
  }

getccdevDetails() {
  this.http.get('child-care/cc-records/'+this.patient_details.id)
  .subscribe({
    next: (data: any) => {
      this.patient_info = data;
      console.log(this.patient_info[0], 'load ccdev info on breastfeeding')

    },
    error: err => console.log(err)
  });
}

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.ccdev.forEach((value, index) => {
      if (value.selected) {
        this.checkedIDs.push(value.id);
      }
    });
  }

  geteServiceName(){

    if(!localStorage.getItem('Breastfeeding Months'))
    {
      localStorage.setItem('Breastfeeding Months', JSON.stringify([]))
    }

    this.month = JSON.parse(localStorage.getItem('Breastfeeding Months'));
    console.log('retrievedBreastfedMonths: ', this.month );
    this.month.forEach(m =>{
     let i = this.ccdev.findIndex(c => c.id === m.id);
      if(i != -1){
        this.ccdev.splice(i,1);
      }
        // this.ccdev= [];
        this.ccdev.push({
            id: m.id,
            name: m.name,
            date: m.date,
            selected: this.groupList2[i],
            isDefault: m.isDefault,
        });
    });
    this.ccdev.sort((m, c) => new Date(m.date).getTime() - new Date(c.date).getTime());this.ccdev.sort
  }

  loadLibraries(){

  this.http.get('libraries/reason').subscribe((data: any) => {
    this.lib_reasons = data.data
    console.log(data);
  });
}

loadBreastfed(){
  this.groupList2 = [];
  var lib = ['bfed_month1','bfed_month2','bfed_month3','bfed_month4','bfed_month5','bfed_month6'];
  console.log(lib[0], " try lib");

  this.http.get('child-care/cc-breastfed/'+this.ccdevbreast)
    .subscribe((data: any) => {
    this.patient_breastfed = data.data
    console.log(this.patient_breastfed, 'data ng breast fed');

    // this.groupList2.push(this.patient_breastfed.bfed_month1);
    // this.groupList2.push(this.patient_breastfed.bfed_month2);
    // this.groupList2.push(this.patient_breastfed.bfed_month3);
    // this.groupList2.push(this.patient_breastfed.bfed_month4);
    // this.groupList2.push(this.patient_breastfed.bfed_month5);
    // this.groupList2.push(this.patient_breastfed.bfed_month6);

    lib.forEach((obj, index) => {
      this.groupList2.push(this.patient_breastfed[obj]);
      this.ccdev[index].selected = this.patient_breastfed[obj];
      console.log(this.ccdev[index].selected, " try ccdev");

    })
    console.log(this.groupList2, 'data ng breast fed v2')
  });
}


  ngOnInit(){
    // this.fetchSelectedItems()
    this.loadBreastfed()
    // this.geteServiceName()
    this.loadLibraries();

    this.getccdevDetails()
  }

}
