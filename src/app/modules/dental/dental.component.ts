import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCircleNotch, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dental',
  templateUrl: './dental.component.html',
  styleUrls: ['./dental.component.scss']
})
export class DentalComponent implements OnInit {
  selected_dental_consult: any;
  consult_details: any;
  user_facility: any;

  pages: number = 1;
  module: number = 1;

  faDoorClosed = faDoorClosed;
  faCircleNotch = faCircleNotch;
  patient_dental_history: any = [];
  enable_edit: boolean = false;
  referred_to: any;
  consult_id: any;
  allowed_to_edit: boolean = false
  have_complaint: boolean = false;

  loadConsult(){
    // console.log('consult loaded')
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');
    // this.consult_details = null;
    let params = {
      id: this.consult_id,
      pt_group: 'dn',
      disable_filter: 1
    }

    this.http.get('consultation/records', {params}).subscribe({
      next: (data: any) => {
        console.log(data)
        this.consult_details = data.data[0];
        this.allowed_to_edit = this.http.getUserFacility() === this.consult_details.facility.code ? true : false;
        // console.log(this.consult_details.facility.code)
        if(this.consult_details.consult_notes.complaint || this.consult_details.consult_notes.complaints.length > 0  || this.consult_details.consult_notes.history) {
          this.have_complaint = true;


          if(this.consult_details.physician) {
            this.referred_to = this.consult_details.physician;
            this.enable_edit = true;
          }
        }
      },
      error: err => console.log(err)
    });
  }

  referTo(){
    if(this.enable_edit) {
      this.enable_edit = false;
    } else {
      let params = {
        patient_id: this.consult_details.patient.id,
        consult_date: this.consult_details.consult_date,
        pt_group: 'cn',
        consult_done: false,
        physician_id: this.referred_to.id
      }

      this.http.update('consultation/records/', this.consult_details.id, params).subscribe({
        next: (data: any) => {
          this.toastr.success('Patient was referred','Referral');
          this.consult_details['physician'] = this.referred_to;
        },
        error: err => console.log(err)
      })
    }
  }

  switchPage(page){
    this.pages = page;
  }

  switchTab(tab){
    this.module = tab;
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.module = 1;
    this.loadConsult();
  }
}
