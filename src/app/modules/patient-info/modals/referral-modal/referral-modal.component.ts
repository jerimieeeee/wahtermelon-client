import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-referral-modal',
  templateUrl: './referral-modal.component.html',
  styleUrls: ['./referral-modal.component.scss']
})
export class ReferralModalComponent implements OnInit{
  @Output() loadData = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_info;

  max_date = formatDate(new Date(), 'yyyy-MM-dd', 'en', 'Asia/Manila');
  is_saving: boolean = false;

  regions: object;
  provinces: object;
  municipalities: object;
  facilities: object;

  referralForm: FormGroup = new FormGroup({
    patient_id: new FormControl<string| null>(''),
    appointment_date: new FormControl<string| null>(''),
    appointment_code: new FormControl<string| null>(''),
    referral_facility_code: new FormControl<string| null>(''),
    region: new FormControl<string| null>(''),
    province: new FormControl<string| null>(''),
    municipality: new FormControl<string| null>(''),
    referral_reason: new FormControl<string| null>('')
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

  loadLibraries(){
    this.http.get('libraries/regions').subscribe({
      next: (data: any) => this.regions = data.data,
      error: err => console.log(err)
    })

    this.createForm();
  }

  createForm(){
    // console.log(this.patient_info)
    if(this.patient_info){
      this.referralForm = this.formBuilder.nonNullable.group({
        patient_id: [this.patient_info.id],
        appointment_date: [null, Validators.required],
        appointment_code: ['REF'],
        referral_facility_code: [null, Validators.required],
        region: [null],
        province: [null],
        municipality: [null],
        referral_reason: [null]
      });
    }

    this.loadDemog();
  }

  onSubmit(){
    this.is_saving = true;

    let params = {
      appointment: [{appointment_code: this.referralForm.value.appointment_code}],
      patient_id: this.referralForm.value.patient_id,
      appointment_date: this.referralForm.value.appointment_date,
      referral_facility_code: this.referralForm.value.referral_facility_code,
      referral_reason: this.referralForm.value.referral_reason
    };

    this.http.post('appointment/schedule', params).subscribe({
      next: (data: any) => {
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
    this.loadLibraries();
  }
}
