import { Component, OnInit } from '@angular/core';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { MedicalHistory, SocialHistory } from './data/lib';
import { faSave } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  faSpinner = faSpinner;
  faSave = faSave;
  faPlus = faPlus;

  lib_medical_history = MedicalHistory;
  lib_social_history = SocialHistory;

  is_saving: boolean = false;
  constructor() { }

  saveConsult(){
    this.is_saving = true;

    setTimeout(() => {
      this.is_saving = false;
    }, 5000);
  }

  addHospHistory() {

  }

  ngOnInit(): void {
  }

}
