import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_gbv_intake_id;
  @Input() patient_id;
  @Input() selected_data;

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  is_saving: boolean = false;

  sessionForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(null),
    patient_id: new FormControl<string| null>(null),
    patient_gbv_intake_id: new FormControl<string| null>(null),
    scheduled_date: new FormControl<string| null>(null),
    actual_date: new FormControl<string| null>(null),
    md_name: new FormControl<string| null>(null),
    participant_id: new FormControl<string| null>(null),
  });

  onSubmit() {
    this.is_saving = true;
    let query;

    if(this.sessionForm.value.id) {
      query = this.http.update('gender-based-violence/patient-gbv-psych/', this.sessionForm.value.id, this.sessionForm.value);
    } else {
      query = this.http.post('gender-based-violence/patient-gbv-psych', this.sessionForm.value);
    }

    query.subscribe({
      next: (data: any) => {
        this.is_saving = false;
        this.toastr.success('Successfully recorded', 'Session');
        this.closeModal();
      },
      error: err => console.log(err)
    });
  }

  createForm(){
    this.sessionForm = this.formBuilder.group({
      id: [null],
      patient_id: [this.patient_id],
      patient_gbv_intake_id: [this.patient_gbv_intake_id],
      scheduled_date: [null, Validators.required],
      actual_date: [null, Validators.required],
      md_name: [null, Validators.required],
      participant_id: [null, Validators.required]
    });

    if(this.selected_data) {
      this.sessionForm.patchValue({...this.selected_data});
    }
  }

  participants: any;
  loadLibraries() {
    this.http.get('libraries/gbv-psych-participant').subscribe({
      next: (data: any) => {
        this.participants = data.data;
        this.createForm();
      },
      error: err => console.log(err)
    })
  }

  closeModal() {
    this.toggleModal.emit('session');
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
