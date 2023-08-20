import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { abPostExposureForm } from './abPostExposureForm';
import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ab-postexposure',
  templateUrl: './ab-postexposure.component.html',
  styleUrls: ['./ab-postexposure.component.scss']
})
export class AbPostexposureComponent implements OnInit, OnChanges{
  @Output() updateSelectedAb = new EventEmitter<any>();
  @Input() patient_id;
  @Input() selected_ab_consult
  show_form: boolean = false;
  is_saving: boolean = false;

  faCircleNotch = faCircleNotch;
  faSave = faSave;

  abPostExposureForm:FormGroup=abPostExposureForm();
  max_date: string = formatDate(new Date(), 'yyyy-MM-dd', 'en', 'Asia/Manila');

  animal_statuses:  {};
  rig_types:  {};
  vaccines:  {};
  vaccine_routes:  {};

  onSubmit(){
    this.is_saving = true;
    this.http.post('animal-bite/patient-ab-post-exposure', this.abPostExposureForm.value).subscribe({
      next: (data: any) => {
        this.is_saving = false;
        this.toastr.success('Successfully recorded!', 'Post Exposure');
        this.updateSelectedAb.emit(data);
      },
      error: err => console.log(err)
    })
  }

  loadLibraries () {
    this.show_form = false;

    const getAnimalStatus = this.http.get('libraries/ab-animal-status');
    const getRigType = this.http.get('libraries/ab-rig-type');
    const getVaccine = this.http.get('libraries/ab-vaccine');
    const getVaccineRoute = this.http.get('libraries/ab-vaccine-route');

    forkJoin([getAnimalStatus, getRigType, getVaccine, getVaccineRoute]).subscribe({
      next: ([dataAnimalStatus, dataRigType, dataVaccine, dataVaccineRoute]:any) => {
        this.animal_statuses = dataAnimalStatus.data;
        this.rig_types = dataRigType.data;
        this.vaccines = dataVaccine.data;
        this.vaccine_routes = dataVaccineRoute.data;

        this.createForm();
      }
    })

  }

  createForm() {
    this.abPostExposureForm = this.formBuilder.group({
      id: [null],
      patient_id: [this.patient_id, Validators.required],
      patient_ab_id: [this.selected_ab_consult.id],
      weight: [null],
      animal_status_code: [null, Validators.required],
      animal_status_date: [null],
      rig_type_code: [null, Validators.required],
      rig_date: [null, Validators.required],
      booster_1_flag: [false],
      booster_2_flag: [false],
      other_vacc_date: [null],
      other_vacc_desc: [null],
      other_vacc_route_code: [null],
      day0_date: [null],
      day0_vaccine_code: [null],
      day0_vaccine_route_code: [null],
      day3_date: [null],
      day3_vaccine_code: [null],
      day3_vaccine_route_code: [null],
      day7_date: [null],
      day7_vaccine_code: [null],
      day7_vaccine_route_code: [null],
      day14_date: [null],
      day14_vaccine_code: [null],
      day14_vaccine_route_code: [null],
      day28_date: [null],
      day28_vaccine_code: [null],
      day28_vaccine_route_code: [null],
    });

    this.patchData();

    this.show_form = true;
  }

  patchData() {
    if(this.selected_ab_consult && this.selected_ab_consult.abPostExposure) {
      this.abPostExposureForm.patchValue({...this.selected_ab_consult.abPostExposure});

      this.abPostExposureForm.patchValue({
        animal_status_date: this.abPostExposureForm.value.animal_status_date ? formatDate(this.abPostExposureForm.value.animal_status_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'): null,
        rig_type_date: this.abPostExposureForm.value.rig_type_date ? formatDate(this.abPostExposureForm.value.rig_type_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'): null,
        other_vacc_date: this.abPostExposureForm.value.other_vacc_date ? formatDate(this.abPostExposureForm.value.other_vacc_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'): null,
        day0_date: this.abPostExposureForm.value.day0_date ? formatDate(this.abPostExposureForm.value.day0_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'): null,
        day3_date: this.abPostExposureForm.value.day3_date ? formatDate(this.abPostExposureForm.value.day3_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'): null,
        day7_date: this.abPostExposureForm.value.day7_date ? formatDate(this.abPostExposureForm.value.day7_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'): null,
        day14_date: this.abPostExposureForm.value.day14_date ? formatDate(this.abPostExposureForm.value.day14_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'): null,
        day28_date: this.abPostExposureForm.value.day28_date ? formatDate(this.abPostExposureForm.value.day28_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'): null,
      })
    }
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges(change: SimpleChanges): void{
    this.patchData();
  }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
