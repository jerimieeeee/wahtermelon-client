import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { abForm } from './abForm';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-ab-outcome',
    templateUrl: './ab-outcome.component.html',
    styleUrls: ['./ab-outcome.component.scss'],
    standalone: false
})
export class AbOutcomeComponent implements OnInit{
  @Output() getPatientTbHistory = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() switchPage = new EventEmitter<any>();
  @Input() selected_ab_consult;
  @Input() max_date;

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  is_saving: boolean = false;
  show_form: boolean = false;
  show_error: boolean = false;
  required_message = 'Required field';

  abForm:FormGroup=abForm();

  treatment_oucomes: {};
  death_places: {};

  onSubmit(){
    this.is_saving = true;

    // console.log(this.abForm);
    this.http.update('animal-bite/patient-ab/', this.selected_ab_consult.id, this.abForm.value).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.saveComplete()
      },
      error: err => console.log(err)
    });
  }

  saveComplete(){
    this.is_saving = false;
    this.toastr.success('Successfully recorded!','Outcome');
    this.switchPage.emit(1);
    this.closeModal();
  }

  loadLibraries(){
    this.show_form = false;
    const getTreatmentOutcome = this.http.get('libraries/ab-outcome');
    const getDeathPlace = this.http.get('libraries/ab-death-place')

    forkJoin([getTreatmentOutcome, getDeathPlace]).subscribe({
      next: ([dataTreatmentOutcome, dataDeathPlace]:any) => {
        this.treatment_oucomes = dataTreatmentOutcome.data;
        this.death_places = dataDeathPlace.data;

        this.createForm();
      },
      error: err => console.log(err)
    });
  }

  createForm(){
    this.abForm = this.formBuilder.group({
      id: [null],
      patient_id: [null],
      consult_date: [null],
      exposure_date: [null],
      ab_treatment_outcome_id: [null],
      date_outcome: [null],
      ab_death_place_id: [null],
      manifestations: [null],
      date_onset: [null],
      date_dies: [null],
      death_remarks: [null]
    });

    console.log(this.selected_ab_consult);

    this.abForm.patchValue({...this.selected_ab_consult});
    this.abForm.patchValue({
      consult_date: this.abForm.value.consult_date ? formatDate(this.abForm.value.consult_date, 'yyyy-MM-dd', 'en', 'Asia/Manila') : null,
      exposure_date: this.abForm.value.exposure_date ? formatDate(this.abForm.value.exposure_date, 'yyyy-MM-dd', 'en', 'Asia/Manila') : null,
      date_onset: this.abForm.value.date_onset ? formatDate(this.abForm.value.date_onset, 'yyyy-MM-dd', 'en', 'Asia/Manila') : null,
      date_died: this.abForm.value.date_died ? formatDate(this.abForm.value.date_died, 'yyyy-MM-dd', 'en', 'Asia/Manila') : null,
    });

    this.show_form = true;
  }

  closeModal(){
    this.toggleModal.emit('treatment_outcome');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.abForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // console.log(this.selected_ab_consult);
    this.loadLibraries();
  }
}
