import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.scss']
})
export class HistoryModalComponent implements OnInit, OnChanges {
  @Output() toggleModal = new EventEmitter<any>();
  @Output() loadData = new EventEmitter<any>();
  @Input() patient_info;
  @Input() past_medical;
  @Input() history_list;

  patient_history = {
    medical_history_id: [],
    remarks: []
  }

  onSubmit(){
    // console.log(this.patient_history);
    var hx_arr = [];

    Object.entries(this.patient_history.medical_history_id).forEach(([key, value], index) => {
      if(value === true){
        let hx = {
          category: 1,
          medical_history_id: key,
          remarks: this.patient_history.remarks[key] ? this.patient_history.remarks[key] : null,
        };
        console.log(hx)
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

  patchData(){
    if(this.past_medical) {
      Object.entries(this.past_medical).forEach(([key, value], index) => {
        let val: any = value;
        this.patient_history.medical_history_id[val.medical_history_id] = true;
        if(val.remarks) {
          this.patient_history.remarks[val.medical_history_id] = val.remarks;
        }
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

  ngOnChanges(change: SimpleChanges) : void {
    this.patchData()
  }

  ngOnInit(): void {
    // this.loadLibraries();
  }

}
