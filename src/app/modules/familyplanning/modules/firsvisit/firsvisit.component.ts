import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCalendarDay, faPlus, faSave, faTimes, faClose, faTimesCircle, faPencil, faCaretDown, faAngleDown, faInfoCircle, faCaretRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-firsvisit',
  templateUrl: './firsvisit.component.html',
  styleUrls: ['./firsvisit.component.scss']
})
export class FirsvisitComponent implements OnInit {
  @Output() loadFP = new EventEmitter<any>();
  @Input() patient_id;
  @Input() fp_visit_history;

  faSpinner = faSpinner;

  is_saving: boolean = false;

  faSave = faSave;
  faPencil = faPencil;
  
  faInfoCircle = faInfoCircle;

  show_form: boolean = false;
  fp_visit_details: any;

  visitForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    no_of_living_children_actual: new FormControl<string| null>(''),
    no_of_living_children_desired: new FormControl<string| null>(''),
    birth_interval_desired: new FormControl<string| null>(''),
    average_monthly_income: new FormControl<string| null>(''),
  });

  onSubmit(){
    this.http.post('family-planning/fp-records', this.visitForm.value).subscribe({
      next: (data: any) => { 
        this.loadFP.emit(),
        console.log(data, 'display visit details')
         },
      complete: () => {
       
      },
      error: err => {console.log(err)
  
      },
    })
  }
  
  validateForm(){
   
    this.visitForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      patient_id: [this.patient_id, [Validators.required, Validators.minLength(2)]],
      no_of_living_children_actual: ['', [Validators.required, Validators.minLength(2)]],
      no_of_living_children_desired: ['', [Validators.required, Validators.minLength(2)]],
      birth_interval_desired: ['', [Validators.required, Validators.minLength(2)]],
      average_monthly_income: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.loadFPDetails();
  }

  loadFPDetails(){
    
    if(this.fp_visit_history) {
      this.visitForm.patchValue({...this.fp_visit_history[0]});
      this.show_form = true;
    }
  }

  constructor(
    private router: Router,
    private http: HttpService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.validateForm();
    console.log(this.fp_visit_history, 'checker')
  } 
}
