import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lab-delete',
  templateUrl: './lab-delete.component.html',
  styleUrls: ['./lab-delete.component.scss']
})
export class LabDeleteComponent {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_lab;
  @Input() user_facility;

  is_saving: boolean = false;

  onSubmit(){
    this.is_saving = true;
    this.http.delete('url', this.selected_lab.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.is_saving = false;
        this.toastr.info('Lab request was deleted!','Laboratory Request');
        this.closeModal();
      },
      error: err => console.log(err)
    })
  }

  closeModal(){
    this.toggleModal.emit('delete');
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }
}
