import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faAngleDown, faCalendarDay, faCaretRight, faClose, faInfoCircle, faPencil, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';


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
  @Input() risk_factors;
  searching: boolean;
  constructor(private http: HttpService) { }
  
  ngOnInit(): void {
    this.createForm();
    this.searching = false;
  }

  createForm() {
    this.risk_form = new FormGroup({
      factor: new FormControl(),
      date: new FormControl(new Date().toISOString().substring(0,10)),
    });
  }

searchfocus() {
  document.getElementById("searchbar").focus();
  this.searching = true;
}
searchblur() {
  this.searching = false;
}
  saveForm(data) {
    // const strs = ['valval', 'bal', 'gal', 'dalval'];
    // const result = strs.filter(s => s.includes('val'));
  
    // console.log(strs);
    // console.log(result); ------> good for filtering searches 
    console.log(data, "data");
    console.log(data.factor, " factor");
    
    
    data.factor = data.factor.split('_');
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
      hospital_flag: data.factor[2],
      monitor_flag: data.factor[3],
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
    this.hide.push(id);
    console.log(this.hide.includes(id));
    
    console.log(this.risk_form.get('factor').value, " factor value");
    
   console.log(id," risk_id edit");
   
  }
}
