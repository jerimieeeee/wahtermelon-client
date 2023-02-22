import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPenToSquare, faPersonWalking, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-maternalcare',
  templateUrl: './maternalcare.component.html',
  styleUrls: ['./maternalcare.component.scss']
})
export class MaternalcareComponent implements OnInit {

  faPersonWalking = faPersonWalking;
  faPenToSquare = faPenToSquare;
  faSpinner = faSpinner;

  patient_details: any;
  public mcr_data: any;
  public patient_mc_record: any = '';
  public patient_mc_list: any;
  public view_id: any;
  prenatal: boolean;
  services: boolean;
  post_value: boolean;
  loading: boolean;

  modalStats: any;
  mcr: boolean;
  consult_details: any;
  show_end: boolean;

  constructor(private http: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  module: number;

  libraries = [
    { var_name: 'risk_factors', location: 'mc-risk-factors' },
    { var_name: 'fetals', location: 'mc-presentations' },
    { var_name: 'fhr_lib', location: 'mc-locations' },
    { var_name: 'delivery_location', location: 'mc-delivery-locations' },
    { var_name: 'regions', location: 'regions?include=provinces' },
    { var_name: 'attendants', location: 'mc-attendants' },
    { var_name: 'preg_outcome', location: 'mc-outcomes' },
    { var_name: 'lib_services', location: 'mc-services' },
    { var_name: 'visit_type', location: 'mc-visit-type' },
  ]

  active_loc_id: any;
  patient_id: any;
  consult_id: any;

  ngOnInit(): void {
    this.mcr = true;
    this.module = 1;
    this.post_value = false;
    this.loading = false
    this.loadLibraries();

    this.active_loc_id = this.http.getUrlParams();
    // console.log(this.active_loc_id)
    this.patient_id = this.active_loc_id.patient_id;
    this.consult_id = this.active_loc_id.consult_id;
    this.loadConsultDetails();
    this.mcrID('all', this.patient_id);
  }

  toggleModal(){
    this.show_end = !this.show_end;
  }
  
  switchTab(tab) {
    this.module = 0;
    this.module = tab;
    if (this.module == 1) {
      this.patient_mc_record = ''
      this.mcr = true;
      // this.patientInfo(this.patient_details)
    }
    console.log(this.module);
  }

  postValue(post_data) {
    if (post_data) {
      this.post_value = true;
    }
  }

  openNew() {
    this.switchTab(2);
    // this.patient_mc_record = this.patient_mc_record[0]
  }


  /* patientInfo(info) {
    this.patient_details = info;
    this.mcrID('all', this.patient_details.id);
  } */

  mcrID(type: any, id: any) {
    if (id) {
      let params = {
        type: type,
        patient_id: id
      }

      this.http.get('maternal-care/mc-records', { params }).subscribe({
        next: (data: any) => {
          console.log(data.data);
          if (data.data.length > 0) {
            this.patient_mc_list = data.data;

            if (!this.patient_mc_list[0].post_registration || !this.patient_mc_list[0].post_registration.end_pregnancy) {
              this.openMCR(this.patient_mc_list[0].id);
              // console.log(!this.patient_mc_list[0].pre_registration, !this.patient_mc_list[0].post_registration.end_pregnancy);

            }
          }
        },
        error: err => console.log(err),
      });
    }
  }

  openMCR(id: any) {
    this.loading = true;
    this.view_id = id;
    console.log(id);
    if (id) {
      this.http.get('maternal-care/mc-records/' + id).subscribe({
        next: (data: any) => {
          console.log(data, " openMCR");
          this.patient_mc_record = data.data;
          this.mcr = true;
          if (this.patient_mc_record.pre_registration) {

            this.prenatal = true;
            // this.services = true;
            if (this.patient_mc_record.post_registration && this.patient_mc_record.post_registration.length != 0) {
              this.post_value = true;
            }
            // if (this.patient_mc_record.pre_registration.length == null && this.patient_mc_record.post_registration != null) {
            //   this.module = 4;
            // } else {
            //   this.module = 2;
            // }
          } else if (!this.patient_mc_record.pre_registration && this.patient_mc_record.post_registration) {
            this.prenatal = false;;
            this.mcr = false
          }
        },
        error: err => console.log(err),
        complete: () => {
          this.loading = false;
          // console.log(!this.patient_mc_record.pre_registration , !this.patient_mc_record.post_registration.end_pregnancy, " openMCR");
          console.log(this.module, " logging this module before swithcnig");

          if (!this.patient_mc_record.pre_registration) {
            this.module = 4;
          } else {
            if (this.module == 1) {
              this.module = 2;
            }
          }
        }
      });
    }
  }

  loadLibraries() {
    this.libraries.forEach(obj => {
      this.http.get('libraries/' + obj.location).subscribe({
        next: (data: any) => {
          this[obj.var_name] = data.data;

        },
        error: err => console.log(err),
      })
    });
    console.log(this['risk_factors']);
  }

  showPreServ(id: any) {
    if (id != '') {
      this.openMCR(id);
    }

    this.prenatal = true;
  }

  openModal(modal) {
    console.log("Opening modal via emit mcr with ", this.modalStats);

    this.modalStats = modal;
  }

  updatePrenatal(info) {
    this.patient_mc_record.prenatal_visit = info;
  }

  updatePost(info) {
    // this.mcrID('all', this.patient_details.id);
    this.openMCR(info);
    // this.patient_mc_record.post_registration = info;
  }

  updatePostVisit(info) {
    this.patient_mc_record.postpartum_visit = info;
  }

  endVisit(){

    let endbutton = {
      consult_done: 1,
      patient_id : this.consult_details[0].patient.id,
      user_id : this.consult_details[0].user.id,
      consult_date : this.consult_details[0].consult_date,
      pt_group : this.consult_details[0].pt_group,
      // physician_id : this.consult_details[0].physician.id,
      // is_pregnant: this.consult_details[0].is_pregnant
    }
      this.http.update('consultation/records/',this.consult_id, endbutton).subscribe({
        // next: (data: any) => console.log(data.status, 'check status'),
        error: err => console.log(err),
        complete: () => {
         console.log('end visited kang bata ka')
         this.proceedItr()
        }
      })
      console.log(endbutton)
    }

    proceedItr(){
      this.router.navigate(['/patient/itr', {id: this.patient_id}])
    }

    loadConsultDetails(){

      this.http.get('consultation/records',{params: {id: this.consult_id}}).subscribe((data: any) => {
        this.consult_details = data.data
      });
    }


}
