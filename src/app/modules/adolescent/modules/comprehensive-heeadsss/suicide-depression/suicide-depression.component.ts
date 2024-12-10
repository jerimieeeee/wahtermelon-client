import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faPlus, faSave, faTimes, faPencil, faCircleCheck, faCaretRight, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suicide-depression',
  templateUrl: './suicide-depression.component.html',
  styleUrl: './suicide-depression.component.scss'
})
export class SuicideDepressionComponent implements OnInit {
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

  compre_suicide = [
    { name: 'Do you feel “stressed” or anxious more than usual? How do you try to cope?', id:'1' },
    { name: 'Do you feel sad or down more than usual?', id:'2' },
    { name: 'Does it seem that you’ve lost interest in things that you used to really enjoy?', id:'3' },
    { name: 'Are you having trouble getting to sleep? How’ your appetite?', id:'4' },
    { name: 'Have you thought a lot about hurting yourself or someone else?', id:'5' },
    { name: 'Have you ever had to hurt yourself (by cutting yourself, for example) to calm down or feel better?', id:'6' },
    { name: 'Have you ever tried to killyourself?', id:'7' },
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
}{

}
