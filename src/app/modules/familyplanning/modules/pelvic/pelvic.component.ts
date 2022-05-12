import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faCaretRight, faCircleCheck, faInfoCircle, faPencil, faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pelvic',
  templateUrl: './pelvic.component.html',
  styleUrls: ['./pelvic.component.scss']
})
export class PelvicComponent implements OnInit {
  faCalendarDay = faCalendarDay;
  faPlus = faPlus;
  faSave = faSave;
  faTimes = faTimes;
  faPencil = faPencil;
  faCircleCheck = faCircleCheck;
  faCaretRight = faCaretRight;
  faInfoCircle = faInfoCircle;
  focused: boolean;
  flippable: boolean;
  saved: boolean;
  fppelvic_typing: boolean;


  constructor() { }
  public fp_pelvic_cat = [];
  public fp_pelvic_name_cat = [];
  public fppelvic_strings = [];
  public cat_strings = [];
  public buttons = [];
  public check_list = [];
  public module_strings = [];

  public lib_cat_name = [
    { "pelvic_cat_id": "ADNEXA", "pelvic_cat_name": "ADNEXA" },
    { "pelvic_cat_id": "CERVIX", "pelvic_cat_name": "CERVIX" },
    { "pelvic_cat_id": "CERVIXCOLOR", "pelvic_cat_name": "Color" },
    { "pelvic_cat_id": "CERVIXCONSISTENCY", "pelvic_cat_name": "Consistency" },
    { "pelvic_cat_id": "PERENIUM", "pelvic_cat_name": "PERENIUM" },
    { "pelvic_cat_id": "UTERUSPOS", "pelvic_cat_name": "UTERUS POSITION" },
    { "pelvic_cat_id": "UTERUSSIZE", "pelvic_cat_name": "UTERUS SIZE" },
    { "pelvic_cat_id": "VAGINA", "pelvic_cat_name": "VAGINA" }];

