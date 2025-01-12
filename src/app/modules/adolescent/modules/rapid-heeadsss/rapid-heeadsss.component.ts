import { Component, Input, OnInit } from '@angular/core';
import { faCalendarDay, faPlus, faSave, faTimes, faPencil, faCircleCheck, faCaretRight, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rapid-heeadsss',
  templateUrl: './rapid-heeadsss.component.html',
  styleUrl: './rapid-heeadsss.component.scss'
})
export class RapidHeeadsssComponent implements OnInit {
@Input() compre_questions;

  faCalendarDay = faCalendarDay;
  faPlus = faPlus;
  faSave = faSave;
  faTimes = faTimes;
  faPencil = faPencil;
  faCircleCheck = faCircleCheck;
  faCaretRight = faCaretRight;
  faInfoCircle = faInfoCircle;
  faSpinner = faSpinner;


  is_saving: boolean = false;

  show_form = false;

  hx_codes: any = [];

  rapid_questions: any = [];

  adolescentForm: FormGroup = new FormGroup({

    consent_flag: new FormControl<boolean>(false)

  });

  loadRapidLib(){
    // let params = {
    //   patient_id: this.patient_id,
    //   per_page: 'all'
    // };

    this.http.get('libraries/rapid-questionnaire').subscribe({
      next: (data: any) => {
        this.rapid_questions = data.data;
        console.log(this.rapid_questions)

      },
      error: err => console.log(err)
    });
  }


  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

ngOnInit(): void {

    this.loadRapidLib();
    this.adolescentForm = this.formBuilder.group({

      consent_flag: [false]

    })
    console.log(this.adolescentForm, 'adolescent form')
  }
}
