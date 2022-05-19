import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup,FormArray,FormControl,Validators,} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-breastfeeding',
  templateUrl: './breastfeeding.component.html',
  styleUrls: ['./breastfeeding.component.scss']
})
export class BreastfeedingComponent implements OnInit {

  selectedMonths = [];
  checkedIDs=[];

  month: any
  
  faSearch = faSearch;
  faPlus = faPlus;
  faInfoCircle = faInfoCircle;
  todaysDate = new Date();

  breastfedForm = new FormGroup({
    breastfedDate: new FormControl()
  });

  showBreastfeedingModal = false;
  
  toggleBreastfeedingModal(){
    this.showBreastfeedingModal = !this.showBreastfeedingModal;
  }

  ccdev = [
    {"id" : "bfed_month1", "name" : "Month 1", "date" : moment(this.todaysDate).add(1, 'M').format('MMM DD, YYYY'), ischecked: false},
    {"id" : "bfed_month2", "name" : "Month 2", "date" : moment(this.todaysDate).add(2, 'M').format('MMM DD, YYYY'), ischecked: false},
    {"id" : "bfed_month3", "name" : "Month 3", "date" : moment(this.todaysDate).add(3, 'M').format('MMM DD, YYYY'), ischecked: false},
    {"id" : "bfed_month4", "name" : "Month 4", "date" : moment(this.todaysDate).add(4, 'M').format('MMM DD, YYYY'), ischecked: false},
    {"id" : "bfed_month5", "name" : "Month 5", "date" : moment(this.todaysDate).add(5, 'M').format('MMM DD, YYYY'), ischecked: false},
    {"id" : "bfed_month6", "name" : "Month 6", "date" : moment(this.todaysDate).add(6, 'M').format('MMM DD, YYYY'), ischecked: false},
  ];

  constructor() { 

  }
  
  submit() {

    this.selectedMonths = this.ccdev.filter((value, index) => {
      return value.ischecked,
      localStorage.setItem('Breastfed Months', JSON.stringify(this.selectedMonths))
    });
  }

  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    this.selectedMonths= this.ccdev.filter((value, index) => {
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
    this.month = JSON.parse(localStorage.getItem('Breastfed Months'));
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
            ischecked: m.ischecked
        });
    });
    this.ccdev.sort((m, c) => new Date(m.date).getTime() - new Date(c.date).getTime());this.ccdev.sort
  }


  ngOnInit(){
    this.geteServiceName()
  }

}
