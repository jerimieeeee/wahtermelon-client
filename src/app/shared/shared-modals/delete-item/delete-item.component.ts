import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss'],
  imports: [FontAwesomeModule, FormsModule]
})
export class DeleteItemComponent implements OnInit{
  @Output() toggleModal = new EventEmitter<any>();
  @Input() url;
  @Input() delete_id;
  @Input() delete_desc;

  faTrash = faTrash;

  confirm_code: string = "0000";
  confirmation_code: string;
  is_loading: boolean = false;

  generateCode(){
    this.confirm_code = Math.floor(Math.random() * 1000).toString().padStart(4, '0');
  }

  onSubmit() {
    if(this.confirm_code === this.confirmation_code){
      this.http.delete(this.url, this.delete_id).subscribe({
        next: () => {
          this.is_loading = true;
          // this.showAlertDelete = true;
          this.toastr.error('Record was deleted!','Vaccine record');
          this.closeModal();
        },
        error: err => console.log(err)
      })
    }else{
      this.generateCode();
      this.toastr.info('Code mismatch, please try again', 'Incorrect Code')
      console.log('error');
    }
  }

  closeModal() {
    this.toggleModal.emit('delete-item');
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    console.log(this.delete_id);
    console.log(this.delete_desc);
    console.log(this.url);
    this.generateCode();
  }
}
