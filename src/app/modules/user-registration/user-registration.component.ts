import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  showModal: boolean = false;
  is_saving: boolean = false;
  loading: boolean = false;

  userForm: FormGroup = new FormGroup({
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
  });

  onSubmit(){

  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.nonNullable.group({
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      middle_name: ['', [Validators.required, Validators.minLength(1)]],
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
    });
  }

}
