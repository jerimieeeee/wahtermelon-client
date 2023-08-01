import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';



@Component({
  selector: 'app-childcare',
  templateUrl: './childcare.component.html',
  styleUrls: ['./childcare.component.scss']
})
export class ChildcareComponent implements OnInit {

  faDoorClosed = faDoorClosed;

  patient_details: any;

  consult_details: any;
  patient_consultdetails: any;

  active_loc_id: any;
  consult_id: any

  show_end: boolean = false;
  show_form: boolean = false;

  pages: number = 1;
  module: number = 1;
  modals: any =[];

  // Section 2
  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  switchPage(page) {
    this.pages = page;
  }

  toggleModal(name){
    this.modals[name] = !this.modals[name];
  }

  switchTab(tab){
    this.module = tab;
  }

  loadConsultDetails(){
    this.show_form = false;
    this.http.get('consultation/records',{params: {patient_id: this.patient_details.id, id: this.consult_id}}).subscribe({
      next: (data: any) => {
        this.consult_details = data.data;
        this.loadCcDetails();
      },
      error: err => console.log(err)
    });
  }

  ccdev_data: any;

  loadCcDetails(){
    let params = {
      patient_id: this.patient_details.id
    }
    this.http.get('child-care/cc-records', {params}).subscribe({
      next: (data:any) => {
        console.log(data)
        this.show_form = true;
        this.ccdev_data = data.data[0];

        if(this.ccdev_data) this.show_forms = true;
      },
      error: err => console.log(err)
    })
  }

  show_forms: boolean;
  checkCCdevDetails(e){
    console.log(e, 'show form with condition ', e != '')
    if(e) this.show_forms = true;
  }

  ngOnInit(): void {
    this.module=1;
    this.show_forms = false;

    this.patient_details = this.http.getPatientInfo();

    console.log(this.patient_details)
    this.active_loc_id = this.http.getUrlParams();
    this.consult_id = this.active_loc_id.consult_id;

    this.loadConsultDetails()
    console.log(this.consult_id, 'test consult ids')
  }
}
