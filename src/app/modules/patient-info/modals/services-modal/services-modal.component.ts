import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCircleNotch, faPenToSquare, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-services-modal',
  standalone: false,
  templateUrl: './services-modal.component.html',
  styleUrl: './services-modal.component.scss'
})
export class ServicesModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_info

  faSpinner = faSpinner;
  faPenToSquare = faPenToSquare;
  faCircleNotch = faCircleNotch;

  service_list: any = [];

  services_list = [
    {id: 'IRON', desc: 'IRON SUPPLEMENT'}
  ];

  service: any = {
    id: null,
    patient_id: null,
    lib_service_id: null,
    service_date: null,
    quantity: null,
  }

  is_saving: boolean = false;

  editSurgical(data){
    this.service = {
      id: data.id,
      patient_id: data.patient_id,
      lib_service_id: data.lib_service.id,
      service_date: formatDate(data.service_date, 'yyyy-MM-dd', 'en'),
      quantity: data.quantity,
    };
  }

  loading_list: boolean = false;
  loadData(){
    this.loading_list = true;
    this.http.get('patient-services/service', {params: {patient_id: this.patient_info.id, per_page: 'all' }}).subscribe({
      next: (data: any) => {
        // console.log(data.data)
        this.service_list = data.data;
        this.loading_list = false;
      },
      error: err => console.log(err)
    })
  }

  onSubmit() {
    this.is_saving = true;

    this.service.patient_id = this.patient_info.id;
    let query;

    console.log(this.service)
    if(this.service.id) {
      query = this.http.update('patient-services/service/', this.service.id, this.service);
    } else {
      query = this.http.post('patient-services/service', this.service);
    }
    query.subscribe({
      next: (data: any) => {
        console.log(data)
        this.is_saving = false;
        this.toastr.success('Successfully recorded!','Services');
        this.resetField();
        this.loadData()
      },
      error: err => console.log(err)
    })
  }

  resetField(){
    this.service.id = null;
    this.service.lib_service_id = null;
    this.service.service_date = null;
    this.service.quantity = null;
  }

  closeModal(){
    this.toggleModal.emit({modal_name: 'services'});
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadData()
  }
}
