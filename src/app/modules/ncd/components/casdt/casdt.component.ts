import { Component, OnInit } from '@angular/core';
import { faInfoCircle,faTimes,faSave,faChevronCircleDown,faChevronCircleUp, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { answer_screening, answer_yn } from '../../data-lib/answers';
import { circumcision } from '../../data-lib/libraries';
import { casdtForm } from './form';

@Component({
  selector: 'app-casdt',
  templateUrl: './casdt.component.html',
  styleUrls: ['./casdt.component.scss']
})
export class CasdtComponent implements OnInit {
  faSpinner = faSpinner;
  faInfoCircle = faInfoCircle;
  faTimes = faTimes;
  faSave = faSave;
  faChevronCircleDown = faChevronCircleDown;
  faChevronCircleUp = faChevronCircleUp;
  modals: any = [];

  casdtForm = casdtForm;

  is_saving: boolean =false;

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
  answer_yna: [];
  answer_screening = answer_screening

  loadLibraries(){

  }

  onSubmit(){
    this.is_saving = true;
  }

  toggleModal(modal_name) {
    this.modals[modal_name] = this.modals[modal_name] !== undefined ? !this.modals[modal_name] : false;
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    console.log(this.casdtForm);
    this.loadLibraries;
  }

}
