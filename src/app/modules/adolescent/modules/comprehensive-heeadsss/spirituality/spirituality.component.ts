import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { faCalendarDay, faPlus, faSave, faTimes, faPencil, faCircleCheck, faCaretRight, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-spirituality',
    templateUrl: './spirituality.component.html',
    styleUrl: './spirituality.component.scss',
    standalone: false
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

     max_date: string = formatDate(new Date(), 'yyyy-MM-dd', 'en', 'Asia/Manila');

   spiritualityForm: FormGroup = new FormGroup({
      id: new FormControl<string| null>(''),
      patient_id: new FormControl<string| null>(''),
      consult_asrh_rapid_id: new FormControl<string| null>(''),
      assessment_date: new FormControl<string| null>(''),
      // consent_flag: new FormControl<string| null>(''),
      spirituality_notes: new FormControl<string| null>(''),
      home_notes: new FormControl<string| null>(''),
      eating_notes: new FormControl<string| null>(''),
      education_notes: new FormControl<string| null>(''),
      activities_notes: new FormControl<string| null>(''),
      drugs_notes: new FormControl<string| null>(''),
      safety_notes: new FormControl<string| null>(''),
      sexuality_notes: new FormControl<string| null>(''),
      suicide_notes: new FormControl<string| null>(''),
      done_status: new FormControl<boolean>(false),
      done_flag: new FormControl<boolean>(false),
      done_date: new FormControl<string| null>(''),
      consent_flag: new FormControl<boolean>(false),
        refused_flag: new FormControl<boolean>(false),
      // refused_flag: new FormControl<boolean>(false),
    });

    errors: string[] = []; // Store error messages to pass to the modal

    onSubmit() {
      // console.log(this.spiritualityForm.value, 'display visit details');
      this.is_saving = true;
      this.http.post('asrh/comprehensive', this.spiritualityForm.value).subscribe({
        next: (data: any) => {
          const message = this.selected_asrh_consult?.comprehensive?.spirituality_notes
            ? 'updated'
            : 'saved';
          this.toastr.success(`Spirituality was ${message} successfully`, 'Success');
          this.is_saving = false;
          this.updateSelectedASRH.emit(data);
        },
        error: (error: any) => {
          console.error(error);
          this.is_saving = false;
          this.errors = [];

          if (error.error && error.error.errors) {
            Object.entries(error.error.errors).forEach(([field, messages]) => {
              if (Array.isArray(messages)) {
                messages.forEach(message => {
                  // Format the field by capitalizing the first letter and replacing underscores with spaces
                  const formattedField = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ')}`;
                  // Get only the first word from the formatted field
                  const firstWord = formattedField.split(' ')[0];

                  // Check if the first word is already in the errors array
                  if (!this.errors.includes(firstWord)) {
                    this.errors.push(firstWord);
                  }
                });
              }
            });
          } else {
            this.errors.push('An unknown error occurred.');
          }

          if (this.errors.length > 0) {
            this.showServiceModal = true;
          }

          this.toastr.error('Please fill up the required notes', 'Error');
        }
      });
    }

    validateForm() {
      // Create the form group
      this.spiritualityForm = this.formBuilder.group({
        id: [''],
        patient_id: [this.patient_id],
        consult_asrh_rapid_id: [this.selected_asrh_consult?.id, [Validators.required, Validators.minLength(1)]],
        assessment_date: [this.selected_asrh_consult?.comprehensive?.assessment_date, [Validators.required, Validators.minLength(1)]],
        spirituality_notes: ['', [Validators.required, Validators.minLength(50)]],
        home_notes: [''],
        eating_notes: [''],
        activities_notes: [''],
        drugs_notes: [''],
        education_notes: [''],
        safety_notes: [''],
        sexuality_notes: [''],
        suicide_notes: [''],
        done_flag: [this.selected_asrh_consult?.comprehensive?.done_flag],
        consent_flag: ['', [Validators.required, Validators.minLength(1)]],
        refused_flag: [false],
      });

      // Add done_date control only if done_flag is 1
      if (this.selected_asrh_consult?.comprehensive?.done_flag === true) {
        this.spiritualityForm.addControl(
          'done_date',
          new FormControl<string | null>(this.selected_asrh_consult?.comprehensive?.done_date, [
            Validators.required,
            Validators.minLength(1),
          ])
        );
      } else {
        this.spiritualityForm.addControl('done_date', new FormControl(null)); // Or set it as null if done_flag is not 1
      }

      // Ensure that done_date is enabled or disabled based on done_flag
      const doneDateControl = this.spiritualityForm.get('done_date');
      const doneFlagControl = this.spiritualityForm.get('done_flag');
      const homeControl = this.spiritualityForm.get('home_notes');
      const eatingControl = this.spiritualityForm.get('eating_notes');
      const educationControl = this.spiritualityForm.get('education_notes');
      const activitiesControl = this.spiritualityForm.get('activities_notes');
      const drugsControl = this.spiritualityForm.get('drugs_notes');
      const safetyControl = this.spiritualityForm.get('safety_notes');
      const sexualityControl = this.spiritualityForm.get('sexuality_notes');
      const suicideControl = this.spiritualityForm.get('suicide_notes');
      if (doneDateControl && doneFlagControl) {
        doneFlagControl.valueChanges.subscribe((doneFlagValue) => {
          if (doneFlagValue === true) {
        doneDateControl.enable();
        homeControl.enable();
        eatingControl.enable();
        educationControl.enable();
        activitiesControl.enable();
        drugsControl.enable();
        safetyControl.enable();
        sexualityControl.enable();
        suicideControl.enable();
          } else {
        doneDateControl.disable();
        homeControl.disable();
        eatingControl.disable();
        educationControl.disable();
        activitiesControl.disable();
        drugsControl.disable();
        safetyControl.disable();
        sexualityControl.disable();
        suicideControl.disable();
          }
        });
      }

      // Optionally, patch values to populate the form fields
      this.patchCompre();
    }


    patchCompre(){

     if(this.selected_asrh_consult) {
       this.spiritualityForm.patchValue({
        spirituality_notes: this.selected_asrh_consult?.comprehensive.spirituality_notes,
        home_notes: this.selected_asrh_consult?.comprehensive?.home_notes,
        eating_notes: this.selected_asrh_consult?.comprehensive?.eating_notes,
        education_notes: this.selected_asrh_consult?.comprehensive?.education_notes,
        activities_notes: this.selected_asrh_consult?.comprehensive?.activities_notes,
        drugs_notes: this.selected_asrh_consult?.comprehensive?.drugs_notes,
        safety_notes: this.selected_asrh_consult?.comprehensive?.safety_notes,
        sexuality_notes: this.selected_asrh_consult?.comprehensive?.sexuality_notes,
        suicide_notes: this.selected_asrh_consult?.comprehensive?.suicide_notes,
        done_date: this.selected_asrh_consult?.comprehensive?.done_date || this.max_date,
        done_flag: this.selected_asrh_consult?.comprehensive?.done_flag,
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
     let params = {
       patient_id: this.patient_id,
       // per_page: 'all'
     };

     this.http.get('asrh/comprehensive', {params}).subscribe({
       next: (data: any) => {

        this.asrh_compre_history = data.data[0]
        // console.log(this.asrh_compre_history, 'hugot ng compre history')
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
    this.spiritualityForm.get('refused_flag')?.setValue(false);  // Optionally uncheck the checkbox
  }

  showServiceModal = false;
  toggleServiceModal() {
    this.showServiceModal = !this.showServiceModal;
    this.spiritualityForm.get('refused_flag')?.setValue(false);
  }


  acceptModal(){
    this.showServiceModal = !this.showServiceModal;
    this.spiritualityForm.get('refused_flag')?.setValue(true);
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
