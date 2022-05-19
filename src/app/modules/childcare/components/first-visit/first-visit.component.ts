import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faSearch,faBalanceScale,faPlus, faCalendar, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { BirthInformation } from '../../models/birthinformation.model';
import { AppState } from '../../app.state';
import * as BirthInformationActions from '../../actions/birthinformation.action';
import { localStorageSync } from 'ngrx-store-localstorage';
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

  birthinfos: Observable<BirthInformation[]>;

  saved: boolean;
  saved2: boolean;

  minDate: Date;
  maxDate: Date;

  x: any;
  y: any;

  mandoForm = new FormGroup({
    admissionDate: new FormControl(),
    dischargedDate: new FormControl()
  });

  // Section 2
  constructor(private store: Store<AppState>) { 
    this.birthinfos = store.select('birthinfo');
  }


  addWeight(weight, mname) {
    this.store.dispatch(new BirthInformationActions.AddWeight({weight: weight, mname: mname}) )
    localStorage.setItem('keyset', JSON.stringify({weight,mname}));
    console.log({weight: weight, mname: mname});
    this.saved = true;
  }

  getName(){
    this.x = JSON.parse(localStorage.getItem('keyset'));
    console.log('retrievedObject: ', this.x);
  }

  doubleFunction() {
    this.onFormSubmit();
    this.toggleAdmissionModal();
 }

 onFormSubmit(): void {
  console.log('Admission Date:' + this.mandoForm.get('admissionDate').value);
  console.log('Discharged Date:' + this.mandoForm.get('dischargedDate').value);
  localStorage.setItem('form-data', JSON.stringify(this.mandoForm.value));

  this.saved2 = true; 
  
}

getDate(){
  this.y = JSON.parse(localStorage.getItem('form-data'));
  console.log('retrievedDate: ', this.y);
}

  showAdmissionModal = false;
  toggleAdmissionModal(){
    this.showAdmissionModal = !this.showAdmissionModal;
  }

  

  

  ngOnInit() {
    this.getName();
    this.getDate();
    this.saved = false;
    this.saved2 = false;
  }
 
}