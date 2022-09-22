import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  patientForm = new FormGroup<Patient>({
    last_name: new FormControl<string>('', {nonNullable: true}),
    first_name: new FormControl('', {nonNullable: true}),
    middle_name: new FormControl(''),
    suffix_name: new FormControl('', {nonNullable: true}),
    birthdate: new FormControl('', {nonNullable: true}),
    mothers_name: new FormControl('', {nonNullable: true}),
    gender: new FormControl('', {nonNullable: true}),
    mobile_number: new FormControl('', {nonNullable: true}),
    pwd_type_code: new FormControl(''),
    indegenous_flag: new FormControl(false),
    blood_type_code: new FormControl(''),
    religion_code: new FormControl(''),
    occupation_code: new FormControl(''),
    education_code: new FormControl(''),
    civil_status_code: new FormControl(''),
    consent_flag: new FormControl(false)
  });

  family: Family;
  blood_types: object;
  civil_statuses: object;
  suffix_names: object;
  occupations: object;
  educations: object;
  religions: object;
  pwd_types: object;

  regions: object;
  provinces: object;
  municipalities: object;
  barangays: object;
  selectedRegion: string;
  selectedProvince: string;
  selectedMunicipality: string;
  selelectedBarangay: string;

  libraries = [
    {var_name: 'blood_types', location: 'blood-types'},
    {var_name: 'suffix_names', location: 'suffix-names'},
    {var_name: 'occupations', location: 'occupations'},
    {var_name: 'civil_statuses', location: 'civil-statuses'},
    {var_name: 'educations', location: 'education'},
    {var_name: 'religions', location: 'religions'},
    {var_name: 'regions', location: 'regions'},
    {var_name: 'pwd_types', location: 'pwd-types'},
  ]

  is_saving: boolean = false;

  constructor(
    private http: HttpService
  ) { }

  savePatient(){
    console.log(this.patientForm);
    /* this.is_saving = true;

    this.http.post('patient', this.patientForm).subscribe({
      next: (data: any) => console.log(data),
      error: err => console.log(err),
      complete: () => this.is_saving = false
    }) */
  }

  newPatient(){

  }

  loadDemog(loc, code, include){
    if(loc == 'regions') {
      this.municipalities = null;
      this.barangays = null;
    }else if (loc == 'provinces') {
      this.barangays = null;
    }

    this.http.get('libraries/'+loc+'/'+code,{params:{'include':include}}).subscribe({
      next: (data: any) => this[include] = data.data[include],
      error: err => console.log(err)
    });
  }

  loadLibraries(){
    this.libraries.forEach(obj => {
      this.http.get('libraries/'+obj.location).subscribe({
        next: (data: any) => this[obj.var_name] = data.data,
        error: err => console.log(err)
      })
    });
  }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
