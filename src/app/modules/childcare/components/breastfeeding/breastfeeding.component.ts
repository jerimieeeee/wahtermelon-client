import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

@Component({
  selector: 'app-breastfeeding',
  templateUrl: './breastfeeding.component.html',
  styleUrls: ['./breastfeeding.component.scss']
})
export class BreastfeedingComponent implements OnInit {

  months : any
  
  faSearch = faSearch;
  faPlus = faPlus;
  public ccdev : any
  todaysDate = new Date();

  showBreastfeedingModal = false;
  toggleBreastfeedingModal(){
    this.showBreastfeedingModal = !this.showBreastfeedingModal;
  }

  bfed_month = [
    {"id" : "bfed_month1", "name" : "Month 1", "date" : moment(this.todaysDate).add(1, 'M').format('MMM DD, YYYY')},
    {"id" : "bfed_month2", "name" : "Month 2", "date" : moment(this.todaysDate).add(2, 'M').format('MMM DD, YYYY')},
    {"id" : "bfed_month3", "name" : "Month 3", "date" : moment(this.todaysDate).add(3, 'M').format('MMM DD, YYYY')},
    {"id" : "bfed_month4", "name" : "Month 4", "date" : moment(this.todaysDate).add(4, 'M').format('MMM DD, YYYY')},
    {"id" : "bfed_month5", "name" : "Month 5", "date" : moment(this.todaysDate).add(5, 'M').format('MMM DD, YYYY')},
    {"id" : "bfed_month6", "name" : "Month 6", "date" : moment(this.todaysDate).add(6, 'M').format('MMM DD, YYYY')},
  ];

  constructor() { 
    this.ccdev = [
      { bfed_month1: 'N', bfed_month2: 'N', bfed_month3: 'N', bfed_month4: 'N', bfed_month5: 'N', bfed_month6: 'N', }
    ];
    this.months = [
      { name: 'Month 1', selected: false },
      { name: 'Month 2', selected: false },
      { name: 'Month 3', selected: false },
      { name: 'Month 4', selected: false },
      { name: 'Month 5', selected: false },
      { name: 'Month 6', selected: false },
      { name: 'Month 7', selected: false },
    ]
  }
  
  save_breastfed(ccdev){
    if(this.ccdev.bfed_month1 == "Y" &&
    this.ccdev.bfed_month2 == "Y" &&
    this.ccdev.bfed_month3 == "Y" &&
    this.ccdev.bfed_month4 == "Y" &&
    this.ccdev.bfed_month5 == "Y" &&
    this.ccdev.bfed_month6 == "Y"){
      var ebf_date = ebf_date != null ? moment(new Date(ebf_date)).format('YYYY-MM-DD') : null;
    }else{
      var ebf_date = null;
    }
    this.ccdev.push(this.ccdev.bfed_month1),
    console.log(this.ccdev.bfed_month1)
  }


  ngOnInit(): void {
    console.log(this.bfed_month)
    console.log(this.ccdev)
  }

}
