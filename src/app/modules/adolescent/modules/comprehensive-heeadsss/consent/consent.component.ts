import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { formatDate } from '@angular/common';
import { faCalendar, faTimes, faDoorClosed, faCircleNotch, faSave } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrl: './consent.component.scss',
  standalone: false
})
export class ConsentComponent implements OnInit, OnChanges {
  @Input() selected_asrh_consult: any;
  @Output() updateSelectedASRH = new EventEmitter<any>();
  @Output() opened = new EventEmitter<void>();

  faCalendar = faCalendar;
  faTimes = faTimes;
  faDoorClosed = faDoorClosed;
  faCircleNotch = faCircleNotch;
  faSave = faSave;

  showModal: boolean = false;
  hideButton: boolean = true;

  pages: number = 1;
  module: number = 1;
  module_compre: number = 1;
  show_end: boolean = false;
  fetching_history: boolean = false;
  show_form: boolean = false;

  compre_questions: any = [];
  client_types: any = [];

  patient_asrh_history: any = [];
  patient_id: any;
  consult_id: any;
  user_info: any;
  user_facility: any;
  modals: any = [];
  consent_type: any = [];
  consult_details: any;
  refusal_reasons: any = [];
  is_saving: boolean = false;

  max_date: string = formatDate(new Date(), 'yyyy-MM-dd', 'en', 'Asia/Manila');

  date_today = formatDate(new Date(), 'MM/dd/yyyy', 'en', 'Asia/Manila');

  guardians = [
    { name: 'Parent', id:'1' },
    { name: 'Legal Guardian', id:'2' },
    { name: 'Others', id:'3' },

  ];

  // refusal_reasons = [
  //   { name: 'refuse', id:'1' },
  //   { name: 'refused', id:'2' },
  //   { name: 'refused talaga', id:'3' },

  // ];

  consentForm: FormGroup = new FormGroup({
      id: new FormControl<string| null>(''),
      patient_id: new FormControl<string| null>(''),
      consult_asrh_rapid_id: new FormControl<string| null>(''),
      assessment_date: new FormControl<string| null>(''),
      consent_flag: new FormControl<boolean>(false),
      refused_flag: new FormControl<boolean>(false),
      homeNotes: new FormControl<string| null>(''),
      lib_asrh_consent_type_id: new FormControl<string| null>(''),
      lib_asrh_refusal_reason_id: new FormControl<string| null>(''),
      refusal_reason_other: new FormControl<string| null>(''),
      // status: new FormControl<string| null>(''),
    });

    onSubmit(){
      console.log(this.consentForm.value, 'display visit details')
      this.is_saving = true;
      this.http.post('asrh/comprehensive', this.consentForm.value).subscribe({
        next: (data: any) => {
          this.toastr.success('Comprehensive Details was saved successfuly')
          this.is_saving = false;
          // this.showButton = !this.showButton;
          this.updateSelectedASRH.emit(data);
          // this.loadASRH.emit();
          // this.reloadData();
            // this.patchCompre();
          console.log(this.consentForm, 'checker home')
           },
        complete: () => {
          console.log('success')
        },
        error: err => {console.log(err)

        },
      })
    }


