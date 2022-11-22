import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-philhealth-list-modal',
  templateUrl: './philhealth-list-modal.component.html',
  styleUrls: ['./philhealth-list-modal.component.scss']
})
export class PhilhealthListModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Output() philhealthEdit = new EventEmitter<any>();
  @Input() patient_info;

  faPenToSquare = faPenToSquare;

  philhealth_infos: [];

  editPhilhealth(philhealth){
    // console.log(philhealth)
    this.philhealthEdit.emit(philhealth);
    this.closeModal();
  }

  loadPhilhealth(){
    this.http.get('patient-philhealth/philhealth', {params:{'filter[patient_id]': this.patient_info.id,  per_page: 'all', sort: '-enlistment_date', include: 'membershipType,membershipCategory'}}).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.philhealth_infos = data.data
      },
      error: err => console.log(err)
    })
  }

  closeModal(){
    this.toggleModal.emit('philhealth-list-modal');
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.loadPhilhealth();
  }
}
