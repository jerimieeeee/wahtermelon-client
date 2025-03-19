import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-outcome-form',
  standalone: false,
  templateUrl: './outcome-form.component.html',
  styleUrl: './outcome-form.component.scss'
})
export class OutcomeFormComponent {
  @Output() loadAppointments = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_appointment: any;
  faCircleNotch = faCircleNotch;

  refusal_list: {};
  show_form!: boolean;

  max_date = formatDate(new Date(), 'yyyy-MM-dd', 'en', 'Asia/Manila');
  is_saving: boolean = false;

  with_outcome: boolean = false;
  referralForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(''),
    outcome_date: new FormControl<string| null>(''),
    referral_refusal_id: new FormControl<string| null>(''),
    refusal_others: new FormControl<string| null>(''),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.referralForm.controls;
  }

  toggleForm(){
    this.with_outcome = !this.with_outcome;
    this.createForm();
  }

  loadLibraries(){
    this.show_form = false;
    this.toggleForm();
    const getRefusal = this.http.get('libraries/referral-refusal');

    forkJoin([getRefusal]).subscribe({
      next:([dataRefusal]: any) => {
        this.refusal_list = dataRefusal.data;


        // this.with_outcome = true;
        this.show_form = true;
      },
      error: err => console.log(err)
    });
  }

  createForm(){
    this.referralForm = this.formBuilder.nonNullable.group({
      id: [this.selected_appointment.id, Validators.required],
      outcome_date: [null, Validators.required],
      referral_refusal_id: [null],
      refusal_others: [null],
    });
  }

  onSubmit(){
    this.is_saving = true;

    let params = {
      id: this.referralForm.value.id,

      outcome_date: this.referralForm.value.outcome_date,
      referral_refusal_id: this.referralForm.value.referral_refusal_id,
      refusal_others: this.referralForm.value.refusal_others
    };
    // console.log(params);

    this.http.update('appointment/schedule/', this.referralForm.value.id, params).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.is_saving = false;
        this.toastr.success('Successfully recorded!','Referral');
        this.router.navigate(['/patient/itr', {id: this.selected_appointment.patient_id}]);
        // this.loadAppointments.emit();
        // this.closeModal();
      },
      error: err => console.log(err)
    })
  }

  closeModal(){
    this.toggleModal.emit('outcome');
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService,
    private router: Router
  ) { }
}
