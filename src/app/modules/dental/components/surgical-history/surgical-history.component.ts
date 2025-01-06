import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-surgical-history',
    templateUrl: './surgical-history.component.html',
    styleUrls: ['./surgical-history.component.scss'],
    standalone: false
})
export class SurgicalHistoryComponent implements OnInit {
  @Output() loadSelectedConsult = new EventEmitter<any>();
  @Input() selected_visit;

  faEdit = faEdit;
  faPlus = faPlus;
  faTrash = faTrash;
  faCircleNotch = faCircleNotch;

  modals: any = [];
  is_saving: boolean = false;

  surgicalHistoryForm = new FormGroup({
    id: new FormControl<string| null>(null),
    patient_id: new FormControl<string| null>(null),
    operation_date: new FormControl<string| null>(null),
    operation: new FormControl<string| null>(null),
  });

  onSubmit(){
    this.is_saving = true;
    this.http.post('patient-surgical-history/history', this.surgicalHistoryForm.value).subscribe({
      next: (data:any) => {
        this.is_saving = false;
        this.loadSelectedConsult.emit();

        this.createForm();
        let message: string = this.surgicalHistoryForm.value.id ? 'updated' : 'recorded';
        this.toastr.success('Successfully ' + message, 'Surgical History');
      },
      error: err => { this.http.showError(err.error.message, 'Surgical History'); this.is_saving = false; }
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.surgicalHistoryForm.controls;
  }

  url: string = 'patient-surgical-history/history/';
  delete_desc: string = 'Surgical history';
  delete_id: string;

  toggleModal(name, data?) {
    if(data) this.delete_id = data.id;
    this.modals[name] = !this.modals[name];

    if(this.modals[name] === false) {
      this.loadSelectedConsult.emit();
    }
  }

  createForm(){
    this.surgicalHistoryForm = this.formBuilder.nonNullable.group({
      id: [''],
      patient_id: [this.selected_visit.patient.id, [Validators.required, Validators.minLength(2)]],
      operation_date: ['', [Validators.required, Validators.minLength(2)]],
      operation: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }
}
