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

  tutorials: Observable<BirthInformation[]>;

  // Section 2
  constructor(private store: Store<AppState>) { 
    this.tutorials = store.select('birthinfo');
  }

  ngOnInit() {}

}

