import { Component, OnInit } from '@angular/core';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { MedicalHistory, SocialHistory } from './data/lib';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  faSpinner = faSpinner;
  faSave = faSave;
  faPlus = faPlus;

  lib_medical_history: any;
  lib_social_history: any;

  is_saving: boolean = false;

  onSubmit(){
    this.is_saving = true;

    setTimeout(() => {
      this.is_saving = false;
    }, 5000);
  }

  loadLibraries(){
    const getMedicalHistory = this.http.get('libraries/dental-medical-history');
    const getSocialHistory = this.http.get('libraries/dental-social-history');

    forkJoin([ getMedicalHistory, getSocialHistory]).subscribe({
      next:([ dataMedicalHistory, dataSocialHistory]:any) => {
        // this.fp_method_history = dataMethodHistory.data;
        this.lib_medical_history = dataMedicalHistory.data;
        this.lib_social_history = dataSocialHistory.data;
      },
      error: err => console.log(err)
    });

    this.patchData();
  }

  patchData(){

  }

  addHospHistory() {

  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
  }

}
