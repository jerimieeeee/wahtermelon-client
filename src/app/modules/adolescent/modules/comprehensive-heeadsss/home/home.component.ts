import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { faCalendarDay, faPlus, faSave, faTimes, faPencil, faCircleCheck, faCaretRight, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @Input() compre_questions : any;
  @Input() patient_id: any;
  @Input() selected_asrh_consult: any;
  @Output() updateSelectedASRH = new EventEmitter<any>();

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
    status: new FormControl<string| null>(''),
  });

  statuses = [
    { name: 'done', id:'1' },
    { name: 'refused', id:'2' },
    // { name: 'refused', id:'3' },

  ];

  onSubmit(){
    console.log(this.homeForm.value, 'display visit details')
    this.is_saving = true;
    this.http.post('asrh/comprehensive', this.homeForm.value).subscribe({
      next: (data: any) => {
        this.toastr.success('Home was ' + (this.selected_asrh_consult?.comprehensive?.home_notes !== null ? 'updated' : 'saved') + ' successfuly', 'Success')
        this.is_saving = false;
        // this.showButton = !this.showButton;
        this.updateSelectedASRH.emit(data);
        // this.loadASRH.emit();
        // this.reloadData();
          // this.patchCompre();
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
      consult_asrh_rapid_id: [this.selected_asrh_consult?.id, [Validators.required, Validators.minLength(1)]],
      assessment_date: ['', [Validators.required, Validators.minLength(1)]],
      consent_flag: ['', [Validators.required, Validators.minLength(1)]],
      home_notes: ['', [Validators.required, Validators.minLength(1)]],
      status: ['', [Validators.required, Validators.minLength(1)]],
      // average_monthly_income: ['', [Validators.required, Validators.minLength(1), Validators.pattern("^[0-9,;]+$")]],
    });
    this.patchCompre();
    // this.disableForm();
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

    if(this.selected_asrh_consult) {
      this.homeForm.patchValue({
      assessment_date: this.selected_asrh_consult?.comprehensive?.assessment_date,
      status: this.selected_asrh_consult?.comprehensive?.status,
      consent_flag: this.selected_asrh_consult?.comprehensive?.consent_flag,
      home_notes:this.selected_asrh_consult?.comprehensive?.home_notes
     
      });
      // this.show_form = true;
      console.log(this.selected_asrh_consult,'load compre home working')
      // this.loadSelected();
    }
  }

  disableForm() {
    const home = this.selected_asrh_consult?.comprehensive?.home_notes;
    const spirituality = this.selected_asrh_consult?.comprehensive?.spirituality_notes;

    const comprestatusControl = this.homeForm.get('status');
    console.log(home, spirituality, 'home and spirituality')

    if (home === null || spirituality === null) {
      comprestatusControl?.reset();
      comprestatusControl?.disable();
      // referControl?.reset();
      // referControl?.disable();
    } else {
      comprestatusControl?.enable();
      // referControl?.enable();
    }
  }

  disableForm2() {

    const comprestatusControl = this.homeForm.get('status');

    if (this.selected_asrh_consult?.comprehensive === null) {
      comprestatusControl?.reset();
      comprestatusControl?.disable();
      // referControl?.reset();
      // referControl?.disable();
    } else {
      comprestatusControl?.enable();
      // referControl?.enable();
    }
  }

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

// ngOnChanges(change: SimpleChanges): void{
//     this.disableForm();
//   }

ngOnInit(): void {
  // this.LoadCompre();
  this.validateForm();
  this.comprehensive_q = this.compre_questions
  // console.log(this.selected_asrh_consult, 'selected asrh consult')
  }
}
