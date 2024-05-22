import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { forkJoin } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { medicalSocialForm } from './medicalSocialForm';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @Output() loadSelectedConsult = new EventEmitter<any>();
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

    this.http.post('dental/medical-social', this.medicalSocialForm.value).subscribe({
      next: (data: any) => {
        let message: string = this.medicalSocialForm.value.id ? 'updated' : 'recorded';
        this.toastr.success('Successfully ' + message, 'Medical & Social History');
        this.loadSelectedConsult.emit();
        this.is_saving = false;
      },
      error: err => {
        this.http.showError(err.error.message, 'Dental Medical and Social History');
      }
    })
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
      error: err => { this.http.showError(err.error.message, 'Dental History Library'); }
    });

    this.patchData();
  }

  patchData(){
    if(this.selected_visit.dentalMedicalSocials) {
      this.medicalSocialForm.patchValue({...this.selected_visit.dentalMedicalSocials})
    } else {
      this.medicalSocialForm.patchValue({
        patient_id: this.selected_visit.patient.id
      })
    }
  }

  addHospHistory() {

  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
  }

}
