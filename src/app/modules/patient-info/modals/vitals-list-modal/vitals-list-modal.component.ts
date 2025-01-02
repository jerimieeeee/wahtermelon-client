import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { VitalsChartsService } from 'app/shared/services/vitals-charts.service';

@Component({
  selector: 'app-vitals-list-modal',
  templateUrl: './vitals-list-modal.component.html',
  styleUrls: ['./vitals-list-modal.component.scss']
})
export class VitalsListModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Output() vitalsEdit = new EventEmitter<any>();
  @Input() patient_info;
  @Input() user_facility;

  faPenToSquare = faPenToSquare;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;

  vitals_list: any;

  constructor(
    private http: HttpService,
    private vitalsCharts: VitalsChartsService
  ) { }

  editVitals(vitals){
    // console.log(vitals)
    this.vitalsEdit.emit(vitals);
    this.closeModal();
  }

  bp_color: string = 'text-gray-800';

  getBPColor(vitals) {
    return this.vitalsCharts.getChartColor(vitals);
  }

  getOxygenColor(vitals) {
    return this.vitalsCharts.getBloodOxygenColor(vitals);
  }

  getTempColor(vitals) {
    return this.vitalsCharts.getTempColor(vitals);
  }

  onSubmit(){

  }

  per_page: number = 5;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  loadVitals(page?: string){
    let params = {params: { }};
    if (page) params['params']['page'] = page;
    params['params']['per_page'] = this.per_page;
    params['params']['patient_id'] = this.patient_info.id;
    params['params']['sort'] = '-vitals_date';

    this.http.get('patient-vitals/vitals', params).subscribe({
      next: (data: any) => {
        this.vitals_list = data.data

        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
      },
      error: err => console.log(err),
      complete: () => console.log('Vitals signs loaded')
    })
  }

  closeModal(){
    this.toggleModal.emit('vaccine-moodal');
  }

  ngOnInit(): void {
    this.loadVitals();
  }
}
