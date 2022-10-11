import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSearch, faPlus, faCalendar, faInfoCircle, faCircleNotch, faFloppyDisk,} from '@fortawesome/free-solid-svg-icons';
import { faSave, faPenToSquare, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { BirthInformation } from '../../models/birthinformation.model';
import { AppState } from '../../app.state';
import * as BirthInformationActions from '../../actions/birthinformation.action';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-first-visit',
  templateUrl: './first-visit.component.html',
  styleUrls: ['./first-visit.component.scss']
})

export class FirstVisitComponent implements OnInit {

  faSearch = faSearch;
  faPlus = faPlus;
  faCalendar = faCalendar;
  faInfoCircle = faInfoCircle;
  faSpinner = faCircleNotch;
  faFloppyDisk = faFloppyDisk;
  faSave = faSave;

  is_saving: boolean = false;
  is_saving2: boolean = true;

  is_saving3: boolean = false;
  is_saving4: boolean = true;

  form_saving: boolean = false;

  saved: boolean;

  required_message = 'This field is required.';

  visitForm: FormGroup = new FormGroup({
    admission_date: new FormControl<string| null>(''),
    discharged_date: new FormControl<string| null>(''),
    weight: new FormControl<string| null>(''),
    mothers_name: new FormControl<string| null>(''),
  });


  // Section 2
  constructor(private formBuilder: FormBuilder) { }

  get f(): { [key: string]: AbstractControl } {
    return this.visitForm.controls;
  }

  showAdmissionModal = false;

  toggleAdmissionModal(){
    this.showAdmissionModal = !this.showAdmissionModal;
  }

  saveAdmission(){
    this.form_saving = true;
    this.is_saving = true;
    this.is_saving2 = false;
    localStorage.setItem('form-data', JSON.stringify(this.visitForm.value));
    setTimeout(() => {
      this.is_saving = false;
      this.is_saving2 = true;
    }, 5000);
  }

  validateForm(){
    this.visitForm = this.formBuilder.group({
      admission_date: ['', [Validators.required]],
      discharged_date: ['', [Validators.required]],
      weight: ['', [Validators.required, Validators.minLength(3)]],
      mothers_name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getData(){
    const values = JSON.parse(localStorage.getItem("form-data"));
    this.visitForm = new FormGroup({
      admission_date: new FormControl(values['admission_date']),
      discharged_date: new FormControl(values['discharged_date']),
      weight: new FormControl(values['weight']),
      mothers_name: new FormControl(values['mothers_name'])
    });
    console.log(values)
  }

  // saveBirth(){
  //   console.log(this.visitForm);
  //   this.is_saving3 = true;
  //   this.is_saving4 = false;
  //   setTimeout(() => {
  //     this.is_saving3 = false;
  //     this.is_saving4 = true;
  //   }, 5000);
  // }

  

  ngOnInit() {
    this.validateForm();
    this.getData();
    this.saved = true;
   
  }

}