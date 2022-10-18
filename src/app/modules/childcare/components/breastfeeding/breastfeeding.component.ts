import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus, faInfoCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup,FormArray,FormControl,Validators,} from '@angular/forms';
import * as moment from 'moment';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

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
  
  toggleBreastfeedingModal(){
    this.showBreastfeedingModal = !this.showBreastfeedingModal;
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
    {code: 'Y', desc: 'Yes'},
    {code: 'N', desc: 'No'},
  ];

  reasons = [
    {code: '00', desc: '-'},
    {code: '01', desc:'Infant nutrition'},
    {code: '02', desc:'Maternal illness'},
    {code: '03', desc:'Infant illness'},
    {code: '04', desc:'Lactation and milk-pumping problems'},
    {code: '05', desc:'Mother returns to work'},
    {code: '06', desc:'Introduced water or solid food'},
  ];

  ccdev = [
    {"id" : "bfed_month1", "name" : "Month 1", "date" : moment(this.todaysDate).add(1, 'M').format('MMM DD, YYYY'), ischecked: false, isDefault: 'N/A', ebf_status: ''},
    {"id" : "bfed_month2", "name" : "Month 2", "date" : moment(this.todaysDate).add(2, 'M').format('MMM DD, YYYY'), ischecked: false, isDefault: 'N/A', ebf_status: ''},
    {"id" : "bfed_month3", "name" : "Month 3", "date" : moment(this.todaysDate).add(3, 'M').format('MMM DD, YYYY'), ischecked: false, isDefault: 'N/A', ebf_status: ''},
    {"id" : "bfed_month4", "name" : "Month 4", "date" : moment(this.todaysDate).add(4, 'M').format('MMM DD, YYYY'), ischecked: false, isDefault: 'N/A', ebf_status: ''},
    {"id" : "bfed_month5", "name" : "Month 5", "date" : moment(this.todaysDate).add(5, 'M').format('MMM DD, YYYY'), ischecked: false, isDefault: 'N/A', ebf_status: ''},
    {"id" : "bfed_month6", "name" : "Month 6", "date" : moment(this.todaysDate).add(6, 'M').format('MMM DD, YYYY'), ischecked: false, isDefault: 'N/A', ebf_status: ''},
  ];
  

  constructor() { 


    
  }
  
  submit() {

    this.selectedMonths = this.ccdev.filter((value, index) => {
      return value.ischecked,
      localStorage.setItem('Breastfeeding Months', JSON.stringify(this.selectedMonths)),
      this.month = this.selectedMonths
    });
  }

  changeSelection() {
    this.fetchSelectedItems()
    console.log(this.selectedMonths)
  }

  fetchSelectedItems() {
    this.selectedMonths= this.ccdev.filter((value, index) => {
      if(!value.ischecked){
        this.ccdev[index].ebf_status=''
      }
      return value.ischecked
    });
    
  }

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.ccdev.forEach((value, index) => {
      if (value.ischecked) {
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
            ischecked: m.ischecked,
            isDefault: m.isDefault,
            ebf_status: m.ebf_status
        });
    });
    this.ccdev.sort((m, c) => new Date(m.date).getTime() - new Date(c.date).getTime());this.ccdev.sort
  }


  ngOnInit(){
    this.fetchSelectedItems()
    this.geteServiceName()
  }

}