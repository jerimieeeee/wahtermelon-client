import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCircleCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-for-validation',
  templateUrl: './for-validation.component.html',
  styleUrls: ['./for-validation.component.scss']
})
export class ForValidationComponent implements OnInit {
  @Output() showReturn = new EventEmitter<any>();
  @Input() konsulta_list;
  @Input() filter_tranche;

  faCircleCheck = faCircleCheck;
  faSpinner = faSpinner;

  validating: boolean = false;

  validate(kon){
    this.validating = true;
    let params = new HttpParams({
      fromObject: {
        'patient_id[]': [kon.patient.id],
        'tranche': this.filter_tranche,
        'revalidate': 0
      }
    });

    console.log(params)
    this.http.get('konsulta/validate-report', {params}).subscribe({
      next: (data: any) => {
        console.log(data);
        if(data.errors) {
          this.toastr.error('Validation failed','Error')
          this.returnData(data)
        } else {
          this.toastr.success('Success!', 'Record Validation')
        }
        this.validating = false;
      },
      error: err => console.log(err)
    })
  }

  returnData(data){
    this.showReturn.emit(data);
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

}
