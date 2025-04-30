import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { faSave, faCircleNotch, faSearch, faMagnifyingGlass, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-pbef',
    templateUrl: './pbef.component.html',
    styleUrls: ['./pbef.component.scss'],
    standalone: false
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

  pbef_result: SafeResourceUrl | null = null;
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
    let file_name = 'PBEF_'+this.patient.last_name.toUpperCase()+'_'+this.patient.first_name.toUpperCase()+'_'+formatDate(new Date(), 'yyyyMMdd', 'en', 'Asia/Manila');
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
      case 'ab': {
        this.paramsAb();
        break;
      }
      case 'tb': {
        this.paramsTb();
        break;
      }
      case 'cc': {
        this.paramsCc();
        break;
      }
      case 'mc': {
        this.paramsMc();
        break;
      }
      case 'fp': {
        this.paramsFp();
        break;
      }
      default: {
        console.log(this.selected_case)
        // this.getPbef();
      }
    }
  }

  paramsFp() {
    let admission_date = formatDate(this.selected_caserate.caserate_date, 'yyyy-MM-dd', 'en', 'Asia/Manila');
    this.getPbef(admission_date);
  }

  paramsAb() {
    let admission_date = formatDate(this.selected_case.abPostExposure.day0_date, 'yyyy-MM-dd', 'en', 'Asia/Manila');
    this.getPbef(admission_date);
  }

  paramsCc() {
    let admission_date = formatDate(this.selected_case.admission_date, 'MM-dd-yyyy', 'en', 'Asia/Manila');

    this.getPbef(admission_date);
  }

  paramsMc() {
    let admission_date;

    if(this.selected_caserate.code === 'ANC01' || this.selected_caserate.code === 'ANC02') {
      admission_date = formatDate(new Date(this.selected_case.prenatal_visit[0].prenatal_date), 'MM-dd-yyyy', 'en', 'Asia/Manila');
    } else {
      admission_date = formatDate(this.selected_case.post_registration.admission_date, 'MM-dd-yyyy', 'en', 'Asia/Manila');
    }

    this.getPbef(admission_date);
  }

  paramsTb() {
    let admission_date: Date;

    admission_date = this.selected_caserate.code === '89222' ? this.selected_case.case_holding.continuation_start : this.selected_case.case_holding.treatment_start;
    this.getPbef(admission_date);
  }

  getPbef(admission_date, discharge_date?){
    let admit_date = formatDate(admission_date, 'MM-dd-yyyy', 'en', 'Asia/Manila');

    this.show_form = false;

    let params = {
      program_code: this.program_name === 'cc' || this.program_name === 'fp' ? 'mc' : this.program_name,
      member_pin: this.patient_philhealth.membership_type_id === 'DD' ? this.patient_philhealth.member_pin : this.patient_philhealth.philhealth_id,
      member_last_name: this.patient_philhealth.membership_type_id === 'DD' ? this.patient_philhealth.member_last_name.toUpperCase() : this.patient.last_name.toUpperCase(),
      member_first_name: this.patient_philhealth.membership_type_id === 'DD' ? this.patient_philhealth.member_first_name.toUpperCase() : this.patient.first_name.toUpperCase(),
      member_middle_name: this.patient_philhealth.membership_type_id === 'DD' ? this.patient_philhealth.member_middle_name.toUpperCase() : this.patient.middle_name.toUpperCase(),
      member_suffix_name: this.patient_philhealth.membership_type_id === 'DD' ? (this.patient_philhealth.member_suffix_name === 'NA' ? '' : this.patient_philhealth.member_suffix_name.toUpperCase()) : (this.patient.suffix_name === 'NA' ? '' : this.patient.suffix_name.toUpperCase()),
      member_birthdate: formatDate(this.patient_philhealth.membership_type_id === 'DD' ? this.patient_philhealth.member_birthdate : this.patient.birthdate, 'MM-dd-yyyy', 'en', 'Asia/Manila'),
      member_gender: this.patient_philhealth === 'DD' ? this.patient_philhealth.member_gender : this.patient.gender,
      patient_is: this.patient_philhealth.membership_type_id === 'DD' ? this.patient_philhealth.member_relation_id : 'M',
      admission_date: admit_date,
      patient_pin: this.patient_philhealth.philhealth_id,
      patient_last_name: this.patient.last_name.toUpperCase(),
      patient_first_name: this.patient.first_name.toUpperCase(),
      patient_middle_name: this.patient.middle_name.toUpperCase(),
      patient_suffix_name: this.patient.suffix_name === 'NA' ? '' : this.patient.suffix_name.toUpperCase(),
      patient_gender: this.patient.gender,
      patient_birthdate: formatDate(this.patient.birthdate, 'MM-dd-yyyy', 'en', 'Asia/Manila'),
      membership_type: this.patient_philhealth.membership_type_id,
    }

    this.http.post('eclaims/check-claim-eligibility', params).subscribe({
      next: (data: any) => {
        if(data.success === false) {
          this.toastr.error(data.message, 'PBEF');
          this.closeModal();
        } else {
          this.generatePBEF(data);
        }
      },
      error: err => {
        this.http.showError('Error fetching pbef. Please try again.', 'PBEF')
        // this.closeModal();
      }
    })
  }

  generatePBEF(data) {
    let params = {
      referenceno: data.referenceno
    };

    this.http.post('eclaims/generate-pbef', params).subscribe({
      next: (data: any) => {
        this.pbef_result = this.sanitizer.bypassSecurityTrustResourceUrl(
          'data:application/pdf;base64,' + data.result
        );

        this.show_pdf = true;
        this.show_form = true;
      },
      error: err => {
        console.log(err.error.message);
      }
    });
  }

  closeModal() {
    this.toggleModal.emit('pbef');
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService,
    private exportAsService: ExportAsService,
    private sanitizer: DomSanitizer
  ) { }

  show_pdf: boolean = false;
  ngOnInit(): void {
    console.log(this.caserate_list)
    if(this.caserate_list.length === 1) {
      this.selected_caserate = this.caserate_list[0];
      this.getParams();
    } else {
      this.getParams();
    }
  }
}
