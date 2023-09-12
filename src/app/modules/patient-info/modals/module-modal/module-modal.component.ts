import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faClipboard, faCircleInfo, faHouse, faUserDoctor, faFlask, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { dateHelper } from 'app/shared/services/date-helper.service';

@Component({
  selector: 'app-module-modal',
  templateUrl: './module-modal.component.html',
  styleUrls: ['./module-modal.component.scss']
})
export class ModuleModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_info;
  @Input() patient_age;
  @Input() philhealth_details;

  max_date = formatDate(new Date, 'yyyy-MM-dd', 'en', 'Asia/Manila');
  faClipboard = faClipboard;
  faCircleInfo = faCircleInfo;
  faHouse = faHouse;
  faUserDoctor = faUserDoctor;
  faFlask = faFlask;
  faCheck = faCheck;
  faSpinner = faSpinner;

  list_modules = {
    'General': {modules: { }},
    'Others': {
      modules: {
        ab: {
          name: 'Animal Bite',
          location: 'ab',
          group: 'ab',
          consult_active: false,
          id: null
        },
        tb: {
          name: 'Tuberculosis',
          location: 'tb',
          group: 'tb',
          consult_active: false,
          id: null
        },
        ncd: {
          name: 'NCD',
          location: 'ncd',
          group: 'ncd',
          consult_active: false,
          id: null
        }
      }
    }
  };

  itr = { name: 'Patient ITR', location: 'itr', group: '', consult_active: false, id: null };
  lab = { name: 'Laboratory', location: 'lab', group: '', consult_active: false, id: null };
  cn = { name: 'Consultation', location: 'cn', group: 'cn', consult_active: false, id: null };
  mc = { name: 'Maternal Care', location: 'mc', group: 'mc', consult_active: false, id: null };
  cc = { name: 'Child Care', location: 'cc', group: 'cc', consult_active: false, id: null };
  gbv = { name: 'GBV', location: 'gbv', group: 'gbv', consult_active: false, id: null };
  fp = { name: 'Family Planning', location: 'fp', group: 'fp', consult_active: false, id: null };
  show_new: boolean = false;
  is_loading: boolean = false;
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

  arr_allowed = ['MD','WCPD','MSWDO'];
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

  selectPrograms(){
    if(this.patient_info.gender == 'F' && (this.patient_age.type === 'year' && this.patient_age.age >= 9)) {
      this.list_modules.General.modules['mc'] = this.mc;
    }

    if((this.patient_age.type === 'year' && this.patient_age.age < 7) || this.patient_age.type !== 'year') {
      this.list_modules.General.modules['cc'] = this.cc;
    }

    if(this.patient_age.type === 'year' && this.patient_age.age >= 9) {
      this.list_modules.General.modules['fp'] = this.fp;
    }

    /* if(this.arr_allowed.indexOf(this.pos) > -1) {
      this.list_modules.Others.modules['gbv'] = this.gbv;
    } */
  }

  onModuleSelect(module){
    let loc = module.location;
    this.is_loading = true;

    if(loc==='gbv' || loc === 'itr' || loc === 'lab') {
      this.router.navigate(['/patient/'+loc, {id: this.patient_info.id}]);
      this.closeModal();
    } else {
      if('/patient/'+loc === this.router.url.split(';')[0]){
        if(module.consult_active === false) {
          this.show_new = true;
          this.selected_module = module;
          this.is_loading = false;
        } else {
          if(this.router.url.split('=')[2] != module.id) {
            this.router.navigate(['/patient/'+loc, {id: this.patient_info.id, consult_id: module.id}]);
          }
          this.closeModal();
        }
      } else {
        if(module.consult_active === false) {
          this.show_new = true;
        } else {
          this.show_new = false;
          this.router.navigate(['/patient/'+loc, {id: this.patient_info.id, consult_id: module.id}]);
          this.closeModal();
        }

        this.selected_module = module;
        this.is_loading = false;
      }
    }
  }

  onCreateCancel(){
    this.show_new = false;
  }

  onCreateNew(selected_module){
    this.is_loading = true;

    let user_id = this.http.getUserID();
    let new_visit = {
      patient_id: this.patient_info.id,
      user_id: user_id,
      consult_date: this.consult_date+' '+this.consult_time,
      consult_done: 0,
      pt_group: selected_module.group,
      authorization_transaction_code: this.is_atc_valid ? (!this.is_walk_in ? (this.pATC || this.pATC !== '' ? this.pATC : 'WALKEDIN') : 'WALKEDIN') : 'WALKEDIN',
      walkedin_status: this.is_atc_valid ? false : true
    };

    this.http.post('consultation/records', new_visit).subscribe({
      next: (data: any) => {
        this.toastr.success('Successfully created!','New visit')
        this.router.navigate(['/patient/'+selected_module.location, {id: this.patient_info.id, consult_id: data.data.id}]);
        this.closeModal()
      },
      error: (err) => console.log(err.error.message)
    });
  }

  closeModal(){
    this.is_loading = false;
    this.toggleModal.emit('module');
  }

  constructor(
    private router: Router,
    private http: HttpService,
    private toastr: ToastrService,
    private dateHelper: dateHelper
  ) { }

  checkOpenConsult(consults){
    Object.entries(consults).forEach(([keys, values]:any, indexes) => {
      // let vals: any= values;
      if(values.pt_group === 'cn') {
        if(this.user_fac === values.facility.code) {
          this.cn.consult_active = true;
          this.cn.id = values.id;
        }
      }

      Object.entries(this.list_modules).forEach(([key, value], index) => {
        Object.entries(value.modules).forEach(([k, v], i) => {
          if(values.pt_group === k) {
            this.list_modules[key].modules[k].consult_active = true;
            this.list_modules[key].modules[k].id = values.id;
          }
        });
      });
    });

    this.show_form = true;
  }

  pos: any;
  user_fac: string;
  ngOnInit(): void {
    this.user_fac = this.http.getUserFacility();
    let user = this.http.getUserFromJSON();
    this.pos = user.designation_code ? user.designation_code : user.designation.code;
    this.selectPrograms();

    this.http.get('consultation/records', {params:{consult_done: 0, patient_id: this.patient_info.id}}).subscribe({
      next: (data: any) => {
        // console.log(data.data)
        if(data.data.length > 0) this.checkOpenConsult(data.data);
        this.show_form = true;
      },
      error: err => console.log(err)
    });

    let current_date = new Date;
    this.consult_date =  this.dateHelper.dateFormat(current_date);
    this.consult_time = this.dateHelper.timeFormat(current_date);
  }

}
