import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCircleCheck, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-for-validation',
  templateUrl: './for-validation.component.html',
  styleUrls: ['./for-validation.component.scss']
})
export class ForValidationComponent implements OnInit {
  @Output() showReturn = new EventEmitter<any>();
  @Output() addSaving = new EventEmitter<any>();
  @Input() konsulta_list;
  @Input() filter_tranche;

  faCircleCheck = faCircleCheck;
  faSpinner = faSpinner;
  faSave = faSave;

  saving_list: any = [];

  validating: boolean = false;
  is_saving: boolean = false;

  validate(kon, save){
    this.validating = true;
    let params = new HttpParams({
      fromObject: {
        'patient_id[]': [kon.patient.id],
        'tranche': this.filter_tranche,
        'revalidate': 0,
        'save': save
      }
    });

    this.http.get('konsulta/validate-report', {params}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.processReturn(data, save, kon)
      },
      error: err => console.log(err)
    })
  }

  processReturn(data, save, kon){
    console.log(data)
    if(data){
      if(data.errors) {
        this.toastr.error('Record error','Error')
        this.returnData(data, save)
      } else {
        if(data.message){
          this.returnData(data, save);
          kon['validated'] = true;
          this.toastr.success('Record validated/submitted', 'Success')
        }
      }
    } else {
      this.toastr.error('Validation failed','Error')
    }

    this.validating = false;
  }

  addToSaving(id){
    if(this.saving_list[id] === false) {
      delete this.saving_list[id]
    }

    this.addSaving.emit(this.saving_list)
  }

  returnData(data, save){
    this.showReturn.emit({data: data, save: save});
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

}
