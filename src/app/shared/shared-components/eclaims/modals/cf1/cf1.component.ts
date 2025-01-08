import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cf1',
    templateUrl: './cf1.component.html',
    styleUrls: ['./cf1.component.scss'],
    standalone: false
})
export class Cf1Component implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_case;
  @Input() patient;
  @Input() program_creds;
  @Input() patient_philhealth;

  faFilePdf = faFilePdf;
  faCircleNotch = faCircleNotch;

  pbef_result: any;
  program_code: string = 'mc';
  // program_creds: any;

  pdf_exported: boolean = false;
  show_form: boolean = true;

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
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'GBV Medical').subscribe(() => {
      this.pdf_exported = false;
    });
  }

  getCreds(){
    let params = {
      'filter[program_code]': this.program_code
    }

    this.http.get('settings/philhealth-credentials').subscribe({
      next:(data:any) => {
        console.log(data)
        this.program_creds = data.data[0];
        // this.getPbef();
      },
      error: err => console.log(err)
    })
  }

  /* getPbef(){
    this.show_form = false;
    let test_date = formatDate(new Date(), 'MM-dd-yyyy', 'en', 'Asia/Manila');
    let params = {
      program_code: this.program_code,
      member_pin: this.patient_philhealth.philhealth_id,
      member_last_name: this.patient_philhealth.membership_type_id === 'DD' ? this.patient_philhealth.member_last_name.toUpperCase() : this.patient.last_name.toUpperCase(),
      member_first_name: this.patient_philhealth.membership_type_id === 'DD' ? this.patient_philhealth.member_first_name.toUpperCase() : this.patient.first_name.toUpperCase(),
      member_middle_name: this.patient_philhealth.membership_type_id === 'DD' ? this.patient_philhealth.member_middle_name.toUpperCase() : this.patient.middle_name.toUpperCase(),
      member_suffix_name: this.patient_philhealth.membership_type_id === 'DD' ? (this.patient_philhealth.member_suffix_name === 'NA' ? '' : this.patient_philhealth.member_suffix_name.toUpperCase()) : (this.patient.suffix_name === 'NA' ? '' : this.patient.suffix_name.toUpperCase()),
      member_birthdate: formatDate(this.patient_philhealth.membership_type_id === 'DD' ? this.patient_philhealth.member_birthdate : this.patient.birthdate, 'MM-dd-yyyy', 'en', 'Asia/Manila'),
      patient_is: this.patient_philhealth.membership_type_id === 'DD' ? this.patient_philhealth.member_relation_id : 'M',
      admission_date: test_date,
      discharge_date: test_date,
      patient_last_name: this.patient.last_name.toUpperCase(),
      patient_first_name: this.patient.first_name.toUpperCase(),
      patient_middle_name: this.patient.middle_name.toUpperCase(),
      patient_suffix_name: this.patient.suffix_name === 'NA' ? '' : this.patient.suffix_name.toUpperCase(),
      patient_birthdate: formatDate(this.patient.birthdate, 'MM-dd-yyyy', 'en', 'Asia/Manila'),
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
  } */

  closeModal() {
    this.toggleModal.emit('cf1');
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService,
    private exportAsService: ExportAsService
  ) { }

  ngOnInit(): void {
    console.log(this.patient);
    // this.getCreds();
      // console.log('test');
  }
}
