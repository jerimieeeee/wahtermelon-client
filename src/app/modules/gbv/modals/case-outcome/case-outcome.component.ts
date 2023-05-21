import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-case-outcome',
  templateUrl: './case-outcome.component.html',
  styleUrls: ['./case-outcome.component.scss']
})
export class CaseOutcomeComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_gbv_case;

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  is_saving: boolean = false;

  caseOutcomeForm:FormGroup = new FormGroup({
    id: new FormControl<string| null>(null),
    patient_id: new FormControl<string| null>(null),
    outcome_date: new FormControl<string| null>(null),
    outcome_reason_id: new FormControl<string| null>(null),
    outcome_reason_remarks: new FormControl<string| null>(null),
    outcome_result_id: new FormControl<string| null>(null),
    outcome_result_remarks: new FormControl<string| null>(null),
    outcome_verdict_id: new FormControl<string| null>(null)
  });

  onSubmit() {
    this.is_saving = true;
    this.http.update('gender-based-violence/patient-gbv/', this.caseOutcomeForm.value.id, this.caseOutcomeForm.value).subscribe({
      next: (data: any) => {
        this.is_saving = false;
        this.toastr.success('Successfully recorded', 'Case Outcome');
        this.closeModal();
      }
    })
  }

  createForm() {
    this.caseOutcomeForm =  this.formBuilder.group({
      id: [this.selected_gbv_case.id],
      patient_id: [this.selected_gbv_case.patient_id],
      outcome_date: [null, Validators.required],
      outcome_reason_id: [null],
      outcome_reason_remarks: [null],
      outcome_result_id: [null],
      outcome_result_remarks: [null],
      outcome_verdict_id: [null],
      outcome_remarks: [null]
    });
  }

  outcome_reasons: any = [];
  outcome_results: any = [];
  outcome_verdicts: any = [];

  loadLibraries() {
    const getOutcomeReason = this.http.get('libraries/gbv-outcome-reason');
    const getOutcomeResult = this.http.get('libraries/gbv-outcome-result');
    const getOutcomeVerdict = this.http.get('libraries/gbv-outcome-verdict');

    forkJoin([getOutcomeReason, getOutcomeResult, getOutcomeVerdict]).subscribe({
      next: ([dataOutcomeReason, dataOutcomeResult, dataOutcomeVerdict]: any) => {
        this.outcome_reasons =  dataOutcomeReason.data;
        this.outcome_results =  dataOutcomeResult.data;
        this.outcome_verdicts =  dataOutcomeVerdict.data;

        this.createForm();
      },
      error: err => console.log(err)
    })
  }

  closeModal() {
    this.toggleModal.emit('case_outcome');
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
      this.loadLibraries();
  }
}
