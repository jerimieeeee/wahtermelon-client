import { Component, OnInit, Input } from '@angular/core';
import { faHome, faCalendarDay, faFlask, faTimes, faSave, faTimesCircle, faPencil, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fpchart',
  templateUrl: './fpchart.component.html',
  styleUrls: ['./fpchart.component.scss']
})
export class FpchartComponent implements OnInit {
  focused: boolean;
  faCalendarDay = faCalendarDay;
  faTimes = faTimes;
  faSave = faSave;
  faTimesCircle = faTimesCircle;
  faPencil = faPencil;
  
  textbox: boolean;
  focused2: boolean;
  typing: boolean;
  public keyUp = [];
  public buttons = [];
  constructor() { }
  public form = {
  service_date: '',
  source: '',
  quantity: '',
  next_service: '',
  remarks: '',
 };
 fp_form : FormGroup;
 service_date : Date = new Date();
 source: String = new String();
 quantity: Number = new Number();
 next_service : Date = new Date();
 remarks: String = new String();

  ngOnInit(){
    this.createForm();

    console.log("init fpchart");
    
    this.focused = false;
    this.typing = true;
    this.fp_form.reset();
  }
  createForm(){
    this.fp_form = new FormGroup({
      service_date : new FormControl(this.service_date),
      source : new FormControl(this.source),
      quantity : new FormControl(this.quantity),
      next_service : new FormControl(this.next_service),
      remarks : new FormControl(this.remarks),
    });
  }
  cancel(){
    this.keyUp = [];
    this.fp_form.reset();
  }
  saveForm(data){
    this.fp_form.setValue({
      service_date : data.service_date,
      source : data.source,
      quantity : data.quantity,
      next_service : data.next_service,
      remarks : data.remarks
    });
    this.fp_form.disable();
  }
  flip(): void{
    this.focused = !this.focused;
    this.keyUp = [];
    this.buttons = [];
    this.buttons.push('save');
    // this.fp_form.reset();
  }

  edit(){
    this.fp_form.enable();
  }

  clearForm(id){
    this.fp_form.get(id).reset();
    this.keyUp.splice(this.keyUp.indexOf(id),1);
    // this.onKeyUp('', id);
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
}
