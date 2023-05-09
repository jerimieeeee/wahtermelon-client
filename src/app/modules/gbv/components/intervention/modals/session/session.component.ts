import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
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

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  is_saving: boolean = false;

  sessionForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(null),
    patient_id: new FormControl<string| null>(null),
    patient_gbv_id: new FormControl<string| null>(null),
    schedule_date: new FormControl<string| null>(null),
    actual_date: new FormControl<string| null>(null),
    md_name: new FormControl<string| null>(null),
    participant_id: new FormControl<string| null>(null),
  });

  participants: any;

  onSubmit() {
    this.is_saving = true;
    let query;

    if(this.sessionForm.value.id) {
      query = this.http.update('', this.sessionForm.value.id, this.sessionForm.value);
    } else {
      query = this.http.post('', this.sessionForm.value);
    }

    query.subscribe({
      next: (data: any) => {
        this.is_saving = false;
      },
      error: err => console.log(err)
    });
  }

  createForm(){
    this.sessionForm = this.formBuilder.group({
      id: [null],
      patient_id: [null],
      patient_gbv_id: [null],
      schedule_date: [null, Validators.required],
      actual_date: [null, Validators.required],
      md_name: [null, Validators.required],
      participant_id: [null, Validators.required]
    });
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
    this.createForm();
  }
}
