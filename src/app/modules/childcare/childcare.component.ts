import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { BirthInformation } from './models/birthinformation.model'
import { AppState } from './app.state';



@Component({
  selector: 'app-childcare',
  templateUrl: './childcare.component.html',
  styleUrls: ['./childcare.component.scss']
})
export class ChildcareComponent implements OnInit {

  module: Number;

  birthinfos: Observable<BirthInformation[]>;

  // Section 2
  constructor(private store: Store<AppState>) { 
    this.birthinfos = store.select('birthinfo');
  }

  ngOnInit(): void {
    this.module=1;
  }

  switchTab(tab){
    this.module = 0;
    this.module = tab;
  }
}
