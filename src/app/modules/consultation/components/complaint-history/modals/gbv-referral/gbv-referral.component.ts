import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gbv-referral',
  templateUrl: './gbv-referral.component.html',
  styleUrls: ['./gbv-referral.component.scss']
})
export class GbvReferralComponent {
  @Output() getPatientTbHistory = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() switchPage = new EventEmitter<any>();
  @Input() selected_tb_consult;
  @Input() max_date;

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  answers: any;
  answers_yn: any;

  is_saving: boolean = false;
  show_error: boolean = false;

  gbv_referral = {
    referral_facility_code: '',
    referral_date: ''
  }
  onSubmit(){
    this.is_saving = true;

    this.http.update('tbdots/patient-tb/', this.selected_tb_consult.id, this.gbv_referral).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.is_saving = false;
        this.toastr.success('Successfully referred!','GBV Referral');
        this.switchPage.emit(1);
        this.closeModal();
      },
      error: err => console.log(err)
    });
  }

  loadLibraries(){
    this.http.get('libraries/tb-treatment-outcome').subscribe({
      next: (data: any) => {},//this.treatment_outcomes = data.data,
      error: err => console.log(err)
    })
  }

  createForm(){

  }

  closeModal(){
    this.toggleModal.emit('gbv_referral');
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // console.log(this.selected_tb_consult);
    this.createForm();
  }
}
