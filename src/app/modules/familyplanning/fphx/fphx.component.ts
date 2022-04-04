import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faPlus } from '@fortawesome/free-solid-svg-icons';

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
  
  abdomen_typing: boolean;
  history_typing: boolean;
  heart_typing: boolean;
  extremities_typing: boolean;
  genital_typing: boolean;
  heent_typing: boolean;
  skin_typing: boolean;
  fphx_typing: boolean;

  show_history_strings: boolean;
  show_abdomen_strings: boolean;
  show_heart_strings: boolean;
  show_extremities_strings: boolean;
  show_genital_strings: boolean;
  show_heent_strings: boolean;
  show_skin_strings: boolean;
  show_fphx_strings: boolean;

 
  constructor() {}

  public abdomen_strings = [];
  public history_strings = [];
  public heart_strings = [];
  public extremities_strings = [];
  public genital_strings = [];
  public heent_strings = [];
  public skin_strings = [];
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
  {"history_id":"MASSABD","history_text":"Mass in the abdomen","history_cat":"ABD","x":0 },

  {"history_id":"INTERBLEED","history_text":"Intermenstrual bleeding","history_cat":"GEN","x":0 },
  {"history_id":"POSTBLEED","history_text":"Postcoital bleeding","history_cat":"GEN","x":0 },
  {"history_id":"UTERUS","history_text":"Mass in the uterus","history_cat":"GEN","x":0 },
  {"history_id":"VAGDISCH","history_text":"Vaginal discharge","history_cat":"GEN","x":0 },

  {"history_id":"LEGPAIN","history_text":"Swelling or severe pain in the legs not related to injuries","history_cat":"EXT","x":1 },
  {"history_id":"VARICOSE","history_text":"Severe varicosities","history_cat":"EXT","x":1 },

  {"history_id":"YELLOWSKIN","history_text":"Yellowish skin","history_cat":"SKIN","x":1 }];

  public fp_hx_cat = [];

  public abdomen_symptoms = [
    {id:1, name: 'History of Galbladder Disease', x: 0},
    {id:2, name: 'History of Liver Disease', x: 1},
    {id:3, name: 'Mass in the Abdomen', x: 1}
  ];
  public history_symptoms = [
    {id:1, name: 'Allergies', x: 1},
    {id:2, name: 'Anemia', x: 1},
    {id:3, name: 'Bleeding Tendencies', x: 1},
    {id:4, name: 'Diabetes', x: 1},
    {id:5, name: 'Drug Intake', x: 1},
    {id:6, name: 'Ectopic Pregnancy', x: 1},
    {id:7, name: 'Hydatidiform Mole', x: 0},
    {id:8, name: 'Multiple Partners', x: 1},
    {id:9, name: 'Smoking', x: 1},
    {id:10, name: 'STD', x: 1},
  ];
  public heart_symptoms = [
    {id:1, name: 'Breast/Axillary Masses', x: 1},
    {id:2, name: 'Family history of CVA, Hypertension, Asthma, Rheumatic Heart Disease', x: 0},
    {id:3, name: 'Sever chest pain', x: 0},
    {id:4, name: 'Diastolic above 90', x: 0},
    {id:5, name: 'Shortness of breath/Easy fatigue', x: 0},
    {id:6, name: 'Nipple Discharges(blood)', x: 0},
    {id:7, name: 'Nipple Discharges(pus)', x: 0},
    {id:8, name: 'Systolis above 140', x: 0},
  ];
  public extremities_symptoms = [
    {id:1, name: 'Swelling or severe pain in the legs not related to injuries ', x: 1},
    {id:2, name: 'Severe varicosities', x: 0},
  ];
  public genital_symptoms = [
    {id:1, name: 'Intermenstrual Bleeding', x: 0},
    {id:2, name: 'Postcoital Bleeding', x: 1},
    {id:3, name: 'Mass in the Uterus', x: 0},
    {id:4, name: 'Vaginal Discharge', x: 1},
  ];
  public heent_symptoms = [
    {id:1, name: 'Epilepsy/Convulsion/Seizure', x: 0},
    {id:2, name: 'Enlarged thyroid', x: 1},
    {id:3, name: 'Severe headache/dizziness', x: 0},
    {id:4, name: 'Visual disturbance/blurring of vision', x: 1},
    {id:5, name: 'Yellowish conjunctive', x: 1},
  ];
  public skin_symptoms = [
    {id:1, name: 'Yellowish Skin', x: 0},
  ];


  ngOnInit(): void {
    this.focused = true;

    this.show_history_strings = false;
    this.show_abdomen_strings = false;
    this.show_heart_strings = false;
    this.show_extremities_strings = false;
    this.show_genital_strings = false;
    this.show_heent_strings = false;
    this.show_skin_strings = false;

    // this.fp_hx_symptoms.forEach(fphxElement => {
    //   if(fphxElement.history_text == id_name){
       
    //   this.fphx_typing = true;
    //     if(this.fphx_strings.includes(id_name)){
    //       this.fphx_strings.splice(this.fphx_strings.indexOf(id_name), 1);
    //       // console.log("existing will not push");
    //     }else{
    //       this.fphx_strings.push(id_name);
    //     }
    //   console.log(this.fphx_strings + '   FPHX STRINGSSSSSSSS');
    // }
    // });
    
    this.fp_hx_symptoms.forEach(element => {
      if(!this.fp_hx_cat.includes(element.history_cat)){
        this.fp_hx_cat.push(element.history_cat);
        console.log(this.fp_hx_cat);
      }
    });

    this.abdomen_symptoms.forEach(abdomenElement => {
      if(abdomenElement.x == 1){
      this.show_abdomen_strings = true;
      console.log(this.show_abdomen_strings);
    }
    });

    this.history_symptoms.forEach(historyElement => {
      if(historyElement.x == 1){
      this.show_history_strings = true;
      console.log(this.show_history_strings);
    }
    });

    // this.heart_symptoms.forEach(heartElement => {
    //   if(heartElement.x == 1){
    //   this.show_heart_strings = true;
    //   console.log(this.show_heart_strings);
    // }
    // });

    // this.extremities_symptoms.forEach(extremeElement => {
    //   if(extremeElement.x == 1){
    //   this.show_extremities_strings = true;
    //   console.log(this.show_extremities_strings);
    // }
    // });

    // this.genital_symptoms.forEach(genitalElement => {
    //   if(genitalElement.x == 1){
    //   this.show_genital_strings = true;
    //   console.log(this.show_genital_strings);
    // }
    // });

    // this.heent_symptoms.forEach(heentElement => {
    //   if(heentElement.x == 1){
    //   this.show_heent_strings = true;
    //   console.log(this.show_heent_strings);
    // }
    // });

    // this.skin_symptoms.forEach(skinElement => {
    //   if(skinElement.x == 1){
    //   this.show_skin_strings = true;
    //   console.log(this.show_skin_strings);
    // }
    // });
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
logConsole(id_name){
// console.log(id_name);

}

checkArrayFam(id_name){

}

logForText(text){
//  console.log(text + " this is my log text");
 
}
}
