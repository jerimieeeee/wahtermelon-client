
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.scss']
})
export class LaboratoryComponent implements OnInit {
  @Output() toggleAccordion = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() navigateTo = new EventEmitter<any>();
  @Output() setLabList = new EventEmitter<any>();
  @Input() accordions;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  lab_request: boolean = false;
  lab_list: any;

  loadData(patient_id) {
    let params = {
      patient_id: patient_id,
      sort: '-request_date'
    }
    this.http.get('laboratory/consult-laboratories', {params}).subscribe({
      next: (data: any) => {
        console.log(data)
        this.lab_list = data.data;
        this.setLabList.emit(this.lab_list);

      },
      error: err => console.log(err)
    })
  }

  navigate(loc) {
    this.navigateTo.emit(loc)
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

  ngOnInit(): void {
  }

}
