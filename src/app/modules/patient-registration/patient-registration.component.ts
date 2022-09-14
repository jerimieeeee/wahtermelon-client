import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { Family, Patient } from './model/model';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent implements OnInit {
  faSpinner = faSpinner;

  patient: Patient;
  family: Family;
  blood_types: object;
  civil_statuses: object;
  suffix_names: object;
  occupations: object;
  educations: object;
  religions: object;
  regions: object;
  provinces: object;

  libraries = [
    {var_name: 'blood_types', location: 'blood-types'},
    {var_name: 'suffix_names', location: 'suffix-names'},
    {var_name: 'occupations', location: 'occupations'},
    {var_name: 'civil_statuses', location: 'civil-statuses'},
    {var_name: 'educations', location: 'education'},
    {var_name: 'religions', location: 'religions'},
    {var_name: 'regions', location: 'regions'},
  ]

  is_saving: boolean = false;

  constructor(
    private http: HttpService
  ) { }

  savePatient(){
    this.is_saving = true;

    setTimeout(() => {
      this.is_saving = false;
    }, 5000);
  }

  loadProvince(){

  }

  loadLibraries(){
    this.libraries.forEach(obj => {
      this.http.getLib('libraries/'+obj.location).subscribe({
        next: (data: any) => this[obj.var_name] = data.data,
        error: err => console.log(err)
      })
    });
  }

  ngOnInit(): void {
    this.loadLibraries();

  console.log(this.family);
  }
}
