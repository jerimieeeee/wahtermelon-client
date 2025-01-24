import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-vaccine-action-modal',
    templateUrl: './vaccine-action-modal.component.html',
    styleUrls: ['./vaccine-action-modal.component.scss'],
    animations: [
        trigger('openCloseTrigger', [
            transition(':enter', [
                style({ width: 0, opacity: 0 }),
                animate('200ms', style({ opacity: '100%' })),
            ]),
            transition(':leave', [
                animate('100ms', style({ opacity: 0 }))
            ])
        ]),
    ],
    standalone: false
})
export class VaccineActionModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() vaccine_to_edit;

  faTrash = faTrash;

  constructor(
    private http: HttpService,
    private toastr: ToastrService
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
    this.http.update('patient-vaccines/vaccines/', this.vaccine.id, this.vaccine).subscribe({
      next: () => {
        this.showToastr('success', 'Succcessfully updated!', 'Vaccine record');
      },
      error: err => console.log(err)
    })
  }

  onDelete(){
    if(this.confirm_code === this.confirmation_code){
      this.http.delete('patient-vaccines/vaccines/', this.vaccine.id).subscribe({
        next: () => {
          this.disableSave = true;
          // this.showAlertDelete = true;
          this.showToastr('error','Record was deleted!','Vaccine record');
        },
        error: err => console.log(err),
        complete: () => console.log('updated')
      })
    }else{
      this.generateCode();
      this.toastr.info('Code mismatch, please try again', 'Incorrect Code')
      console.log('error');
    }
  }

  showToastr(type: string, message: string, title: string) {
    this.toastr[type](message, title);
    this.closeModal();
  }

  showDeleteForm(){
    this.showDeleteCode = true;
    this.generateCode();
  }

  generateCode(){
    this.confirm_code = Math.floor(Math.random() * 1000).toString().padStart(4, '0');
  }

  closeModal(){
    console.log('test')
    this.toggleModal.emit({modal_name: 'vaccine-action'})
  }

  ngOnInit(): void {
    this.vaccine = {...this.vaccine_to_edit}
  }

}
