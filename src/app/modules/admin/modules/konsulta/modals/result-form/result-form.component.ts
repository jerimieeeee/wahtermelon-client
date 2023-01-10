import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-result-form',
  templateUrl: './result-form.component.html',
  styleUrls: ['./result-form.component.scss']
})
export class ResultFormComponent implements OnInit {
  @Output() showReturn = new EventEmitter<any>();
  @Input() return_value;

  constructor() { }

  closeModal(){
    this.showReturn.emit();
  }

  ngOnInit(): void {
  }

}
