import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faUpload } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-import-xml',
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './import-xml.component.html',
  styleUrl: './import-xml.component.scss'
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

    this.http.post('eclaims/import-xml', formData).subscribe({
      next: (data:any) => {
        console.log(data);
        if (data && data.data.files) {
          this.decodeFiles(data.data.files);
        }

        this.is_uploading = false;
        // this.closeModal();
        this.showToast('success','Uploaded '+ this.uploaded_count +' of '+this.file_upload_count+' files', 'Upload Success')
      },
      error: err => {
        console.log(err);
        this.is_uploading = false;
        this.toastr.error('Error Uploading', 'XML Uplaod');
      }
    })
  }

  decodeFiles(files) {
    files.forEach((file, index) => {
      // Decode base64 string to binary data
      const byteCharacters = atob(file.base64_encoded);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: file.mime_type });

      // Generate a default filename based on MIME type
      const extension = this.getExtensionFromMime(file.mime_type);
      const fileName = `document_${index + 1}.${extension}`;

      // Trigger download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();

      // Cleanup
      URL.revokeObjectURL(link.href);
    });
  }

  getExtensionFromMime(mimeType: string): string {
    const mimeMap: { [key: string]: string } = {
      'application/pdf': 'pdf',
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      'application/msword': 'doc',
      'application/vnd.ms-excel': 'xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
      // add more if needed
    };

    return mimeMap[mimeType] || 'bin'; // fallback to .bin
  }
  /* downloadFile(fileUrl: string, fileName: string): void {
    this.http.get(fileUrl, { responseType: 'blob' as 'json' }).subscribe({
      next: (fileBlob: any) => {
        // Create a link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(fileBlob); // Create a URL for the Blob
        link.download = fileName; // Set the download file name
        link.click(); // Trigger the download
      },
      error: err => {
        console.error('Error downloading the file', err);
      }
    });
  } */

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
    this.toggleModal.emit('import-xml');
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }
}
