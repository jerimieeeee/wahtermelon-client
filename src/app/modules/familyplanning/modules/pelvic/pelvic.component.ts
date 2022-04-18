import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pelvic',
  templateUrl: './pelvic.component.html',
  styleUrls: ['./pelvic.component.scss']
})
export class PelvicComponent implements OnInit {

  public pelvic_symptoms = [{ "id": 1, "pelvic_name": "Scars", "pelvic_cat": "PERINEUM", "x": 0 }, 
  { "id": 2, "pelvic_name": "Warts", "pelvic_cat": "PERINEUM", "x": 0 }, 
  { "id": 3, "pelvic_name": "Reddish", "pelvic_cat": "PERINEUM", "x": 0 }, 
  { "id": 4, "pelvic_name": "Laceration", "pelvic_cat": "PERINEUM", "x": 0 }, 
  { "id": 5, "pelvic_name": "Congested", "pelvic_cat": "VAGINA", "x": 0 }, 
  { "id": 6, "pelvic_name": "Bartholin's cyst", "pelvic_cat": "VAGINA", "x": 0 }, 
  { "id": 7, "pelvic_name": "Warts", "pelvic_cat": "VAGINA", "x": 0 }, 
  { "id": 8, "pelvic_name": "Skene's Gland Discharge", "pelvic_cat": "VAGINA", "x": 0 }, 
  { "id": 9, "pelvic_name": "Rectocele", "pelvic_cat": "VAGINA", "x": 0 }, 
  { "id": 10, "pelvic_name": "Cytocele", "pelvic_cat": "VAGINA", "x": 0 }, 
  { "id": 11, "pelvic_name": "Congested", "pelvic_cat": "CERVIX", "x": 0 }, 
  { "id": 12, "pelvic_name": "Erosion", "pelvic_cat": "CERVIX", "x": 0 }, 
  { "id": 13, "pelvic_name": "Discharge", "pelvic_cat": "CERVIX", "x": 0 }, 
  { "id": 14, "pelvic_name": "Polyps\/Cyst", "pelvic_cat": "CERVIX", "x": 0 }, 
  { "id": 15, "pelvic_name": "Laceration", "pelvic_cat": "CERVIX", "x": 0 }, 
  { "id": 16, "pelvic_name": "Pinkish", "pelvic_cat": "CERVIXCOLOR", "x": 0 }, 
  { "id": 17, "pelvic_name": "Bluish", "pelvic_cat": "CERVIXCOLOR", "x": 0 }, 
  { "id": 18, "pelvic_name": "Bartholin's cyst", "pelvic_cat": "VAGINA", "x": 0 }, 
  { "id": 19, "pelvic_name": "Firm", "pelvic_cat": "CERVIXCONSISTENCY", "x": 0 },
  { "id": 20, "pelvic_name": "Soft", "pelvic_cat": "CERVIXCONSISTENCY", "x": 0 }, 
  { "id": 21, "pelvic_name": "Mid", "pelvic_cat": "UTERUSPOS", "x": 0 }, 
  { "id": 22, "pelvic_name": "Anteflexed", "pelvic_cat": "UTERUSPOS", "x": 0 }, 
  { "id": 23, "pelvic_name": "Retroflexed", "pelvic_cat": "UTERUSPOS", "x": 0 }, 
  { "id": 24, "pelvic_name": "Normal", "pelvic_cat": "UTERUSSIZE", "x": 0 }, 
  { "id": 25, "pelvic_name": "Small", "pelvic_cat": "UTERUSSIZE", "x": 0 }, 
  { "id": 26, "pelvic_name": "Large", "pelvic_cat": "UTERUSSIZE", "x": 0 }, 
  { "id": 27, "pelvic_name": "Normal", "pelvic_cat": "ADNEXA", "x": 0 }, 
  { "id": 28, "pelvic_name": "Mass", "pelvic_cat": "ADNEXA", "x": 0 }, 
  { "id": 29, "pelvic_name": "Tenderness", "pelvic_cat": "ADNEXA", "x": 0 },
];
  constructor() { }

  ngOnInit(): void {
  }

}
