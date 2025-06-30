import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faCircleNotch, faSave } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  standalone: false,
})
export class RegistrationComponent implements OnInit {
  @Input() selected_mh_consult;
  @Output() updateSelectedMh = new EventEmitter<any>();

  patient_id: string = this.http.getUrlParams().patient_id;

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  is_saving: boolean = false;

  max_date = formatDate(new Date(), 'yyyy-MM-dd', 'en-US', 'Asia/Manila');

treatmentForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    treatment_done: new FormControl<boolean>(false),
    treatment_start: new FormControl<string| null>(''),
    treatment_end: new FormControl<string| null>(''),
  });

  saveRegistration() {
    this.is_saving = true;
    this.http.post('mental-health/records', this.treatmentForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastr.success('Mental Health successfully saved.', 'Success');
        this.updateSelectedMh.emit(data.data);
        this.is_saving = false;
      },
      error: err => {
        console.log(err.error)
      }
    })
  }

  patchValue() {
    console.log(this.selected_mh_consult);
    this.treatmentForm = this.formBuilder.nonNullable.group({
        id: [this.selected_mh_consult.id || null],
        patient_id: [this.patient_id],
        treatment_done: [this.selected_mh_consult.treatment_done || false],
        treatment_start: [this.selected_mh_consult.treatment_start, Validators.required],
        treatment_end: [this.selected_mh_consult.treatment_end, Validators.required]
    });
  }

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.patchValue();
  }
}
