import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCalendarDay, faPlus, faSave, faTimes, faClose, faTimesCircle, faPencil, faCaretDown, faAngleDown, faInfoCircle, faCaretRight, faSpinner, faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.scss']
})
export class MethodsComponent implements OnInit {
  @Output() loadFP = new EventEmitter<any>();
  @Output() updateSelectedFp = new EventEmitter<any>();
  @Input() patient_id;
  @Input() fp_visit_history;
  @Input() selected_fp_consult;


  modal: boolean;

  faSpinner = faSpinner;

  is_saving: boolean = false;
  show_form: boolean = false;
  show_error: boolean = false;
  showButton: boolean = false;

  faTimes = faTimes;
  faClose = faClose;
  faTimesCircle = faTimesCircle;
  faSave = faSave;
  faPencil = faPencil;
  faAngleDown = faAngleDown;
  faInfoCircle = faInfoCircle;
  faCaretRight = faCaretRight;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faTrashCan = faTrashCan;
  error_message = '';
  public buttons = [];

  public keyUp = [];

  fp_method_history: any = [];
  fp_methods: any = [];
  client_list: any = [];

  fp_visit_history_details: any;

  modals: any = [];

  per_page: number = 5;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  partner: any;

  required_message = 'Required field';

  delete_id: string;
  delete_desc: string;
  url: string;

  toggleModal(name, data?){
    this.modals[name] = !this.modals[name];

    if(name === 'delete-item') {
      if(this.modals[name] === true) {
        this.delete_id = data.id;
        this.delete_desc = "Previous Method Record";
        this.url = "family-planning/fp-method/";
      } else {
        this.delete_id = null;
        this.delete_desc = null;
        this.url = null;
      }
      this.getMethodHistory();
    }
  }

  getMethodHistory(page?: number){
    // console.log('query')
    let params = {
      patient_id: this.fp_visit_history_details.patient_id,
      per_page: 10,
      page: !page ? this.current_page : page
    }

    // params['params']['page'] = !page ? this.current_page : page;
    // if (this.selected_physician !== 'all') params['params']['physician_id'] = this.selected_physician;
    // params['params']['per_page'] = this.per_page;
    // params['params']['patient_id'] = this.fp_visit_history_details.patient_id;
    // params['params']['consult_done'] = 0;

    // console.log(params, page, this.current_page)
    this.http.get('family-planning/fp-method', {params}).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.show_form = true;
        this.fp_method_history = data.data
        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
        console.log(this.fp_method_history, 'check method history')
      },
      error: err => console.log(err)
    })
  }

  loadLibraries() {
    let params = {
      patient_id: this.fp_visit_history_details.patient_id,
      per_page: 10
    }

    let params2 = {
      per_page: 5
    }


    // const getMethodHistory = this.http.get('family-planning/fp-method', {params});
    const getMethod = this.http.get('libraries/family-planning-method');
    const getClient = this.http.get('libraries/family-planning-client-type');

    forkJoin([ getMethod, getClient]).subscribe({
      next:([ dataMethod, dataClient]:any) => {
        // this.fp_method_history = dataMethodHistory.data;
        this.fp_methods = dataMethod.data;
        this.client_list = dataClient.data;

        // this.current_page = dataMethodHistory.meta.current_page;
        // this.last_page = dataMethodHistory.meta.last_page;
        // this.from = dataMethodHistory.meta.from;
        // this.to = dataMethodHistory.meta.to;
        // this.total = dataMethodHistory.meta.total;
        this.getMethodHistory();
        this.validateForm();
        this.loadFPUsers();
        // this.loadFP.emit();
        console.log(this.fp_methods, 'new function methods');
        console.log(this.client_list, 'new function client list');
        console.log(this.fp_method_history, 'new function method history');

      },
      error: err => console.log(err)
    });
  }

  methodForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    patient_fp_id: new FormControl<string| null>(''),
    enrollment_date: new FormControl<string| null>(''),
    method_code: new FormControl<string| null>(''),
    client_code: new FormControl<string| null>(''),
    treatment_partner: new FormControl<string| null>(''),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.methodForm.controls;
  }

  onSubmit(){
    this.is_saving = true;
    this.http.post('family-planning/fp-method', this.methodForm.value).subscribe({
      next: (data: any) => {
        this.toastr.success('Method was ' + (this.methodForm.value ? 'updated' : 'saved') + ' successfully', 'Success')
        this.is_saving = false;
        this.showButton = true;
        this.loadFP.emit();
        this.reloadData();
        this.loadFPDetails();
        this.fp_visit_history_details = this.fp_visit_history
        console.log(data, 'display method on submit')
        console.log(this.showButton, 'display button details on submit')
         },
      complete: () => {

      },
      error: err => {console.log(err)
        this.show_error = true
        this.is_saving = false;
        this.toastr.error('Form invalid or incomplete', 'Error')
      },
    })
  }

  reloadData(){
    let params = {
      patient_id: this.patient_id
    }

    this.http.get('family-planning/fp-records', {params}).subscribe({
      next: (data: any) => {
        this.selected_fp_consult = data.data[0];
        this.updateSelectedFp.emit(this.selected_fp_consult);
        console.log(this.selected_fp_consult, 'check mo selected')
      },
      error: err => console.log(err)
    });
  }

  validateForm(){
    this.methodForm = this.formBuilder.group({
      id: [''],
      patient_id: [this.patient_id, [Validators.required, Validators.minLength(1)]],
      patient_fp_id: [this.fp_visit_history_details.id, [Validators.required, Validators.minLength(1)]],
      enrollment_date: ['', [Validators.required, Validators.minLength(1)]],
      method_code: ['', [Validators.required, Validators.minLength(1)]],
      client_code: ['', [Validators.required, Validators.minLength(1)]],
      treatment_partner: ['', [Validators.required]],
    });

    this.loadFPDetails();
    this.show_form = true;
  }

  loadFPDetails(){

    if(this.fp_visit_history) {
      this.methodForm.patchValue({...this.fp_visit_history?.method});
      this.show_form = true;
    }
  }

  loadFPUsers() {
    this.http.get('users', {params: {attendant_flag: 'tb'}}).subscribe({
      next: (data: any) => {
        this.partner = data.data;
        console.log(this.partner, 'load users')
      }
    })
  }

  // formInit() {

  //   this.methodForm = this.formBuilder.group({
  //     id: ['', [Validators.required]],
  //     patient_id: [this.patient_id, [Validators.required, Validators.minLength(1)]],
  //     patient_fp_id: [this.fp_visit_history_details.id, [Validators.required, Validators.minLength(1)]],
  //   });
  //  }

  resetMethodForm(){
    this.fp_visit_history.method = null
    this.validateForm();
  }

   anotherFunction() {

    this.showButton = !this.showButton;
    // this.methodForm.reset();
    this.loadFP.emit();
    this.reloadData();
    this.getMethodHistory();
    // this.fp_visit_history_details = this.fp_visit_history
    // this.loadLibraries();
    // this.loadFPDetails();
    this.resetMethodForm();


    console.log('test another function v2')
    console.log(this.showButton, 'test button')
    console.log(this.methodForm, 'form')
  }


  constructor(
    private router: Router,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.fp_visit_history_details = this.fp_visit_history
    this.loadLibraries();
    this.loadFP.emit();
    console.log(this.fp_visit_history_details, 'display fp visit history on init method ')
    // console.log(this.patient_id, 'display patient ID METHOD')
    // this.error_message = '**please enter numbers only';
  }
}

