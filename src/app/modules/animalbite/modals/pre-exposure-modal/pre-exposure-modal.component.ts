import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { preExposureForm } from './preExposureForm';
import { formatDate } from '@angular/common';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-pre-exposure-modal',
  templateUrl: './pre-exposure-modal.component.html',
  styleUrls: ['./pre-exposure-modal.component.scss']
})
export class PreExposureModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_pre_exposure;
  @Input() patient_id;

  faCircleNotch = faCircleNotch;
  faSave = faSave;

  preExposureForm:FormGroup=preExposureForm();
  max_date: string = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  show_form: boolean = false;
  is_saving: boolean = false;
  indication_options: {};
  ab_vaccines: {};
  ab_vaccine_routes: {};

  onSubmit(){
    this.is_saving = true;
    console.log(this.preExposureForm.value);
    let query;

    if(this.preExposureForm.value.id) {
      query = this.http.update('animal-bite/patient-ab-pre-exposure/', this.preExposureForm.value.id, this.preExposureForm.value)
    } else {
      query = this.http.post('animal-bite/patient-ab-pre-exposure', this.preExposureForm.value)
    }

    query.subscribe({
      next: (data: any) => {
        console.log(data)
        this.toastr.success('Successfully Recorded', 'Pre-exposure');
        this.is_saving = false;
        this.closeModal();
      },
      error: err => console.log(err)
    })
  }

  loadLibraries() {
    this.show_form = false;

    const getIndicationOption = this.http.get('libraries/ab-indication-option');
    const getAbVaccine = this.http.get('libraries/ab-vaccine');
    const getAbVaccineRoute = this.http.get('libraries/ab-vaccine-route');

    forkJoin([getIndicationOption, getAbVaccine, getAbVaccineRoute]).subscribe({
      next: ([dataIndicationOption, dataAbVaccine, dataAbVaccineRoute]: any) => {
        this.indication_options = dataIndicationOption.data;
        this.ab_vaccines = dataAbVaccine.data;
        this.ab_vaccine_routes = dataAbVaccineRoute.data;

        this.createForm();
      },
      error: err => console.log(err)
    });
  }

  createForm() {
    this.preExposureForm = this.formBuilder.group({
      id: [null],
      patient_id: [this.patient_id, Validators.required],
      indication_option_code: [null, Validators.required],
      indication_option_remarks: [null],
      day0_date: [null, Validators.required],
      day0_vaccine_code: [null, Validators.required],
      day0_vaccine_route_code: [null, Validators.required],
      day7_date: [null],
      day7_vaccine_code: [null],
      day7_vaccine_route_code: [null],
      day21_date: [null],
      day21_vaccine_code: [null],
      day21_vaccine_route_code: [null],
      remarks: [null]
    });

    if(this.selected_pre_exposure) {
      this.preExposureForm.patchValue({...this.selected_pre_exposure});
    }

    this.show_form = true;
  }

  closeModal(){
    this.toggleModal.emit('preexp-modal');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.preExposureForm.controls;
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
