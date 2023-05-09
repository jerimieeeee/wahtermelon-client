import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gbv-referral',
  templateUrl: './gbv-referral.component.html',
  styleUrls: ['./gbv-referral.component.scss']
})
export class GbvReferralComponent {
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
    this.toggleModal.emit('gbv_referral');
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // console.log(this.selected_tb_consult);
    // this.createForm();
  }
}
