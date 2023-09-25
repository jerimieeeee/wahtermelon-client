import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faCircleInfo, faFlask, faHouse, faSpinner, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { dateHelper } from 'app/shared/services/date-helper.service';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-date',
  templateUrl: './update-date.component.html',
  styleUrls: ['./update-date.component.scss']
})
export class UpdateDateComponent implements OnInit{
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_info;
  @Input() patient_age;
  @Input() consult_details;

  max_date:string;
  faCircleInfo = faCircleInfo;
  faCheck = faCheck;
  faSpinner = faSpinner;

  is_saving: boolean = false;
  show_form: boolean = false;
  is_checking_atc: boolean = false;

  selected_module: string = '';
  consult_date;
  consult_time;
  date;

  pATC: string;
  pATC_date: string;
  is_atc_valid: boolean;
  is_walk_in: boolean;

  isATCValid(){
    this.is_checking_atc = true;
    let params = {
      pPIN: this.philhealth_details.philhealth_id,
      pATC: this.pATC,
      pEffectivityDate: formatDate(this.pATC_date, 'MM/dd/yyyy', 'en', 'Asia/Manila')
    }
    this.http.get('konsulta/check-atc', {params}).subscribe({
      next: (data: any) => {
        // console.log(data)
        this.is_checking_atc = false;
        this.is_atc_valid = data.return === 'YES' ? true : false;
      },
      error: err => console.log(err)
    })
  }

  philhealth_details: any;
  getPhilhealth(){
    this.http.get('patient-philhealth/philhealth', {params:{'filter[patient_id]': this.consult_details.patient.id,  per_page: '1', sort: '-enlistment_date'}}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.philhealth_details = data.data[0];
      },
      error: err => console.log(err)
    })
  }
  is_konsulta: boolean = false;
  onSubmit(){
    this.is_saving = true;

    let new_visit = {
      patient_id: this.consult_details.patient.id,
      user_id: this.consult_details.user_id,
      consult_date: this.consult_date+' '+this.consult_time,
      consult_done: this.consult_details.consult_done,
      pt_group: this.consult_details.pt_group,
      authorization_transaction_code: this.is_atc_valid ? (!this.is_walk_in ? (this.pATC || this.pATC !== '' ? this.pATC : 'WALKEDIN') : 'WALKEDIN') : 'WALKEDIN',
      walkedin_status: this.is_atc_valid ? false : true,
      is_konsulta: this.is_konsulta
    };

    console.log(new_visit.consult_date)
    this.http.update('consultation/records/', this.consult_details.id, new_visit).subscribe({
      next: (data: any) => {
        this.toastr.success('Successfully updated!','Consultation')
        this.closeModal()
      },
      error: (err) => console.log(err.error.message)
    });
  }

  closeModal(){
    this.is_saving = false;
    this.toggleModal.emit('update_date');
  }

  constructor(
    private router: Router,
    private http: HttpService,
    private toastr: ToastrService,
    private dateHelper: dateHelper
  ) { }

  ngOnInit(): void {
    this.getPhilhealth();

    this.max_date = this.dateHelper.dateFormat(new Date);
    this.consult_date = this.dateHelper.dateFormat(this.consult_details.consult_date);
    this.consult_time = this.dateHelper.timeFormat(this.consult_details.consult_date);
    this.is_walk_in = this.consult_details.authorization_transaction_code === 'WALKEDIN' ? true : false;
    this.pATC = this.consult_details.authorization_transaction_code === 'WALKEDIN' ? null : this.consult_details.authorization_transaction_code;
    this.is_konsulta = this.consult_details.is_konsulta;
    console.log(this.consult_time)
  }
}
