import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.scss']
})
export class HistoryModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Output() loadData = new EventEmitter<any>();
  @Input() patient_info;
  history_list: []

  patient_history = {
    medical_history_id: [],
    remarks: []
  }

  loadLibraries() {
    this.http.get('libraries/medical-history').subscribe({
      next: (data: any) => this.history_list = data.data,
      error: err => console.log(err)
    })
  }

  onSubmit(){
    console.log(this.patient_history);

    var hx_arr = [];

    Object.entries(this.patient_history.medical_history_id).forEach(([key, value], index) => {
      if(value === true){
        let hx = {
          category: 1,
          medical_history_id: key,
          remarks: this.patient_history.remarks[key] ? this.patient_history.remarks[key] : null,
        };

        hx_arr.push(hx);
      }
    })

    if(hx_arr.length > 0){
      var hx_form = {
        patient_id: this.patient_info.id,
        medical_history: hx_arr
      }

      this.http.post('patient-history/history', hx_form).subscribe({
        next: () => {
          this.toastr.success('Successfully recorded!','Past Medical History')
          this.loadData.emit('past_medical');
          this.closeModal();
        },
        error: err => console.log(err),
        complete: () => console.log('success')
      })
    }
  }

  closeModal(){
    this.toggleModal.emit('history')
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
  }

}
