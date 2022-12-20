import { Component, Input, OnInit } from '@angular/core';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

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
    this.modal[name] = !this.modal[name];
  }

  constructor() { }

  ngOnInit(): void {
    // this.toggleModal('ekas')
  }

}
