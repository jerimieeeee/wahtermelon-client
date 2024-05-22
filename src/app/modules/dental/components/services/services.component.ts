import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faCircleNotch, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  @Output() loadSelectedConsult = new EventEmitter<any>();
  @Input() selected_visit;

  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  faTrash = faTrash;

  is_saving: boolean = false;

  modals: any = [];
  delete_id: string;
  url: string = 'dental/service/';
  delete_desc: string = 'Dental Service';

  dentalServiceForm = new FormGroup({
    id: new FormControl<string| null>(null),
    consult_id: new FormControl<string| null>(null),
    patient_id: new FormControl<string| null>(null),
    service_date: new FormControl<string| null>(null),
    service_id: new FormControl<string| null>(null),
  });

  onSubmit(){
    this.is_saving = true;

    this.http.post('dental/service', this.dentalServiceForm.value).subscribe({
      next: (data: any) => {
        this.is_saving = false;
        this.loadSelectedConsult.emit();

        this.createForm();

        let message: string = this.dentalServiceForm.value.id ? 'updated' : 'recorded';
        this.toastr.success('Successfully ' + message, 'Dental Service');
      },
      error: err => { this.http.showError(err.error.message, 'Dental Service'); this.is_saving = false; }
    })
  }

  createForm() {
    this.dentalServiceForm = this.formBuilder.nonNullable.group({
      id: [''],
      consult_id: [this.selected_visit.id, [Validators.required]],
      patient_id: [this.selected_visit.patient.id, [Validators.required]],
      service_date: ['', [Validators.required]],
      service_id: ['', [Validators.required]],
    });

  }

  toggleModal(name, data?) {
    if(data) this.delete_id = data.id;
    this.modals[name] = !this.modals[name];

    if(this.modals[name] === false) {
      this.loadSelectedConsult.emit();
    }
  }

  service_list: any = [];

  loadLibraries(){
    this.http.get('libraries/dental-service').subscribe({
      next:(data: any) => {
        this.service_list = data.data;
        this.createForm();
      },
      error: err => { this.http.showError(err.error.message, 'Dental Services')}
    })
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
