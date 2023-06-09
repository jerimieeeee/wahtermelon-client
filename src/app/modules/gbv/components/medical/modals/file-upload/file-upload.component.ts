import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCircleNotch, faFileUpload, faUpload } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Output() toggleFileModal = new EventEmitter<any>();
  @Input() gbv_id;
  @Input() patient_id;

  faUpload = faUpload;
  faCircleNotch = faCircleNotch;
  faFileUpload = faFileUpload;
  is_uploading: boolean = false;

  file_to_upload: any = null;
  file: any = null;

  file_title: string;
  file_description: string
  onFileChange(event: any): void {
    console.log(event.target.files[0])
    this.file_to_upload = event.target.files[0];
  }

  file_error: boolean = false;

  uploadFile(fileToUpload){
    this.is_uploading = true;

    if(this.file_to_upload.type === 'application/pdf') {
      this.file_error = false;
      const formData: FormData = new FormData();
      formData.append('file', this.file_to_upload);
      formData.append('file_title', this.file_title);
      formData.append('file_desc', this.file_description);
      formData.append('patient_id', this.patient_id);
      formData.append('patient_gbv_id', this.gbv_id);

      this.http.post('gender-based-violence/patient-gbv-file-upload', formData).subscribe({
        next: (data:any) => {
          this.toastr.success('Successfully uploaded', 'File Upload');
          this.closeModal();
          // this.showToast('success','Uploaded '+ this.uploaded_count +' of '+this.file_upload_count+' files', 'Upload Success')
        },
        error: err => {
          console.log(err)
          this.resetInput();
        }
      })
    } else {
      this.file_error = true;
      this.is_uploading = false;
    }
  }

  resetInput(){
    this.is_uploading = false;
    this.file_to_upload = null;
    this.file = null;
  }

  closeModal(){
    this.toggleFileModal.emit('file_upload');
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }
}
