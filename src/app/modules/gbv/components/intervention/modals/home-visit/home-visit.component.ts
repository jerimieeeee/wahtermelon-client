import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-visit',
  templateUrl: './home-visit.component.html',
  styleUrls: ['./home-visit.component.scss']
})
export class HomeVisitComponent implements OnInit, OnChanges {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_gbv_intake_id;
  @Input() patient_id;
  @Input() selected_data;

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  is_saving: boolean = false;

  homeVisitForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(null),
    patient_id: new FormControl<string| null>(null),
    patient_gbv_intake_id: new FormControl<string| null>(null),
    visit_date: new FormControl<string| null>(null),
    social_worker: new FormControl<string| null>(null),
    social_worker_remarks: new FormControl<string| null>(null),
  });

  onSubmit() {
    this.is_saving = true;
    let query;

    if(this.homeVisitForm.value.id) {
      query = this.http.update('gender-based-violence/patient-gbv-social-work/', this.homeVisitForm.value.id, this.homeVisitForm.value);
    } else {
      query = this.http.post('gender-based-violence/patient-gbv-social-work', this.homeVisitForm.value);
    }

    query.subscribe({
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
    this.homeVisitForm = this.formBuilder.group({
      id: [null],
      patient_id: [this.patient_id],
      patient_gbv_intake_id: [this.patient_gbv_intake_id],
      visit_date: [null, Validators.required],
      social_worker: [null, Validators.required],
      social_worker_remarks: [null]
    });

    console.log(this.selected_data)
    if(this.selected_data) {
      this.homeVisitForm.patchValue({...this.selected_data});
    }
  }

  closeModal() {
    this.toggleModal.emit('home_visit');
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
