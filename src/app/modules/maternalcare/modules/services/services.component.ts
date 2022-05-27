import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  focused: boolean;

  constructor() { }
  public keyUp = [];
  public buttons = [];
  ngOnInit(): void {
  }
  flip(): void{
    this.focused = !this.focused;
    this.keyUp = [];
    this.buttons = [];
    this.buttons.push('save');
  }
}
