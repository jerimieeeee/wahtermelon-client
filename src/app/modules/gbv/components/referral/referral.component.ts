import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faEdit, faSave } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit {
  @Output() updateSelectedGbv = new EventEmitter<any>();
  @Input() patient_id;
  @Input() selected_gbv_case;
  @Input() pos;

  faPlus = faPlus;
  faEdit = faEdit;
  faSave = faSave;
  show_form: boolean = true;

  modals: any = [];
  referrals: any = [];
  selected_data: any = [];

  reloadData(){
    let params = {
      id: this.selected_gbv_case.id,
      // patient_id: this.selected_gbv_case.patient_id
    }
    console.log(params)
    this.http.get('gender-based-violence/patient-gbv', {params}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.selected_gbv_case = data.data[0];
        this.updateSelectedGbv.emit(this.selected_gbv_case);
      },
      error: err => console.log(err)
    });
  }

  /* getReferrals() {
    console.log(this.selected_gbv_case)
    let params = {
      patient_id: this.patient_id
    }

    this.http.get('gender-based-violence/patient-gbv-referral', {params}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.referrals = data.data;
      }
    })
  } */

  toggleModal(name, data?){
    this.selected_data = data;
    this.modals[name] = !this.modals[name];

    if(!this.modals[name]) this.reloadData();
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
      // this.getReferrals();
      // console.log(this.selected_gbv_case)
      // console.log(this.selected_gbv_case.gbvReferral)
      this.referrals = this.selected_gbv_case.gbvReferral;
  }
}
