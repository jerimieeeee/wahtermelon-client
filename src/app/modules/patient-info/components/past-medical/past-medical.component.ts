import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChevronDown, faChevronUp, faMinus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
    selector: 'app-past-medical',
    templateUrl: './past-medical.component.html',
    styleUrls: ['./past-medical.component.scss'],
    standalone: false
})
export class PastMedicalComponent {
  @Output() toggleAccordion = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() setPastMedical = new EventEmitter<any>();
  @Input() accordions;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faPlusCircle = faPlusCircle;
  faMinus = faMinus;

  history: [];

  loadData(patient_id){
    this.http.get('patient-history/history', {params:{patient_id: patient_id, category: '1'}}).subscribe({
      next: (data: any) => {
        // console.log(data)
        this.setPastMedical.emit(data.data);
        this.history = data.data;
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
