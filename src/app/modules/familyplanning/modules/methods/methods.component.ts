import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { faCalendarDay, faCaretDown, faInfoCircle, faPencil, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.scss']
})
export class MethodsComponent implements OnInit {
  show: boolean;

  constructor() { }
  public focused: boolean;
  faCalendarDay = faCalendarDay;
  faTimes = faTimes;
  faSave = faSave;
  faTimesCircle = faTimesCircle;
  faPencil = faPencil;
  faInfoCircle = faInfoCircle;
   
  methods_form : FormGroup;
  method : String = new String();
  partner : String = new String();
  type : String = new String();

  public keyUp = [];
  public buttons = [];
  public fp_methods = [
    {"id": 1, "method": "Condom"},
    {"id": 2, "method": "Injectibles"},
    {"id": 3, "method": "Implant"},
    {"id": 4, "method": "NA"},
  ];
  ngOnInit(): void {
    this.focused = false;
    this.createForm();
    this.methods_form.enable();
  }
  createForm(){
    this.methods_form = new FormGroup({
      date : new FormControl(new Date().toISOString().substring(0,10)),
      method : new FormControl(this.method),
      partner : new FormControl(this.partner),
      type : new FormControl(this.type),
    });
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
  saveForm(data){
    this.methods_form.setValue({
      date : data.date,
      method : data.method,
      partner : data.partner,
      type : data.type,
    });
    console.log(this.methods_form.value, " tis my methods my lady");
    
    this.methods_form.disable();
  }
  cancel(){
    this.keyUp = [];
    this.methods_form.reset();
  }
  flip(){
    console.log('flip');
    this.focused = !this.focused;
  }

  drop(){
    this.show = !this.show;
  }
  edit(){
    this.methods_form.enable();
  }
  buttonShow(name){
    this.buttons = [];
    if(!this.buttons.includes(name)){
      this.buttons.push(name);
    }
    // console.log(this.buttons);
    
  }
  clearForm(id){
    this.methods_form.get(id).reset();
    this.keyUp.splice(this.keyUp.indexOf(id),1);
    // this.onKeyUp('', id);
  }
}
