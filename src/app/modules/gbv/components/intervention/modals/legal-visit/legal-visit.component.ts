import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-legal-visit',
  templateUrl: './legal-visit.component.html',
  styleUrls: ['./legal-visit.component.scss']
})
export class LegalVisitComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_gbv_intake_id;
  @Input() patient_id;
  @Input() selected_data;

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  is_saving: boolean = false;

  max_date = formatDate(new Date(), 'yyyy-MM-dd', 'en', 'Asia/Singapore');
  legalVisitForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(null),
    patient_id: new FormControl<string| null>(null),
    patient_gbv_intake_id: new FormControl<string| null>(null),
    scheduled_date: new FormControl<string| null>(null),
    actual_date: new FormControl<string| null>(null),
    person_in_charge: new FormControl<string| null>(null),
  });

  onSubmit() {
    this.is_saving = true;
    /* let query;

    if(this.legalVisitForm.value.id) {
      query = this.http.update('gender-based-violence/patient-gbv-psych/', this.legalVisitForm.value.id, this.legalVisitForm.value);
    } else {
      query = this.http.post('gender-based-violence/patient-gbv-legal-visit', this.legalVisitForm.value);
    } */

    this.http.post('gender-based-violence/patient-gbv-legal-visit', this.legalVisitForm.value).subscribe({
      next: (data: any) => {
        this.is_saving = false;
        this.toastr.success('Successfully recorded', 'Session');
        this.closeModal();
      },
      error: err => console.log(err)
    });
  }

  createForm(){
    this.legalVisitForm = this.formBuilder.group({
      id: [null],
      patient_id: [this.patient_id],
      patient_gbv_intake_id: [this.patient_gbv_intake_id],
      scheduled_date: [null, Validators.required],
      actual_date: [null, Validators.required],
      person_in_charge: [null, Validators.required]
    });

    if(this.selected_data) {
      this.legalVisitForm.patchValue({...this.selected_data});
      console.log('test')
    }
  }


  closeModal() {
    this.toggleModal.emit('legal_visit');
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
      this.createForm();
  }
}
