import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-set-date',
  templateUrl: './set-date.component.html',
  styleUrls: ['./set-date.component.scss']
})
export class SetDateComponent implements OnInit {
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
      pStartDate: formatDate(this.pStartDate,'MM/dd/yyyy','en'),
      pEndDate: formatDate(this.pEndDate,'MM/dd/yyyy','en')
    }
    /* let params = {
      pStartDate: "01/01/2022",
      pEndDate: "12/31/2022"
    } */

    this.http.get('konsulta/registration-list', {params}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.loadList.emit();
        this.is_loading = false;
        this.closeModal()
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

}
