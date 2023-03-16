import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-result-form',
  templateUrl: './result-form.component.html',
  styleUrls: ['./result-form.component.scss']
})
export class ResultFormComponent implements OnInit {
  @Output() showReturn = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Input() return_value;

  constructor() { }


  closeModal(){
    this.toggleModal.emit();
  }

  is_error_array: any;
  show_form: boolean = false;
  ngOnInit(): void {
    this.is_error_array = Array.isArray(this.return_value.errors);
    this.show_form = true;
  }

}
