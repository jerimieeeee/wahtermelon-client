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

  flip(): void{
    this.focused = !this.focused;
    this.focused2 = !this.focused2;
  }

  formCheck(){
    console.log(this.form.service_date);
  }
 
  onChange(data_input) {
    data_input = data_input + data_input;
    console.log(data_input);
    if( data_input == ''){
      this.typing = true;
    }else{
    this.typing = false;
    }

  }
}
