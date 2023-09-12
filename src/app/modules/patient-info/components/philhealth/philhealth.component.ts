import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPlusCircle, faTableList } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-philhealth',
  templateUrl: './philhealth.component.html',
  styleUrls: ['./philhealth.component.scss']
})
export class PhilhealthComponent {
  @Output() toggleAccordion = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() setDetails = new EventEmitter<any>();
  @Input() accordions;

  faPlusCircle = faPlusCircle;
  faTableList = faTableList;

  philhealth_info: any;
  show_philhealth: boolean = false;

  loadData(patient_id){
    this.http.get('patient-philhealth/philhealth', {params:{'filter[patient_id]': patient_id,  per_page: '1', sort: '-enlistment_date'}}).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.philhealth_info = data.data[0];
        this.http.setPhilhealhtInfo(this.philhealth_info);
        this.setDetails.emit({var_name: 'philhealth_details', data: data.data[0]});
        this.show_philhealth = true;
      },
      error: err => console.log(err)
    })
  }

  get philhealthColor(){
    if(this.philhealth_info){
      return (formatDate(this.philhealth_info.enlistment_date, 'yyyy', 'en', 'Asia/Manila') < formatDate(new Date(), 'yyyy', 'en', 'Asia/Manila'))
    } else {
      return false;
    }
  }

  toggle(name) {
    this.toggleAccordion.emit(name);
  }

  modalToggle(name) {
    this.toggleModal.emit(name);
  }

  constructor(
    private http: HttpService
  ) { }
}
