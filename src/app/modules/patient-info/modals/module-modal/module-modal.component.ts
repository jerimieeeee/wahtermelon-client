import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faClipboard, faCircleInfo, faHouse, faUserDoctor, faFlask, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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

  faClipboard = faClipboard;
  faCircleInfo = faCircleInfo;
  faHouse = faHouse;
  faUserDoctor = faUserDoctor;
  faFlask = faFlask;
  faCheck = faCheck;
  faSpinner = faSpinner;

  list_modules = {
    'General': {
      modules: {
       /*  itr:{
          name: 'Patient ITR',
          location: 'itr',
          group: '',
          consult_active: false
        }, */
        /* cn: {
          name: 'Consultation',
          location: 'consultation',
          group: 'cn',
          consult_active: false
        }, */
        /* cc: {
          name: 'Child Care',
          location: 'cc',
          group: 'cc',
          consult_active: false
        },
        mc: {
          name: 'Maternal Care',
          location: 'mc',
          group: 'mc',
          consult_active: false
        }, */

        /* fp: {
          name: 'Family Planning',
          location: 'fp',
          group: 'fp',
          consult_active: false
        },
        dn: {
          name: 'Dental',
          location: 'dental',
          group: 'dn',
          consult_active: false
        }, */
      }
    },
    'Others': {
      modules: {
        /* cn: {
          name: 'Laboratory',
          location: 'consultation',
          group: '',
          consult_active: false
        },
        ab: {
          name: 'Animal Bite',
          location: 'consultation',
          group: '',
          consult_active: false
        },
        tb: {
          name: 'Tuberculosis',
          location: 'consultation',
          group: '',
          consult_active: false
        }, */
        ncd: {
          name: 'NCD',
          location: 'ncd',
          group: 'ncd',
          consult_active: false
        },
      }
    }
  };

  itr = { name: 'Patient ITR', location: 'itr', group: '', consult_active: false };
  lab = { name: 'Laboratory', location: 'lab', group: '', consult_active: false };
  cn = { name: 'Consultation', location: 'cn', group: 'cn', consult_active: false};
  mc = { name: 'Maternal Care', location: 'mc', group: 'mc', consult_active: false };
  cc = { name: 'Child Care', location: 'cc', group: 'cc', consult_active: false };

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

  isATCValid(){
    this.is_checking_atc = true;
    let params = {
      pPIN: this.philhealth_details.philhealth_id,
      pATC: this.pATC,
      pEffectivityDate: formatDate(this.pATC_date, 'MM/dd/yyyy', 'en')
    }
    this.http.get('konsulta/check-atc', {params}).subscribe({
      next: (data: any) => {
        console.log(data)
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
  }

  onModuleSelect(module){
    let loc = module.location;
    let group = module.group;
    this.is_loading = true;

    // console.log(loc, this.router.url.split(';')[0])
    if('/patient/'+loc === this.router.url.split(';')[0]){
      // console.log(1)
      this.closeModal();
    } else {
      if(loc === 'itr' || loc === 'lab'){
        this.router.navigate(['/patient/'+loc, {id: this.patient_info.id}]);
        this.closeModal();
      } else {
        this.http.get('consultation/records', {params:{'pt_group': group, 'consult_done': 0, patient_id: this.patient_info.id}}).subscribe({
          next: (data: any) => {
            this.selected_module = module;

            if(data.data.length > 0){
              this.router.navigate(['/patient/'+loc, {id: this.patient_info.id, consult_id: data.data[0].id}])
              this.closeModal();
            }else{
              // console.log(this.selected_module);
              this.show_new = true;
            }
          },
          error: err => {console.log(err);this.is_loading = false},
          complete: () => this.is_loading = false
        });
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
      consult_date: this.consult_date+' '+this.consult_time+':00',
      consult_done: 0,
      pt_group: selected_module.group,
      authorization_transaction_code: this.is_atc_valid ? (!this.is_walk_in ? (this.pATC || this.pATC !== '' ? this.pATC : 'WALKEDIN') : 'WALKEDIN') : 'WALKEDIN',
      walkedin_status: this.is_atc_valid ? false : true
    };

    this.http.post('consultation/records', new_visit).subscribe({
      next: (data: any) => {
        console.log(data)
        this.toastr.success('Successfully recorded!','New visit')
        this.router.navigate(['/patient/'+selected_module.location, {id: this.patient_info.id, consult_id: data.data.id}]);
        this.closeModal()
      },
      error: (err) => {
        console.log(err.error.message);
        this.toastr.error(err.error.message, 'Error', {
          closeButton: true,
          positionClass: 'toast-top-center',
          disableTimeOut: true
        })
      }
    });
  }

  closeModal(){
    this.is_loading = false;
    this.toggleModal.emit('module');
  }

  constructor(
    private router: Router,
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  checkOpenConsult(consults){
    Object.entries(consults).forEach(([keys, values], indexes) => {
      let vals: any= values;
      if(vals.pt_group === 'cn') this.cn.consult_active = true;

      Object.entries(this.list_modules).forEach(([key, value], index) => {
        Object.entries(value.modules).forEach(([k, v], i) => {
          if(vals.pt_group === k) {
            this.list_modules[key].modules[k].consult_active = true;
          }
        });
      });
    });

    this.show_form = true;
  }

  ngOnInit(): void {
    this.selectPrograms();

    this.http.get('consultation/records', {params:{consult_done: 0, patient_id: this.patient_info.id}}).subscribe({
      next: (data: any) => {
        // console.log(data.data)
        if(data.data.length > 0) this.checkOpenConsult(data.data);
        this.show_form = true;
      },
      error: err => console.log(err)
    });

    let current_date =  new Date;

    this.date = current_date.toISOString().slice(0,10);
    this.consult_date = formatDate(current_date,'yyyy-MM-dd','en');
    this.consult_time = formatDate(current_date,'HH:mm','en');

    console.log(this.philhealth_details)
  }

}
