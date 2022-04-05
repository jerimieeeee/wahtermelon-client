import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faSearch,faBalanceScale,faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { BirthInfoWeight } from '../../models/birthweight.model';
import { AppState } from '../../app.state';
import * as TutorialActions from '../../actions/birthweight.action';



@Component({
  selector: 'app-first-visit',
  templateUrl: './first-visit.component.html',
  styleUrls: ['./first-visit.component.scss']
})

export class FirstVisitComponent implements OnInit {

  faSearch = faSearch;
  faBalanceScale = faBalanceScale;
  faPlus = faPlus;

  tutorials: Observable<BirthInfoWeight[]>;

  saved: boolean;

  // Section 2
  constructor(private store: Store<AppState>) { 
    this.tutorials = store.select('tutorial');
  }

  addWeight(weight, mname) {
    this.store.dispatch(new TutorialActions.AddWeight({weight: weight, mname: mname}) )
    console.log({weight: weight, mname: mname});
    this.saved = true;
  }

  

  ngOnInit() {
    this.saved = false;
  }
 
}