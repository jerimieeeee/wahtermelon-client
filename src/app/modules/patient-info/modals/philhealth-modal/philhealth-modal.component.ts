import { formatDate, ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck, faCircleInfo, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-philhealth-modal',
  templateUrl: './philhealth-modal.component.html',
  styleUrls: ['./philhealth-modal.component.scss']
})
export class PhilhealthModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_info;
  @Input() philhealth_to_edit;

  faCheck = faCheck;
  faSpinner = faSpinner;
  faCircleInfo = faCircleInfo;

  error_message = "exceeded maximum value";
  error_message_min = "does not meet minimum length";
  required_message = "this field is required";

  sex_cat = [
    { id: 'M', desc: 'Male'},
    { id: 'F', desc: 'Female'}
  ];

  philhealthForm: FormGroup = new FormGroup({
    philhealth_id: new FormControl<string| null>(''),
    facility_code: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    user_id: new FormControl<string| null>(''),
    enlistment_date: new FormControl<string| null>(''),
    effectivity_year: new FormControl<string| null>(''),
    enlistment_status_id: new FormControl<string| null>(''),
    package_type_id: new FormControl<string| null>(''),
    membership_type_id: new FormControl<string| null>(''),
    membership_category_id: new FormControl<string| null>(''),
    member_pin: new FormControl<string| null>(''),
    member_last_name: new FormControl<string| null>(''),
    member_first_name: new FormControl<string| null>(''),
    member_middle_name: new FormControl<string| null>(''),
    member_suffix_name: new FormControl<string| null>(''),
    member_birthdate: new FormControl<string| null>(''),
    member_gender: new FormControl<string| null>(''),
    member_relation_id: new FormControl<string| null>(''),
    employer_pin: new FormControl<string| null>(''),
    employer_name: new FormControl<string| null>(''),
    employer_address: new FormControl<string| null>(''),
    member_pin_confirmation: new FormControl<string| null>(''),
    philhealth_id_confirmation: new FormControl<string| null>(''),
    authorization_transaction_code: new FormControl<string| null>(''),
    walkedin_status: new FormControl<boolean| null>(null)
  });

  date;
  showChildVitals: boolean = false;
  showAlert: boolean = false;
  is_saving: boolean = false;
  loading: boolean = false;
  show_member_form: boolean = false;
  is_checking_atc: boolean = false;
  is_checking_status: boolean = false;

  membership_types: any;
  membership_categories: any;
  package_types: any;
  enlistment_status: any;
  member_relationships: any;
  suffix_names: any;

  submit_errors: [];

  pATC_date: string;
  is_walk_in: boolean;

  is_atc_valid: any;
  is_registered: any;

  isATCValid(){
    this.is_checking_atc = true;
    let params = {
      pPIN: this.philhealthForm.value.philhealth_id,
      pATC: this.philhealthForm.value.authorization_transaction_code,
      pEffectivityDate: formatDate(this.pATC_date, 'MM/dd/yyyy', 'en')
    }

    this.http.get('konsulta/check-atc', {params}).subscribe({
      next: (data: any) => {
        console.log(data)
        this.is_checking_atc = false;
        this.is_atc_valid = data.return;;
      },
      error: err => console.log(err)
    })
  }

  isMemberDependentRegistered() {
    this.is_checking_status = true;

    let params = {
      pPIN: this.philhealthForm.value.philhealth_id,
      pType: this.philhealthForm.value.membership_type_id
    }

    this.http.get('konsulta/check-registered', {params}).subscribe({
      next: (data: any) => {
        console.log(data)
        this.is_checking_status = false;
        this.is_registered = data.return;
      },
      error: err => console.log(err)
    })
  }

  onSubmit(){
    this.is_saving = true;
    console.log(this.philhealthForm)

    if(this.is_atc_valid !== 'YES') {
      this.philhealthForm.patchValue({authorization_transaction_code: 'WALKEDIN', walkedin_status: true})
    } else {
      // this.philhealthForm.patchValue({walkedin_status: false})
    }

    if(this.philhealthForm.valid){
      let query;
      if(this.philhealth_to_edit){
        query = this.http.update('patient-philhealth/philhealth/', this.philhealth_to_edit.id, this.philhealthForm.value);
      } else {
        query = this.http.post('patient-philhealth/philhealth', this.philhealthForm.value);
      }

      query.subscribe({
        next: (data: any) => {
          console.log(data)
          this.showAlert = true;
          this.philhealthForm.markAsPristine();
          this.philhealthForm.disable();
          this.toastr.success('Successfully recorded!','Philhealth');
          this.closeModal()
        },
        error: err => {
          console.log(err);
          this.submit_errors = err.error.errors;
        }
      })
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.philhealthForm.controls;
  }

  get philhealthMatchError() {
    return ((this.philhealthForm.controls.philhealth_id.value != this.philhealthForm.controls.philhealth_id_confirmation.value) && this.philhealthForm.get('philhealth_id_confirmation')?.dirty);
  }

  get philhealthMemberMatchError() {
    return ((this.philhealthForm.controls.member_pin.value != this.philhealthForm.controls.member_pin_confirmation.value) && this.philhealthForm.get('member_pin_confirmation')?.dirty);
  }

  loadMainLibrary(){
    this.http.get('libraries/membership-types').subscribe({
      next: (data: any) => this.membership_types = data.data,
      error: err => console.log(err)
    });

    this.http.get('libraries/membership-categories').subscribe({
      next: (data: any) =>  this.membership_categories = data.data,
      error: err => console.log(err)
    });

    this.http.get('libraries/enlistment-status').subscribe({
      next: (data: any) =>  this.enlistment_status = data.data,
      error: err => console.log(err)
    });

    this.http.get('libraries/package-types').subscribe({
      next: (data: any) => this.package_types = data.data,
      error: err => console.log(err)
    });

    this.http.get('libraries/member-relationships').subscribe({
      next: (data: any) => this.member_relationships = data.data,
      error: err => console.log(err)
    });

    this.http.get('libraries/suffix-names').subscribe({
      next: (data: any) =>  this.suffix_names = data.data,
      error: err => console.log(err)
    })
  }

  showMember(){
    if(this.philhealthForm.value.membership_type_id === 'DD'){
      this.show_member_form = true;
      this.philhealthForm.controls.member_pin.setValidators([Validators.required]);
      this.philhealthForm.controls.member_pin_confirmation.setValidators([Validators.required]);
      this.philhealthForm.controls.member_last_name.setValidators([Validators.required]);
      this.philhealthForm.controls.member_first_name.setValidators([Validators.required]);
      this.philhealthForm.controls.member_middle_name.setValidators([Validators.required]);
      this.philhealthForm.controls.member_suffix_name.setValidators([Validators.required]);
      this.philhealthForm.controls.member_birthdate.setValidators([Validators.required]);
      this.philhealthForm.controls.member_gender.setValidators([Validators.required]);
      this.philhealthForm.controls.member_relation_id.setValidators([Validators.required]);
    } else {
      this.show_member_form = false;
      this.philhealthForm.controls.member_pin.clearValidators();
      this.philhealthForm.controls.member_pin_confirmation.clearValidators();
      this.philhealthForm.controls.member_last_name.clearValidators();
      this.philhealthForm.controls.member_first_name.clearValidators();
      this.philhealthForm.controls.member_middle_name.clearValidators();
      this.philhealthForm.controls.member_suffix_name.clearValidators();
      this.philhealthForm.controls.member_birthdate.clearValidators();
      this.philhealthForm.controls.member_gender.clearValidators();
      this.philhealthForm.controls.member_relation_id.clearValidators();

      this.resetMemberDetails();
    }

    this.philhealthForm.controls.member_pin.updateValueAndValidity();
    this.philhealthForm.controls.member_pin_confirmation.updateValueAndValidity();
    this.philhealthForm.controls.member_last_name.updateValueAndValidity();
    this.philhealthForm.controls.member_first_name.updateValueAndValidity();
    this.philhealthForm.controls.member_middle_name.updateValueAndValidity();
    this.philhealthForm.controls.member_suffix_name.updateValueAndValidity();
    this.philhealthForm.controls.member_birthdate.updateValueAndValidity();
    this.philhealthForm.controls.member_gender.updateValueAndValidity();
    this.philhealthForm.controls.member_relation_id.updateValueAndValidity();
  }

  resetMemberDetails(){
    this.philhealthForm.patchValue({
      member_pin: null,
      member_pin_confirmation: null,
      member_last_name: null,
      member_first_name: null,
      member_middle_name: null,
      member_suffix_name: null,
      member_birthdate: null,
      member_gender: null,
      member_relation_id: null
    });
  }

  updateEffectivity(){
    this.philhealthForm.patchValue({effectivity_year: formatDate(this.philhealthForm.value.enlistment_date, 'yyyy', 'en')});
  }

  isATCrequired(){
    if(this.philhealthForm.value.package_type_id === 'K') {
      this.philhealthForm.controls.authorization_transaction_code.enable();

      if(this.philhealthForm.value.walkedin_status) {
        this.philhealthForm.patchValue({authorization_transaction_code: 'WALKEDIN'})
      } else {
        this.philhealthForm.patchValue({authorization_transaction_code: null})
      }
    } else {
      this.philhealthForm.controls.authorization_transaction_code.disable();
    }
  }

  closeModal(){
    this.toggleModal.emit({modal_name: 'philhealth'});
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadMainLibrary();
    let user_id = this.http.getUserID();
    let facility_code = this.http.getUserFacility();

    this.philhealthForm = this.formBuilder.group({
      philhealth_id: [null, [Validators.required, Validators.minLength(12)]],
      facility_code: [facility_code, Validators.required],
      patient_id: [this.patient_info.id, Validators.required],
      user_id: [user_id, Validators.required],
      enlistment_date: [null, Validators.required],
      effectivity_year: [null, Validators.required],
      enlistment_status_id: ["1", Validators.required],
      package_type_id: ["K", Validators.required],
      membership_type_id: [null, Validators.required],
      membership_category_id: [null, Validators.required],
      member_pin: [null, [Validators.required, Validators.minLength(12)]],
      member_last_name: [null, [Validators.required, Validators.minLength(2)]],
      member_first_name: [null, [Validators.required, Validators.minLength(2)]],
      member_middle_name: [null, [Validators.required, Validators.minLength(2)]],
      member_suffix_name: ['NA', Validators.required],
      member_birthdate: [null, Validators.required],
      member_gender: [null, Validators.required],
      member_relation_id: [null, Validators.required],
      employer_pin: [null],
      employer_name: [null],
      employer_address: [null],
      member_pin_confirmation: [null, [Validators.required, Validators.minLength(12)]],
      philhealth_id_confirmation: [null, [Validators.required, Validators.minLength(12)]],
      authorization_transaction_code: [null, [Validators.required]],
      walkedin_status: [false],
    });

    if(this.philhealth_to_edit){
      this.philhealthForm.patchValue({...this.philhealth_to_edit});
      this.philhealthForm.patchValue({philhealth_id_confirmation: this.philhealth_to_edit.philhealth_id});
      this.philhealthForm.patchValue({membership_type_id: this.philhealth_to_edit.membership_type.id});
      this.philhealthForm.patchValue({membership_category_id: this.philhealth_to_edit.membership_category.id});

      if(this.philhealth_to_edit.authorization_transaction_code !== 'WALKEDIN' && this.philhealth_to_edit.walkedin_status === 0){
        this.is_atc_valid = 'YES';
      }

      if(this.philhealthForm.value.membership_type_id === "DD"){
        this.philhealthForm.patchValue({member_birthdate: formatDate(this.philhealth_to_edit.member_birthdate, 'yyyy-MM-dd','en')});
        this.philhealthForm.patchValue({member_pin_confirmation: this.philhealth_to_edit.member_pin});
      }
      this.showMember();
    }

    this.date = new Date().toISOString().slice(0,10);
  }
}
