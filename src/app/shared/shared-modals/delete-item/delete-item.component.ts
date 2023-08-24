import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
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
  imports: [FontAwesomeModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteItemComponent implements OnChanges, AfterViewInit{
  @ViewChild('confirmCode', {static: false}) inputElement: ElementRef;
  @Output() toggleModal = new EventEmitter<any>();
  @Input() url;
  @Input() delete_id;
  @Input() delete_desc;

  faTrash = faTrash;

  confirm_code: string = "0000";
  confirmation_code: string;
  is_loading: boolean = false;

  generateCode(){
    this.is_loading = false;
    this.confirmation_code = null
    this.confirm_code = Math.floor(Math.random() * 1000).toString().padStart(4, '0');
  }

  onSubmit() {
    this.is_loading = true;
    if(this.confirm_code === this.confirmation_code){
      this.http.delete(this.url, this.delete_id).subscribe({
        next: () => {
          this.is_loading = false;
          // this.showAlertDelete = true;
          this.toastr.error('Record was deleted!');
          this.closeModal();
        },
        error: err => {
          console.log(err)
          this.is_loading = false;
          this.generateCode();
        }
      })
    }else{
      this.generateCode();
      this.toastr.info('Code mismatch, please try again', 'Incorrect Code');
    }
  }

  closeModal() {
    this.toggleModal.emit('delete-item');
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.generateCode();
  }

  ngAfterViewInit(): void {
    this.inputElement.nativeElement.focus();
  }
}
