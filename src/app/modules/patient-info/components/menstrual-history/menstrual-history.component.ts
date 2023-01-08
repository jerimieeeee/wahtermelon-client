import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChevronDown, faChevronUp, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-menstrual-history',
  templateUrl: './menstrual-history.component.html',
  styleUrls: ['./menstrual-history.component.scss']
})
export class MenstrualHistoryComponent {
  @Output() toggleAccordion = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() setMenstrual = new EventEmitter<any>();
  @Input() accordions;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faPlusCircle = faPlusCircle;

  menstrual_history: any;

  loadData(patient_id){
    this.http.get('patient-menstrual-history/history', {params:{patient_id: patient_id}}).subscribe({
      next: (data: any) => {
        // console.log(data)
        this.setMenstrual.emit(data.data);
        this.menstrual_history = data.data[0];
      },
      error: err => console.log(err)
    });
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
