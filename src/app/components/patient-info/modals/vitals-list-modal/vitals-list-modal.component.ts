import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-vitals-list-modal',
  templateUrl: './vitals-list-modal.component.html',
  styleUrls: ['./vitals-list-modal.component.scss']
})
export class VitalsListModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Output() vitalsEdit = new EventEmitter<any>();
  @Input() patient_info;

  faPenToSquare = faPenToSquare;

  vitals_list: any;

  constructor(
    private http: HttpService
  ) { }

  editVitals(vitals){
    console.log(vitals)
    this.vitalsEdit.emit(vitals);
    this.closeModal();
  }

  onSubmit(){

  }

  loadVaccines(){
    this.http.get('patient-vitals/vitals', {params:{'patient_id': this.patient_info.id, 'sort': '-vitals_date'}}).subscribe({
      next: (data: any) => { console.log(data.data); this.vitals_list = data.data },
      error: err => console.log(err),
      complete: () => console.log('Vitals signs loaded')
    })
  }

  closeModal(){
    this.toggleModal.emit('vaccine-moodal');
  }

  ngOnInit(): void {
    this.loadVaccines();
  }
}
