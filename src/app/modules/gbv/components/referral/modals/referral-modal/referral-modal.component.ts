import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-referral-modal',
  templateUrl: './referral-modal.component.html',
  styleUrls: ['./referral-modal.component.scss']
})
export class ReferralModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_id;
  @Input() selected_gbv_case;
  @Input() selected_data;

  faCircleNotch = faCircleNotch;
  faSave = faSave;

  is_saving: boolean = false;
  show_error: boolean = false;
  show_form: boolean = false;
  facilities: any;

  referralForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    patient_gbv_id: new FormControl<string| null>(''),
    referral_facility_code : new FormControl<string| null>(''),
    referral_date: new FormControl<string| null>(''),
    referral_reason: new FormControl<string| null>(''),
    service_remarks: new FormControl<string| null>(''),
    referral_remarks: new FormControl<string| null>('')
  });

  onSubmit(){
    this.is_saving = true;
    let query;

    if(this.referralForm.value.id) {
      query =  this.http.update('gender-based-violence/patient-gbv-referral/', this.referralForm.value.id, this.referralForm.value);
    } else {
      query = this.http.post('gender-based-violence/patient-gbv-referral', this.referralForm.value);
    }

    query.subscribe({
      next: (data: any) => {
        console.log(data);
        this.is_saving = false;
        this.toastr.success('Successfully recorded', 'Referral');
        this.closeModal();
      },
      error: err => console.log(err)
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.referralForm.controls;
  }

  createForm() {
    this.referralForm = this.formBuilder.group({
      id: [null],
      patient_id: [this.patient_id],
      patient_gbv_id: [this.selected_gbv_case.id],
      referral_facility_code : [null],
      referral_date: [null],
      referral_reason: [null],
      service_remarks: [null],
      referral_remarks: [null]
    });

    if(this.selected_data) {
      this.referralForm.patchValue({...this.selected_data});
    }

    this.show_form = true;
  }

  // const getMdt = this.http.get('patient-gbv-user');
  loadLibraries() {
    this.http.get('gender-based-violence/patient-gbv-user', {params: {per_page: 'all'}}).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.facilities = data.data;
        this.createForm();
      }
    })
  }

  closeModal(){
    this.toggleModal.emit('referral');
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
