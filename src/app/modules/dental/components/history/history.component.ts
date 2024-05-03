import { Component, Input, OnInit } from '@angular/core';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { forkJoin } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { medicalSocialForm } from './medicalSocialForm';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @Input() selected_visit;
  faSpinner = faSpinner;
  faSave = faSave;
  faPlus = faPlus;

  lib_medical_history: any;
  lib_social_history: any;

  is_saving: boolean = false;
  show_form: boolean = false;
  medicalSocialForm:FormGroup=medicalSocialForm();

  onSubmit(){
    this.is_saving = true;


    console.log(this.medicalSocialForm.value)
  }

  loadLibraries(){
    const getMedicalHistory = this.http.get('libraries/dental-medical-history');
    const getSocialHistory = this.http.get('libraries/dental-social-history');

    forkJoin([ getMedicalHistory, getSocialHistory]).subscribe({
      next:([ dataMedicalHistory, dataSocialHistory]:any) => {
        // this.fp_method_history = dataMethodHistory.data;
        this.lib_medical_history = dataMedicalHistory.data;
        this.lib_social_history = dataSocialHistory.data;
        this.show_form = true;
      },
      error: err => console.log(err)
    });

    this.patchData();
  }

  patchData(){
    this.medicalSocialForm.patchValue({})
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
