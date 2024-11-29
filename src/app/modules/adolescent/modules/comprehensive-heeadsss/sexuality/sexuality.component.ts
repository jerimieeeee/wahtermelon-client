import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faPlus, faSave, faTimes, faPencil, faCircleCheck, faCaretRight, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sexuality',
  templateUrl: './sexuality.component.html',
  styleUrl: './sexuality.component.scss'
})
export class SexualityComponent implements OnInit {
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

  compre_sexuality = [
    { name: 'For adolescents, inquire if they have questions about pubertal changes (breast, periods, nocturnal emission, erections, masturbation). Ask where they get information about sexuality and provide accurate information or point to online resources.', id:'1' },
    { name: 'Gender identity: How do you identify? male, female, questioning? Girls? Both? Not yet sure?', id:'2' },
    { name: 'Sexual orientation (attraction) Are you interested in boys? Girls? Both? Not yet sure?', id:'3' },
    { name: 'Are you attracted to anyone now? Have you ever been in a romantic relationship?', id:'4' },
    { name: 'Have any of your relationships ever been sexual relationships (such as involving kissing, touching, oral, vaginal, anal sex)?', id:'5' },
    { name: 'If the adolescent is not sexually active, ask views on abstinence, consent, and safer sex. Provide information and point to online resources.', id:'6' },
    { name: 'If sexually active: Ask about the number, age,  and sex of sexual partners.', id:'7' },
    { name: 'Were sexual activities consensual?', id:'8' },
    { name: 'What are you using for birth control? Do you use condoms every time you have intercourse? What gets in the way?', id:'9' },
    { name: '(Girls) Have you ever been pregnant or worried that you may be pregnant? ', id:'8' },
    { name: '(Boys) Have you ever gotten someone pregnant or worried that might have happened?', id:'8' },
    { name: 'Have you ever had asexually transmitted infection or worried that you had an infection?', id:'8' },
    { name: 'What are you using for birth control? Do you use condoms every time you have intercourse? What gets in the way?', id:'8' },
    { name: 'Have any of your relationships been violent?', id:'8' },
    { name: 'Have you ever been forced or pressured into doing something sexual?', id:'8' },
    { name: 'Have you ever been touched sexually in a way that you didn’t want?', id:'8' },
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
