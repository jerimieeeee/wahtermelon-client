import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCalendar, faTimes, faDoorClosed, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrl: './consent.component.scss'
})
export class ConsentComponent implements OnInit {
  @Input() selected_asrh_consult: any;
  @Output() updateSelectedASRH = new EventEmitter<any>();
  @Output() opened = new EventEmitter<void>();

  faCalendar = faCalendar;
  faTimes = faTimes;
  faDoorClosed = faDoorClosed;
  faCircleNotch = faCircleNotch;

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

  consult_details: any;

  is_saving: boolean = false;

  consentForm: FormGroup = new FormGroup({
      id: new FormControl<string| null>(''),
      patient_id: new FormControl<string| null>(''),
      consult_asrh_rapid_id: new FormControl<string| null>(''),
      assessment_date: new FormControl<string| null>(''),
      consent_flag: new FormControl<boolean>(false),
      refused_flag: new FormControl<boolean>(false),
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

  validateForm(){

      this.consentForm = this.formBuilder.group({
        id: [''],
        patient_id: [this.patient_id],
        consult_asrh_rapid_id: [this.selected_asrh_consult?.id, [Validators.required, Validators.minLength(1)]],
        assessment_date: ['', [Validators.required, Validators.minLength(1)]],
        consent_flag: ['', [Validators.required, Validators.minLength(1)]],
        refused_flag: [false],
        // status: ['', [Validators.required, Validators.minLength(1)]],
        // average_monthly_income: ['', [Validators.required, Validators.minLength(1), Validators.pattern("^[0-9,;]+$")]],
      });
      this.patchCompre();
      // this.disableForm();
      // this.loadFPDetails();
      // this.show_form = true;
    }

    patchCompre(){

      if(this.selected_asrh_consult) {
        this.consentForm.patchValue({
        assessment_date: this.selected_asrh_consult?.comprehensive?.assessment_date,
        // status: this.selected_asrh_consult?.comprehensive?.status,
        consent_flag: this.selected_asrh_consult?.comprehensive?.consent_flag,
        refused_flag: this.selected_asrh_consult?.comprehensive?.refused_flag

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

 constructor(
    private http: HttpService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder)
  { }


  ngOnInit(): void {
    this.patient_id = this.route.snapshot.paramMap.get('id');
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');
    this.user_info = this.http.getUserFromJSON();
    this.user_facility = this.http.getUserFacility();
    this.openChild();
    this.validateForm();
    console.log(this.user_info, 'user_info')
  }
}

