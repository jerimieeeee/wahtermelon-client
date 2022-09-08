import { Component, OnInit } from '@angular/core';
import { faSearch, faBalanceScale, faPlus, faCalendar, faInfoCircle, faCircleNotch, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss']
})
export class DrugsComponent implements OnInit {

  faSearch = faSearch;
  faPlus = faPlus;
  faClose = faClose


  is_searching: boolean = true;
  is_searching2: boolean = false;

  is_searching3: boolean = true;
  is_searching4: boolean = false;

  showDrugListModal = false;
  showAddDrugModal = false;
  
  toggleDrugListModal(){
    this.showDrugListModal = !this.showDrugListModal;
  }

  toggleAddDrugModal(){
    this.showAddDrugModal = !this.showAddDrugModal;
    this.showDrugListModal = !this.showDrugListModal;
  }

  toggleCloseModal(){
    this.showAddDrugModal = !this.showAddDrugModal;
  }

  toggleSearch(){
    this.is_searching = false;
    this.is_searching2= true;
  }

  toggleSearchRev(){
    this.is_searching = true;
    this.is_searching2= false;
  }

  toggleSearch2(){
    this.is_searching3 = false;
    this.is_searching4= true;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
