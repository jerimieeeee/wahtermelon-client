import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCalendarDay, faPlus, faSave, faTimes, faPencil, faCircleCheck, faCaretRight, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-sexuality',
    templateUrl: './sexuality.component.html',
    styleUrl: './sexuality.component.scss',
    standalone: false
})
export class SexualityComponent implements OnInit {
       @Input() compre_questions : any;
       @Input() patient_id: any;
       @Input() asrh_visit_history: any;
       @Output() loadASRH = new EventEmitter<any>();
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

      asrh_main_history: any = [];

     sexualityForm: FormGroup = new FormGroup({
        id: new FormControl<string| null>(''),
        patient_id: new FormControl<string| null>(''),
        consult_asrh_rapid_id: new FormControl<string| null>(''),
        assessment_date: new FormControl<string| null>(''),
        risky_behavior: new FormControl<boolean>(false),
        sexuality_notes: new FormControl<string| null>(''),
        done_flag: new FormControl<boolean>(false),
        consent_flag: new FormControl<string| null>('false'),
        refused_flag: new FormControl<string| null>('false'),
      });

      onSubmit(){
        console.log(this.sexualityForm.value, 'display visit details')
        this.is_saving = true;
        this.http.post('asrh/comprehensive', this.sexualityForm.value).subscribe({
          next: (data: any) => {
            this.toastr.success('Sexuality was ' + (this.selected_asrh_consult.comprehensive.sexuality_notes !== null ? 'updated' : 'saved') + ' successfuly', 'Success')
            this.is_saving = false;
            this.updateSelectedASRH.emit(data);
            // this.showButton = !this.showButton;
            // this.loadFP.emit();
            // this.reloadData();

            console.log(this.sexualityForm, 'checker education')
             },
          complete: () => {

          },
          error: err => {console.log(err)

          },
        })
      }

      validateForm(){

        this.sexualityForm = this.formBuilder.group({
          id: [''],
          patient_id: [this.patient_id],
          consult_asrh_rapid_id: [this.selected_asrh_consult?.id, [Validators.required, Validators.minLength(1)]],
          assessment_date: [this.selected_asrh_consult?.comprehensive?.assessment_date, [Validators.required, Validators.minLength(1)]],
          risky_behavior: [[false], [Validators.required, Validators.minLength(1)]],
          sexuality_notes: ['', [Validators.required, Validators.minLength(50)]],
          done_flag: [false],
          consent_flag: ['', [Validators.required, Validators.minLength(1)]],
          refused_flag: [false],
          // refused_flag: [false],
          // average_monthly_income: ['', [Validators.required, Validators.minLength(1), Validators.pattern("^[0-9,;]+$")]],
        });
        this.patchCompre();
        // this.loadFPDetails();
        // this.show_form = true;
      }

      patchCompre(){

       if(this.selected_asrh_consult) {
         this.sexualityForm.patchValue({
         sexuality_notes: this.selected_asrh_consult?.comprehensive?.sexuality_notes,
         risky_behavior: this.selected_asrh_consult?.comprehensive?.risky_behavior,
         refused_flag: this.selected_asrh_consult?.comprehensive?.refused_flag,
         consent_flag: this.selected_asrh_consult?.comprehensive?.consent_flag,
        //  refused_flag: this.selected_asrh_consult?.comprehensive?.refused_flag
         });
         // this.show_form = true;
        //  console.log(this.asrh_compre_history,'load compre home working')
         // this.loadSelected();
       }
     }

     LoadCompre() {
      this.loadASRH.emit();
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

     openModal() {
      // Listen for changes to the checkbox

          this.toggleServiceModal();

    }

    showModal = false;

    closeModal() {
      this.showModal = false;  // Close the modal when the close button is clicked
      this.sexualityForm.get('refused_flag')?.setValue(false);  // Optionally uncheck the checkbox
    }

    showServiceModal = false;
    toggleServiceModal() {
      this.showServiceModal = !this.showServiceModal;
      this.sexualityForm.get('refused_flag')?.setValue(false);
    }


    acceptModal(){
      this.showServiceModal = !this.showServiceModal;
      this.sexualityForm.get('refused_flag')?.setValue(true);
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
      //  this.loadASRH.emit();
      }
    }
