import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-breastfeeding',
  templateUrl: './breastfeeding.component.html',
  styleUrls: ['./breastfeeding.component.scss']
})
export class BreastfeedingComponent implements OnInit {

  months : any
  
  faSearch = faSearch;
  faPlus = faPlus;

  showBreastfeedingModal = false;
  toggleBreastfeedingModal(){
    this.showBreastfeedingModal = !this.showBreastfeedingModal;
  }

  constructor() { 

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

  ngOnInit(): void {
  }

}
