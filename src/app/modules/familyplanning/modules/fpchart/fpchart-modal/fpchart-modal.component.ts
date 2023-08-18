import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fpchart-modal',
  templateUrl: './fpchart-modal.component.html',
  styleUrls: ['./fpchart-modal.component.scss']
})
export class FpchartModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Output() loadFP = new EventEmitter<any>();
  @Output() loadFPDetails = new EventEmitter<any>();
  @Output() anotherFunction = new EventEmitter<any>();
  @Input() patient_id;
  @Input() fp_visit_history;
  
  
  is_saving: boolean = false;

  show_form: boolean = false;

  fp_visit_history_details: any;

  source_supplies: any;

  closeModal(){
    this.toggleModal.emit('fpchart-modal');
    // console.log('check modal')
  }

  sourceForm: FormGroup = new FormGroup({

    patient_id: new FormControl<string| null>(''),
    patient_fp_id: new FormControl<string| null>(''),
    patient_fp_method_id: new FormControl<string| null>(''),
    service_date: new FormControl<string| null>(''),
    source_supply_code: new FormControl<string| null>(''),
    quantity: new FormControl<string| null>(''),
    
  });

  onSubmit(){
    console.log(this.sourceForm)
    this.is_saving = true;
    this.http.post('family-planning/fp-chart', this.sourceForm.value).subscribe({
      next: (data: any) => {
        this.toastr.success('Chart was ' + (this.sourceForm.value ? 'updated' : 'saved') + ' successuly', 'Success')
        this.is_saving = false;
        // this.loadFP.emit();
        // this.loadFPDetails.emit();
        this.anotherFunction.emit();
        console.log(data, 'display chart details')
         },
      complete: () => {
       this.closeModal();
      },
      error: err => {console.log(err)
  
      },
    })
  }

  loadLib() {


    this.http.get('libraries/family-planning-source-supply').subscribe({
      next: (data: any) => { 

       this.source_supplies = data.data
       console.log(this.source_supplies, 'display supplies') 
      },
      complete: () => {
        
      },
      error: err => {console.log(err)
  
      },
    })
  }
  
  validateForm(){
    
    this.sourceForm = this.formBuilder.group({
      
      patient_id: [this.patient_id, [Validators.required, Validators.minLength(1)]],
      patient_fp_id: [this.fp_visit_history_details.id, [Validators.required, Validators.minLength(1)]],
      patient_fp_method_id: [this.fp_visit_history_details.method.id, [Validators.required, Validators.minLength(1)]],
      service_date: ['', [Validators.required, Validators.minLength(1)]],
      source_supply_code: ['', [Validators.required, Validators.minLength(1)]],
      quantity: ['', [Validators.required, Validators.minLength(1)]],
      
    });

    // this.loadFPDetails();
    this.show_form = true;
  }

  // loadFPDetails(){
    
  //   if(this.fp_visit_history) {
  //     this.methodForm.patchValue({...this.fp_visit_history[0]?.method});
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
    this.fp_visit_history_details = this.fp_visit_history[0]
    this.validateForm();
    this.loadLib();
    console.log(this.fp_visit_history_details, 'fp history in fp chart modal')
  } 
}