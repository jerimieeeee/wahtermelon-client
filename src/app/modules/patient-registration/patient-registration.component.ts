import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSpinner, faFolderPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { openCloseTrigger } from './declarations/animation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss'],
  animations: [openCloseTrigger]
})
export class PatientRegistrationComponent implements OnInit {
  faSpinner = faSpinner;
  faClipboard = faClipboard;
  faFolderPlus = faFolderPlus;
  faSave = faSave;

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
      cct_id: new FormControl<string| null>(''),
      is_head: new FormControl<string| null>(''),
    }) */
  });

  blood_types: object;
  civil_statuses: object;
  suffix_names: object;
  occupations: object;
  educations: object;
  religions: object;
  pwd_types: object;
  date;

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
  loading: boolean = false;

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.patientForm.controls;
  }

  new_patient_id: string;
  onSubmit(){
    console.log(this.patientForm);
    this.is_saving = true;
    this.loading = true;
    // this.showModal = true;
    if(!this.patientForm.invalid){
      this.http.post('patient', this.patientForm.value).subscribe({
        next: (data: any) => this.new_patient_id = data.data.id,
        error: err => console.log(err),
        complete: () => {
          this.is_saving = false;
          this.loading = false;
          this.showModal = true;
        }
      })
    } else {
      this.loading = false;
    }
  }

  newPatient(){
    this.patientForm.reset();
    console.log(this.patientForm);
    this.showModal = false;
    this.is_saving = false;
  }

  proceedItr(){
    this.router.navigate(['/itr', {id: this.new_patient_id}])
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

  toggleModal(){
    this.showModal = !this.showModal;
  }

  ngOnInit(): void {
    this.patientForm = this.formBuilder.nonNullable.group({
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      middle_name: ['', [Validators.required, Validators.minLength(1)]],
      suffix_name: ['NA'],
      birthdate: ['', Validators.required],
      mothers_name: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', Validators.required],
      mobile_number: ['', Validators.required],
      pwd_type_code: ['NA', Validators.required],
      indegenous_flag: [false],
      blood_type_code: ['NA', Validators.required],
      religion_code: ['UNKNO', Validators.required],
      occupation_code: ['UNSP001', Validators.required],
      education_code: ['6', Validators.required],
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

    this.date = new Date().toISOString().slice(0,10);
   /*  console.log(this.patientForm); */
    this.loadLibraries();
  }
}
