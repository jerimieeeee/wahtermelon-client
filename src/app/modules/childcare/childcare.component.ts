import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { BirthInfoWeight } from './models/birthweight.model';
import { AppState } from './app.state';



@Component({
  selector: 'app-childcare',
  templateUrl: './childcare.component.html',
  styleUrls: ['./childcare.component.scss']
})
export class ChildcareComponent implements OnInit {

  tutorials: Observable<BirthInfoWeight[]>;

  // Section 2
  constructor(private store: Store<AppState>) { 
    this.tutorials = store.select('tutorial');
  }

  ngOnInit() {}

}

