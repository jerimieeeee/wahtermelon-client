import { Component, Input, OnInit } from '@angular/core';
import { faCalendarDay, faPlus, faSave, faTimes, faPencil, faCircleCheck, faCaretRight, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eating',
  templateUrl: './eating.component.html',
  styleUrl: './eating.component.scss'
})
export class EatingComponent implements OnInit {
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

   show_form = false;

   asrh_compre_history: any = [];

   eatingForm: FormGroup = new FormGroup({
     id: new FormControl<string| null>(''),
     patient_id: new FormControl<string| null>(''),
     consult_asrh_rapid_id: new FormControl<string| null>(''),
     assessment_date: new FormControl<string| null>(''),
     consent_flag: new FormControl<string| null>(''),
     eating_notes: new FormControl<string| null>(''),


   });

   onSubmit(){
     console.log(this.eatingForm.value, 'display visit details')
     this.is_saving = true;
     this.http.post('asrh/comprehensive', this.eatingForm.value).subscribe({
       next: (data: any) => {
         // this.toastr.success('First Visit was ' + (this.visitForm.value ? 'updated' : 'saved') + ' successfuly', 'Success')
         // this.is_saving = false;
         // this.showButton = !this.showButton;
         // this.loadFP.emit();
         // this.reloadData();

         console.log(this.eatingForm, 'checker education')
          },
       complete: () => {

       },
       error: err => {console.log(err)

       },
     })
   }

   validateForm(){

     this.eatingForm = this.formBuilder.group({
       id: [''],
       patient_id: [this.patient_id],
       consult_asrh_rapid_id: [this.asrh_visit_history[0].id, [Validators.required, Validators.minLength(1)]],
       assessment_date: [this.asrh_visit_history[0].assessment_date, [Validators.required, Validators.minLength(1)]],
       eating_notes: ['', [Validators.required, Validators.minLength(1)]],

       // average_monthly_income: ['', [Validators.required, Validators.minLength(1), Validators.pattern("^[0-9,;]+$")]],
     });

     // this.loadFPDetails();
     // this.show_form = true;
   }

   patchCompre(){

    if(this.asrh_compre_history) {
      this.eatingForm.patchValue({
      eating_notes: this.asrh_compre_history.eating_notes,
      });
      // this.show_form = true;
      console.log(this.asrh_compre_history,'load compre home working')
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
     private router: Router
   ) { }

 ngOnInit(): void {
    this.LoadCompre();
    this.validateForm();

   }
 }
