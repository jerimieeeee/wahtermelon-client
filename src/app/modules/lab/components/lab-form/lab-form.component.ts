import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lab-form',
  templateUrl: './lab-form.component.html',
  styleUrls: ['./lab-form.component.scss']
})
export class LabFormComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_lab;

  is_saving: boolean = false;

  onSubmit(){
    this.is_saving = true;
    let result = {
      id: this.selected_lab.id,
      type: this.selected_lab.type
    }

    this.http.post('url', result).subscribe({
      next: (data: any) => {
        console.log(data);
        this.is_saving = false;
        this.toastr.success('Lab result was recorded!','Laboratory Result');
        this.closeModal();
      },
      error: err => console.log(err)
    })
  }

  closeModal(){
    this.toggleModal.emit('add');
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

}
