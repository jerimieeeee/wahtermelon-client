import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { faSave, faCircleNotch, faSearch, faMagnifyingGlass, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';

@Component({
  selector: 'app-pbef',
  templateUrl: './pbef.component.html',
  styleUrls: ['./pbef.component.scss']
})
export class PbefComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_case;
  @Input() patient;
  @Input() patient_philhealth;
  @Input() program_name;
  @Input() caserate_list;
  @Input() program_creds;


  faFilePdf = faFilePdf;
  faCircleNotch = faCircleNotch;

  pbef_result: any;
  // program_creds: any;

  pdf_exported: boolean = false;
  show_form: boolean = false;

  exportAsPdf: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'mainForm',
    options: {
      image: { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 3},
      margin:  [1, 1, 1, 1],
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'], before:['#medForm2', '#medForm3']},
      jsPDF: {
        orientation: 'portrait',
        format: 'a4',
        precision: 16
      }
    }
  }

  exportP() {
    let file_name = 'PBEF_'+this.patient.last_name.toUpperCase()+'_'+this.patient.first_name.toUpperCase()+'_'+formatDate(new Date(), 'yyyyMMdd', 'en', 'Asia/Singapore');
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, file_name).subscribe(() => {
      this.pdf_exported = false;
    });
  }

  /* getCreds(admission_date, discharge_date){
    let params = {
      'filter[program_code]': this.program_name
    }

    this.http.get('settings/philhealth-credentials').subscribe({
      next:(data:any) => {
        console.log(data)
        this.program_creds = data.data[0];
        this.getPbef(admission_date, discharge_date)
        // this.getPbef();
      },
      error: err => console.log(err)
    })
  } */

  selected_caserate: any;
  caserate_field: any;

  selectCaserate() {
    this.selected_caserate = this.caserate_field;
    this.getParams();
  }

  getParams() {
    this.show_form = false;
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

  paramsTb() {
    let admission_date: Date;
    let discharge_date: Date;

    if(this.selected_caserate.code === '89221'){
      admission_date = this.selected_case.case_holding.treatment_start;
      discharge_date = new Date(this.selected_case.case_holding.continuation_start);
      discharge_date.setDate(discharge_date.getDate()-1);
    }

    if(this.selected_caserate.code === '89222'){
      admission_date = this.selected_case.case_holding.continuation_start;
      discharge_date = this.selected_case.case_holding.treatment_end;
    }

    this.getPbef(admission_date, discharge_date);
  }

  paramsCc() {
    let admission_date: Date;
    let discharge_date: Date;
  }

  getPbef(admission_date, discharge_date){
    let admit_date = formatDate(admission_date, 'MM-dd-yyyy', 'en', 'Asia/Singapore');
    let disch_date = formatDate(discharge_date, 'MM-dd-yyyy', 'en', 'Asia/Singapore');

    this.show_form = false;
    // let test_date = formatDate(new Date(), 'MM-dd-yyyy', 'en', 'Asia/Singapore');
    let params = {
      program_code: this.program_name,
      member_pin: this.patient_philhealth.philhealth_id,
      member_last_name: this.patient_philhealth.membership_type_id === 'DD' ? this.patient_philhealth.member_last_name.toUpperCase() : this.patient.last_name.toUpperCase(),
      member_first_name: this.patient_philhealth.membership_type_id === 'DD' ? this.patient_philhealth.member_first_name.toUpperCase() : this.patient.first_name.toUpperCase(),
      member_middle_name: this.patient_philhealth.membership_type_id === 'DD' ? this.patient_philhealth.member_middle_name.toUpperCase() : this.patient.middle_name.toUpperCase(),
      member_suffix_name: this.patient_philhealth.membership_type_id === 'DD' ? (this.patient_philhealth.member_suffix_name === 'NA' ? '' : this.patient_philhealth.member_suffix_name.toUpperCase()) : (this.patient.suffix_name === 'NA' ? '' : this.patient.suffix_name.toUpperCase()),
      member_birthdate: formatDate(this.patient_philhealth.membership_type_id === 'DD' ? this.patient_philhealth.member_birthdate : this.patient.birthdate, 'MM-dd-yyyy', 'en', 'Asia/Singapore'),
      patient_is: this.patient_philhealth.membership_type_id === 'DD' ? this.patient_philhealth.member_relation_id : 'M',
      admission_date: admit_date,
      discharge_date: disch_date,
      patient_last_name: this.patient.last_name.toUpperCase(),
      patient_first_name: this.patient.first_name.toUpperCase(),
      patient_middle_name: this.patient.middle_name.toUpperCase(),
      patient_suffix_name: this.patient.suffix_name === 'NA' ? '' : this.patient.suffix_name.toUpperCase(),
      patient_birthdate: formatDate(this.patient.birthdate, 'MM-dd-yyyy', 'en', 'Asia/Singapore'),
      patient_gender: this.patient.gender
    }

    this.http.post('eclaims/check-claim-eligibility', params).subscribe({
      next: (data: any) => {
        this.pbef_result = data;
        this.show_form = true;
        console.log(this.pbef_result)
        console.log(this.pbef_result.ASOF)
      },
      error: err => console.log(err)
    })
  }

  closeModal() {
    this.toggleModal.emit('pbef');
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService,
    private exportAsService: ExportAsService
  ) { }

  ngOnInit(): void {
    if(this.caserate_list.length === 1) {
      console.log(this.caserate_list)
      this.selected_caserate = this.caserate_list[0];
      this.getParams();
    }
  }
}
