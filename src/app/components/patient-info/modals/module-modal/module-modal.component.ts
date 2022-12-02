import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faClipboard, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-module-modal',
  templateUrl: './module-modal.component.html',
  styleUrls: ['./module-modal.component.scss']
})
export class ModuleModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_info;

  faClipboard = faClipboard;
  faCircleInfo = faCircleInfo;

  list_modules = [
    {
      group: 'General',
      modules: {
        itr:{
          name: 'Patient ITR',
          location: 'itr',
          group: '',
          consult_active: false
        },
        /* cn: {
          name: 'Consultation',
          location: 'consultation',
          group: 'cn',
          consult_active: false
        }, */
        cc: {
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
        },

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
    /* {
      group: 'Others',
      modules: {
        cn: {
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
        },
        ncd: {
          name: 'NCD',
          location: 'consultation',
          group: '',
          consult_active: false
        },
      }
    } */
  ]

  show_new: boolean = false;
  selected_module: string = '';
  consult_date;
  consult_time;
  date;

  onModuleSelect(module){
    let loc = module.location;
    let group = module.group;

    if('/'+loc === this.router.url.split(';')[0]){
      this.closeModal();
    } else {
      if(loc === 'itr'){
        this.router.navigate(['/'+loc, {id: this.patient_info.id}]);
      } else {
        this.http.get('consultation/cn-records', {params:{'pt_group': group, 'consult_done': 0, patient_id: this.patient_info.id}}).subscribe({
          next: (data: any) => {
            this.selected_module = module;
            if(data.data.length > 0){
              this.router.navigate(['/'+loc, {id: this.patient_info.id, consult_id: data.data.id}])
            }else{
              console.log(this.selected_module);
              this.show_new = true;
            }
          },
          error: err => console.log(err),
          complete: () => console.log('loaded visits')
        });
      }
    }
  }

  onCreateCancel(){
    this.show_new = false;
  }

  onCreateNew(selected_module){
    let user_id = this.http.getUserID();
    let new_visit = {
      patient_id: this.patient_info.id,
      user_id: user_id,
      consult_date: this.consult_date+' '+this.consult_time+':00',
      consult_done: 0,
      pt_group: selected_module.group
    };

    this.http.post('consultation/cn-records', new_visit).subscribe({
      next: (data: any) => {
        this.router.navigate(['/'+selected_module.location, {id: this.patient_info.id}]);
      },
      error: (err) => console.log(err),
      complete: () => console.log('new visit saved')
    });
  }

  closeModal(){
    this.toggleModal.emit('vaccine-moodal');
  }

  constructor(
    private router: Router,
    private http: HttpService
  ) { }

  checkOpenConsult(consults){
    Object.entries(consults).forEach(([keys, values], indexes) => {
      let vals: any= values;
      Object.entries(this.list_modules).forEach(([key, value], index) => {
        Object.entries(value.modules).forEach(([k, v], i) => {
          if(vals.pt_group === k) {
            this.list_modules[key].modules[k].consult_active = true;
          }
        });
      });
    });
  }

  ngOnInit(): void {
    this.http.get('consultation/cn-records', {params:{consult_done: 0, patient_id: this.patient_info.id}}).subscribe({
      next: (data: any) => {
        if(data.data.length > 0) this.checkOpenConsult(data.data);
      },
      error: err => {
        /* if(err.message = "No query results for model*"){

        } */
        console.log(err)
      },
      complete: () => console.log('loaded visits')
    })

    let current_date =  new Date;

    this.date = current_date.toISOString().slice(0,10);
    this.consult_date = formatDate(current_date,'Y-M-dd','en');
    this.consult_time = formatDate(current_date,'HH:mm','en');
  }

}
