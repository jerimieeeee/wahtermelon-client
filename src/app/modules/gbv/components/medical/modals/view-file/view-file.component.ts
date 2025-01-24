import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
    selector: 'app-view-file',
    templateUrl: './view-file.component.html',
    styleUrls: ['./view-file.component.scss'],
    standalone: false
})
export class ViewFileComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_file_id;

  @ViewChild('pdfViewer') pdfViewer!: ElementRef;

  faCircleNotch = faCircleNotch;

  show_form: boolean = false;

  showFile(){
    this.http.get('gender-based-violence/patient-gbv-file-upload/'+this.selected_file_id, { responseType: 'blob' }).subscribe({
      next: (data:any) => {
        console.log(data)
        this.show_form = true;
        if(this.show_form){
          const blob = new Blob([data], {type: 'application/pdf'});
          const url = URL.createObjectURL(blob);
          this.pdfViewer.nativeElement.src = url;
        }
      },
      error: err => console.log(err)
    });
  }

  closeModal(){
    this.toggleModal.emit('view_file');
  }

  constructor (
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.showFile()
  }
}
