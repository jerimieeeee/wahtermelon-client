import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faAngleDown, faCalendarDay, faCaretRight, faClose, faInfoCircle, faPencil, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-riskfactors',
  templateUrl: './riskfactors.component.html',
  styleUrls: ['./riskfactors.component.scss']
})
export class RiskfactorsComponent implements OnInit {
  faCalendarDay = faCalendarDay;
  faTimes = faTimes;
  faClose = faClose;
  faTimesCircle = faTimesCircle;
  faSave = faSave;
  faPencil = faPencil;
  faAngleDown = faAngleDown;
  faInfoCircle = faInfoCircle;
  faCaretRight = faCaretRight;

  risk_form: FormGroup;
  factor: String = new String();
  focused: boolean;

  public keyUp = [];
  public buttons = [];
  public hide = [];
  public risk_catch = [];
  show: boolean;

  constructor() { }
public risk_factors = [
  {"risk_id":14,"risk_name":"Abnormal presentation","hospital_flag":"N","monitor_flag":""},
  {"risk_id":1,"risk_name":"Age younger than 15 years old or older than 35 years old.","hospital_flag":"N","monitor_flag":""},
  {"risk_id":11,"risk_name":"Anemia less than 8gm Hb","hospital_flag":"N","monitor_flag":"Y"},
  {"risk_id":16,"risk_name":"Blood pressure greater than 140\/90","hospital_flag":"N","monitor_flag":"Y"},
  {"risk_id":37,"risk_name":"Bronchial asthma","hospital_flag":"Y","monitor_flag":""},
  {"risk_id":18,"risk_name":"Convulsions","hospital_flag":"N","monitor_flag":"Y"},
  {"risk_id":26,"risk_name":"Diabetes","hospital_flag":"Y","monitor_flag":""},
  {"risk_id":17,"risk_name":"Dizziness or blurring of vision","hospital_flag":"N","monitor_flag":"Y"},
  {"risk_id":6,"risk_name":"First pregnancy","hospital_flag":"N","monitor_flag":""},
  {"risk_id":38,"risk_name":"Having a fourth baby or more baby (grandmulti)","hospital_flag":"N","monitor_flag":"Y"},
  {"risk_id":23,"risk_name":"Heart or kidney disease","hospital_flag":"Y","monitor_flag":""},
  {"risk_id":2,"risk_name":"Height lower than 145cm.","hospital_flag":"N","monitor_flag":""},
  {"risk_id":32,"risk_name":"Illiterate mother","hospital_flag":"N","monitor_flag":""},
  {"risk_id":4,"risk_name":"Leg and pelvic deformities (polio paralysis)","hospital_flag":"N","monitor_flag":""},
  {"risk_id":25,"risk_name":"Malaria","hospital_flag":"N","monitor_flag":""},
  {"risk_id":30,"risk_name":"Mental disorder","hospital_flag":"N","monitor_flag":""},
  {"risk_id":15,"risk_name":"Multiple fetus","hospital_flag":"N","monitor_flag":""},
  {"risk_id":5,"risk_name":"No prenatal or irregular prenatal in previous pregnancy","hospital_flag":"N","monitor_flag":""},
  {"risk_id":35,"risk_name":"Other socio-economic factors","hospital_flag":"N","monitor_flag":""},
  {"risk_id":33,"risk_name":"Perform heavy manual labor","hospital_flag":"N","monitor_flag":""},
  {"risk_id":22,"risk_name":"Pitting edema","hospital_flag":"N","monitor_flag":"Y"},
  {"risk_id":3,"risk_name":"Poor OB history (3 consecutive miscarriages, stillbirth, postpartum hemorrhage)","hospital_flag":"Y","monitor_flag":""},
  {"risk_id":19,"risk_name":"Positive urine albumin","hospital_flag":"N","monitor_flag":""},
  {"risk_id":10,"risk_name":"Pre-pregnancy weight less than 80% of standard weight","hospital_flag":"N","monitor_flag":""},
  {"risk_id":8,"risk_name":"Pregnancy interval less than 24 months from the last delivery","hospital_flag":"N","monitor_flag":""},
  {"risk_id":9,"risk_name":"Pregnancy longer than 294 days or 42 weeks","hospital_flag":"N","monitor_flag":""},
  {"risk_id":7,"risk_name":"Pregnancy more than 5","hospital_flag":"N","monitor_flag":""},
  {"risk_id":36,"risk_name":"Previous cesarean section","hospital_flag":"Y","monitor_flag":""},
  {"risk_id":27,"risk_name":"Rubella","hospital_flag":"N","monitor_flag":""},
  {"risk_id":28,"risk_name":"Thyroid problems","hospital_flag":"Y","monitor_flag":""},
  {"risk_id":24,"risk_name":"Tuberculosis","hospital_flag":"N","monitor_flag":""},
  {"risk_id":34,"risk_name":"Unwanted or unplanned pregnancy","hospital_flag":"N","monitor_flag":""},
  {"risk_id":31,"risk_name":"Unwed mother","hospital_flag":"N","monitor_flag":""},
  {"risk_id":21,"risk_name":"Vaginal bleeding","hospital_flag":"N","monitor_flag":"Y"},
  {"risk_id":20,"risk_name":"Vaginal infections","hospital_flag":"N","monitor_flag":"Y"},
  {"risk_id":13,"risk_name":"Weight gain more than 6% of pre-pregnancy weight per trimester","hospital_flag":"N","monitor_flag":"Y"},
  {"risk_id":12,"risk_name":"Weight less than 4% of pre-pregnancy weight per trimester","hospital_flag":"N","monitor_flag":"Y"}];
  
