import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fppe',
  templateUrl: './fppe.component.html',
  styleUrls: ['./fppe.component.scss']
})
export class FppeComponent implements OnInit {
  try: any;

  constructor() { }
  public fp_pe_symptoms = [{"id":1,"pe_name":"Pale","pe_cat":"CONJUNCTIVA", "x": 0},
  {"id":2,"pe_name":"Yellowish","pe_cat":"CONJUNCTIVA", "x": 0},
  {"id":3,"pe_name":"Enlarged Thyroid","pe_cat":"NECK", "x": 0},
  {"id":4,"pe_name":"Enlarged Lymph Nodes","pe_cat":"NECK", "x": 0},
  {"id":5,"pe_name":"Mass","pe_cat":"BREAST", "x": 0},
  {"id":6,"pe_name":"Nipple Discharge","pe_cat":"BREAST", "x": 0},
  {"id":7,"pe_name":"Skin-orange-peel or dimpling","pe_cat":"BREAST", "x": 0},
  {"id":8,"pe_name":"Enlarged Axillary Lymph Nodes","pe_cat":"BREAST", "x": 0},
  {"id":9,"pe_name":"Abnormal Heart Sounds\/Cardiac Rate","pe_cat":"THORAX", "x": 0},
  {"id":10,"pe_name":"Abnormal Breath Sounds\/Respiratory Rate","pe_cat":"THORAX", "x": 0},
  {"id":11,"pe_name":"Enlarge Liver","pe_cat":"ABDOMEN", "x": 0},
  {"id":12,"pe_name":"Mass","pe_cat":"ABDOMEN", "x": 0},
  {"id":13,"pe_name":"Tenderness","pe_cat":"ABDOMEN", "x": 0},
  {"id":14,"pe_name":"Edema","pe_cat":"EXTREMITIES", "x": 0},
  {"id":15,"pe_name":"Varicosities","pe_cat":"EXTREMITIES", "x": 0}];
  public fp_pe_cat = [];
  ngOnInit(): void {
    this.fp_pe_symptoms.forEach(element => {
      if(!this.fp_pe_cat.includes(element.pe_cat)){
        this.fp_pe_cat.push(element.pe_cat);
        console.log(this.fp_pe_cat);
      }
    });
  }
  }