  public pelvic_symptoms = [
    {"id": 27,"pelvic_name": "Normal","pelvic_cat_id": "ADNEXA"},
    {"id": 28, "pelvic_name": "Mass", "pelvic_cat_id": "ADNEXA"},
    { "id": 29,"pelvic_name": "Tenderness","pelvic_cat_id": "ADNEXA"},
    {"id": 11,"pelvic_name": "Congested Cervix","pelvic_cat_id": "CERVIX"},
    {"id": 12,"pelvic_name": "Erosion", "pelvic_cat_id": "CERVIX"},
    { "id": 13,"pelvic_name": "Discharge","pelvic_cat_id": "CERVIX"},
    {"id": 14,"pelvic_name": "Polyps/Cyst","pelvic_cat_id": "CERVIX"},
    {"id": 15,"pelvic_name": "Lacerations","pelvic_cat_id": "CERVIX"},
    {"id": 16,"pelvic_name": "Pinkish", "pelvic_cat_id": "CERVIXCOLOR"},
    {"id": 17,"pelvic_name": "Bluish","pelvic_cat_id": "CERVIXCOLOR"},
    {"id": 19, "pelvic_name": "Firm","pelvic_cat_id": "CERVIXCONSISTENCY"},
    {"id": 20,"pelvic_name": "Soft","pelvic_cat_id": "CERVIXCONSISTENCY"},
    {"id": 1,"pelvic_name": "Scars","pelvic_cat_id": "PERENIUM"},
    {"id": 2,"pelvic_name": "Warts","pelvic_cat_id": "PERENIUM"},
    {"id": 3, "pelvic_name": "Reddish","pelvic_cat_id": "PERENIUM"},
    {"id": 4,"pelvic_name": "Laceration","pelvic_cat_id": "PERENIUM" },
    { "id": 21,"pelvic_name": "Mid","pelvic_cat_id": "UTERUSPOS"},
    {"id": 22, "pelvic_name": "Anteflexed", "pelvic_cat_id": "UTERUSPOS"},
    {"id": 23, "pelvic_name": "Retroflexed","pelvic_cat_id": "UTERUSPOS"},
    {"id": 24,"pelvic_name": "Normal Size","pelvic_cat_id": "UTERUSSIZE"},
    {"id": 25,"pelvic_name": "Small","pelvic_cat_id": "UTERUSSIZE"},
    {"id": 26, "pelvic_name": "Large","pelvic_cat_id": "UTERUSSIZE"},
    {"id": 5, "pelvic_name": "Congested", "pelvic_cat_id": "VAGINA"},
    {"id": 6,"pelvic_name": "Bartholin's cyst", "pelvic_cat_id": "VAGINA"},
    {"id": 7,"pelvic_name": "Warts in Vagina","pelvic_cat_id": "VAGINA"},
    {"id": 8,"pelvic_name": "Skene's Gland Discharge", "pelvic_cat_id": "VAGINA"},
    {"id": 9,"pelvic_name": "Rectocele","pelvic_cat_id": "VAGINA"},
    {"id": 10,"pelvic_name": "Cytocele","pelvic_cat_id": "VAGINA"}
];

ngOnInit(): void {
  this.focused = true;
  this.showCat();

  this.flippable = true;
  this.showModule("ADNEXA", 0);
  this.saved = false;
}

flip(): void {
  console.log('flip');
  this.focused = !this.focused;
}
showCat(){
  console.log("showCat");

  this.fp_pelvic_cat = [];
  this.fp_pelvic_name_cat = [];

  if(this.saved && this.fppelvic_strings){
    this.pelvic_symptoms.forEach(e => {

      if(this.fppelvic_strings.includes(e.pelvic_name)){

        console.log(this.fp_pelvic_cat, " cat this is for showCat");

        if(!this.fp_pelvic_cat.includes(e.pelvic_cat_id)){
          this.fp_pelvic_cat.push(e.pelvic_cat_id);
        }

        this.lib_cat_name.forEach(lib =>{
          this.fp_pelvic_cat.forEach(fp =>{
            if(lib.pelvic_cat_id == fp){
              if(!this.fp_pelvic_name_cat.includes(lib.pelvic_cat_name)){
              this.fp_pelvic_name_cat.push(lib.pelvic_cat_name);
              }
            }
          });
          
        });
      }
    });
  }else{
  this.pelvic_symptoms.forEach(element => {
    // if(element.x == 1){
    if (!this.fp_pelvic_cat.includes(element.pelvic_cat_id)) {
      this.fp_pelvic_cat.push(element.pelvic_cat_id);
      this.lib_cat_name.forEach(lib =>{
        if(lib.pelvic_cat_id == element.pelvic_cat_id){
          if(!this.fp_pelvic_name_cat.includes(lib.pelvic_cat_name)){
          this.fp_pelvic_name_cat.push(lib.pelvic_cat_name);
          }
        }
      });
    }
    // }
  });
}
console.log(this.fp_pelvic_cat + ' ngeow');
console.log(this.fp_pelvic_name_cat + ' ngeow2');
}
uncheck(cat) {
  console.log('uncheck');
  // console.log(cat, ' this is my cat from uncheck');
  this.cat_strings.splice(this.cat_strings.indexOf(cat), 1);
  // console.log(this.cat_strings, " emtying out cat_strings");
  this.pelvic_symptoms.forEach(e => {

    if (e.pelvic_cat_id == cat) {

      if (this.fppelvic_strings.includes(e.pelvic_name)) {
        // console.log(this.fppelvic_strings.indexOf(e.pelvic_name), " log for fppelvic_strings index");
        this.fppelvic_strings.splice(this.fppelvic_strings.indexOf(e.pelvic_name), 1);
        // console.log(this.fppelvic_strings);
      }

    }

  });

}

onChange(id_name, cat) {
  console.log("onChange, incoming ", id_name);

  if (!this.cat_strings.includes(cat)) {
    this.cat_strings.push(cat);
  }

  console.log(this.cat_strings, " cat_strings onChange");

  this.pelvic_symptoms.forEach(fppelvicElement => {

    if (fppelvicElement.pelvic_name == id_name) {

      this.fppelvic_typing = true;

      if (this.fppelvic_strings.includes(id_name)) {
        this.fppelvic_strings.splice(this.fppelvic_strings.indexOf(id_name), 1);
        if (this.fppelvic_strings.length == 0) {
          this.cat_strings = [];
        }
      } else {
        this.fppelvic_strings.push(id_name);
      }
      console.log(this.fppelvic_strings, " fppelvic_strings onChange");
    }
  });

}

showModule(id_name, i) {
  console.log("showModule");
  console.log(this.flippable);

  if (this.flippable) {
    // this.module_strings = [];
    this.buttons = [];
    this.buttons.push('save');
    this.check_list = [];
    if (this.module_strings.includes(i)) {
      this.module_strings = [];
    } else {
      this.module_strings = [];
      this.module_strings.push(i);
    }
    this.pelvic_symptoms.forEach(element => {
      if (element.pelvic_cat_id == id_name) {
        this.check_list.push(element.pelvic_name);
      }
    });
  }
}

selectAll(select_name) {
  console.log("selectAll");

  let cat = select_name.replace("select", '');
  if (!this.cat_strings.includes(cat)) {
    this.cat_strings.push(cat);
  }

  this.pelvic_symptoms.forEach(e => {
    if (cat == e.pelvic_cat_id) {
      if (!this.fppelvic_strings.includes(e.pelvic_name)) {
        this.fppelvic_strings.push(e.pelvic_name);
      }
    }
  });
}

buttonShow(name) {
  console.log('buttonShow');

  this.buttons = [];
  if (!this.buttons.includes(name)) {
    this.buttons.push(name);
  }
  // console.log(this.buttons);
}
nextModule(id_name, i) {
  console.log("nextModule", this.fppelvic_strings);
  if (this.module_strings.includes(i - 1)) {
    // console.log(id_name, i , ' this is idname and i');
    this.showModule(id_name, i);
  };
}

saveModule() {
  console.log(this.fppelvic_strings);

  this.saved = true;
  this.showModule('NON', 10);
  this.flippable = false;
  console.log(this.flippable);
  this.showCat();
  // console.log(this.fppelvic_strings);
}

editModule() {
  console.log(this.fppelvic_strings);
  this.saved = false;
  this.flippable = true;
  console.log(this.flippable);
  this.showCat();
}
}
