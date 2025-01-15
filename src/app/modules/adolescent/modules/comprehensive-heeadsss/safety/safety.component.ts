import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faPlus, faSave, faTimes, faPencil, faCircleCheck, faCaretRight, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-safety',
  templateUrl: './safety.component.html',
  styleUrl: './safety.component.scss'
})
export class SafetyComponent implements OnInit {
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

  compre_safety = [
    { name: 'Have you ever been seriously injured? (How?)', id:'1' },
    { name: 'Do you always wear a seatbelt in the car/ a helmet while on a motorcycle?', id:'2' },
    { name: 'Do you use safety equipment for sports and/or other physical activities (for example, helmets for biking or skateboarding)?', id:'3' },
    { name: 'Is there a lot of violence in your neighborhood?', id:'4' },
    { name: 'Have you gotten into physical fights? Have you ever carried a weapon?', id:'5' },
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
