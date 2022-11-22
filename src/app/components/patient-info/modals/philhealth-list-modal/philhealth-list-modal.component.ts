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
  @Input() patient_info;

  faPenToSquare = faPenToSquare;

  editPhilhealth(){

  }

  loadPhilhealth(){
    this.http.get('patient-philhealth/philhealth', {params:{'filter[philhealth_id]': this.patient_info.id}}).subscribe({
      next: (data: any) => {
        console.log(data);
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
