import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
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
  public webcamImage: WebcamImage;
  sysImage: any ;

  getSnapshot(): void {
    this.trigger.next(void 0);
  }

  captureImg(webcamImage: WebcamImage): void {
    console.log(this.webcamImage)
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsBase64;
    console.info('got webcam image', this.sysImage);
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

  }

  closeModal(){
    this.toggleModal.emit('vaccine-moodal');
  }

  constructor(

  ) { }

  ngOnDestroy(): void {
      this.trigger.unsubscribe();
      this.nextWebcam.unsubscribe();
  }


}
