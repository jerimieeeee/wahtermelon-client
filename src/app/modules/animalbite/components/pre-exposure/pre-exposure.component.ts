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
    {id: 'HRDC', desc: 'HIGH-RISK DOG CATCHER'},
    {id: 'HRHCP', desc: 'HIGH-RISK HEALTH CARE PROVIDER'},
    {id: 'HRVACC', desc: 'HIGH-RISK VACCINATOR'},
    {id: 'HRVET', desc: 'HIGH-RISK VETERENARIAN'},
    {id: 'HRVS', desc: 'HIGH-RISK VETERENARY STUDENT'},
    {id: 'PSHRA', desc: 'PRE-SCHOOL IN HIGH-RISK AREAS'},
    {id: 'OTHERS', desc: 'OTHERS'},
    
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



  showPreExpModal = false;
  togglePreExpModal(){
    this.showPreExpModal = !this.showPreExpModal
  }

  constructor() { }

  ngOnInit(): void {
  }

}