    validateForm() {
      this.consentForm = this.formBuilder.group({
        id: [''],
        patient_id: [this.patient_id],
        consult_asrh_rapid_id: [this.selected_asrh_consult?.id, [Validators.required, Validators.minLength(1)]],
        assessment_date: ['', [Validators.required, Validators.minLength(1)]],
        lib_asrh_consent_type_id: ['', [Validators.required, Validators.minLength(1)]],
        consent_type_other: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(1)]],
        consent_flag: [false],
        refused_flag: [false],
        done_flag: [false],
        lib_asrh_refusal_reason_id: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(1)]],
        refusal_reason_other: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(1)]],
      });

      // Listen for changes to 'refused_flag'
      this.consentForm.get('refused_flag')?.valueChanges.subscribe(value => {
        if (value) {
          // If refused_flag is true, remove the required validators for refusal_reason fields
          this.consentForm.get('lib_asrh_consent_type_id')?.clearValidators();
          this.consentForm.get('consent_type_other')?.clearValidators();
          this.consentForm.get('lib_asrh_consent_type_id')?.disable(); // Disable the control
          this.consentForm.get('consent_type_other')?.disable(); // Disable the control
        } else {
          // If refused_flag is false, add the required validators back
          this.consentForm.get('lib_asrh_consent_type_id')?.setValidators([Validators.required, Validators.minLength(1)]);
          this.consentForm.get('consent_type_other')?.setValidators([Validators.required, Validators.minLength(1)]);
          this.consentForm.get('lib_asrh_consent_type_id')?.enable(); // Enable the control
          this.consentForm.get('consent_type_other')?.enable(); // Enable the control
        }

        // Re-run validation after modifying validators or enabling/disabling fields
        this.consentForm.get('lib_asrh_consent_type_id')?.updateValueAndValidity();
        this.consentForm.get('consent_type_other')?.updateValueAndValidity();
      });

      this.consentForm.get('refused_flag')?.valueChanges.subscribe(value => {
        if (!value) this.consentForm.get('refused_flag')?.setValue(false, {emitEvent: false});
      });

      this.consentForm.get('consent_flag')?.valueChanges.subscribe(value => {
        if (!value) this.consentForm.get('consent_flag')?.setValue(false, {emitEvent: false});
      });

      // Initialize disabled form controls
      this.disableForm();
      this.disableForm4();
      this.disableForm5();
      this.patchCompre();
    }


    patchCompre(){

      if(this.selected_asrh_consult) {
        this.consentForm.patchValue({
        assessment_date: this.selected_asrh_consult?.comprehensive?.assessment_date || this.max_date,
        // status: this.selected_asrh_consult?.comprehensive?.status,
        consent_flag: this.selected_asrh_consult?.comprehensive?.consent_flag,
        refused_flag: this.selected_asrh_consult?.comprehensive?.refused_flag,
        lib_asrh_consent_type_id: this.selected_asrh_consult?.comprehensive?.lib_asrh_consent_type_id,
        consent_type_other: this.selected_asrh_consult?.comprehensive?.consent_type_other,
        lib_asrh_refusal_reason_id: this.selected_asrh_consult?.comprehensive?.lib_asrh_refusal_reason_id,
        refusal_reason_other: this.selected_asrh_consult?.comprehensive?.refusal_reason_other
        });
        // this.show_form = true;
        console.log(this.selected_asrh_consult,'load compre home working')
        // this.loadSelected();
      }
    }

    toggleModal(name){
      this.modals[name] = !this.modals[name];
      console.log('toggle modal')
    }

    openModal() {
      // Listen for changes to the checkbox

          this.toggleServiceModal();

    }

    closeModal() {
      this.showModal = false;  // Close the modal when the close button is clicked
      this.consentForm.get('refused_flag')?.setValue(false);  // Optionally uncheck the checkbox
    }

    showServiceModal = false;
    toggleServiceModal() {
      this.showServiceModal = !this.showServiceModal;
      this.consentForm.get('refused_flag')?.setValue(false);
    }


    acceptModal(){
      this.showServiceModal = !this.showServiceModal;
      this.consentForm.get('refused_flag')?.setValue(true);
    }

    openChild() {
      // Emit an event when the child is opened
      this.opened.emit();
    }

    disableForm(){
      this.consentForm.get('lib_asrh_consent_type_id')?.valueChanges.subscribe((value) => {
        const libAsrhClientTypeCodeControl = this.consentForm.get('consent_type_other');
        if (value != 99 || value === '') {
          libAsrhClientTypeCodeControl?.reset();
          libAsrhClientTypeCodeControl?.disable();
        } else {
          libAsrhClientTypeCodeControl?.enable();
        }

      });
    }

    loadConsentLib(){
      this.http.get('libraries/consent-type').subscribe({
        next: (data: any) => {
          this.consent_type = data.data;
          console.log(this.consent_type, 'consent_type')
        },
        error: err => console.log(err)
      });
    }

    loadReasonLib(){
      this.http.get('libraries/refusal-reason').subscribe({
        next: (data: any) => {
          this.refusal_reasons = data.data;
          console.log(this.consent_type, 'consent_type')
        },
        error: err => console.log(err)
      });
    }

    disableForm4(){
      this.consentForm.get('refused_flag')?.valueChanges.subscribe((value) => {
        const libAsrhClientTypeCodeControl = this.consentForm.get('lib_asrh_refusal_reason_id');
        if (value !== true || value === '') {
          libAsrhClientTypeCodeControl?.reset();
          libAsrhClientTypeCodeControl?.disable();
        } else {
          libAsrhClientTypeCodeControl?.enable();
        }

      });
    }

    disableForm5(){
      this.consentForm.get('lib_asrh_refusal_reason_id')?.valueChanges.subscribe((value) => {
        const OtherReasonControl = this.consentForm.get('refusal_reason_other');
        if (value != 99 || value === '') {
          OtherReasonControl?.reset();
          OtherReasonControl?.disable();
        } else {
          OtherReasonControl?.enable();
        }

      });
    }


 constructor(
    private http: HttpService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder)
  { }

  ngOnChanges(change: SimpleChanges): void{
      this.patchCompre();
      this.disableForm4();
      this.disableForm5();
      // this.openModal();
    }


  ngOnInit(): void {
    this.patient_id = this.route.snapshot.paramMap.get('id');
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');
    this.user_info = this.http.getUserFromJSON();
    this.user_facility = this.http.getUserFacility();
    // this.openChild();
    this.loadConsentLib();
    this.loadReasonLib();
    this.validateForm();
    console.log(this.consentForm, 'user_info')
  }
}

