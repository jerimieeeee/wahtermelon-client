import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCalendarDay, faPlus, faSave, faTimes, faClose, faTimesCircle, faPencil, faCaretDown, faAngleDown, faInfoCircle, faCaretRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-firsvisit',
  templateUrl: './firsvisit.component.html',
  styleUrls: ['./firsvisit.component.scss']
})
export class FirsvisitComponent implements OnInit {
  @Output() loadFP = new EventEmitter<any>();
  @Output() updateSelectedFp = new EventEmitter<any>();
  @Input() patient_id;
  @Input() fp_visit_history;
  @Input() selected_fp_consult;

  faSpinner = faSpinner;

  is_saving: boolean = false;
  showButton: boolean = false;

  faSave = faSave;
  faPencil = faPencil;

  faInfoCircle = faInfoCircle;

  show_form = false;
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
    this.is_saving = true;
    this.http.post('family-planning/fp-records', this.visitForm.value).subscribe({
      next: (data: any) => {
        this.toastr.success('First Visit was ' + (this.visitForm.value ? 'updated' : 'saved') + ' successuly', 'Success')
        this.is_saving = false;
        this.showButton = !this.showButton;
        this.loadFP.emit();
        this.reloadData();
        console.log(data, 'display visit details')
        console.log(this.fp_visit_history, 'checker FV 2')
         },
      complete: () => {

      },
      error: err => {console.log(err)

      },
    })
  }

  validateForm(){

    this.visitForm = this.formBuilder.group({
      id: [''],
      patient_id: [this.patient_id],
      no_of_living_children_actual: ['', [Validators.required, Validators.minLength(1)]],
      no_of_living_children_desired: ['', [Validators.required, Validators.minLength(1)]],
      birth_interval_desired: ['', [Validators.required, Validators.minLength(1)]],
      average_monthly_income: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.loadFPDetails();
    this.show_form = true;
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

  loadFPDetails(){

    if(this.fp_visit_history) {
      this.visitForm.patchValue({...this.fp_visit_history});
      this.show_form = true;
    }
  }

  constructor(
    private router: Router,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.validateForm();
    console.log(this.fp_visit_history, 'checker FV')
  }
}
