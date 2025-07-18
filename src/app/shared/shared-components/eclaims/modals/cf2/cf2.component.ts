import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { ToastrService } from 'ngx-toastr';
import { eclaimsForm } from '../../eclaimsForm';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-cf2',
    templateUrl: './cf2.component.html',
    styleUrls: ['./cf2.component.scss'],
    standalone: false
})
export class Cf2Component implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient;
  @Input() program_id;
  @Input() program_name;
  @Input() caserate_list;
  @Input() selected_case;
  @Input() selected_transmittalNumber;

  faFilePdf = faFilePdf;
  faCircleNotch = faCircleNotch;

  pbef_result: any;
  program_code: string;
  program_creds: any;

  pdf_exported: boolean = false;
  show_form: boolean = true;
  que_form: boolean = false;
  caserate_field: any;
  selected_caserate: any;
  facility: any;

  eclaimsForm:FormGroup=eclaimsForm();
  date_today = formatDate(new Date(), 'yyyy-MM-dd', 'en', 'Asia/Manila');

  submitQue() {
    this.que_form = true;
    this.http.post('eclaims/eclaims-xml', this.eclaimsForm.value).subscribe({
      next: (data:any) => {
        let save_type: string = this.eclaimsForm.value.transmittalNumber ? 'Update' : 'Queue';
        this.toastr.success('Successfully saved', save_type+' Claim');
        this.que_form = false;
        this.closeModal();
      },
      error: err => console.log(err)
    })
  }

  paramsTb() {
    this.f.pTBType.setValidators([Validators.required]);
    this.f.pNTPCardNo.setValidators([Validators.required]);

    let tb = {
      attendant_sign_date: null,
      pTBType: null,
      admission_date: null,
      discharge_date: null,
    }

    if(this.selected_caserate.code === '89221') {
      if(!this.selected_case.case_holding || !this.selected_case.case_holding.treatment_start || !this.selected_case.case_holding.treatment_end) {
        this.showError('Treatment start and end dates are required to proceed.');
        return;
      }

      tb.pTBType = 'I';
      tb.attendant_sign_date = formatDate(this.selected_case.case_holding.treatment_start, 'yyyy-MM-dd', 'en', 'Asia/Manila');
      tb.admission_date = formatDate(this.selected_case.case_holding.treatment_start, 'yyyy-MM-dd', 'en', 'Asia/Manila');

      let cont_date = new Date(this.selected_case.case_holding.continuation_start);
          cont_date.setDate(cont_date.getDate()-1);

      tb.discharge_date = formatDate(cont_date, 'yyyy-MM-dd', 'en', 'Asia/Manila');
    }

    if(this.selected_caserate.code === '89222') {
      if(!this.selected_case.case_holding || !this.selected_case.case_holding.continuation_start || !this.selected_case.case_holding.treatment_end) {
        this.showError('Continuation start and treatment end dates are required to proceed.');
        return;
      }

      tb.pTBType = 'M';
      tb.attendant_sign_date = formatDate(this.selected_case.case_holding.continuation_start, 'yyyy-MM-dd', 'en', 'Asia/Manila');
      tb.admission_date = formatDate(this.selected_case.case_holding.continuation_start, 'yyyy-MM-dd', 'en', 'Asia/Manila');
      tb.discharge_date = formatDate(this.selected_case.case_holding.treatment_end, 'yyyy-MM-dd', 'en', 'Asia/Manila');
    }

    this.eclaimsForm.patchValue({
      attendant_sign_date: tb.attendant_sign_date,
      pTBType: tb.pTBType,
      pNTPCardNo: this.selected_case.case_holding.case_number,
      admission_date: tb.admission_date,
      admission_time: formatDate(new Date().setHours(8), 'hh:mma', 'en', 'Asia/Manila'),
      discharge_date:tb.discharge_date,
      discharge_time: formatDate(new Date().setHours(8), 'hh:mma', 'en', 'Asia/Manila'),
    });

    this.getCreds();
  }

  paramsCc(vaccine) {
    this.f.pEssentialNewbornCare.setValidators([Validators.required]);
    this.f.pNewbornHearingScreeningTest.setValidators([Validators.required]);
    this.f.pNewbornScreeningTest.setValidators([Validators.required]);
    this.f.pFilterCardNo.setValidators([Validators.required]);

    let hearing_done: string = 'N';
    let service_count: number = 0;
    let bcg_vaccine: boolean = false;
    if(this.selected_case.consultccdevservices){
      Object.entries(this.selected_case.consultccdevservices).forEach(([key,value]:any, index) => {
        if(value.service_id === 'HEAR') {
          hearing_done = 'Y';
        } else {
          service_count += 1;
        }
      });
    }

    if(vaccine){
      Object.entries(vaccine).forEach(([key,value]:any, index) => {
        if(value.vaccine_id === 'HEPB') {
          bcg_vaccine = true;
          return 1;
        }
      });
    }

    if(!this.selected_case.admission_date || !this.selected_case.discharge_date) {
      this.showError('Admission and Discharge dates are required to proceed.');
      return;
    }

    this.eclaimsForm.patchValue({
      attendant_sign_date: formatDate(this.selected_case.admission_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      admission_date: formatDate(this.selected_case.admission_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      admission_time: formatDate(this.selected_case.admission_date, 'hh:mma', 'en', 'Asia/Manila'),
      discharge_date: formatDate(this.selected_case.discharge_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      discharge_time: formatDate(this.selected_case.discharge_date, 'hh:mma', 'en', 'Asia/Manila'),
      pNewbornHearingScreeningTest: hearing_done,
      pNewbornScreeningTest: this.selected_case.nbs_filter ? 'Y' : 'N',
      pFilterCardNo: this.selected_case.nbs_filter,
      pEssentialNewbornCare: bcg_vaccine ? 'Y' : 'N'
    });

    this.getCreds();
  }

  paramsAb() {
    this.f.pDay0ARV.setValidators([Validators.required]);
    this.f.pDay3ARV.setValidators([Validators.required]);
    this.f.pDay7ARV.setValidators([Validators.required]);
    this.f.pRIG.setValidators([Validators.required]);
    this.f.pABPOthers.setValidators([Validators.required]);

    if(!this.selected_case.abPostExposure.day0_date || !this.selected_case.abPostExposure.day0_date ||
        !this.selected_case.abPostExposure.day7_date || !this.selected_case.abPostExposure.rig_date ||
        !this.selected_case.abPostExposure.other_vacc_date
    ) {
      this.showError('One or more required dates are missing');
      return;
    }
    this.eclaimsForm.patchValue({
      pDay0ARV: formatDate(this.selected_case.abPostExposure.day0_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      pDay3ARV: formatDate(this.selected_case.abPostExposure.day3_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      pDay7ARV: formatDate(this.selected_case.abPostExposure.day7_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      pRIG: formatDate(this.selected_case.abPostExposure.rig_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      pABPOthers: formatDate(this.selected_case.abPostExposure.other_vacc_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      pABPSpecify: this.selected_case.abPostExposure.other_vacc_desc,

      attendant_sign_date: formatDate(this.selected_case.abPostExposure.day0_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      admission_date: formatDate(this.selected_case.abPostExposure.day0_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      admission_time: formatDate(new Date().setHours(8), 'hh:mma', 'en', 'Asia/Manila'),
      discharge_date: formatDate(this.selected_case.abPostExposure.day7_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      discharge_time: formatDate(new Date().setHours(8), 'hh:mma', 'en', 'Asia/Manila'),
    });

    this.getCreds();
  }

  mc_error: boolean = false;
  paramsMc() {
    this.f.pCheckUpDate1.setValidators([Validators.required]);
    this.f.pCheckUpDate2.setValidators([Validators.required]);
    this.f.pCheckUpDate3.setValidators([Validators.required]);
    this.f.pCheckUpDate4.setValidators([Validators.required]);

    if(Object.keys(this.selected_case.prenatal_visit).length < 4 && this.selected_case.prenatal_visit[0].trimester < 3) {
      this.mc_error = true;
      this.show_form = true;
    } else {
      let visit1: string = null;
      let visit2: string = null;
      let visit3: string = null;
      let visit4: string = null;
      let signDate: Date;
      let admitDate: Date;
      let dischargeDate: Date;

      Object.entries(this.selected_case.prenatal_visit).reverse().forEach(([key, value]:any, index) => {
        if(index === 0 && !visit1) visit1 = value.prenatal_date;
        if(index === 1 && !visit2) visit2 = value.prenatal_date;
        if(index === 2 && !visit3) visit3 = value.prenatal_date;

        if((index > 2 && !visit4) && value.trimester === 3) {
          visit4 = value.prenatal_date;
          return true;
        }
      });

      if(this.selected_caserate.code === 'ANC01' || this.selected_caserate.code === 'ANC02') {
        signDate = new Date(visit4);
        admitDate = new Date(visit1);
        dischargeDate = new Date(visit4);
      } else {
        signDate = this.selected_case.post_registration.admission_date ?? null;
        admitDate = this.selected_case.post_registration.admission_date ?? null;
        dischargeDate = this.selected_case.post_registration.discharge_date ?? null;
      }

      this.eclaimsForm.patchValue({
        pCheckUpDate1: visit1,
        pCheckUpDate2: visit2,
        pCheckUpDate3: visit3,
        pCheckUpDate4: visit4,
        attendant_sign_date: formatDate(signDate, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
        admission_date: formatDate(admitDate, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
        admission_time: formatDate(admitDate, 'hh:mma', 'en', 'Asia/Manila'),
        discharge_date: formatDate(dischargeDate, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
        discharge_time: formatDate(dischargeDate, 'hh:mma', 'en', 'Asia/Manila'),
      });

      this.getCreds();
    }
  }

  /* paramsMl() {
    if(!this.eclaimsForm.value.caserate_date) {
      this.showError('Caserate date is required to proceed.');
      return;
    }

    this.eclaimsForm.patchValue({
      attendant_sign_date: formatDate(this.eclaimsForm.value.caserate_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      admission_date: formatDate(this.eclaimsForm.value.caserate_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      admission_time: formatDate(new Date().setHours(8), 'hh:mma', 'en', 'Asia/Manila'),
      discharge_date: formatDate(this.eclaimsForm.value.caserate_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      discharge_time: formatDate(new Date().setHours(17), 'hh:mma', 'en', 'Asia/Manila'),
    });

    this.getCreds();
  } */

  paramsGeneric(){
    this.f.pICDCode.setValidators([Validators.required]);

    if(!this.eclaimsForm.value.caserate_date) {
      this.showError('Caserate date is required to proceed.');
      return;
    }

    if(!this.eclaimsForm.value.icd10_code) {
      this.showError('ICD10 code is required to proceed.');
      return;
    }

    this.eclaimsForm.patchValue({
      pICDCode: this.eclaimsForm.value.icd10_code,
      attendant_sign_date: formatDate(this.eclaimsForm.value.caserate_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      admission_date: formatDate(this.eclaimsForm.value.caserate_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      admission_time: formatDate(new Date().setHours(8), 'hh:mma', 'en', 'Asia/Manila'),
      discharge_date: formatDate(this.eclaimsForm.value.caserate_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      discharge_time: formatDate(new Date().setHours(17), 'hh:mma', 'en', 'Asia/Manila'),
    })

    this.getCreds();
  }

  paramsFp(){
    this.f.pICDCode.setValidators([Validators.required]);

    if(!this.eclaimsForm.value.caserate_date) {
      this.showError('Caserate date is required to proceed.');
      return;
    }

    if(!this.eclaimsForm.value.icd10_code) {
      this.showError('ICD10 code is required to proceed.');
      return;
    }

    this.eclaimsForm.patchValue({
      pICDCode: this.eclaimsForm.value.icd10_code,
      attendant_sign_date: formatDate(this.eclaimsForm.value.caserate_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      admission_date: formatDate(this.eclaimsForm.value.caserate_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      admission_time: formatDate(new Date().setHours(8), 'hh:mma', 'en', 'Asia/Manila'),
      discharge_date: formatDate(this.eclaimsForm.value.caserate_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      discharge_time: formatDate(new Date().setHours(17), 'hh:mma', 'en', 'Asia/Manila'),
    })

    this.getCreds();
  }

  paramsDn(){
    this.f.pICDCode.setValidators([Validators.required]);

    if(!this.eclaimsForm.value.caserate_date) {
      this.showError('Caserate date is required to proceed.');
      return;
    }

    if(!this.eclaimsForm.value.icd10_code) {
      this.showError('ICD10 code is required to proceed.');
      return;
    }

    this.eclaimsForm.patchValue({
      pICDCode: this.eclaimsForm.value.icd10_code,
      attendant_sign_date: formatDate(this.eclaimsForm.value.caserate_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      admission_date: formatDate(this.eclaimsForm.value.caserate_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      admission_time: formatDate(new Date().setHours(8), 'hh:mma', 'en', 'Asia/Manila'),
      discharge_date: formatDate(this.eclaimsForm.value.caserate_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      discharge_time: formatDate(new Date().setHours(17), 'hh:mma', 'en', 'Asia/Manila'),
    })

    this.getCreds();
  }

  getCreds(){
    if(this.eclaimsForm.invalid) {
      this.toastr.error('Please fill out all required fields.', 'Error', {
        disableTimeOut: true,
      })
    }

    if (this.eclaimsForm.value.discharge_date) {
      const dischargeDate = new Date(this.eclaimsForm.value.discharge_date);
      const today = new Date();

      if (dischargeDate > today) {
        this.toastr.error('Discharge date cannot be in the future.', 'Error', {
          disableTimeOut: true,
          positionClass: 'toast-top-center',
        });
        return;
      }

      const diffDays = Math.ceil(Math.abs(today.getTime() - dischargeDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 60) {
        this.toastr.error('This claim is now beyond the 60-day filing period.', 'Warning', {
          disableTimeOut: true,
          positionClass: 'toast-top-center',
        });
      }
    }

    let params = {
      'filter[program_code]': this.program_name === 'cc' || this.program_name === 'fp'? 'mc' : this.program_name
    }

    this.http.get('settings/philhealth-credentials', {params}).subscribe({
      next:(data:any) => {
        console.log(data);
        this.program_creds = data.data[0];
        this.show_form = true;
      },
      error: err => console.log(err)
    })
  }

  getVaccine(): string{
    return 'Y'
  }

  get f(): { [key: string]: AbstractControl } {
    return this.eclaimsForm.controls;
  }

  loadCf2Params() {
    switch(this.program_name) {
      case 'tb': {
        this.paramsTb();
        break;
      }
      case 'cc': {
        // console.log(this.eclaimsForm.value);
        if(this.eclaimsForm.value.code === '99460') {
          let params = { patient_id: this.selected_case.patient_id };

          this.http.get('patient-vaccines/vaccines-records', {params}).subscribe({
            next: (data:any) => {
              this.paramsCc(data.data);
            }
          });
        } else {
          this.paramsGeneric();
        }
        break;
      }
      case 'mc': {
        this.paramsMc();
        break;
      }
      case 'ab': {
        this.paramsAb();
        break;
      }
      case 'fp': {
        this.paramsFp();
        break;
      }
      /* case 'dn': {
        this.paramsDn();
        break;
      } */
      default: {
        this.paramsGeneric();
        break;
      }
    }
  }

  selectCaserate() {
    this.selected_caserate = this.caserate_field;
    this.createForm();
  }

  exportAsPdf: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'mainForm',
    options: {
      image: { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 2},
      margin:  [0, 0, 0, 0],
      pagebreak: { mode: ['avoid-all', 'css', 'legacy']},
      jsPDF: {
        orientation: 'portrait',
        unit: 'mm',
        format: [216, 330]
      }
    }
  }

  exportP() {
    let file_name = 'CF2_'+this.patient.last_name.toUpperCase()+'_'+this.patient.first_name.toUpperCase()+'_'+formatDate(new Date(), 'yyyyMMdd', 'en', 'Asia/Manila');
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, file_name).subscribe(() => {
      this.pdf_exported = false;
    });
  }

  createForm(){
    this.show_form = false;
    this.eclaimsForm = this.formBuilder.group({
      patient_id: [null, Validators.required],
      facility_code: [this.facility.code, Validators.required],
      program_desc: [null, Validators.required],
      program_id: [null, Validators.required],
      admit_dx: [null, Validators.required],
      caserate_date: [null, Validators.required],
      caserate_code: [null, Validators.required],
      code: [null, Validators.required],
      description: [null, Validators.required],
      discharge_dx: [null, Validators.required],
      icd10_code: [null, Validators.required],
      hci_fee: [null, Validators.required],
      prof_fee: [null, Validators.required],
      caserate_fee: [null, Validators.required],
      admission_date: [null, Validators.required],
      admission_time: [null, Validators.required],
      discharge_date: [null, Validators.required],
      discharge_time: [null, Validators.required],
      eclaims_caserate_list_id: [null, Validators.required],
      attendant_accreditation_code: [null, Validators.required],
      attendant_last_name: [null, Validators.required],
      attendant_first_name: [null, Validators.required],
      attendant_middle_name: [null],
      attendant_suffix_name: [null],
      attendant_sign_date: [null, Validators.required],
      pTBType: [null],
      pNTPCardNo: [null],
      pDay0ARV: [null],
      pDay3ARV: [null],
      pDay7ARV: [null],
      pRIG: [null],
      pABPOthers: [null],
      pABPSpecify: [null],
      pEssentialNewbornCare: [null],
      pNewbornHearingScreeningTest: [null],
      pNewbornScreeningTest: [null],
      pFilterCardNo: [null],
      pCheckUpDate1: [null],
      pCheckUpDate2: [null],
      pCheckUpDate3: [null],
      pCheckUpDate4: [null],
      pICDCode: [null],
      transmittalNumber: [null],

      enough_benefit_flag: [null],
      hci_pTotalActualCharges: [null],
      hci_pDiscount: [null],
      hci_pPhilhealthBenefit: [null],
      hci_pTotalAmount: [null],
      prof_pTotalActualCharges: [null],
      prof_pDiscount: [null],
      prof_pPhilhealthBenefit: [null],
      prof_pTotalAmount: [null],
      meds_flag: [null],
      meds_pDMSTotalAmount: [null],
      meds_pExaminations_flag: [null],
      meds_pExamTotalAmount: [null],
      hmo_flag: [null],
      others_flag: [null]
    });

    this.eclaimsForm.patchValue({...this.selected_caserate});
    this.eclaimsForm.patchValue({
      eclaims_caserate_list_id: this.selected_caserate.id,
      attendant_accreditation_code: this.selected_caserate.attendant.accreditation_number,
      attendant_last_name: this.selected_caserate.attendant.last_name,
      attendant_first_name: this.selected_caserate.attendant.first_name,
      attendant_middle_name: this.selected_caserate.attendant.middle_name,
      attendant_suffix_name: this.selected_caserate.attendant.suffix_name !== 'NA' ? this.selected_caserate.attendant.suffix_name : '',
      transmittalNumber: this.selected_transmittalNumber ?? null
    });

    this.loadCf2Params();
  }

  showError(message: string,) {
    this.toastr.error(message, "Error", {
      closeButton: true,
      positionClass: 'toast-top-center',
      disableTimeOut: true
    });
  }

  closeModal() {
    this.toggleModal.emit('cf2');
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService,
    private exportAsService: ExportAsService,
    private formBuilder: FormBuilder
  ) { }

  afternoonTime: Date;
  ngOnInit(): void {
    this.facility = this.http.getUserFromJSON().facility;
    if(this.caserate_list.length === 1) {
      this.selected_caserate = this.caserate_list[0];
      this.createForm();
    }
  }
}
