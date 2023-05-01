import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss']
})
export class PhotoModalComponent implements OnDestroy {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_info;

  faXmark = faXmark;

  private trigger: Subject<any> = new Subject();
  private nextWebcam: Subject<any> = new Subject();
  public webcamImage: WebcamImage = null;
  sysImage: any ;

  getSnapshot(): void {
    this.trigger.next(void 0);
  }

  captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = this.webcamImage.imageAsDataUrl;
  }

  toggleCamera(){
    // console.log('test')
    this.webcamImage = null;
  }

  get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  progress: number;
  onSubmit(){
    if(this.sysImage) {
      const blobImage = this.dataURItoBlob(this.sysImage);
      console.log(blobImage);
      const formData = new FormData();
      formData.append('image', blobImage, 'image.jpg');
      formData.append('id', this.http.getPatientInfo().id.toString());

      this.http.post('images', formData).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: err => console.log(err)
      });
    } else {
      this.toastr.error('No image to upload.', 'Error');
    }
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  }

  closeModal(){
    this.toggleModal.emit('vaccine-moodal');
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnDestroy(): void {
      this.trigger.unsubscribe();
      this.nextWebcam.unsubscribe();
  }


}
