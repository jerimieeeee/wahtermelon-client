import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vaccine-info',
  templateUrl: './vaccine-info.component.html',
  styleUrls: ['./vaccine-info.component.scss']
})
export class VaccineInfoComponent implements OnInit {

  faPlus = faPlus;

  showVaccineModal = false;
  toggleVaccineModal(){
    this.showVaccineModal = !this.showVaccineModal;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
