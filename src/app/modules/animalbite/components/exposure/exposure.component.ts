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
    {id: 'Bat', desc: 'Bat'},
    {id: 'Cat', desc: 'Cat'},
    {id: 'Dog', desc: 'Dog'},
    {id: 'Monkey', desc: 'Monkey'},
    {id: 'Others', desc: 'Others'},
];

ownership = [
  {code: 'Pet', desc: 'Pet'},
  {code: 'Stray', desc: 'Stray'},
  {code: 'Wild', desc: 'Wild'}
];

wash = [
  {code: 'Y', desc: 'Yes'},
  {code: 'N', desc: 'No'}
];

abnb = [
  {code: 'B', desc: 'Bite'},
  {code: 'NB', desc: 'Non Bite'}
];

withpep = [
  {code: 'Y', desc: 'Yes'},
  {code: 'N', desc: 'No'}
];

exposure_type = [
  {id: 'BATS', desc: 'Exposure To Bats'},
  {id: 'CASUAL', desc: 'Casual Contact And Routine Delivery Of Health Care To Patient With Signs And Symptoms Of Rabies'},
  {id: 'CONTAM', desc: 'Contamination Of Mucous Membranes Or Open Skin Lesions With Body Fluids Through Splattering And Mouth-tomouth Resucitation'},
  {id: 'EXPOSE', desc: 'Exposure To Patient With Signs And Symptoms Of Rabies By Sharing Of Eating Or Drinking Utensils'},
  {id: 'FEED', desc: 'Feeding / Touching An Animal'},
  {id: 'INGESTION', desc: 'Ingestion Of Raw Infected Meat'},
  {id: 'LICK', desc: 'Licking Of Intact Skin'},
  {id: 'MINOR', desc: 'Minor / Superficial Scratches/ Abrasions Without Bleeding, Including Those Induced To Bleed'},
  {id: 'NIBB', desc: 'Nibbling Of Uncovered Skin With Or Without Bruising/ Hematoma'},
  {id: 'TRANS', desc: 'Exposure To Batstransdermal Bites (Puncture Wounds, Lacerations, Avulsions) Or Scratches/Abrasions With Spontaneous Bleeding'},
  {id: 'UNPROC', desc: 'Unprotected Handling Of Infected Carcass'},
];

anatomical_loc = [
  {id: 'ARMS', desc: 'Arms'},
  {d: 'FEET', desc: 'Feet'},
  {d: 'HAND', desc: 'Hand'},
  {d: 'HEAD', desc: 'Head'},
  {d: 'KNEE', desc: 'Knee'},
  {d: 'LEG', desc: 'Leg'},
  {d: 'NECK', desc: 'Neck'},
  {d: 'OTHERS', desc: 'Others'},
];




  constructor() { }

  ngOnInit(): void {
  }

}
