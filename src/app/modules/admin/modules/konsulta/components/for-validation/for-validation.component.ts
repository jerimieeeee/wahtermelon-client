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
        if(data.errors) {
          this.toastr.error('Validation failed','Error')
          kon['validated'] = true;
          this.returnData(data, save)
        } else {
          if(data.message){
            this.returnData(data, save)
            kon['validated'] = true;
            this.toastr.success('Success!', 'Record Validation')
          }

        }
        this.validating = false;
      },
      error: err => console.log(err)
    })
  }

  addToSaving(id){
    console.log(id)
    console.log(this.saving_list)

    if(this.saving_list[id] === false) {
      delete this.saving_list[id]
    }

    this.addSaving.emit(this.saving_list)
    // let index = this.
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
