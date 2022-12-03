import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  faSpinner = faSpinner;
  faArrowLeft = faArrowLeft;
  email: string;

  is_saving: boolean = false;
  is_sent: boolean = false;

  submit_errors: any;

  userForm: FormGroup = new FormGroup({
    email: new FormControl<string| null>(''),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  backtoLogin(){
    this.router.navigate(['/'])
  }

  onSubmit(){
    console.log(this.userForm);
    this.is_saving = true;

    if(this.userForm.valid){
      this.http.post('forgot-password', this.userForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.is_saving = false;
          this.is_sent = true;
        },
        error: err => {
          console.log(err);
          this.submit_errors = err.error.errors;
          this.is_saving = false;
        }
      })
    } else {
      this.is_saving = false;
    }
  }

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.nonNullable.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }
}
