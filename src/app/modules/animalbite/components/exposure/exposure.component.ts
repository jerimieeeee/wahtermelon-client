import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exposure',
  templateUrl: './exposure.component.html',
  styleUrls: ['./exposure.component.scss']
})
export class ExposureComponent implements OnInit {

  faInfoCircle = faInfoCircle
  faPlus = faPlus;
  faCalendarDay = faCalendarDay

  patientid=null;

  showExpModal = false;
  toggleExpModal(){
    this.showExpModal = !this.showExpModal;
  }

animal_type = [
    {id: 'BAT', desc: 'BAT'},
    {id: 'CAT', desc: 'CAT'},
    {id: 'DOG', desc: 'DOG'},
    {id: 'Monkey', desc: 'MONKEY'},
    {id: 'Others', desc: 'OTHERS'},
];

ownership = [
  {code: 'PET', desc: 'PET'},
  {code: 'STRAY', desc: 'STRAY'},
  {code: 'WILD', desc: 'WILD'}
];

wash = [
  {code: 'Y', desc: 'YES'},
  {code: 'N', desc: 'NO'}
];

abnb = [
  {code: 'B', desc: 'BITE'},
  {code: 'NB', desc: 'NON BITE'}
];

withpep = [
  {code: 'Y', desc: 'YES'},
  {code: 'N', desc: 'NO'}
];

exposure_type = [
  {id: 'BATS', desc: 'EXPOSURE TO BATS'},
  {id: 'CASUAL', desc: 'CASUAL CONTACT AND ROUTINE DELIVERY OF HEALTH CARE TO PATIENT WITH SIGNS AND SYMPTOMS OF RABIES'},
  {id: 'CONTAM', desc: 'CONTAMINATION OF MUCOUS MEMBRANES OR OPEN SKIN LESIONS WITH BODY FLUIDS THROUGH SPLATTERING AND MOUTH-TOMOUTH RESUCITATION'},
  {id: 'EXPOSE', desc: 'EXPOSURE TO PATIENT WITH SIGNS AND SYMPTOMS OF RABIES BY SHARING OF EATING OR DRINKING UTENSILS'},
  {id: 'FEED', desc: 'FEEDING/TOUCHING AN ANIMAL'},
  {id: 'INGESTION', desc: 'INGESTION OF RAW INFECTED MEAT'},
  {id: 'LICK', desc: 'LICKING OF INTACT SKIN '},
  {id: 'MINOR', desc: 'MINOR /SUPERFICIAL SCRATCHES/ABRASIONS WITHOUT BLEEDING, INCLUDING THOSE INDUCED TO BLEED'},
  {id: 'NIBB', desc: 'NIBBLING OF UNCOVERED SKIN WITH OR WITHOUT BRUISING/HEMATOMA'},
  {id: 'TRANS', desc: 'EXPOSURE TO BATSTRANSDERMAL BITES (PUNCTURE WOUNDS, LACERATIONS, AVULSIONS) OR SCRATCHES/ABRASIONS WITH SPONTANEOUS BLEEDING'},
  {id: 'UNPROC', desc: 'UNPROTECTED HANDLING OF INFECTED CARCASS'},
];

anatomical_loc = [
  {id: 'ARMS', desc: 'ARMS'},
  {d: 'FEET', desc: 'FEET'},
  {d: 'HAND', desc: 'HAND'},
  {d: 'HEAD', desc: 'HEAD'},
  {d: 'KNEE', desc: 'KNEE'},
  {d: 'LEG', desc: 'LEG'},
  {d: 'NECK', desc: 'NECK'},
  {d: 'OTHERS', desc: 'OTHERS'},
];




  constructor() { }

  ngOnInit(): void {
  }

}
