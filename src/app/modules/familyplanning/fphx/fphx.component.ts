import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fphx',
  templateUrl: './fphx.component.html',
  styleUrls: ['./fphx.component.scss']
})
export class FphxComponent implements OnInit {
  faCalendarDay = faCalendarDay;
  faPlus = faPlus;

  typing: boolean;
  checked: boolean;
  focused: boolean;

  fphx_typing: boolean;

  show_fphx_strings: boolean;
  save_id: void;
  pill: boolean;

 
  constructor() {}
  
  public fphx_strings = [];
  public cat_strings = [];

  public check_list = [];

  public module_strings = [];
  public fp_hx_symptoms = [
  {"history_id":"ALLERGY","history_text":"Allergies","history_cat":"ANY","x":0 },
  {"history_id":"ANEMIA","history_text":"Anemia","history_cat":"ANY","x":0 },
  {"history_id":"BLEEDING","history_text":"Bleeding tendencies (nose, gums, etc.)","history_cat":"ANY","x":1 },
  {"history_id":"DIABETES","history_text":"Diabetes","history_cat":"ANY","x":0 },
  {"history_id":"DRUGINTAKE","history_text":"Drug intake (anti-TB, anti-diabetic, anticonvulsant)","history_cat":"ANY","x":1 },
  {"history_id":"ECTPREG","history_text":"Ectopic pregnancy","history_cat":"ANY","x":0 },
  {"history_id":"HMOLE","history_text":"Hydatidiform mole (w/in the last 12 mos.)","history_cat":"ANY","x":1 },
  {"history_id":"MPARTNERS","history_text":"Multiple partners","history_cat":"ANY","x":1 },
  {"history_id":"SMOKING","history_text":"Smoking","history_cat":"ANY","x":1 },
  {"history_id":"STD","history_text":"STD","history_cat":"ANY","x":0 },

  {"history_id":"BRSTMASS","history_text":"Breast/axillary masses","history_cat":"CXHRT","x":0 },
  {"history_id":"CVAHARHD","history_text":"Family history of CVA (strokes), hypertension, asthma, rheumatic heart disease","history_cat":"CXHRT","x":0 },
  {"history_id":"CXPAIN","history_text":"Severe chest pain","history_cat":"CXHRT","x":0 },
  {"history_id":"DIAS90","history_text":"Diastolic of 90 & above","history_cat":"CXHRT","x":1 },
  {"history_id":"FATIGUE","history_text":"Shortness of breath and easy fatiguability","history_cat":"CXHRT","x":0 },
  {"history_id":"NIPBLOOD","history_text":"Nipple discharges (blood)","history_cat":"CXHRT","x":1 },
  {"history_id":"NIPPUS","history_text":"Nipple discharges (pus)","history_cat":"CXHRT","x":0 },
  {"history_id":"SYS140","history_text":"Systolic of 140 & above","history_cat":"CXHRT","x":1 },

  {"history_id":"EPILEPSY","history_text":"Epilepsy/Convulsion/Seizure","history_cat":"HEENT","x":1 },
  {"history_id":"ETHY","history_text":"Enlarged thyroid","history_cat":"HEENT","x":0 },
  {"history_id":"HEADACHE","history_text":"Severe headache/dizziness","history_cat":"HEENT","x":1 },
  {"history_id":"VISION","history_text":"Visual disturbance/blurring of vision","history_cat":"HEENT","x":0 },
  {"history_id":"YCONJ","history_text":"Yellowish conjunctive","history_cat":"HEENT","x":1 },

  {"history_id":"GALL","history_text":"History of gallbladder disease","history_cat":"ABD","x":0 },
  {"history_id":"LIVER","history_text":"History of liver disease","history_cat":"ABD","x":0 },
  {"history_id":"MASSABD","history_text":"Mass in the abdomen","history_cat":"ABD","x":0},

  {"history_id":"INTERBLEED","history_text":"Intermenstrual bleeding","history_cat":"GEN","x":0 },
  {"history_id":"POSTBLEED","history_text":"Postcoital bleeding","history_cat":"GEN","x":0 },
  {"history_id":"UTERUS","history_text":"Mass in the uterus","history_cat":"GEN","x":0 },
  {"history_id":"VAGDISCH","history_text":"Vaginal discharge","history_cat":"GEN","x":0 },

  {"history_id":"LEGPAIN","history_text":"Swelling or severe pain in the legs not related to injuries","history_cat":"EXT","x":1 },
  {"history_id":"VARICOSE","history_text":"Severe varicosities","history_cat":"EXT","x":1 },

  {"history_id":"YELLOWSKIN","history_text":"Yellowish skin","history_cat":"SKIN","x":1 }];

