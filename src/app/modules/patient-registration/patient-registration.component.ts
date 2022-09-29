import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSpinner, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent implements OnInit {
  faSpinner = faSpinner;
  faClipboard = faClipboard;
  faFolderPlus = faFolderPlus;

  required_message = 'Required field';
  patientForm: FormGroup = new FormGroup({
    last_name: new FormControl<string| null>(''),
    first_name: new FormControl<string| null>(''),
    middle_name: new FormControl<string| null>(''),
    suffix_name: new FormControl<string| null>(''),
    birthdate: new FormControl<string| null>(''),
    mothers_name: new FormControl<string| null>(''),
    gender: new FormControl<string| null>(''),
    mobile_number: new FormControl<string| null>(''),
    pwd_type_code: new FormControl<string| null>(''),
    indegenous_flag: new FormControl<boolean>(false),
    blood_type_code: new FormControl<string| null>(''),
    religion_code: new FormControl<string| null>(''),
    occupation_code: new FormControl<string| null>(''),
    education_code: new FormControl<string| null>(''),
    civil_status_code: new FormControl<string| null>(''),
    consent_flag: new FormControl<boolean>(false),
    /* family: new FormGroup({
      region: new FormControl<string| null>(''),
      province: new FormControl<string| null>(''),
      municipality: new FormControl<string| null>(''),
      brgy: new FormControl<string| null>(''),
      address: new FormControl<string| null>(''),
    }) */
  });

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
  selectedRegion: string| null;
  selectedProvince: string| null;
  selectedMunicipality: string| null;
  selelectedBarangay: string| null;

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

  showModal:boolean = false;
  is_saving: boolean = false;

  toggleModal(){
    this.showModal = !this.showModal;
  }

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.patientForm.controls;
  }

  onSubmit(){
    console.log(this.patientForm);
    this.is_saving = true;
    this.showModal = true;
    /* this.http.post('patient', this.patientForm.value).subscribe({
      next: (data: any) => console.log(data),
      error: err => console.log(err),
      complete: () => {
        this.is_saving = false;
        this.showModal = true;
      }
    }) */
  }

  newPatient(){
    this.patientForm.reset();
    console.log(this.patientForm);
    this.showModal = false;
    this.is_saving = false;
  }

  proceedItr(){
    this.showModal = false;
  }

  loadDemog(loc, code, include){
    if(loc == 'regions') {
      this.municipalities = null;
      this.barangays = null;
    }else if (loc == 'provinces') {
      this.barangays = null;
    }

    this.http.get('libraries/'+loc+'/'+code,{params:{'include':include}}).subscribe({
      next: (data: any) => {console.log(data.data); this[include] = data.data[include]},
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
    /* this.patientForm = this.formBuilder.group({
      last_name: ['Santos', [Validators.required, Validators.minLength(2)]],
      first_name: ['Mark', [Validators.required, Validators.minLength(2)]],
      middle_name: ['Bautista', [Validators.required, Validators.minLength(2)]],
      suffix_name: ['NA'],
      birthdate: ['', Validators.required],
      mothers_name: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', Validators.required],
      mobile_number: ['', Validators.required],
      pwd_type_code: ['', Validators.required],
      indegenous_flag: [false],
      blood_type_code: ['', Validators.required],
      religion_code: ['', Validators.required],
      occupation_code: ['', Validators.required],
      education_code: ['', Validators.required],
      civil_status_code: ['', Validators.required],
      consent_flag: [false]
    }); */
    this.patientForm = this.formBuilder.group({
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      middle_name: ['', [Validators.required, Validators.minLength(2)]],
      suffix_name: ['NA'],
      birthdate: ['', Validators.required],
      mothers_name: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', Validators.required],
      mobile_number: ['', Validators.required],
      pwd_type_code: ['', Validators.required],
      indegenous_flag: [false],
      blood_type_code: ['', Validators.required],
      religion_code: ['', Validators.required],
      occupation_code: ['', Validators.required],
      education_code: ['', Validators.required],
      civil_status_code: ['', Validators.required],
      consent_flag: [false],
      /* family: this.formBuilder.group({
        region: ['', Validators.required],
        province: ['', Validators.required],
        municipality: ['', Validators.required],
        brgy: ['', Validators.required],
        address: ['', [Validators.required, Validators.minLength(2)]],
      }) */
    });

    console.log(this.patientForm);
    this.loadLibraries();
  }
}
