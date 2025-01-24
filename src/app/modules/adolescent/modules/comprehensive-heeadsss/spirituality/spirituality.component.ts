import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faPlus, faSave, faTimes, faPencil, faCircleCheck, faCaretRight, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-spirituality',
    templateUrl: './spirituality.component.html',
    styleUrl: './spirituality.component.scss',
    standalone: false
})
export class SpiritualityComponent implements OnInit {
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

  compre_spiritual = [
    { name: 'What are your sources of hope, strength, comfort or meaning?', id:'1' },
    { name: 'For some, their religion acts as a source of comfort; is this true for you?', id:'2' },
    { name: 'Are you part of a religious or spiritual community? What practices do you find most helpful to you personally?', id:'3' },
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