  public fp_hx_cat = [];
  public fp_hx_cat2 = [];

  public pill_box = [];

  ngOnInit(): void {
    this.focused = true;

    this.fp_hx_symptoms.forEach(element => {
      // if(element.x == 1){
      if(!this.fp_hx_cat.includes(element.history_cat)){
        this.fp_hx_cat.push(element.history_cat);
        console.log(this.fp_hx_cat + ' ngeow');
      }
      // }
      if(element.x == 1){
        if(!this.fp_hx_cat2.includes(element.history_cat)){
          this.fp_hx_cat2.push(element.history_cat);
          console.log(this.fp_hx_cat2 + ' ngeow2');
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
  this.cat_strings.splice(this.fphx_strings.indexOf(cat),1 );
  console.log("emtying out cat_strings");
  
  this.fp_hx_symptoms.forEach( e => {
    if(e.history_cat == cat){
      if(this.fphx_strings.includes(e.history_text)){
        console.log(this.fphx_strings);
        
        this.fphx_strings.splice(this.fphx_strings.indexOf(e.history_text),1 );
      }
     
    }
  });

}

onChange(id_name,cat){  
 if(!this.cat_strings.includes(cat)){
    this.cat_strings.push(cat);
  }
  
  console.log(this.cat_strings);
  
  this.fp_hx_symptoms.forEach(fphxElement => {
    if(fphxElement.history_text == id_name){
     
    this.fphx_typing = true;
      if(this.fphx_strings.includes(id_name)){
        this.fphx_strings.splice(this.fphx_strings.indexOf(id_name), 1);
        // console.log("existing will not push");
      }else{
        this.fphx_strings.push(id_name);
      }
    console.log(this.fphx_strings + '   FPHX STRINGSSSSSSSS');
  }
  });
  
}

showModule(id_name){  
  this.module_strings = [];
  this.check_list = [];
  // console.log(id_name);
  this.module_strings.push(id_name);
  // console.log(this.module_strings);
  this.fp_hx_symptoms.forEach(element => {
    if(element.history_cat == id_name){
      // console.log(element.history_text);
      this.check_list.push(element.history_text);
      // console.log(this.check_list);
    }
  });
}

hideModule(id_name){  
  if(this.module_strings.includes(id_name)){
    // console.log(id_name);
    this.module_strings.splice(this.module_strings.indexOf(id_name),1 );
  }
  // console.log(this.module_strings);
  
//  this.typing = true;
}

hoverPill(id_name){
  // this.fp_hx_symptoms.forEach(e => {
  //   console.log("log hist_id here first " + e.history_id);
    
  //   let save_id = e.history_id
  //   if(e.history_id == id_name){
  //     console.log('im hovering');
  //     e.history_id = e.history_text;
  //   }
  //   console.log(save_id + ' this was my hist_id b4');
  //   this.pill = false;
  // });
  if(!this.pill_box.includes(id_name)){
    this.pill_box.push(id_name);
  }
  console.log(this.pill_box);
  
  //this.pill = false;
}
  leavePill(){
    this.pill_box = [];
  }

}
