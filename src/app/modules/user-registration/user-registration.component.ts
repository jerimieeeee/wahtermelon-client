import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { openCloseTrigger } from '../patient-registration/declarations/animation';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
  animations: [openCloseTrigger]
})

export class UserRegistrationComponent implements OnInit {
  suffix_names: any;

  showModal: boolean = false;
  is_saving: boolean = false;
  loading: boolean = false;

  faSpinner = faSpinner;
  faArrowLeft = faArrowLeft;
  required_message: string = "Required field";

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  userForm: FormGroup = new FormGroup({
    last_name: new FormControl<string| null>(''),
    first_name: new FormControl<string| null>(''),
    middle_name: new FormControl<string| null>(''),
    suffix_name: new FormControl<string| null>(''),
    birthdate: new FormControl<string| null>(''),
    gender: new FormControl<string| null>(''),
    contact_number: new FormControl<number| null>(null),
    email: new FormControl<string| null>(''),
    is_active: new FormControl<number| null>(null),
    photo_url: new FormControl<string| null>(''),
    tin_number: new FormControl<number| null>(null),
    accreditation_number: new FormControl<string| null>(''),
    password: new FormControl<string| null>(''),
    password_confirmation: new FormControl<string| null>(''),
  });

  onSubmit(){
    this.is_saving = true;
    this.loading = true;

    if(!this.userForm.invalid){
      this.http.post('register', this.userForm.value).subscribe({
        next: (data:any) => {
          console.log(data.data);
          this.loading = false;
          this.is_saving = false;
          this.showModal = true;
        },
        error: err => console.log(err),
        complete: () => console.log('complete')
      })
    } else {
      this.loading = false;
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  get passwordMatchError() {
    return ((this.userForm.controls.password.value != this.userForm.controls.password_confirmation.value) && this.userForm.get('password_confirmation')?.touched);
  }

  backToLogin(){
    this.router.navigate(['/']);
  }

  loadLibraries(){
    this.http.get('libraries/suffix-names').subscribe({
      next: (data: any) => {this.suffix_names = data.data},
      error: err => console.log(err)
    });
  }

  ngOnInit(): void {
    this.loadLibraries();

    this.userForm = this.formBuilder.nonNullable.group({
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      middle_name: ['', [Validators.required, Validators.minLength(1)]],
      suffix_name: ['NA'],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      contact_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      is_active: [1],
      photo_url: [''],
      tin_number: ['', Validators.maxLength(9)],
      accreditation_number: ['',Validators.maxLength(14)],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$')]],
      password_confirmation: ['', Validators.required],
    });
  }

}
