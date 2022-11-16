import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-vaccine-action-modal',
  templateUrl: './vaccine-action-modal.component.html',
  styleUrls: ['./vaccine-action-modal.component.scss'],
  animations: [
    trigger('openCloseTrigger', [
      transition(':enter', [
        style({width: 0, opacity: 0}),
        animate('200ms', style({ opacity: '100%'})),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class VaccineActionModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() vaccine_to_edit;

  faTrash = faTrash;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService
  ) {

  }

  confirm_code: string = "0000";
  confirmation_code: string;
  showDeleteCode: boolean = false;
  showAlert: boolean = false;
  showAlertDelete: boolean = false;
  disableSave: boolean = false;

  vaccine: {
    id: number,
    vaccine_id: string,
    vaccine_date: string;
    status_id: number
  }

  onUpdate(){
    this.http.post('patient/vaccines/'+this.vaccine.id, this.vaccine).subscribe({
      next: (data: any) => { this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      },
      error: err => console.log(err),
      complete: () => console.log('updated')
    })
  }

  onDelete(){
    if(this.confirm_code === this.confirmation_code){
      this.http.delete('patient/vaccines/', this.vaccine.id).subscribe({
        next: (data: any) => {
          this.disableSave = true;
          this.showAlertDelete = true;
          this.showDeleteCode = false;
          this.vaccine.id = undefined;
          this.vaccine.vaccine_id = undefined;
          this.vaccine.vaccine_date = undefined;
          this.vaccine.status_id = undefined;
        },
        error: err => console.log(err),
        complete: () => console.log('updated')
      })
    }else{
      this.generateCode();
      console.log('error');
    }
  }

  showDeleteForm(){
    this.showDeleteCode = true;
    this.generateCode();
  }

  generateCode(){
    this.confirm_code = Math.floor(Math.random() * 1000).toString().padStart(4, '0');
  }

  closeModal(){
    this.toggleModal.emit('vaccine-action-modal')
  }

  ngOnInit(): void {
    this.vaccine = {...this.vaccine_to_edit}
    console.log(this.vaccine);
  }

}