  ngOnInit(): void {
    this.createForm();

  }

  createForm() {
    this.risk_form = new FormGroup({
      factor: new FormControl(),
      date: new FormControl(new Date().toISOString().substring(0,10)),
    });
  }

  saveForm(data) {
    // const strs = ['valval', 'bal', 'gal', 'dalval'];
    // const result = strs.filter(s => s.includes('val'));
  
    // console.log(strs);
    // console.log(result); ------> good for filtering searches 
    data.factor =data.factor.split('_');
    let index = this.risk_catch.findIndex(c => c.factor === data.factor[0]);
    
    if(index != -1){
      this.risk_catch.splice(index, 1);
    }
 
    this.risk_form.setValue({
      factor: data.factor[0],
      date: data.date,
    });
    this.risk_catch.push({
      risk_id: data.factor[1],
      factor: data.factor[0],
      date: data.date,
    });
   
    
    
    this.createForm();
    this.hide = [];
    //this.risk_form.disable();
  }
  flip(): void{
    this.focused = !this.focused;
    this.keyUp = [];
    this.buttons = [];
    this.buttons.push('save');
  }

  onKeyUp(data_input: string, id: string){
    // console.log(data_input + ' this is my data input');
    
        if(this.keyUp.includes(id)){
          if(data_input == ''){
            this.keyUp.splice(this.keyUp.indexOf(id), 1);
          }
        }else{
          this.keyUp.push(id);
        }

        // console.log(this.keyUp.length);
        // console.log(this.keyUp);
  }
  buttonShow(name){
    this.buttons = [];
    if(!this.buttons.includes(name)){
      this.buttons.push(name);
    }
    // console.log(this.buttons);
    
  }
  cancel(){
    this.hide = [];
    this.keyUp = [];
    this.risk_form.reset();
  }
  edit(id){

    this.risk_form.reset();
    this.risk_catch.forEach(c => {
      if(c.risk_id == id){
        this.risk_form.setValue({
          factor: c.factor+"_"+c.risk_id,
          date: c.date,
        });
      }
    });
    // });
    // this.risk_form.setValue({
    //   factor: "Weight less than 4% of pre-pregnancy weight per trimester",
    //   date: "2020-06-05",
    // });
    this.hide.push(id);
    console.log(this.hide.includes(id));
    
    console.log(this.risk_form.get('factor').value, " factor value");
    
   console.log(id," risk_id edit");
   
  }
}
