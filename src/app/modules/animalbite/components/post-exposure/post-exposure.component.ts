import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-exposure',
  templateUrl: './post-exposure.component.html',
  styleUrls: ['./post-exposure.component.scss']
})
export class PostExposureComponent implements OnInit {

  faInfoCircle = faInfoCircle;
  faPlus = faPlus
  faCalendarDay = faCalendarDay

  patientid=null;

booster = [
    {code: 'Y', desc: 'Yes'},
    {code: 'N', desc: 'No'}
];

icd10 = [
    {code: 'W50', desc: 'Bitten by another Person'},
    {code: 'W54', desc: 'Bitten or struck by Dog'},
    {code: 'W55', desc: 'Bitten by another Mamals'}
];


  brand_name = [
    {id: 'PVRV', desc: 'Verorub'},
    {id: 'PCECV', desc: 'Rabipur'},
    {id: 'PVRV1', desc: 'Speeda'},
    {id: 'PVRV2', desc: 'Abhayrab'},
    {id: 'PVRV3', desc: 'Verorab'},
    {id: 'PVRV4', desc: 'Indirab'},
    {id: 'PCECV1', desc: 'Vaxirab-N'},
    {id: 'PCECV2', desc: 'Rabipur'}
];

vaccine_route = [
  {id: 'ID', desc: 'Intradermal'},
  {id: 'IM', desc: 'Intramuscular'}
];

animal_status = [
  {code: '1', desc: 'Alive'},
  {code: '2', desc: 'Dead due to rabies'},
  {code: '3', desc: 'Dead due to unknown reasons'},
  {code: '4', desc: 'Killed'},
  {code: '5', desc: 'Sick'},
  {code: '6', desc: 'Uuknown / Stray'},
];

ri_type = [
  {code: 'ERIG', desc: 'Equine Rabies Immunoglobulins'},
  {code: 'HRIG', desc: 'Human Rabies Immunoglobulin'},
  {code: 'NONE', desc: 'None'},
];



  showPostExpModal = false;
  togglePostExpModal(){
    this.showPostExpModal = !this.showPostExpModal;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
