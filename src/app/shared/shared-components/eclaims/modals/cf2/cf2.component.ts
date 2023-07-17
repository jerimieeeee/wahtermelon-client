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
  styleUrls: ['./cf2.component.scss']
})
export class Cf2Component implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient;
  @Input() program_id;
  @Input() program_name;
  @Input() caserate_list;
  @Input() selected_case;

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

  eclaimsForm:FormGroup=eclaimsForm();

  date_today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  submitQue() {
    this.que_form = true;
    this.http.post('eclaims/eclaims-xml', this.eclaimsForm.value).subscribe({
      next: (data:any) => {
        console.log(data)
        this.toastr.success('Successfully saved', 'Queue Claim');
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
      tb.pTBType = 'I';
      tb.attendant_sign_date = formatDate(this.selected_case.case_holding.treatment_start, 'yyyy-MM-dd', 'en');
      tb.admission_date = formatDate(this.selected_case.case_holding.treatment_start, 'yyyy-MM-dd', 'en');

      let cont_date = new Date(this.selected_case.case_holding.continuation_start);
          cont_date.setDate(cont_date.getDate()-1);

      tb.discharge_date = formatDate(cont_date, 'yyyy-MM-dd', 'en');
    }

    if(this.selected_caserate.code === '89222') {
      tb.pTBType = 'M';
      tb.attendant_sign_date = formatDate(this.selected_case.case_holding.treatment_start, 'yyyy-MM-dd', 'en');
      tb.admission_date = formatDate(this.selected_case.case_holding.continuation_start, 'yyyy-MM-dd', 'en');
      tb.discharge_date = formatDate(this.selected_case.case_holding.treatment_end, 'yyyy-MM-dd', 'en');
    }

    this.eclaimsForm.patchValue({
      attendant_sign_date: tb.attendant_sign_date,
      pTBType: tb.pTBType,
      pNTPCardNo: this.selected_case.case_holding.case_number,
      admission_date: tb.admission_date,
      admission_time: '8:00 AM',
      discharge_date:tb.discharge_date,
      discharge_time: '8:00 AM',
    });

    console.log(this.eclaimsForm)
    this.getCreds();
  }

  getCreds(){
    let params = {
      'filter[program_code]': this.program_name
    }

    this.http.get('settings/philhealth-credentials').subscribe({
      next:(data:any) => {
        console.log(data.data)
        this.program_creds = data.data[0];
        this.show_form = true;
      },
      error: err => console.log(err)
    })
  }

  paramsCc() {
    this.f.pEssentialNewbornCare.setValidators([Validators.required]);
    this.f.pNewbornHearingScreeningTest.setValidators([Validators.required]);
    this.f.pNewbornScreeningTest.setValidators([Validators.required]);
    this.f.pFilterCardNo.setValidators([Validators.required]);
  }

  paramsAb() {
    this.f.pDay0ARV.setValidators([Validators.required]);
    this.f.pDay3ARV.setValidators([Validators.required]);
    this.f.pDay7ARV.setValidators([Validators.required]);
    this.f.pRIG.setValidators([Validators.required]);
    this.f.pABPOthers.setValidators([Validators.required]);
    this.f.pABPSpecify.setValidators([Validators.required]);
    this.f.pICDCode.setValidators([Validators.required]);
  }

  paramsMc() {
    this.f.pCheckUpDate1.setValidators([Validators.required]);
    this.f.pCheckUpDate2.setValidators([Validators.required]);
    this.f.pCheckUpDate3.setValidators([Validators.required]);
    this.f.pCheckUpDate4.setValidators([Validators.required]);
  }

  paramsMl() {
    this.f.pICDCode.setValidators([Validators.required]);
  }

  paramsFp(){
    this.f.pICDCode.setValidators([Validators.required]);
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
        this.paramsCc();
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
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'GBV Medical').subscribe(() => {
      this.pdf_exported = false;
    });
  }

  createForm(){
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
      pICDCode: [null]
    });

    this.eclaimsForm.patchValue({...this.selected_caserate});
    this.eclaimsForm.patchValue({
      eclaims_caserate_list_id: this.selected_caserate.id,
      attendant_accreditation_code: this.selected_caserate.attendant.accreditation_number,
      attendant_last_name: this.selected_caserate.attendant.last_name,
      attendant_first_name: this.selected_caserate.attendant.first_name,
      attendant_middle_name: this.selected_caserate.attendant.middle_name,
      attendant_suffix_name: this.selected_caserate.attendant.suffix_name !== 'NA' ? this.selected_caserate.attendant.suffix_name : '',
    });

    this.loadCf2Params();
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

  facility: any;
  ngOnInit(): void {
    this.facility = this.http.getUserFromJSON().facility;
    console.log(this.facility)
    if(this.caserate_list.length === 1) {
      this.selected_caserate = this.caserate_list[0];
      this.createForm();
    }
  }
}
