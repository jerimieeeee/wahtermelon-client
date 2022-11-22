import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-philhealth-modal',
  templateUrl: './philhealth-modal.component.html',
  styleUrls: ['./philhealth-modal.component.scss']
})
export class PhilhealthModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_info;
  @Input() philhealth_to_edit;

  error_message = "exceeded maximum value";
  error_message_min = "does not meet minimum length";

  philhealthForm: FormGroup = new FormGroup({
    patient_id: new FormControl<string| null>(''),
    enlistment_date: new FormControl<string| null>(''),
    philhealth_number: new FormControl<string| null>(''),
    philhealth_number_confirmation: new FormControl<string| null>(''),
    membership_type_id: new FormControl<string| null>(''),
    member_cat: new FormControl<string| null>(''),
    employer_pen: new FormControl<string| null>(''),
    employer_name: new FormControl<string| null>(''),
    employer_address: new FormControl<string| null>(''),
    expiration_date: new FormControl<string| null>(''),
    member_pin: new FormControl<string| null>(''),
    member_pin_confirmation: new FormControl<string| null>(''),
    member_relation: new FormControl<string| null>(''),
    member_birthdate: new FormControl<string| null>(''),
    member_last_name: new FormControl<string| null>(''),
    member_first_name: new FormControl<string| null>(''),
    member_middle_name: new FormControl<string| null>(''),
    member_suffix_name: new FormControl<string| null>(''),
    member_gender: new FormControl<string| null>('')
  });

  date;
  showChildVitals: boolean = false;
  showAlert: boolean = false;
  is_saving: boolean = false;

  onSubmit(){
    console.log(this.philhealthForm)
  }

  get f(): { [key: string]: AbstractControl } {
    return this.philhealthForm.controls;
  }

  get philhealthMatchError() {
    return ((this.philhealthForm.controls.philhealth_number.value != this.philhealthForm.controls.philhealth_number_confirmation.value) && this.philhealthForm.get('philhealth_number_confirmation')?.touched);
  }

  closeModal(){
    this.toggleModal.emit('philhealth-modal');
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService
  ) { }

  membership_types: any;
  membership_categories: any;

  loadMainLibrary(){
    this.http.get('libraries/membership-types').subscribe({
      next: (data: any) => {
        console.log(data)
        this.membership_types = data.data
      },
      error: err => console.log(err)
    })
  }

  loadMemberLibrary(){

  }

  ngOnInit(): void {
    this.loadMainLibrary();
    let date = new Date();
    let user_id = localStorage.getItem('user_id');
    let facility_code = "DOH000000000005672";

    this.philhealthForm = this.formBuilder.group({
      patient_id: [this.patient_info.id, Validators.required],
      enlistment_date: [this.patient_info.id, Validators.required],
      philhealth_number: [null, [Validators.required, Validators.minLength(12)]],
      philhealth_number_confirmation: [null, [Validators.required, Validators.minLength(12)]],
      membership_type_id: [null, Validators.required],
      member_cat: [null, Validators.required],
      employer_pen: [null, [Validators.minLength(1), Validators.maxLength(30)]],
      employer_name: [null, Validators.max(200)],
      employer_address: [null, Validators.max(200)],
      expiration_date: [null, Validators.required],
      member_pin: [null, [Validators.required, Validators.minLength(12)]],
      member_pin_confirmation: [null, [Validators.required, Validators.minLength(12)]],
      member_relation: [null, Validators.required],
      member_birthdate: [null, Validators.required],
      member_last_name: [null, Validators.required],
      member_first_name: [null, Validators.required],
      member_middle_name: [null, Validators.required],
      member_suffix_name: [null, Validators.required],
      member_gender: [null, Validators.required],

    });

    if(this.philhealth_to_edit){
      this.philhealthForm.patchValue({...this.philhealth_to_edit});
      // this.philhealthForm.patchValue({vitals_date_temp: formatDate(this.philhealthForm.value.vitals_date,'Y-M-dd','en')});
      // this.philhealthForm.patchValue({vitals_time_temp: formatDate(this.philhealthForm.value.vitals_date,'HH:mm:ss','en')});

      // console.log(this.philhealthForm);
    }else{
      console.log('new vitals')
    }


    // console.log(this.philhealthForm.value);
    this.date = new Date().toISOString().slice(0,10);
  }

}
