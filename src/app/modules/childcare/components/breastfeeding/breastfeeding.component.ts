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

  
  month: any
  
  faSearch = faSearch;
  faPlus = faPlus;
  faInfoCircle = faInfoCircle;
  todaysDate = new Date();

 
  showBreastfeedingModal = false;
  
  toggleBreastfeedingModal(){
    this.showBreastfeedingModal = !this.showBreastfeedingModal;
  }

  ebf = [
    {code: 'Y', desc: 'Yes'},
    {code: 'N', desc: 'No'},
  ];

  reasons = [
    {code: '01', desc: 'Drinking water instead of milk'},
    {code: '02', desc: 'Drinking water instead of milk'},
    {code: '03', desc: 'Drinking water instead of milk'},
    {code: '04', desc: 'Drinking water instead of milk'},
    {code: '05', desc: 'Drinking water instead of milk'},
  ];

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
  
  
  


  ngOnInit(){
    
  }

}