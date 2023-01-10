import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCircleCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-validated-list',
  templateUrl: './validated-list.component.html',
  styleUrls: ['./validated-list.component.scss']
})
export class ValidatedListComponent implements OnInit {
  @Output() showReturn = new EventEmitter<any>();
  @Input() konsulta_list;
  @Input() filter_tranche;

  faSpinner = faSpinner;
  faCircleCheck = faCircleCheck;

  validating: boolean = false;

  validate(kon){
    this.submitting = true;
    this.validating = true;

    let params = {
      tranche: [this.filter_tranche],
      revalidate: 1,
      transmittal_number: [kon.transmittal_number]
    }
    console.log(params)
    this.http.get('konsulta/validate-report', {params}).subscribe({
      next: (data: any) => {
        this.processReturn(data)
      },
      error: err => console.log(err)
    })
  }

  submitting: boolean = false;
  submit(transmittal_number){
    this.validating = true;
    this.submitting = true;
    let params = {
      transmittal_number: transmittal_number
    }

    this.http.get('konsulta/submit-xml', {params}).subscribe({
      next: (data: any) => {
        this.processReturn(data)
      },
      error: err => console.log(err)
    })
  }

  processReturn(data){
    if(data.errors) {
      this.toastr.error('Record error','Error')
      this.returnData(data)
    } else {

      this.toastr.success('Record validated/submitted', 'Success')
    }

    this.submitting = false;
    this.validating = false;
    console.log(data);
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
