import { CommonModule, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-referral-form',
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './referral-form.component.html',
  styleUrl: './referral-form.component.scss'
})
export class ReferralFormComponent implements OnInit, OnChanges {
  @Output() loadData = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();

  faCircleNotch = faCircleNotch;

  consult_id: string;
  patient_id: string;
  program_code: string;

  max_date = formatDate(new Date(), 'yyyy-MM-dd', 'en', 'Asia/Manila');
  is_saving: boolean = false;

  regions: object;
  provinces: object;
  municipalities: object;
  facilities: object;

  referralForm: FormGroup = new FormGroup({
    patient_id: new FormControl<string| null>(''),
    consult_id: new FormControl<string| null>(''),
    appointment_date: new FormControl<string| null>(''),
    appointment_code: new FormControl<string| null>(''),
    referral_facility_code: new FormControl<string| null>(''),
    region: new FormControl<string| null>(''),
    province: new FormControl<string| null>(''),
    municipality: new FormControl<string| null>(''),
    referral_reason: new FormControl<string| null>(''),

    referral_category_id: new FormControl<string| null>(''),
    referral_reason_id: new FormControl<string| null>(''),
    uncoordinated_flag: new FormControl<boolean| null>(false),
    referral_uncoordinated_id: new FormControl<string| null>(''),
    uncoordinated_others: new FormControl<string| null>('')
    /* outcome_date: new FormControl<string| null>(''),
    referral_refusal_id: new FormControl<string| null>(''),
    refusal_others: new FormControl<string| null>(''), */
  });

  get f(): { [key: string]: AbstractControl } {
    return this.referralForm.controls;
  }

  loadFacilities(municipality){
    if(municipality !== '0') {
      this.f['referral_facility_code'].enable();
      this.http.get('libraries/facilities', {params:{'filter[municipality_code]':municipality, 'per_page': 'all'}}).subscribe({
        next: (data: any) => {
          this.facilities = data.data;
        },
        error: err => console.log(err)
      })
    } else {
      this.facilities = null;
      this.referralForm.patchValue({facility_code: '0'})
      this.f['referral_facility_code'].disable();
    }
  }

  loadDemog(loc?, code?, include?){
    if(code && code !== '0') {
      this.http.get('libraries/'+loc+'/'+code,{params:{'include':include}}).subscribe({
        next: (data: any) => {
          this[include] = data.data[include];
          this.disaledSelection(loc, code);
        },
        error: err => console.log(err)
      });
    } else {
      this.disaledSelection(loc, code);
    }
  }

  disaledSelection(loc?, code?) {
    if(loc == 'regions') {
      this.municipalities = null;
      this.facilities = null;

      this.f['municipality'].disable();
      this.f['referral_facility_code'].disable();
      if(code === '0') {
        this.f['province'].disable();
      } else {
        this.f['province'].enable();
      }
    } else if (loc == 'provinces') {
      this.facilities = null;

      this.f['referral_facility_code'].disable();
      if(code === '0') {
        this.f['municipality'].disable();
      } else {
        this.f['municipality'].enable();
      }
    } else {
      this.f['province'].disable();
      this.f['municipality'].disable();
      this.f['referral_facility_code'].disable();
    }
  }

  category_list: {};
  reason_list: {};
  refusal_list: {};
  uncoordinated_list: {};
  show_form: boolean = false;

  loadLibraries(){
    this.show_form = false;
    const getRegions = this.http.get('libraries/regions');
    const getCategories = this.http.get('libraries/referral-category');
    const getReasons = this.http.get('libraries/referral-reason');
    const getRefusal = this.http.get('libraries/referral-refusal');
    const getUncoordinated = this.http.get('libraries/referral-uncoordinated');

    forkJoin([getRegions, getCategories, getReasons, getRefusal, getUncoordinated]).subscribe({
      next:([dataRegions, dataCategories, dataReasons, dataRefusal, dataUncoordinated]: any) => {
        this.regions = dataRegions.data;
        this.category_list = dataCategories.data;
        this.reason_list = dataReasons.data;
        this.refusal_list = dataRefusal.data;
        this.uncoordinated_list = dataUncoordinated.data;

        this.createForm();
        this.show_form = true;
      },
      error: err => console.log(err)
    });

  }

  createForm(){
    this.referralForm = this.formBuilder.nonNullable.group({
      patient_id: [this.patient_id],
      consult_id: [this.consult_id],
      appointment_date: [null, Validators.required],
      appointment_code: ['REF'],
      referral_facility_code: [null, Validators.required],
      region: [null],
      province: [null],
      municipality: [null],

      referral_reason_id: [null, Validators.required],
      referral_category_id: [null, Validators.required],
      referral_reason: [null],
      uncoordinated_flag: [false],
      referral_uncoordinated_id: [null],
      uncoordinated_others	: [null],
    });

    this.loadDemog();
  }

  onSubmit(){
    this.is_saving = true;

    let params = {
      appointment: [{appointment_code: this.referralForm.value.appointment_code}],
      patient_id: this.referralForm.value.patient_id,
      consult_id: this.referralForm.value.consult_id,
      appointment_date: this.referralForm.value.appointment_date,
      referral_facility_code: this.referralForm.value.referral_facility_code,

      referral_reason_id: this.referralForm.value.referral_reason_id,
      referral_category_id: this.referralForm.value.referral_category_id,
      referral_reason: this.referralForm.value.referral_reason,

      referral_uncoordinated_id: this.referralForm.value.referral_uncoordinated_id,
      uncoordinated_others: this.referralForm.value.uncoordinated_others,
    };
    // console.log(params);

    this.http.post('appointment/schedule', params).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.is_saving = false;
        this.toastr.success('Successfully recorded!','Set appointment');
        this.loadData.emit('appointment');
        this.closeModal();
      },
      error: err => console.log(err)
    })
  }

  closeModal(){
    this.toggleModal.emit('referral-modal');
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.consult_id = this.http.getUrlParams().consult_id;
    this.patient_id = this.http.getUrlParams().patient_id;
    this.program_code = this.http.getUrlParams().loc;
    this.loadLibraries();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.consult_id = this.http.getUrlParams().consult_id;
    this.patient_id = this.http.getUrlParams().patient_id;
    this.program_code = this.http.getUrlParams().loc;
  }
}
