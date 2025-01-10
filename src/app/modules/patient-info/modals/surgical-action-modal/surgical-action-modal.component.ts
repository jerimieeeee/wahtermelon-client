import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-surgical-action-modal',
    templateUrl: './surgical-action-modal.component.html',
    styleUrls: ['./surgical-action-modal.component.scss'],
    standalone: false
})
export class SurgicalActionModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() surgery_to_delete;

  faTrash = faTrash;

  confirm_code: string = "0000";
  confirmation_code: string;

  is_saving: boolean = false;

  onDelete(){
    this.is_saving = true;
    if(this.confirm_code === this.confirmation_code){
      this.http.delete('patient-surgical-history/history/', this.surgery_to_delete.id).subscribe({
        next: () => {
          this.is_saving = false;
          this.toastr.error('Record was deleted!','Surgery record');
          this.closeModal();
        },
        error: err => console.log(err)
      })
    }else{
      this.generateCode();
      this.toastr.info('Code mismatch, please try again', 'Incorrect Code')
    }
  }

  generateCode(){
    this.confirm_code = Math.floor(Math.random() * 1000).toString().padStart(4, '0');
  }

  closeModal(){
    this.toggleModal.emit({modal_name: 'surgical-action'});
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.generateCode();
  }

}
