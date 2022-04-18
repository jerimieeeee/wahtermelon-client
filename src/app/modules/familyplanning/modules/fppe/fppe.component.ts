import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-fppe',
  templateUrl: './fppe.component.html',
  styleUrls: ['./fppe.component.scss']
})
export class FppeComponent implements OnInit {
  faCalendarDay = faCalendarDay;
  faPlus = faPlus;
  faSave = faSave;
  faTimes = faTimes;
  try: any;
  focused: boolean;
  fppe_typing: boolean;

  constructor() { }
  public fp_pe_symptoms = [{"id":1,"pe_name":"Pale","pe_cat":"CONJUNCTIVA", "x": 1},
  {"id":2,"pe_name":"Yellowish","pe_cat":"CONJUNCTIVA", "x": 0},
  {"id":3,"pe_name":"Enlarged Thyroid","pe_cat":"NECK", "x": 1},
  {"id":4,"pe_name":"Enlarged Lymph Nodes","pe_cat":"NECK", "x": 1},
  {"id":5,"pe_name":"Mass","pe_cat":"BREAST", "x": 0},
  {"id":6,"pe_name":"Nipple Discharge","pe_cat":"BREAST", "x": 0},
  {"id":7,"pe_name":"Skin-orange-peel or dimpling","pe_cat":"BREAST", "x": 1},
  {"id":8,"pe_name":"Enlarged Axillary Lymph Nodes","pe_cat":"BREAST", "x": 0},
  {"id":9,"pe_name":"Abnormal Heart Sounds\/Cardiac Rate","pe_cat":"THORAX", "x": 0},
  {"id":10,"pe_name":"Abnormal Breath Sounds\/Respiratory Rate","pe_cat":"THORAX", "x": 1},
  {"id":11,"pe_name":"Enlarge Liver","pe_cat":"ABDOMEN", "x": 0},
  {"id":12,"pe_name":"Mass","pe_cat":"ABDOMEN", "x": 1},
  {"id":13,"pe_name":"Tenderness","pe_cat":"ABDOMEN", "x": 0},
  {"id":14,"pe_name":"Edema","pe_cat":"EXTREMITIES", "x": 0},
  {"id":15,"pe_name":"Varicosities","pe_cat":"EXTREMITIES", "x": 1}];
  public fp_pe_cat = [];
  public fp_pe_cat2 = [];
  public cat_strings = [];
  public fppe_strings = [];
  public module_strings = [];
  public buttons = [];
  public check_list = [];
  public pill_box = [];

  ngOnInit(): void {
    this.focused = true;
    
    this.fp_pe_symptoms.forEach(element => {

      if(!this.fp_pe_cat.includes(element.pe_cat)){
        this.fp_pe_cat.push(element.pe_cat);
        console.log(this.fp_pe_cat + ' ngeow');
      }

      if(element.x == 1){
        if(!this.fp_pe_cat2.includes(element.pe_cat)){
          this.fp_pe_cat2.push(element.pe_cat);
          console.log(this.fp_pe_cat2 + ' ngeow2');
        }
     }
    });
  }

  flip(): void{
    this.focused = !this.focused;
  }

  uncheck(cancel_name){
    let cat = cancel_name.replace("cancel",'');
    console.log(cat + ' this is my cat from uncheck');
    this.cat_strings.splice(this.fppe_strings.indexOf(cat),1 );
    console.log("emtying out cat_strings");
    
    this.fp_pe_symptoms.forEach( e => {
      if(e.pe_cat == cat){
        if(this.fppe_strings.includes(e.pe_name)){
          console.log(this.fppe_strings);
          
          this.fppe_strings.splice(this.fppe_strings.indexOf(e.pe_name),1 );
        }
       
      }
    });
  
  }

  onChange(id_name,cat){  
  if(!this.cat_strings.includes(cat)){
      this.cat_strings.push(cat);
    }
    
    console.log(this.cat_strings);
    
    this.fp_pe_symptoms.forEach(fphxElement => {
      if(fphxElement.pe_name == id_name){
      
      this.fppe_typing = true;
        if(this.fppe_strings.includes(id_name)){
          this.fppe_strings.splice(this.fppe_strings.indexOf(id_name), 1);
        }else{
          this.fppe_strings.push(id_name);
        }
      console.log(this.fppe_strings, '   FPPE STRINGSSSSSSSS');
    }
    });
    
  }

  showModule(id_name){  
    this.module_strings = [];
    this.buttons = [];
    this.buttons.push('save');
    this.check_list = [];
    this.module_strings.push(id_name);
    this.fp_pe_symptoms.forEach(element => {
      if(element.pe_cat == id_name){
        this.check_list.push(element.pe_name);
      }
    });
  }
  
  hideModule(id_name){  
    if(this.module_strings.includes(id_name)){
      // console.log(id_name);
      this.module_strings.splice(this.module_strings.indexOf(id_name),1 );
    }
  }

  hoverPill(id_name){
    this.pill_box = [];
    this.pill_box.push(id_name);
    console.log(this.pill_box);
  }
  leavePill(){
    this.pill_box = [];
  }
  selectAll(select_name){
    let cat = select_name.replace("select",'');
    if(!this.cat_strings.includes(cat)){
      this.cat_strings.push(cat);
    }
  
    this.fp_pe_symptoms.forEach(e => {
      if(cat == e.pe_cat){
        if(!this.fppe_strings.includes(e.pe_name)){
          this.fppe_strings.push(e.pe_name);
        }
      }
    });
  }
  
  buttonShow(name){
    this.buttons = [];
    if(!this.buttons.includes(name)){
      this.buttons.push(name);
    }
    console.log(this.buttons);
    
  }

}


