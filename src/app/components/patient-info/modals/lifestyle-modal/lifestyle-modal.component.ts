import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lifestyle-modal',
  templateUrl: './lifestyle-modal.component.html',
  styleUrls: ['./lifestyle-modal.component.scss']
})
export class LifestyleModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();

  lifestyleForm: FormGroup = new FormGroup({
    smoking_flag: new FormControl<string| null>(''),
    smoking_count: new FormControl<number| null>(null),
    alcohol_flag: new FormControl<string| null>(null),
    alcohol_count: new FormControl<number| null>(null),
    illicit_drug: new FormControl<string| null>(null)
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.lifestyleForm.controls;
  }

  onSubmit(){
    console.log(this.lifestyleForm);
  }

  closeModal(){
    this.toggleModal.emit('lifestyle-modal')
  }

  ngOnInit(): void {
  }
}
