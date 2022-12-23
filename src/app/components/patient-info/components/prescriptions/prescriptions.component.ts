import { Component, OnChanges, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnChanges {
  @Output() toggleAccordion = new EventEmitter<any>();
  @Output() navigateTo = new EventEmitter<any>();
  @Input() accordions;
  @Input() consult_id;
  @Input() patient_info;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  prescriptions: any;

  toggle(name) {
    this.toggleAccordion.emit(name);
  }

  navigate(location) {
    this.navigateTo.emit(location);
  }

  libraries = {
    konsulta_medicine_code: {var_name: 'medicine_desc',     location: 'konsulta-medicines',   value: ''}
  }

  identify(index, item) {
    // console.log(item)
    return item.id
  }

  getValues(){
    Object.entries(this.prescriptions).forEach(([key, value], index) => {
      let values: any = value;

      if(values.konsulta_medicine_code){
        this.http.get('libraries/konsulta-medicines/'+values.konsulta_medicine_code).subscribe({
          next: (data: any) => {
            this.prescriptions[key]['medicine_desc'] = data.data.desc
          },
          error: err => console.log(err)
        })
      }
    });
    // console.log(this.prescriptions);
  }

  loadPrescriptions(){
    if(this.patient_info){
      let params = {patient_id: this.patient_info.id};

      this.http.get('medicine/prescriptions', {params}).subscribe({
        next: (data: any) => {
          this.prescriptions = data.data;
          this.getValues();
        },
        error: err => console.log(err)
      });
    }
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadPrescriptions();
  }

}
