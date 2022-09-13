import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pre-exposure',
  templateUrl: './pre-exposure.component.html',
  styleUrls: ['./pre-exposure.component.scss']
})
export class PreExposureComponent implements OnInit {

  faInfoCircle = faInfoCircle;
  faPlus = faPlus
  faCalendarDay = faCalendarDay

  patientid=null;

  showRecord = false;
  
  toggleRecord(){
    this.showRecord = !this.showRecord;
  }

  lib_ab_indication_option = [
    {id: 'HRDC', desc: 'High-risk Dog Catcher'},
    {id: 'HRHCP', desc: 'High-risk Health Care Provider'},
    {id: 'HRVACC', desc: 'High-risk Vaccinator'},
    {id: 'HRVET', desc: 'High-risk Veterenarian'},
    {id: 'HRVS', desc: 'High-risk Veterenary Student'},
    {id: 'PSHRA', desc: 'Pre-school In High-risk Areas'},
    {id: 'OTHERS', desc: 'Others'},
    
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
  {id: 'IM', desc: 'Intramascular'}
];



  showPreExpModal = false;
  togglePreExpModal(){
    this.showPreExpModal = !this.showPreExpModal
  }

  constructor() { }

  ngOnInit(): void {
  }

}
