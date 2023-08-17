import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCalendarDay, faPlus, faSave, faTimes, faClose, faTimesCircle, faPencil, faCaretDown, faAngleDown, faInfoCircle, faCaretRight, faSpinner, faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
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
  @Input() patient_id;
  @Input() fp_visit_history;

  
  modal: boolean;

  faSpinner = faSpinner;

  is_saving: boolean = false;
  show_form: boolean = false;
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
  
  toggleModal(name) {
    this.modals[name] = !this.modals[name];
    // this.showButton = !this.showButton;
    // this.loadLibraries();
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

  onSubmit(){
    this.is_saving = true;
    this.http.post('family-planning/fp-method', this.methodForm.value).subscribe({
      next: (data: any) => {
        this.toastr.success('Method was ' + (this.methodForm.value ? 'updated' : 'saved') + ' successuly', 'Success')
        this.is_saving = false;
        this.showButton = true;
        this.loadFP.emit();
        this.loadFPDetails();
        this.fp_visit_history_details = this.fp_visit_history[0] 
        console.log(data, 'display visit details')
        console.log(this.showButton, 'display button details')
         },
      complete: () => {
       
      },
      error: err => {console.log(err)
  
      },
    })
  }
  
  validateForm(){
    this.methodForm.reset();
    this.methodForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      patient_id: [this.patient_id, [Validators.required, Validators.minLength(1)]],
      patient_fp_id: [this.fp_visit_history_details.id, [Validators.required, Validators.minLength(1)]],
      enrollment_date: ['', [Validators.required, Validators.minLength(1)]],
      method_code: ['', [Validators.required, Validators.minLength(1)]],
      client_code: ['', [Validators.required, Validators.minLength(1)]],
      treatment_partner: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.loadFPDetails();
    this.show_form = true;
  }

  loadFPDetails(){
    
    if(this.fp_visit_history) {
      this.methodForm.patchValue({...this.fp_visit_history[0]?.method});
      this.show_form = true;
    }
  }

  // formInit() {
  
  //   this.methodForm = this.formBuilder.group({
  //     id: ['', [Validators.required]],
  //     patient_id: [this.patient_id, [Validators.required, Validators.minLength(1)]],
  //     patient_fp_id: [this.fp_visit_history_details.id, [Validators.required, Validators.minLength(1)]],
  //   });
  //  }

   anotherFunction() {
    
    this.showButton = !this.showButton;
    this.methodForm.reset();
    this.loadFP.emit();
    this.fp_visit_history_details = this.fp_visit_history[0] 
    // this.loadFPDetails();
    this.loadLibraries();

    
   
    console.log('test another function')
    console.log(this.showButton, 'test button')
  }
  

  constructor(
    private router: Router,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.fp_visit_history_details = this.fp_visit_history[0] 
    this.loadLibraries();
    this.loadFP.emit();
    console.log(this.fp_visit_history_details, 'checking patient id fp details')
    console.log(this.patient_id, 'display patient ID METHOD')
    this.error_message = '**please enter numbers only';
  } 
}

