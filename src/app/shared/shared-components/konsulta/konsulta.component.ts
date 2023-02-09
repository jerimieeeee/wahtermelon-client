import { Component, Input, OnInit } from '@angular/core';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-konsulta',
  templateUrl: './konsulta.component.html',
  styleUrls: ['./konsulta.component.scss']
})
export class KonsultaComponent implements OnInit {
  @Input() consult_details;

  faPrint = faPrint;
  pending_list: any = [];
  modal: any = [];

  toggleModal(name?){
    console.log(name)
    this.modal[name] = !this.modal[name];
  }

  loadDetails(){

  }

  constructor(
    private http: HttpService
  ) { }

  active_loc_id: any;
  patient_id: any;
  consult_id: any;

  ngOnInit(): void {
    // this.toggleModal('ekas')
    this.active_loc_id = this.http.getUrlParams;
    this.patient_id = this.active_loc_id.patient_id;
    this.consult_id = this.active_loc_id.consult_id;
    this.loadDetails();

  }

}
