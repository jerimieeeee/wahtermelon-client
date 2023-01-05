import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fam-history-modal',
  templateUrl: './fam-history-modal.component.html',
  styleUrls: ['./fam-history-modal.component.scss']
})
export class FamHistoryModalComponent implements OnInit, OnChanges {
  @Output() toggleModal = new EventEmitter<any>();
  @Output() loadData = new EventEmitter<any>();
  @Input() patient_info;
  @Input() family_medical;
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
          category: 2,
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
          this.toastr.success('Successfully recorded!','Family Medical History')
          this.loadData.emit('family_medical');
          this.closeModal();
        },
        error: err => console.log(err),
        complete: () => console.log('success')
      })
    }
  }

  patchData(){
    if(this.family_medical) {
      console.log(this.family_medical);
      Object.entries(this.family_medical).forEach(([key, value], index) => {
        let val: any = value;
        this.patient_history.medical_history_id[val.medical_history_id] = true;
        if(val.remarks) {
          this.patient_history.remarks[val.medical_history_id] = val.remarks;
        }
      })
    }
  }

  ngOnChanges(change: SimpleChanges) : void {
    this.patchData()
  }

  closeModal(){
    this.toggleModal.emit('fam-history')
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
