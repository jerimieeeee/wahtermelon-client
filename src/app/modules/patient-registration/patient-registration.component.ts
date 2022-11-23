import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSpinner, faFolderPlus, faSave, faSearch, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
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
  faSearch = faSearch;
  faPenToSquare = faPenToSquare;

  required_message = 'Required field';
  button_function: string = 'Save';

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
    family: new FormGroup({
      region: new FormControl<string| null>(''),
      province: new FormControl<string| null>(''),
      municipality: new FormControl<string| null>(''),
      brgy: new FormControl<string| null>(''),
      address: new FormControl<string| null>(''),
      cct_id: new FormControl<string| null>(''),
      cct_date: new FormControl<string| null>(''),
      is_head: new FormControl<string| null>(''),
    })
  });

  new_patient_id: string;
  patient_to_update: string;

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
  familyFolderModal: boolean = false;

  selected_family_folder: string;
  selected_barangay_code: string;
  selected_address: string;
  selected_cct_date: string;
  selected_cct_id: string;
  selected_facility: string;
  selected_members: any;
  show_demog_input: boolean = true;

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.patientForm.controls;
  }

  submit_errors: any;

  onSubmit(){
    // console.log(this.patientForm);
    this.patientForm.controls['family'].disable();
    this.is_saving = true;
    this.loading = true;

    if(!this.patientForm.invalid){
      let query;
      if(this.button_function === 'Update') {
        query = this.http.update('patient/', this.patient_to_update, this.patientForm.value);
      } else {
        query = this.http.post('patient', this.patientForm.value);
      }
      query.subscribe({
        next: (data: any) => {
          // console.log(data)
          this.new_patient_id = this.button_function === 'Update' ? this.patient_to_update : data.data.id;
          this.saveFolder(this.new_patient_id);
        },
        error: err => {
          console.log(err)
          this.loading = false;
          this.submit_errors = err.error.errors;
        },
        complete: () => {}
      })
    } else {
      this.loading = false;
    }
  }

  saveFolder(id){
    let user_id = localStorage.getItem('user_id')
    let params = {
      facility_code: this.show_demog_input ? localStorage.getItem('facility_code') : this.selected_facility,
      user_id: user_id,
      patient_id: id,
      address: this.show_demog_input ? this.patientForm.controls.family['controls'].address.value : this.selected_address,
      barangay_code: this.show_demog_input ? this.patientForm.controls.family['controls'].brgy.value : this.selected_barangay_code,
      cct_date: this.show_demog_input ? this.patientForm.controls.family['controls'].cct_date.value : this.selected_cct_date,
      cct_id: this.show_demog_input ? this.patientForm.controls.family['controls'].cct_id.value : this.selected_cct_id,
      family_role_code: this.patientForm.controls.family['controls'].is_head.value
    }

    let query;

    if(this.show_demog_input && !this.selected_family_folder) {
      params['status'] = 'new';
      query = this.http.post('households/household-folders', params);
    } else {
      query = this.http.update('households/household-folders/', this.selected_family_folder, params);
    }
    query.subscribe({
      next: (data: any) => {
        // console.log(data);
        this.is_saving = false;
        this.loading = false;
        this.showModal = true;
      },
      error: err => {
        console.log(err)
        this.loading = false;
        this.submit_errors = err.error.errors;
      }
    })
  }

  show_edit: boolean = false;

  transaction(data){
    console.log(data);
    this.selected_family_folder = data.data ? data.data.id : null;
    this.selected_barangay_code = data.data ? data.data.barangay.code : null;
    this.selected_address = data.data ? data.data.address : null;
    this.selected_cct_date = data.data ? data.data.cct_date : null;
    this.selected_cct_id = data.data ? data.data.cct_id : null;
    this.selected_facility = data.data ? data.data.facility_code : null;
    this.selected_members = data.data ? data.data.household_member : null;

    if (data.type === 'new'){
      this.isDisabled(false);
      this.show_edit = false;
      this.show_demog_input = true;
    } else {
      this.show_edit = false;
      this.patientForm.controls['family']['controls']['is_head'].enable();
      this.show_demog_input = false;
    }
  }

  isDisabled(value: boolean, data?){
    if(value) {
      this.patientForm.controls['family'].disable();
      if(data === 'edit_folder') {
        this.selected_family_folder = null;
        this.patchAddress(this.orig_data.household_folder, this.orig_data.household_member);
      }
    } else {
      this.patientForm.controls['family'].enable();
      // if(data === 'edit_folder') this.selected_family_folder = '1';
    }
  }

  newPatient(){
    this.patientForm.reset();
    this.showModal = false;
    this.is_saving = false;
  }

  proceedItr(){
    this.router.navigate(['/itr', {id: this.new_patient_id}])
  }

  toggleModal(modal){
    // console.log(modal);
    switch (modal){
      case 'family-folder-modal':
        this.familyFolderModal = !this.familyFolderModal;
        break;
      case 'save-modal':
        this.showModal = !this.showModal;
        break;
    }
  }

  loadDemog(loc, code, include){
    if(loc == 'regions') {
      this.municipalities = null;
      this.barangays = null;
    }else if (loc == 'provinces') {
      this.barangays = null;
    }

    this.http.get('libraries/'+loc+'/'+code,{params:{'include':include}}).subscribe({
      next: (data: any) => {/* console.log(data.data); */ this[include] = data.data[include]},
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

  orig_data: any;
  loadPatient(id){
    this.http.get('patient/'+id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.patientForm.patchValue({...data.data});
        this.patient_to_update = data.data.id;
        // console.log(this.patientForm);
        this.button_function = 'Update';
        this.orig_data = data.data;
        //load demog
        this.patchAddress(this.orig_data.household_folder, this.orig_data.household_member);

      },
      error: err => console.log(err)
    })
  }

  member_count: number;
  patchAddress(address, member){
    // console.log(address);
    this.patientForm.patchValue({family:{address: address.address}});

    this.loadDemog('regions', address.barangay.region.code, 'provinces');
    this.patientForm.patchValue({family:{region: address.barangay.region.code}});

    this.loadDemog('provinces', address.barangay.province.code, 'municipalities');
    this.patientForm.patchValue({family:{province: address.barangay.province.code}});

    this.loadDemog('municipalities', address.barangay.municipality.code, 'barangays');
    this.patientForm.patchValue({family:{municipality: address.barangay.municipality.code}});

    this.patientForm.patchValue({family:{brgy: address.barangay.code}});
    this.patientForm.patchValue({family:{cct_id: address.cct_id}});
    if(address.cct_id) this.patientForm.patchValue({family:{cct_date: address.cct_date}});
    this.patientForm.patchValue({family:{brgy: address.barangay.code}});
    this.patientForm.patchValue({family:{is_head: member.family_role_code}});

    this.selected_family_folder = address.id;
    this.isDisabled(true);
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
      family: this.formBuilder.group({
        region: ['', Validators.required],
        province: ['', Validators.required],
        municipality: ['', Validators.required],
        brgy: ['', Validators.required],
        address: ['', [Validators.required, Validators.minLength(2)]],
        cct_id: ['', [Validators.minLength(2)]],
        cct_date: [''],
        is_head: [false, [Validators.required]],
      })
    });

    this.date = new Date().toISOString().slice(0,10);
    this.loadLibraries();

    if(this.router.url.split(';')[0] === '/edit-patient') {
      this.show_edit = true;
      this.loadPatient(this.router.url.split('=')[1]);
    } else{
      this.isDisabled(true);
    }
  }
}
