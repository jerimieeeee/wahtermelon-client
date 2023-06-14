import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

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
  show_form: boolean = false;
  placementForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(null),
    patient_id: new FormControl<string| null>(null),
    patient_gbv_intake_id: new FormControl<string| null>(null),
    location_id: new FormControl<string| null>(null),
    home_by_cpu_flag: new FormControl<boolean| null>(false),
    home_by_other_name: new FormControl<string| null>(null),
    scheduled_date: new FormControl<string| null>(null),
    actual_date: new FormControl<string| null>(null),
    placement_name: new FormControl<string| null>(null),
    placement_contact_info: new FormControl<string| null>(null),
    type_id: new FormControl<string| null>(null),
    hospital_name: new FormControl<string| null>(null),
    hospital_ward: new FormControl<string| null>(null),
    hospital_date_in: new FormControl<string| null>(null),
    hospital_date_out: new FormControl<string| null>(null),
  });

  onSubmit() {
    this.is_saving = true;
    let query;

    if(this.placementForm.value.id) {
      query = this.http.update('gender-based-violence/patient-gbv-placement/', this.placementForm.value.id, this.placementForm.value);
    } else {
      query = this.http.post('gender-based-violence/patient-gbv-placement', this.placementForm.value);
    }

    query.subscribe({
      next: (data: any) => {
        this.toastr.success('Successfully recorded','Placement');
        this.is_saving = false;
        this.closeModal();
      },
      error: err => console.log(err)
    });
  }

  createForm(){
    this.placementForm = this.formBuilder.group({
      id: [null],
      patient_id: [this.patient_id],
      patient_gbv_intake_id: [this.patient_gbv_intake_id],
      location_id: [null, Validators.required],
      home_by_cpu_flag: [false],
      home_by_other_name: [null],
      scheduled_date: [null],
      actual_date: [null],
      placement_name: [null],
      placement_contact_info: [null],
      type_id: [null],
      hospital_name: [null],
      hospital_ward: [null],
      hospital_date_in: [null],
      hospital_date_out: [null]
    });

    console.log(this.selected_data)
    if(this.selected_data) {
      this.placementForm.patchValue({...this.selected_data});
    }

    this.show_form = true;
  }

  placement_locations: any;
  placement_types: any;

  loadLibraries() {
    const getPlacementLocation = this.http.get('libraries/gbv-placement-location');
    const getPlacementType = this.http.get('libraries/gbv-placement-type');

    forkJoin([getPlacementLocation, getPlacementType]).subscribe({
    next: ([dataPlacementLocation, dataPlacementType]: any) => {
      this.placement_locations = dataPlacementLocation.data;
      this.placement_types = dataPlacementType.data;

      this.createForm();
    },
      error: err => console.log(err)
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
    this.loadLibraries();
  }
}
