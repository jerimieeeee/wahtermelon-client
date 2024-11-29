import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faPlus, faSave, faTimes, faPencil, faCircleCheck, faCaretRight, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
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

  compre_home = [
    { name: 'Who lives with you? Where do you live?', id:'1' },
    { name: 'Ask about people not in the home (for example one of the parents)', id:'2' },
    { name: 'Any recent life events (death, illness, separation,others).', id:'3' },
    { name: 'Has someone left recently? Is there anyone new at home?', id:'4' },
    { name: 'What are relationships like at home?', id:'5' },
    { name: 'Can you talk to anyone at home about stress? (Who?)', id:'6' },
    { name: 'Have you ever run away? (Why?)', id:'7' },
    { name: 'Is there any physical violence at home?', id:'8' },
    { name: 'Have you taken part of or been victim of violence at home?', id:'9' },
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
