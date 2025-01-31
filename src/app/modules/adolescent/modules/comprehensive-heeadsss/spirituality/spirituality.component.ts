import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faCalendarDay, faPlus, faSave, faTimes, faPencil, faCircleCheck, faCaretRight, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-spirituality',
  templateUrl: './spirituality.component.html',
  styleUrl: './spirituality.component.scss'
})
export class SpiritualityComponent implements OnInit {
     @Input() compre_questions : any;
     @Input() patient_id: any;
     @Input() asrh_visit_history: any;
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

    show_form = false;

    asrh_compre_history: any = [];

   spiritualityForm: FormGroup = new FormGroup({
      id: new FormControl<string| null>(''),
      patient_id: new FormControl<string| null>(''),
      consult_asrh_rapid_id: new FormControl<string| null>(''),
      assessment_date: new FormControl<string| null>(''),
      consent_flag: new FormControl<string| null>(''),
      spirituality_notes: new FormControl<string| null>(''),
      done_status: new FormControl<boolean>(false),
      done_date: new FormControl<string| null>(''),
    });

    onSubmit(){
      console.log(this.spiritualityForm.value, 'display visit details')
      this.is_saving = true;
      this.http.post('asrh/comprehensive', this.spiritualityForm.value).subscribe({
        next: (data: any) => {
          this.toastr.success('Spirituality was ' + (this.selected_asrh_consult.comprehensive.spirituality_notes !== null ? 'updated' : 'saved') + ' successfuly', 'Success')
          this.is_saving = false;
          this.updateSelectedASRH.emit(data);
          // this.showButton = !this.showButton;
          // this.loadFP.emit();
          // this.reloadData();

          console.log(this.spiritualityForm, 'checker education')
           },
        complete: () => {

        },
        error: err => {console.log(err)

        },
      })
    }

    validateForm(){

      this.spiritualityForm = this.formBuilder.group({
        id: [''],
        patient_id: [this.patient_id],
        consult_asrh_rapid_id: [this.selected_asrh_consult?.id, [Validators.required, Validators.minLength(1)]],
        assessment_date: [this.selected_asrh_consult?.comprehensive?.assessment_date, [Validators.required, Validators.minLength(1)]],
        spirituality_notes: ['', [Validators.required, Validators.minLength(1)]],
        done_flag: [this.selected_asrh_consult?.comprehensive?.done_flag, [Validators.required, Validators.minLength(1)]],
        done_date: [this.selected_asrh_consult?.comprehensive?.done_date, [Validators.required, Validators.minLength(1)]],

        // average_monthly_income: ['', [Validators.required, Validators.minLength(1), Validators.pattern("^[0-9,;]+$")]],
      });
      this.patchCompre();
      // this.loadFPDetails();
      // this.show_form = true;
    }

    patchCompre(){

     if(this.selected_asrh_consult) {
       this.spiritualityForm.patchValue({
       spirituality_notes: this.selected_asrh_consult?.comprehensive?.spirituality_notes,
       done_date: this.selected_asrh_consult?.comprehensive?.done_date,
       done_flag: this.selected_asrh_consult?.comprehensive?.done_flag,
       });
       // this.show_form = true;
      //  console.log(this.asrh_compre_history,'load compre home working')
       // this.loadSelected();
     }
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


    constructor(
      private http: HttpService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService,
      private router: Router
    ) { }

  ngOnInit(): void {
    //  this.LoadCompre();
     this.validateForm();

    }
  }
