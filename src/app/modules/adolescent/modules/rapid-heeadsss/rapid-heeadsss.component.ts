import { Component, OnInit } from '@angular/core';
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


  faCalendarDay = faCalendarDay;
  faPlus = faPlus;
  faSave = faSave;
  faTimes = faTimes;
  faPencil = faPencil;
  faCircleCheck = faCircleCheck;
  faCaretRight = faCaretRight;
  faInfoCircle = faInfoCircle;
  faSpinner = faSpinner;

  hx: any = [];
  pe_answers: any = [];
  hx_grouped = [];

  is_saving: boolean = false;

  show_form = false;

  hx_codes: any = [];

  adolescentForm: FormGroup = new FormGroup({

    consent_flag: new FormControl<boolean>(false)

  });

  rapid = [
    { name: '1. Ikaw ba ay nakaranas ng pananakit o panananakot sa inyong bahay, paaralan o trabaho?', id:'1' },
    { name: '2. May mga pagkakataon ba na pinag-isipan mo ng maglayas o umalis ng inyong bahay?', id:'2' },
    { name: '3. Nakaranas ka ba ng bullying na pisikal o cyber bullying sa paaralan o sa trabaho ?', id:'3' },
    { name: '4. May pagkakataon ba na seryoso mong naisip na wakasan ang iyong buhay?', id:'4' },
    { name: '5. Naninigarilyo ka ba?', id:'5' },
    { name: '6. Umiinom ka ba ng alak?', id:'6' },
    { name: '7. Nakakita ka na ba ng mga ipinagbabawal na "gamot" o drugs?', id:'7' },
    { name: '8. Ikaw ba ay nakaranas ng magkarelasyon (boyfriend / girlfriend)?', id:'8' },
    { name: '9. Ikaw ba ay nakaranas ng makipag sex o makipagtalik?', id:'9' },
    { name: '10. Nakaranas ka ba na ikaw ay pinilit makipag sex ?', id:'10' },
    { name: '11. Ikaw ba ay nakaranas nang mabuntis, o makabuntis ?', id:'11' },
    { name: '12. Gusto mo bang mag pa counsel o komunsulta para matulungan ka?', id:'12' },
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
