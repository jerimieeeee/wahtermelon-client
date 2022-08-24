import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faSearch,faBalanceScale,faPlus, faCalendar, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
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

  saved: boolean;


  // Section 2
  constructor() { 
    
  }

 

  showAdmissionModal = false;

  toggleAdmissionModal(){
    this.showAdmissionModal = !this.showAdmissionModal;
  }

  

  

  ngOnInit() {
    this.saved = true;
 
  }
 
}