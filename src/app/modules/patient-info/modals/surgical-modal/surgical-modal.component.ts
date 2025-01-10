import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPenToSquare, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-surgical-modal',
    templateUrl: './surgical-modal.component.html',
    styleUrls: ['./surgical-modal.component.scss'],
    standalone: false
})
export class SurgicalModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_info

  faSpinner = faSpinner;
  faPenToSquare = faPenToSquare;

  surgical_list: any = [];

  surgical_form: any = {
    patient_id: null,
    operation: null,
    operation_date: null
  }

  is_saving: boolean = false;

  editSurgical(data){
    this.surgical_form = data;
  }

  loadData(){
    this.http.get('patient-surgical-history/history', {params: {patient_id: this.patient_info.id }}).subscribe({
      next: (data: any) => {
        console.log(data.data)
        this.surgical_list = data.data;
      },
      error: err => console.log(err)
    })
  }

  onSubmit() {
    this.is_saving = true;

    this.surgical_form.patient_id = this.patient_info.id;
    let query;

    console.log(this.surgical_form)
    if(this.surgical_form.id) {
      query = this.http.update('patient-surgical-history/history/', this.surgical_form.id, this.surgical_form);
    } else {
      query = this.http.post('patient-surgical-history/history', this.surgical_form);
    }
    query.subscribe({
      next: (data: any) => {
        console.log(data)
        this.is_saving = false;
        this.toastr.success('Successfully recorded!','Operation History');
        this.resetField();
        this.loadData()
      },
      error: err => console.log(err)
    })
  }

  resetField(){
    this.surgical_form.operation = null;
    this.surgical_form.operation_date = null;
  }

  closeModal(){
    this.toggleModal.emit({modal_name: 'surgical-history'});
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

}
