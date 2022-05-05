import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { faCalendarDay, faClose, faPencil, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-obshx',
  templateUrl: './obshx.component.html',
  styleUrls: ['./obshx.component.scss']
})
export class ObshxComponent implements OnInit {
  focused: boolean;
  
  obshx_form : FormGroup;
  full_term : Number = new Number();
  pre_term : Number = new Number();
  abortion : Number = new Number();
  livebirths : Number = new Number();
  dld : Date = new Date();
  tld : String = new String();
  pmp : Date = new Date();
  lmp : Date = new Date();
  duration : Number = new Number();



  constructor() { }
  faCalendarDay = faCalendarDay;
  faTimesCircle = faTimesCircle;
  faSave = faSave;
  faClose = faClose;
  faTimes = faTimes;
  faPencil = faPencil;

  public buttons = [];
  public keyUp = [];
  ngOnInit(): void {
    this.focused = true;
    this.createForm();
    this.obshx_form.reset();
  }

  flip(): void{
    this.focused = !this.focused;
  }

  createForm(){
    this.obshx_form = new FormGroup({
      full_term : new FormControl(this.full_term),
      pre_term : new FormControl(this.pre_term),
      abortion : new FormControl(this.abortion),
      livebirths : new FormControl(this.livebirths),
      dld : new FormControl(this.dld),
      tld : new FormControl(this.tld),
      pmp : new FormControl(this.pmp),
      lmp : new FormControl(this.lmp),
      duration : new FormControl(this.duration),
    });
  }

  saveForm(data){
  
    this.obshx_form.setValue({
      full_term : data.full_term,
      pre_term : data.pre_term,
      abortion : data.abortion,
      livebirths : data.livebirths,
      dld : data.dld,
      tld : data.tld,
      pmp : data.pmp,
      lmp : data.lmp,
      duration : data.duration,
    });
    // console.log(data, ' this is my obshx data');
    
    this.obshx_form.disable();
  }

  buttonShow(name){
    this.buttons = [];
    if(!this.buttons.includes(name)){
      this.buttons.push(name);
    }
    // console.log(this.buttons);
    
  }

  edit(){   
    this.obshx_form.enable();
  }
  cancel(){
    this.keyUp = [];
    this.obshx_form.reset();
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

  clearForm(id){
    this.obshx_form.get(id).reset();
    // this.onKeyUp('', id);
  }
}
