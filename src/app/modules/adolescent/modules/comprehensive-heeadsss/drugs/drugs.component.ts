import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faPlus, faSave, faTimes, faPencil, faCircleCheck, faCaretRight, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-drugs',
    templateUrl: './drugs.component.html',
    styleUrl: './drugs.component.scss',
    standalone: false
})
export class DrugsComponent implements OnInit {
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

  compre_drugs = [
    { name: 'Do any of your friends or family members use tobacco? Alcohol? Other drugs?', id:'1' },
    { name: 'Do you use tobacco, electronic cigarettes, vape? Alcohol? Other drugs, energy drinks, steroids, or medications not prescribed to you?', id:'2' },
    { name: 'Do you ever drink or use drugs when you’re alone? (Assess frequency, intensity, patterns of use or abuse, and how patient obtains or pays for drugs, alcohol, or tobacco.)', id:'3' },
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
