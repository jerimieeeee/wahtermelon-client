import { Component, Input, OnInit } from '@angular/core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-cc',
  templateUrl: './cc.component.html',
  styleUrls: ['./cc.component.scss']
})
export class CcComponent implements OnInit {
  @Input() selected_visit;

  faCircleNotch = faCircleNotch;

  ccdev_record: any;
  ccdev_breastfed: any;
  ccdev_services: any;
  show_form: boolean = false;

  loadData(){
    this.fetchCc();
  }

  fetchCc(){
    this.http.get('child-care/cc-records/'+this.selected_visit.patient.id)
    .subscribe({
      next: (data: any) => {
        this.ccdev_record = data.data; console.log(data.data)

        this.fetchBreastfed();
      },
      error: err => console.log(err)
    });
  }

  fetchBreastfed(){
    this.http.get('child-care/cc-breastfed/'+this.selected_visit.patient.id)
    .subscribe({
      next: (data: any) => {
        this.ccdev_breastfed = data.data; console.log(data.data);
        this.fetchServices();
      },
      error: err => console.log(err)
    });
  }

  fetchServices(){
    this.http.get('child-care/cc-services', {params:{patient_id: this.selected_visit.patient.id, sort:'service_id'}}).subscribe({
      next: (data: any) => {
        this.ccdev_services = data.data; console.log(data.data);
        this.show_form = true;
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    if(this.selected_visit) this.loadData();
  }
}
