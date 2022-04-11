import { Component, OnInit, Input } from '@angular/core';
import { faHome, faCalendarDay, faFlask } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fpchart',
  templateUrl: './fpchart.component.html',
  styleUrls: ['./fpchart.component.scss']
})
export class FpchartComponent implements OnInit {
  focused: boolean;
  faCalendarDay = faCalendarDay;
  textbox: boolean;
  focused2: boolean;
  typing: boolean;
  public keyUp = [];
  constructor() { }
  public form = {
  service_date: '',
  source: '',
  quantity: '',
  next_service: '',
  remarks: '',
 };
  

  ngOnInit(){
    console.log("init fpchart");
    
    this.focused = true;
    this.focused2 = false;
    this.typing = true;
  }

  flip(){
    this.focused = !this.focused;
    this.focused2 = !this.focused2;
    this.keyUp = [];
  }

  formCheck(){
    console.log(this.form.service_date);
  }
 
  onKeyUp(data_input: string, id: string){
    console.log(data_input + " data_input");
    console.log(id + " id");
        if(this.keyUp.includes(id)){
          if(data_input == ''){
            this.keyUp.splice(this.keyUp.indexOf(id), 1);
          }
        }else{
          this.keyUp.push(id);
        }
        console.log(this.keyUp);
        
  }
}
