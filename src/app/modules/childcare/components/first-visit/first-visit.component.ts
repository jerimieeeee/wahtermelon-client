import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faSearch,faBalanceScale,faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { BirthInformation } from '../../models/birthinformation.model';
import { AppState } from '../../app.state';
import * as BirthInformationActions from '../../actions/birthinformation.action';
import { localStorageSync } from 'ngrx-store-localstorage';



@Component({
  selector: 'app-first-visit',
  templateUrl: './first-visit.component.html',
  styleUrls: ['./first-visit.component.scss']
})

export class FirstVisitComponent implements OnInit {

  faSearch = faSearch;
  faBalanceScale = faBalanceScale;
  faPlus = faPlus;

  birthinfos: Observable<BirthInformation[]>;

  saved: boolean;

  mandoForm = new FormGroup({
    admissionDate: new FormControl(),
    dischargedDate: new FormControl()
  });
  
  onFormSubmit(): void {
    console.log('Admission Date:' + this.mandoForm.get('admissionDate').value);
    console.log('Discharged Date:' + this.mandoForm.get('dischargedDate').value);
    localStorage.setItem('form-data', JSON.stringify(this.mandoForm.value));
    
  }
  

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
    var x = JSON.parse(localStorage.getItem('keyset'));
    console.log('retrievedObject: ', x);
  }

  

  ngOnInit() {
     this.saved = false;
  }
 
}