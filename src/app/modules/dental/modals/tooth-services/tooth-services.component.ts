import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tooth-services',
  templateUrl: './tooth-services.component.html',
  styleUrls: ['./tooth-services.component.scss']
})
export class ToothServicesComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_tooth;
  @Input() selected_visit;

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  tooth_services: any = [];
  is_saving: boolean = false;

  toothServiceForm: FormGroup = new FormGroup({
    consult_id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    tooth_number: new FormControl<string| null>(null),
    service_code: new FormControl<number| null>(null),
    remarks: new FormControl<string| null>(null),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.toothServiceForm.controls;
  }

  onSubmit(){
    this.is_saving = true;
    this.http.post('dental/tooth-service', this.toothServiceForm.value).subscribe({
      next: (data: any) => {
        this.toastr.success('Successfully recorded', 'Tooth Service');
        this.is_saving = false;
        this.closeModal();
      },
      error: err => { this.http.showError(err.error.message, 'Tooth Service') }
    })
  }

  createForm() {
    this.toothServiceForm = this.formBuilder.nonNullable.group({
      id: [''],
      consult_id: [this.selected_visit.id, [Validators.required]],
      patient_id: [this.selected_visit.patient.id, [Validators.required]],
      tooth_number: [this.selected_tooth.tooth_number, [Validators.required]],
      service_code: [null, [Validators.required]],
      remarks: [null],
    });
  }

  loadLibraries() {
    this.http.get('libraries/dental-tooth-service').subscribe({
      next: (data: any) => {
        this.tooth_services = data.data;
        this.createForm();
      },
      error: err => { this.http.showError(err.error.message, 'Tooth Services Library') }
    })
  }

  closeModal(){
    this.toggleModal.emit('tooth_services');
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
