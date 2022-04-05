import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-firsvisit',
  templateUrl: './firsvisit.component.html',
  styleUrls: ['./firsvisit.component.scss']
})
export class FirsvisitComponent implements OnInit {
  focused: boolean;
  focused2: boolean;
  typing: boolean;

  constructor(  private router: Router) { }
  public sampleForm = {
    alc: '3',
    dlc: '3',
    bi: '2',
    ami: '3',
   };
  ngOnInit(): void {
    console.log("init FV");
    if(this.sampleForm != null){
      this.focused = false;
    }else{
      this.focused = true;
    }
    this.typing = true;
  }

  flip(): void{
    this.focused = !this.focused;
    // this.focused2 = !this.focused2;
  }

  edit(){
    this.sampleForm.alc = '';
    this.sampleForm.dlc = '';
    this.sampleForm.bi = '';
    this.sampleForm.ami = '';
  }
  onChange(data_input) {
    data_input = data_input;
    console.log(data_input);
    if( data_input == ''){
      this.typing = true;
    }else{
    this.typing = false;
    }

  }
}
