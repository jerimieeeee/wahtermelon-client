import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleNotch, faDoorClosed, faPenToSquare, faPersonWalking, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-maternalcare',
    templateUrl: './maternalcare.component.html',
    styleUrls: ['./maternalcare.component.scss'],
    standalone: false
})
export class MaternalcareComponent implements OnInit {
  faDoorClosed = faDoorClosed;
  faPersonWalking = faPersonWalking;
  faPenToSquare = faPenToSquare;
  faSpinner = faSpinner;
  faCircleNotch = faCircleNotch;

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
  show_list: boolean = false;


  libraries = [
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
  module: number = 2;

  switchPage(page) {
    this.pages = page;
  }

  switchTab(tab) {
    this.module = tab;
  }

  modals: any[] = [];

  toggleModal(name: string){
    this.modals[name] = !this.modals[name];
  }

  postValue(post_data) {
    if (post_data) {
      this.post_value = true;
    }
  }

  mcrID(type: any, id: any) {
    let params = {
      type: type,
      patient_id: id
    }

    this.http.get('maternal-care/mc-records', { params }).subscribe({
      next: (data: any) => {
        if (data.data.length > 0) {
          this.patient_mc_list = data.data;

          if (!this.patient_mc_list[0].post_registration || !this.patient_mc_list[0].post_registration.end_pregnancy) {
            this.openMCR(this.patient_mc_list[0].id);
          }
        }

        this.show_list = true;
      },
      error: err => { this.http.showError(err.error.message, 'Maternal Care'); },
    });
  }

  openMCR(id: any) {
    this.loading = true;
    this.view_id = id;

    if (id) {
      this.http.get('maternal-care/mc-records/' + id, {params: {location: 'show'}}).subscribe({
        next: (data: any) => {
          this.patient_mc_record = data.data;
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
      this.http.get('libraries/' + obj.location, {params:{per_page: 'all'}}).subscribe({
        next: (data: any) => {
          this[obj.var_name] = data.data;
          this.loadConsultDetails();
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
        this.proceedItr()
      }
    })
  }

  proceedItr(){
    this.router.navigate(['/patient/itr', {id: this.patient_id}])
  }

  loadConsultDetails(){
    this.http.get('consultation/records',{params: {id: this.consult_id}}).subscribe((data: any) => {
      this.consult_details = data.data[0];
      this.mcrID('all', this.patient_id);
    });
  }

  constructor(
    private http: HttpService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.mcr = true;
    this.module = 2;
    this.post_value = false;
    this.loading = false
    this.loadLibraries();

    this.active_loc_id = this.http.getUrlParams();

    this.patient_id = this.active_loc_id.patient_id;
    this.consult_id = this.active_loc_id.consult_id;
  }
}
