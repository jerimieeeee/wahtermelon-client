import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-referral-modal',
  templateUrl: './referral-modal.component.html',
  styleUrls: ['./referral-modal.component.scss']
})
export class ReferralModalComponent {
  @Output() getPatientTbHistory = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() switchPage = new EventEmitter<any>();
  @Input() selected_tb_consult;
  @Input() max_date;

  is_saving: boolean = false;
  show_error: boolean = false;
  tb_enroll_as: any;
  get f(): { [key: string]: AbstractControl } {
    return this.interviewForm.controls;
  }

  onSubmit(){

  }

  interviewForm: FormGroup = new FormGroup({
    patient_id: new FormControl<string| null>(''),
    tb_treatment_outcome_code : new FormControl<string| null>(''),
    lib_tb_outcome_reason_id : new FormControl<string| null>(''),
    outcome_date: new FormControl<string| null>(''),
    treatment_done: new FormControl<string| null>(''),
    outcome_remarks: new FormControl<string| null>(''),
  });

  closeModal(){
    this.toggleModal.emit('referral');
  }
}
