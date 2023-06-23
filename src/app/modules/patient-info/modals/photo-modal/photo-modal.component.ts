import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
export class PhotoModalComponent implements OnDestroy, OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_info;
  @Input() imageData;

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
    this.imageData = null;
    this.webcamImage = null;
    this.sysImage = null;
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
      const formData = new FormData();
      formData.append('image', blobImage);
      formData.append('id', this.id);

      this.http.post('images', formData).subscribe({
        next: (data: any) => {
          this.toastr.success('Photo uploaded', 'Photo');
          this.closeModal();
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
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
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

  newPhoto(){

  }

  id: string;
  for_update: boolean;

  ngOnInit(): void {
    this.id = this.http.getPatientInfo().id.toString();
    this.for_update = false;

    if(this.imageData) this.for_update = true;
    this.sysImage = this.imageData
  }
}
