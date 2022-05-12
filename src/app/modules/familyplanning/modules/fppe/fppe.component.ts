import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faCaretRight, faCircleCheck, faInfoCircle, faPencil, faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';


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
  faPencil = faPencil;
  faCircleCheck = faCircleCheck;
  faCaretRight = faCaretRight;
  faInfoCircle = faInfoCircle;

  try: any;
  focused: boolean;
  fppe_typing: boolean;
  flippable: boolean;
  saved: boolean;

  constructor() { }

  public lib_cat_name = [
    {"pe_cat_id": "ABDOMEN","pe_cat_name": "ABDOMEN"},
    {"pe_cat_id": "BREAST","pe_cat_name": "BREAST"},
    {"pe_cat_id": "CONJUNCTIVA","pe_cat_name": "CONJUNCTIVA"},
    {"pe_cat_id": "EXTREMITIES","pe_cat_name": "EXTREMITIES"},
    {"pe_cat_id": "NECK","pe_cat_name": "NECK"},
    {"pe_cat_id": "THORAX", "pe_cat_name": "THORAX"}];

  public fp_pe_symptoms = [{ "id": "PALE", "pe_name": "Pale", "pe_cat": "CONJUNCTIVA", "x": 1 },
  { "id": "YELLOW", "pe_name": "Yellowish", "pe_cat": "CONJUNCTIVA", "x": 0 },
  { "id": "ENLGTHY", "pe_name": "Enlarged Thyroid", "pe_cat": "NECK", "x": 1 },
  { "id": "ENLGLYM", "pe_name": "Enlarged Lymph Nodes", "pe_cat": "NECK", "x": 1 },
  { "id": "MASS", "pe_name": "Mass", "pe_cat": "BREAST", "x": 0 },
  { "id": "NIPDISCHRG", "pe_name": "Nipple Discharge", "pe_cat": "BREAST", "x": 0 },
  { "id": "ORANGEPEEL", "pe_name": "Skin-orange-peel or dimpling", "pe_cat": "BREAST", "x": 1 },
  { "id": "AXLYMPH", "pe_name": "Enlarged Axillary Lymph Nodes", "pe_cat": "BREAST", "x": 0 },
  { "id": "ABNHRT", "pe_name": "Abnormal Heart Sounds\/Cardiac Rate", "pe_cat": "THORAX", "x": 0 },
  { "id": "ABNBRTH", "pe_name": "Abnormal Breath Sounds\/Respiratory Rate", "pe_cat": "THORAX", "x": 1 },
  { "id": "ENLGLIVER", "pe_name": "Enlarge Liver", "pe_cat": "ABDOMEN", "x": 0 },
  { "id": 'MASS', "pe_name": "Mass", "pe_cat": "ABDOMEN", "x": 1 },
  { "id": "TENDER", "pe_name": "Tenderness", "pe_cat": "ABDOMEN", "x": 0 },
  { "id": "EDEMA", "pe_name": "Edema", "pe_cat": "EXTREMITIES", "x": 0 },
  { "id": 'VARICS', "pe_name": "Varicosities", "pe_cat": "EXTREMITIES", "x": 1 }];
  public fp_pe_cat = [];
  public fp_pe_cat2 = [];
  public fp_pe_name_cat = [];

  public cat_strings = [];
  public fppe_strings = [];
  public module_strings = [];
  public buttons = [];
  public check_list = [];


    ngOnInit(): void {
    this.focused = true;
    this.showCat();

    this.flippable = true;
    this.showModule("CONJUNCTIVA", 0);
    this.saved = false;
  }

  flip(): void {
    console.log('flip');
    this.focused = !this.focused;
  }
  showCat(){
    console.log("showCat");

    this.fp_pe_cat = [];
    this.fp_pe_name_cat = [];

    if(this.saved && this.fppe_strings){
      this.fp_pe_symptoms.forEach(e => {

        if(this.fppe_strings.includes(e.pe_name)){

          console.log(this.fp_pe_cat, " cat this is for showCat");

          if(!this.fp_pe_cat.includes(e.pe_cat)){
            this.fp_pe_cat.push(e.pe_cat);
          }

          this.lib_cat_name.forEach(lib =>{
            this.fp_pe_cat.forEach(fp =>{
              if(lib.pe_cat_id == fp){
                if(!this.fp_pe_name_cat.includes(lib.pe_cat_name)){
                this.fp_pe_name_cat.push(lib.pe_cat_name);
                }
              }
            });
            
          });
        }
      });
    }else{
    this.fp_pe_symptoms.forEach(element => {
      // if(element.x == 1){
      if (!this.fp_pe_cat.includes(element.pe_cat)) {
        this.fp_pe_cat.push(element.pe_cat);
        this.lib_cat_name.forEach(lib =>{
          if(lib.pe_cat_id == element.pe_cat){
            if(!this.fp_pe_name_cat.includes(lib.pe_cat_name)){
            this.fp_pe_name_cat.push(lib.pe_cat_name);
            }
          }
        });
      }
      // }
    });
  }
  console.log(this.fp_pe_cat + ' ngeow');
  console.log(this.fp_pe_name_cat + ' ngeow2');
  }
  uncheck(cat) {
    console.log('uncheck');
    // console.log(cat, ' this is my cat from uncheck');
    this.cat_strings.splice(this.cat_strings.indexOf(cat), 1);
    // console.log(this.cat_strings, " emtying out cat_strings");
    this.fp_pe_symptoms.forEach(e => {

      if (e.pe_cat == cat) {

        if (this.fppe_strings.includes(e.pe_name)) {
          // console.log(this.fppe_strings.indexOf(e.pe_name), " log for fppe_strings index");
          this.fppe_strings.splice(this.fppe_strings.indexOf(e.pe_name), 1);
          // console.log(this.fppe_strings);
        }

      }

    });

  }

  onChange(id_name, cat) {
    console.log("onChange");

    if (!this.cat_strings.includes(cat)) {
      this.cat_strings.push(cat);
    }

    // console.log(this.cat_strings);

    this.fp_pe_symptoms.forEach(fppeElement => {

      if (fppeElement.pe_name == id_name) {

        this.fppe_typing = true;

        if (this.fppe_strings.includes(id_name)) {
          this.fppe_strings.splice(this.fppe_strings.indexOf(id_name), 1);
          if (this.fppe_strings.length == 0) {
            this.cat_strings = [];
          }
        } else {
          this.fppe_strings.push(id_name);
        }
        // console.log(this.fppe_strings, '   FPHX STRINGSSSSSSSS');
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
      this.fp_pe_symptoms.forEach(element => {
        if (element.pe_cat == id_name) {
          this.check_list.push(element.pe_name);
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

    this.fp_pe_symptoms.forEach(e => {
      if (cat == e.pe_cat) {
        if (!this.fppe_strings.includes(e.pe_name)) {
          this.fppe_strings.push(e.pe_name);
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
    console.log("nextModule", this.fppe_strings);
    if (this.module_strings.includes(i - 1)) {
      // console.log(id_name, i , ' this is idname and i');
      this.showModule(id_name, i);
    };
  }

  saveModule() {
    console.log(this.fppe_strings);

    this.saved = true;
    this.showModule('NON', 10);
    this.flippable = false;
    console.log(this.flippable);
    this.showCat();
    // console.log(this.fppe_strings);
  }

  editModule() {
    console.log(this.fppe_strings);
    this.saved = false;
    this.flippable = true;
    console.log(this.flippable);
    this.showCat();
  }

}


