import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCalendar, faTimes, faDoorClosed, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adolescent',
  templateUrl: './adolescent.component.html',
  styleUrl: './adolescent.component.scss'
})
export class AdolescentComponent implements OnInit {

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
  selected_asrh_consult: any;
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
          this.updateSelectedASRH
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

  switchPage(page) {
    if(page === 1) this.loadASRH();
    this.pages = page;
    console.log(this.pages, 'Test')
  }

  switchTab(tab) {
    this.module = tab;
  }

  switchTabCompre(tab_compre) {
    this.module_compre = tab_compre;
  }

  updateSelectedASRH() {
    // let params = {
    //   id: this.selected_asrh_consult.id
    // };
    console.log('selected id')
    this.http.get('asrh/rapid/'+ this.selected_asrh_consult.id).subscribe({
      next: (data: any) => {
        // this.patient_asrh_history = data.data;
        this.selected_asrh_consult = data.data;
        this.fetching_history = true;
        console.log(this.selected_asrh_consult, 'selected_asrh_consult main');
        // this.pages = 2;
      },
      error: err => console.log(err)
    });
  }

  updateSelectedASRH2(id){
    console.log('selected id')
    this.http.get('asrh/rapid/'+ id).subscribe({
      next: (data: any) => {
        // this.patient_asrh_history = data.data;
        this.selected_asrh_consult = data.data;
        this.fetching_history = true;
        console.log(this.selected_asrh_consult, 'selected_asrh_consult main');
        // this.pages = 2;
      },
      error: err => console.log(err)
    });
  }

  openASRHConsult(data) {
    // this.router.navigate(['/patient/at', {id: this.patient_id ?? this.patient_id, consult_id: this.consult_id ?? this.consult_id}]);
    this.selected_asrh_consult = data;
    console.log(this.selected_asrh_consult, 'selected_asrh_consult');
    this.pages = 2;
    console.log()
  }

  toggleModal(name){
    this.modals[name] = !this.modals[name];
    console.log('toggle modal')
  }

  loadLibraries() {
    const getCompre = this.http.get('libraries/comprehensive');
    const getClient = this.http.get('libraries/asrh-client-type');

    forkJoin([getCompre, getClient]).subscribe({
      next: ([dataCompre, dataClient]: any) => {
        this.compre_questions = dataCompre.data;
        this.client_types = dataClient.data;
        console.log(this.compre_questions, this.client_types, 'libraries')
      },
      error: err => console.log(err)
    });
  }

 /*  loadCompreLib(){
    this.http.get('libraries/comprehensive').subscribe({
      next: (data: any) => {
        this.compre_questions = data.data;
        console.log(this.compre_questions)

      },
      error: err => console.log(err)
    });
  } */

  /* loadClient(){
    this.http.get('libraries/asrh-client-type').subscribe({
      next: (data: any) => {
        this.client_types = data.data;
      },
      error: err => console.log(err)
    });
  } */

 loadASRH(){
    this.selected_asrh_consult = null;
    this.fetching_history = true;
    let params = {
      patient_id: this.patient_id
    };

    this.http.get('asrh/rapid', {params}).subscribe({
      next: (data: any) => {
        this.patient_asrh_history = data.data;
        if(this.patient_asrh_history[0] && !this.patient_asrh_history[0]?.comprehensive?.status === null) this.selected_asrh_consult = data.data[0];
        this.fetching_history = true;
        console.log(this.selected_asrh_consult, 'selected_asrh_consult');
        // this.pages = 2;
      },
      error: err => console.log(err)
    });
  }

  loadASRH2(){
    this.fetching_history = true;
    let params = {
      patient_id: this.patient_id
    };

    this.http.get('asrh/rapid', {params}).subscribe({
      next: (data: any) => {
        this.patient_asrh_history = data.data[0];
        this.fetching_history = true;
        console.log(this.patient_asrh_history, 'selected_asrh_consult sa main');
        // this.pages = 2;
      },
      error: err => console.log(err)
    });
  }

  loadConsultDetails(){

    this.http.get('consultation/records',{params: {patient_id: this.patient_id, id: this.consult_id}}).subscribe({
      next: (data: any) => {
        this.consult_details = data.data[0];
        console.log(this.consult_details, 'consult details')
        this.loadASRH();
        this.loadLibraries();
        this.show_form = true;
        this.fetching_history = true;
      },
      error: err => console.log(err)
    });
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

    this.loadConsultDetails();
    this.validateForm();
    console.log(this.user_info, 'user_info')
  }
}
