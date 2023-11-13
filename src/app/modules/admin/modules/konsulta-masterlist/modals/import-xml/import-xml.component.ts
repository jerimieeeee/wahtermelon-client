import { Component, EventEmitter, Output } from '@angular/core';
import { faCircleNotch, faUpload } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-import-xml',
  templateUrl: './import-xml.component.html',
  styleUrls: ['./import-xml.component.scss']
})
export class ImportXmlComponent {
  @Output() toggleModal = new EventEmitter<any>();
  @Output() loadList = new EventEmitter<any>();

  faUpload = faUpload;
  faCircleNotch = faCircleNotch;

  is_uploading: boolean = false;
  file_to_upload: any = null;
  xmlFile: any = null;
  cipher_key: string;

  readXML(files: FileList){
    this.file_to_upload = files;
  }

  file_upload_count: number;
  uploaded_count: number = 0;

  uploadFile(fileToUpload){
    this.is_uploading = true;

    const formData: FormData = new FormData();
    this.file_upload_count = fileToUpload.length;
    this.uploaded_count = 0;
    for (let index = 0; index < fileToUpload.length; index++) {

      let name = fileToUpload[index].name.split('.');
      this.uploaded_count += 1;
      formData.append('xml[]', fileToUpload[index])
    }

    formData.append('cipher_key', this.cipher_key);

    this.http.post('konsulta/upload-registration', formData).subscribe({
      next: (data:any) => {
        this.loadList.emit();
        this.is_uploading = false;
        this.closeModal()
        this.showToast('success','Uploaded '+ this.uploaded_count +' of '+this.file_upload_count+' files', 'Upload Success')
      },
      error: err => {
        console.log(err);
        this.toastr.error('Error Uploading', 'XML Uplaod');
        this.resetInput();
      }
    })
  }

  showToast(type, message, title) {
    this.toastr[type](message, title, {
      closeButton: true,
      positionClass: 'toast-top-center',
      disableTimeOut: true
    })
  }

  resetInput(){
    this.is_uploading = false;
    this.file_to_upload = null;
    this.xmlFile = null;
    this.cipher_key = null;
  }

  closeModal() {
    this.toggleModal.emit('import_xml');
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }
}
