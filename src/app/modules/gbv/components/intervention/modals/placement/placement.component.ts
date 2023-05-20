import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.scss']
})
export class PlacementComponent implements OnInit, OnChanges{
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_gbv_intake_id;
  @Input() patient_id;
  @Input() selected_data;

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  is_saving: boolean = false;

  placementForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(null),
    patient_id: new FormControl<string| null>(null),
    patient_gbv_intake_id: new FormControl<string| null>(null),
    placement_location_id: new FormControl<string| null>(null),
    home_by_cpu_flag: new FormControl<string| null>(null),
    home_by_other_name: new FormControl<string| null>(null),
    schedule_date: new FormControl<string| null>(null),
    actual_date: new FormControl<string| null>(null),
    placement_name: new FormControl<string| null>(null),
    placement_contact_info: new FormControl<string| null>(null),
    placement_type_id: new FormControl<string| null>(null),
    hospital_name: new FormControl<string| null>(null),
    hospital_ward: new FormControl<string| null>(null),
    hospital_date_in: new FormControl<string| null>(null),
    hospital_date_out: new FormControl<string| null>(null),
  });

  placement_locations: any;

  onSubmit() {
    this.is_saving = true;
    let query;

    if(this.placementForm.value.id) {
      query = this.http.update('', this.placementForm.value.id, this.placementForm.value);
    } else {
      query = this.http.post('', this.placementForm.value);
    }

    query.subscribe({
      next: (data: any) => {
        this.is_saving = false;
      },
      error: err => console.log(err)
    });
  }

  createForm(){
    this.placementForm = this.formBuilder.group({
      id: [null],
      patient_id: [null],
      patient_gbv_intake_id: [null],
      placement_location_id: [null, Validators.required],
      home_by_cpu_flag: [null],
      home_by_other_name: [null],
      placement_type_id: [null],
      placement_name: [null],
      placement_contact_info: [null],
      schedule_date: [null],
      actual_date: [null],
      hospital_name: [null],
      hospital_ward: [null],
      hospital_date_in: [null],
      hospital_date_out: [null]
    });
  }

  closeModal() {
    this.toggleModal.emit('placement');
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
