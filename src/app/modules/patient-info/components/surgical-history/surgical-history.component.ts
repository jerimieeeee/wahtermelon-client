import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChevronDown, faChevronUp, faPlusCircle, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-surgical-history',
  templateUrl: './surgical-history.component.html',
  styleUrls: ['./surgical-history.component.scss']
})
export class SurgicalHistoryComponent {
  @Output() toggleAccordion = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() setSurgicalHistory = new EventEmitter<any>();
  @Input() accordions;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faPlusCircle = faPlusCircle;
  faTrashCan = faTrashCan;

  history: [];

  loadData(patient_id){
    this.http.get('patient-surgical-history/history', {params:{patient_id: patient_id, category: '1'}}).subscribe({
      next: (data: any) => {
        // console.log(data)
        this.setSurgicalHistory.emit(data.data);
        this.history = data.data;
      },
      error: err => console.log(err)
    });
  }

  toggle(name) {
    this.toggleAccordion.emit(name);
  }

  modalToggle(name, data?) {
    this.toggleModal.emit({modal_name: name, data: data});
  }

  constructor(
    private http: HttpService
  ) { }

}
