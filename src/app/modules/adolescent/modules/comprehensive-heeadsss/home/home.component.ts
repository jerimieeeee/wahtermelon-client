import { Component, Input, OnInit } from '@angular/core';
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
  @Input() compre_questions : any;
  @Input() patient_id: any;
  @Input() asrh_visit_history: any;

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

  asrh_compre_history: any = [];

  show_form = false;

  comprehensive_q: any = [];

  homeForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    consult_asrh_rapid_id: new FormControl<string| null>(''),
    assessment_date: new FormControl<string| null>(''),
    consent_flag: new FormControl<boolean>(false),
    home_notes: new FormControl<string| null>(''),
    risky_behavior: new FormControl<boolean>(false),
    seriously_injured: new FormControl<boolean>(false),
    status: new FormControl<string| null>(''),
  });

  statuses = [
    { name: 'done', id:'1' },
    { name: 'refused', id:'2' },

  ];

  onSubmit(){
    console.log(this.homeForm.value, 'display visit details')
    this.is_saving = true;
    this.http.post('asrh/comprehensive', this.homeForm.value).subscribe({
      next: (data: any) => {
        // this.toastr.success('First Visit was ' + (this.visitForm.value ? 'updated' : 'saved') + ' successfuly', 'Success')
        // this.is_saving = false;
        // this.showButton = !this.showButton;
        // this.loadFP.emit();
        // this.reloadData();
          this.LoadCompre();
        console.log(this.homeForm, 'checker home')
         },
      complete: () => {
        console.log('success')
      },
      error: err => {console.log(err)

      },
    })
  }

  validateForm(){

    this.homeForm = this.formBuilder.group({
      id: [''],
      patient_id: [this.patient_id],
      consult_asrh_rapid_id: [this.asrh_visit_history[0].id, [Validators.required, Validators.minLength(1)]],
      assessment_date: ['', [Validators.required, Validators.minLength(1)]],
      consent_flag: ['', [Validators.required, Validators.minLength(1)]],
      home_notes: ['', [Validators.required, Validators.minLength(1)]],
      risky_behavior: [[false], [Validators.required, Validators.minLength(1)]],
      seriously_injured: [[false], [Validators.required, Validators.minLength(1)]],
      status: ['', [Validators.required, Validators.minLength(1)]],
      // average_monthly_income: ['', [Validators.required, Validators.minLength(1), Validators.pattern("^[0-9,;]+$")]],
    });
    // this.loadFPDetails();
    // this.show_form = true;
  }

  LoadCompre() {
    let params = {
      patient_id: this.patient_id,
      // per_page: 'all'
    };

    this.http.get('asrh/comprehensive', {params}).subscribe({
      next: (data: any) => {

       this.asrh_compre_history = data.data[0]
       console.log(this.asrh_compre_history, 'hugot ng compre history')
       this.patchCompre();
      },
      complete: () => {

      },
      error: err => {console.log(err)

      },
    })
  }

  patchCompre(){

    if(this.asrh_compre_history) {
      this.homeForm.patchValue({
      assessment_date: this.asrh_compre_history.assessment_date,
      status: this.asrh_compre_history.status,
      consent_flag: this.asrh_compre_history.consent_flag,
      home_notes: this.asrh_compre_history.home_notes,
      risky_behavior: this.asrh_compre_history.risky_behavior,
      seriously_injured: this.asrh_compre_history.seriously_injured,

      });
      // this.show_form = true;
      console.log(this.asrh_compre_history,'load compre home working')
      // this.loadSelected();
    }
  }

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

ngOnInit(): void {
  this.LoadCompre();
  this.validateForm();
    this.comprehensive_q = this.compre_questions

  }
}
