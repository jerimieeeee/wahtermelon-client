import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-drug-delete',
    imports: [CommonModule, FontAwesomeModule, FormsModule],
    templateUrl: './drug-delete.component.html',
    styleUrls: ['./drug-delete.component.scss']
})
export class DrugDeleteComponent {
  @Output() toggleForm = new EventEmitter<any>();
  @Output() reloadPrescrition = new EventEmitter<any>();
  @Input() selected_drug;
  faTrash = faTrash;

  confirm_code: string = "0000"
  confirmation_code: string;
  disableSave: boolean = false;

  onSubmit(){
    if(this.confirm_code === this.confirmation_code){
      this.http.delete('medicine/prescriptions/', this.selected_drug.id).subscribe({
        next: () => {
          this.toastr.error('Record was deleted!','Prescription')
        }
      })
    } else {
      this.generateCode();
    }
  }

  generateCode(){
    this.confirm_code = Math.floor(Math.random() * 1000).toString().padStart(4, '0');
  }

  closeModal(){
    this.toggleForm.emit();
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }
}
