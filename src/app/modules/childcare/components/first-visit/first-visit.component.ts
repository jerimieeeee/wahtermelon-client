import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faSearch,faBalanceScale,faPlus, faCalendar, faInfoCircle, faCircleNotch, faFloppyDisk, faSave } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { BirthInformation } from '../../models/birthinformation.model';
import { AppState } from '../../app.state';
import * as BirthInformationActions from '../../actions/birthinformation.action';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-first-visit',
  templateUrl: './first-visit.component.html',
  styleUrls: ['./first-visit.component.scss']
})

export class FirstVisitComponent implements OnInit {

  faSearch = faSearch;
  faBalanceScale = faBalanceScale;
  faPlus = faPlus;
  faCalendar = faCalendar;
  faInfoCircle = faInfoCircle;
  faSpinner = faCircleNotch;
  faFloppyDisk = faFloppyDisk;

  is_saving: boolean = false;
  is_saving2: boolean = true;

  is_saving3: boolean = false;
  is_saving4: boolean = true;

  saved: boolean;


  // Section 2
  constructor() { 
    
  }

 

  showAdmissionModal = false;

  toggleAdmissionModal(){
    this.showAdmissionModal = !this.showAdmissionModal;
  }

  saveAdmission(){
    this.is_saving = true;
    this.is_saving2 = false;
    setTimeout(() => {
      this.is_saving = false;
      this.is_saving2 = true;
    }, 5000);
  }

  saveBirth(){
    this.is_saving3 = true;
    this.is_saving4 = false;
    setTimeout(() => {
      this.is_saving3 = false;
      this.is_saving4 = true;
    }, 5000);
  }

  

  ngOnInit() {
    this.saved = true;
 
  }
 
}