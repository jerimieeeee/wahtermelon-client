import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-methods-modal',
  templateUrl: './methods-modal.component.html',
  styleUrls: ['./methods-modal.component.scss']
})
export class MethodsModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Output() loadFP = new EventEmitter<any>();
  @Output() loadFPDetails = new EventEmitter<any>();
  @Output() anotherFunction = new EventEmitter<any>();
  @Input() patient_id;
  @Input() fp_visit_history;


  is_saving: boolean = false;

  show_form: boolean = false;

  fp_visit_history_details: any;

  reasons: any;

  closeModal(){
    this.toggleModal.emit('methods-modal');
    // console.log('check modal')
  }

  dropForm: FormGroup = new FormGroup({

    dropout_date: new FormControl<string| null>(''),
    dropout_reason_code: new FormControl<string| null>(''),
    dropout_remarks: new FormControl<string| null>(''),

  });

  onSubmit(){
    console.log(this.dropForm)
    this.is_saving = true;
    this.http.update('family-planning/fp-method/', this.fp_visit_history_details.method.id, this.dropForm.value).subscribe({
      next: (data: any) => {
        this.toastr.success('Dropout was ' + (this.dropForm.value ? 'saved' : 'saved') + ' successuly', 'Success')
        this.is_saving = false;
        // this.loadFP.emit();
        // this.loadFPDetails.emit();
        this.anotherFunction.emit();
        console.log(data, 'display dropout details')
         },
      complete: () => {
       this.closeModal();
      },
      error: err => {console.log(err)

      },
    })
  }

  loadLib() {


    this.http.get('libraries/family-planning-dropout-reason').subscribe({
      next: (data: any) => {

       this.reasons = data.data
       console.log(this.reasons, 'display reasons')
      },
      complete: () => {

      },
      error: err => {console.log(err)

      },
    })
  }

  validateForm(){

    this.dropForm = this.formBuilder.group({

      dropout_date: ['', [Validators.required, Validators.minLength(1)]],
      dropout_reason_code: ['', [Validators.required, Validators.minLength(1)]],
      dropout_remarks: [''],
    });

    // this.loadFPDetails();
    this.show_form = true;
  }

  // loadFPDetails(){

  //   if(this.fp_visit_history) {
  //     this.methodForm.patchValue({...this.fp_visit_history?.method});
  //     this.show_form = true;
  //   }
  // }


  constructor(
    private router: Router,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.fp_visit_history_details = this.fp_visit_history
    this.validateForm();
    this.loadLib();
    console.log(this.fp_visit_history_details, 'fp history in method modal')
  }
}
