import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faPlus, faSave, faTimes, faPencil, faCircleCheck, faCaretRight, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-education',
    templateUrl: './education.component.html',
    styleUrl: './education.component.scss',
    standalone: false
})
export class EducationComponent implements OnInit {
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

  adolescentForm: FormGroup = new FormGroup({

    consent_flag: new FormControl<boolean>(false)

  });

  compre_education = [
    { name: 'Tell me about school. What school? What year?', id:'1' },
    { name: 'Do you feel safe in your school? Do you feel as if you belong?', id:'2' },
    { name: 'Is your school a safe place? (Why?) Have you been bullied at school? Is that still a problem?', id:'3' },
    { name: 'Tell me about your friends at school.', id:'4' },
    { name: 'Are there adults at school you feel you could talk to about something important? (Who?)', id:'5' },
    { name: 'What are your favorite subjects at school? Your least favorite subjects?', id:'6' },
    { name: 'Do you have any failing grades? Any recent changes? Repeated a grade?', id:'7' },
    { name: 'Tell me what you want to do in the future? (vocational goals)', id:'8' },
  ];

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

ngOnInit(): void {
    this.adolescentForm = this.formBuilder.group({

      consent_flag: [false]

    })

  }
}
