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
    {code: 'Y', desc: 'YES'},
    {code: 'N', desc: 'NO'}
];

icd10 = [
    {code: 'W50', desc: 'BITTEN BY ANOTHER PERSON'},
    {code: 'W54', desc: 'BITTEN OR STRUCK BY DOG'},
    {code: 'W55', desc: 'BITTEN BY ANOTHER MAMALS'}
];


  brand_name = [
    {id: 'PVRV', desc: 'VERORUB'},
    {id: 'PCECV', desc: 'RABIPUR'},
    {id: 'PVRV1', desc: 'SPEEDA'},
    {id: 'PVRV2', desc: 'ABHAYRAB'},
    {id: 'PVRV3', desc: 'VERORAB'},
    {id: 'PVRV4', desc: 'INDIRAB'},
    {id: 'PCECV1', desc: 'VAXIRAB-N'},
    {id: 'PCECV2', desc: 'RABIPUR'}
];

vaccine_route = [
  {id: 'ID', desc: 'INTRADERMAL'},
  {id: 'IM', desc: 'INTRAMUSCULAR'}
];

animal_status = [
  {code: '1', desc: 'ALIVE'},
  {code: '2', desc: 'DEAD DUE TO RABIES'},
  {code: '3', desc: 'DEAD DUE TO UNKNOWN REASONS'},
  {code: '4', desc: 'KILLED'},
  {code: '5', desc: 'SICK'},
  {code: '6', desc: 'UNKNOWN/STRAY'},
];

ri_type = [
  {code: 'ERIG', desc: 'EQUINE RABIES IMMUNOGLOBULINS'},
  {code: 'HRIG', desc: 'HUMAN RABIES IMMUNOGLOBULIN'},
  {code: 'NONE', desc: 'NONE'},
];



  showPreExpModal = false;
  togglePreExpModal(){
    this.showPreExpModal = !this.showPreExpModal;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
