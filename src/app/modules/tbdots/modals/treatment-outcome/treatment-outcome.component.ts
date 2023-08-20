import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-treatment-outcome',
  templateUrl: './treatment-outcome.component.html',
  styleUrls: ['./treatment-outcome.component.scss']
})
export class TreatmentOutcomeComponent implements OnInit {
  @Output() getPatientTbHistory = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() switchPage = new EventEmitter<any>();
  @Input() selected_tb_consult;
  @Input() max_date;

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  answers: any;
  answers_yn: any;

  is_saving: boolean = false;
  show_error: boolean = false;
  required_message = 'Required field';

  tbForm: FormGroup = new FormGroup({
    patient_id: new FormControl<string| null>(''),
    tb_treatment_outcome_code : new FormControl<string| null>(''),
    lib_tb_outcome_reason_id : new FormControl<string| null>(''),
    outcome_date: new FormControl<string| null>(''),
    treatment_done: new FormControl<string| null>(''),
    outcome_remarks: new FormControl<string| null>(''),
  });


  get f(): { [key: string]: AbstractControl } {
    return this.tbForm.controls;
  }

  onSubmit(){
    this.is_saving = true;

    // console.log(this.tbForm);
    this.http.update('tbdots/patient-tb/', this.selected_tb_consult.id, this.tbForm.value).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.saveComplete()
      },
      error: err => console.log(err)
    });
  }

  saveComplete(){
    this.is_saving = false;
    this.toastr.success('Successfully recorded!','Treatment Outcome');
    this.switchPage.emit(1);
    this.closeModal();
  }

  disableFields(){
    if(this.tbForm.value.tb_treatment_outcome_code === 'D' ||
        this.tbForm.value.tb_treatment_outcome_code === 'LTFU' ||
        this.tbForm.value.tb_treatment_outcome_code === 'NE') {
      this.tbForm.controls.lib_tb_outcome_reason_id.enable();
    } else {
      this.tbForm.controls.lib_tb_outcome_reason_id.disable();
    }
  }

  treatment_outcomes: any;
  outcome_reasons: any;
  loadLibraries(){
    this.http.get('libraries/tb-treatment-outcome').subscribe({
      next: (data: any) => this.treatment_outcomes = data.data,
      error: err => console.log(err)
    })

    this.http.get('libraries/tb-outcome-reason').subscribe({
      next: (data: any) => this.outcome_reasons = data.data,
      error: err => console.log(err)
    })
  }

  checkReason(id):boolean {
    let val: boolean = false;
    if(this.f.tb_treatment_outcome_code.value === 'D') {
      val = id>=10 && id<=11 ? false : true;
    } else if (this.f.tb_treatment_outcome_code.value === 'LTFU' || this.f.tb_treatment_outcome_code.value === 'NE'){
      val = id>=10 && id<=11 ? true : false;
    }
    return val;
  }

  createForm(){
    if(this.selected_tb_consult){
      this.tbForm = this.formBuilder.nonNullable.group({
        patient_id: [this.selected_tb_consult.patient_id],
        tb_treatment_outcome_code: ['', Validators.required],
        lib_tb_outcome_reason_id: ['', Validators.required],
        outcome_date: ['', Validators.required],
        treatment_done: [false],
        outcome_remarks: [''],
      });
    }

    this.loadLibraries();
    this.disableFields();
    this.tbForm.patchValue({
      tb_treatment_outcome_code: this.selected_tb_consult.tb_treatment_outcome ? this.selected_tb_consult.tb_treatment_outcome.code : null,
      lib_tb_outcome_reason_id: this.selected_tb_consult.outcome_reason ? this.selected_tb_consult.outcome_reason.id : null,
      outcome_date: this.selected_tb_consult.outcome_date ? formatDate(this.selected_tb_consult.outcome_date, 'yyyy-MM-dd', 'en', 'Asia/Manila') : null,
      treatment_done: this.selected_tb_consult.treatment_done,
      outcome_remarks: this.selected_tb_consult.outcome_remarks
    });

    this.disableFields();
  }

  closeModal(){
    this.toggleModal.emit('treatment_outcome');
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // console.log(this.selected_tb_consult);
    this.createForm();
  }
}
