import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faSearch,faBalanceScale,faPlus,faInfoCircle,faTimes,faSave,faChevronCircleDown,faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { answer_screening, answer_yn, answer_yna } from '../../data-lib/answers';
import { circumcision } from '../../data-lib/libraries';
import { casdtForm } from './form';

@Component({
  selector: 'app-casdt',
  templateUrl: './casdt.component.html',
  styleUrls: ['./casdt.component.scss']
})
export class CasdtComponent implements OnInit {

  faInfoCircle = faInfoCircle;
  faTimes = faTimes;
  faSave = faSave;
  faChevronCircleDown = faChevronCircleDown;
  faChevronCircleUp = faChevronCircleUp;
  modals: any = [];

  casdtForm = casdtForm;

  size = [
    {code: 'small', desc: 'Small'},
    {code: 'normal', desc: 'Normal'},
    {code: 'large', desc: 'Large'}
  ];

  shape = [
    {code: 'pear', desc: 'Pear Shaped'},
    {code: 'horn', desc: 'Horn Shaped'},
    {code: 'heart', desc: 'Heart Shaped'},
    {code: 'double', desc: 'Double'},
    {code: 'tshaped', desc: 'T-Shaped'},
    {code: 'tipped', desc: 'Tipped'}
  ];

  position = [
    {code: 'mid', desc: 'Mid'},
    {code: 'anteflexed', desc: 'Anteflexed'},
    {code: 'retroflexed', desc: 'Retroflexed'},
    {code: 'retroverted', desc: 'Retroverted'},
    {code: 'anteverted', desc: 'Anteverted'}
  ];

  circumcision = circumcision;
  answer_yn = answer_yn;
  answer_yna = answer_yna;
  answer_screening = answer_screening

  toggleModal(modal_name) {

    this.modals[modal_name] = this.modals[modal_name] !== undefined ? !this.modals[modal_name] : false;
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    console.log(this.casdtForm)
  }

}
