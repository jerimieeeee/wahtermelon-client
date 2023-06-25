import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medical-consult',
  templateUrl: './medical-consult.component.html',
  styleUrls: ['./medical-consult.component.scss']
})
export class MedicalConsultComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_gbv_intake_id;
  @Input() patient_id;
  @Input() selected_data;

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  is_saving: boolean = false;

  visitForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(null),
    patient_id: new FormControl<string| null>(null),
    patient_gbv_intake_id: new FormControl<string| null>(null),
    scheduled_date: new FormControl<string| null>(null),
    actual_date: new FormControl<string| null>(null),
    physician: new FormControl<string| null>(null),
    date_in: new FormControl<string| null>(null),
    date_due: new FormControl<string| null>(null),
    date_out: new FormControl<string| null>(null),
    lab_test: new FormControl<string| null>(null)
  });

  onSubmit() {
    this.is_saving = true;
    /* let query;

    if(this.visitForm.value.id) {
      query = this.http.update('gender-based-violence/patient-gbv-consult-visit/', this.visitForm.value.id, this.visitForm.value);
    } else {
      query = ;
    } */

    this.http.post('gender-based-violence/patient-gbv-consult-visit', this.visitForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastr.success('Successfully recorded.', 'Social Work');
        this.is_saving = false;
        this.closeModal()
      },
      error: err => console.log(err)
    });
  }

  createForm(){
    this.visitForm = this.formBuilder.group({
      id: [null],
      patient_id: [this.patient_id],
      patient_gbv_intake_id: [this.patient_gbv_intake_id],
      scheduled_date: [null, Validators.required],
      actual_date: [null, Validators.required],
      physician: [null, Validators.required],
      date_in: [null],
      date_due: [null],
      date_out: [null],
      lab_test: [null],
    });

    if(this.selected_data) {
      this.visitForm.patchValue({...this.selected_data});
    }
  }

  closeModal() {
    this.toggleModal.emit('medical_consult');
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
