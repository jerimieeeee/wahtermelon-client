import { formatDate } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-set-date',
  templateUrl: './set-date.component.html',
  styleUrls: ['./set-date.component.scss']
})
export class SetDateComponent {
  @Output() toggleModal = new EventEmitter<any>();
  @Output() loadList = new EventEmitter<any>();

  pStartDate: string;
  pEndDate: string;

  is_loading: boolean = false;
  faSpinner = faSpinner;

  closeModal(){
    this.toggleModal.emit('set_date');
  }

  onSubmit(){
    this.is_loading = true;

    let params = {
      pStartDate: formatDate(this.pStartDate,'MM/dd/yyyy','en', 'Asia/Manila'),
      pEndDate: formatDate(this.pEndDate,'MM/dd/yyyy','en', 'Asia/Manila')
    }

    this.http.get('konsulta/registration-list', {params}).subscribe({
      next: (data: any) => {
        this.loadList.emit();
        this.is_loading = false;
        this.toastr.success('Total Assignment Count: '+ data.pAssignmentTotalCnt, 'Masterlist');
        this.closeModal()
      },
      error: err => {
        this.is_loading = false;
        this.toastr.error(err.error.message, 'Masterlist', {
          closeButton: true,
          positionClass: 'toast-top-center',
          disableTimeOut: true
        });
      }
    })
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }
}
