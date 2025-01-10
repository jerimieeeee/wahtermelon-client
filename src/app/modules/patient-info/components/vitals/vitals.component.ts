import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faChevronDown, faChevronUp, faPlusCircle, faTableList } from '@fortawesome/free-solid-svg-icons';
import { dateHelper } from 'app/shared/services/date-helper.service';
import { HttpService } from 'app/shared/services/http.service';
import { VitalsChartsService } from 'app/shared/services/vitals-charts.service';

@Component({
    selector: 'app-vitals',
    templateUrl: './vitals.component.html',
    styleUrls: ['./vitals.component.scss'],
    standalone: false
})
export class VitalsComponent implements OnInit {
  @Output() toggleAccordion = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() setVitals = new EventEmitter<any>();
  @Input() accordions;

  faPlusCircle = faPlusCircle;
  faTableList = faTableList;
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  latest_vitals: any;
  show_vitals: boolean = false;
  vitals_color: string;

  loadData(patient_id){
    // console.log(patient_id)
    this.http.get('patient-vitals/vitals', {params:{patient_id: patient_id, sort: '-vitals_date', per_page: 15}}).subscribe({
      next: (data: any) => {
        // console.log(data.data)
        let vitals = data.data;

        if(vitals.length > 0) {
          let orig_systolic = data.data[0].bp_systolic;
          let orig_diastolic = data.data[0].bp_diastolic;

          this.latest_vitals = this.vitalsCharts.getLatestToday(vitals);
          console.log(this.latest_vitals)
          vitals[0]['bp_systolic'] = orig_systolic;
          vitals[0]['bp_diastolic'] = orig_diastolic;
          this.show_vitals = true;
          this.setVitals.emit(vitals);
        } else {
          this.show_vitals = true;
          this.latest_vitals = null;
        }
      },
      error: err => {
        this.show_vitals = true;
        console.log(err)
      },
    })
  }

  getLatestToday(vitals){
    if(vitals.length > 0) {
      this.latest_vitals = this.vitalsCharts.getLatestToday(vitals)
    } else {
      this.latest_vitals = null;
    }
  }

  toggle(name) {
    this.toggleAccordion.emit(name);
  }

  modalToggle(name) {
    this.toggleModal.emit(name);
  }

  constructor(
    private http: HttpService,
    private vitalsCharts: VitalsChartsService,
    private dateHelper: dateHelper
  ) { }

  ngOnInit(): void {
  }

}
