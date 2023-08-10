import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faDoorClosed, faPenToSquare, faPersonWalking, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-maternalcare',
  templateUrl: './maternalcare.component.html',
  styleUrls: ['./maternalcare.component.scss']
})
export class MaternalcareComponent implements OnInit {
  faDoorClosed = faDoorClosed;
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

  pages: number = 1;
  module: number = 1;

  switchPage(page) {
    this.pages = page;
  }

  switchTab(tab) {
    this.module = tab;
  }

  toggleModal(){
    this.show_end = !this.show_end;
  }

  /* switchTab(tab) {
    this.module = 0;
    this.module = tab;
    if (this.module == 1) {
      this.patient_mc_record = ''
      this.mcr = true;
    }
    console.log(this.module);
  } */

  postValue(post_data) {
    if (post_data) {
      this.post_value = true;
    }
  }

  openNew() {
    this.switchTab(2);
  }

  mcrID(type: any, id: any) {
    if (id) {
      let params = {
        type: type,
        patient_id: id
      }

      this.http.get('maternal-care/mc-records', { params }).subscribe({
        next: (data: any) => {
          // console.log(data.data);
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

    if (id) {
      this.http.get('maternal-care/mc-records/' + id).subscribe({
        next: (data: any) => {
          this.patient_mc_record = data.data;
          console.log(data, " patient_mc_record");
          this.mcr = true;
          if (this.patient_mc_record.pre_registration) {
            this.prenatal = true;
            if (this.patient_mc_record.post_registration && this.patient_mc_record.post_registration.length != 0) {
              this.post_value = true;
            }
          } else if (!this.patient_mc_record.pre_registration && this.patient_mc_record.post_registration) {
            this.prenatal = false;;
            this.mcr = false
          }
        },
        error: err => console.log(err),
        complete: () => {
          this.loading = false;

          if (!this.patient_mc_record.pre_registration) {
            this.pages = 2;
            this.module = 4;
          } else {
            if (this.pages === 1) {
              this.pages = 2;
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
  }

  showPreServ(id: any) {
    if (id != '') {
      this.openMCR(id);
    }

    this.prenatal = true;
  }

  openModal(modal) {
    this.modalStats = modal;
  }

  updatePrenatal(info) {
    this.patient_mc_record.prenatal_visit = info;
  }

  updatePost(info) {
    this.openMCR(info);
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
    }

    this.http.update('consultation/records/',this.consult_id, endbutton).subscribe({
      error: err => console.log(err),
      complete: () => {
        console.log('end visited kang bata ka')
        this.proceedItr()
      }
    })
  }

  proceedItr(){
    this.router.navigate(['/patient/itr', {id: this.patient_id}])
  }

  loadConsultDetails(){
    this.http.get('consultation/records',{params: {id: this.consult_id}}).subscribe((data: any) => {
      console.log(data.data)
      this.consult_details = data.data[0];
    });
  }

  constructor(
    private http: HttpService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.mcr = true;
    this.module = 1;
    this.post_value = false;
    this.loading = false
    this.loadLibraries();

    this.active_loc_id = this.http.getUrlParams();

    this.patient_id = this.active_loc_id.patient_id;
    this.consult_id = this.active_loc_id.consult_id;
    this.loadConsultDetails();
    this.mcrID('all', this.patient_id);
  }
}
