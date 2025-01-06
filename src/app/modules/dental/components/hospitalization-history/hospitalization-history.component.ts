import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-hospitalization-history',
    templateUrl: './hospitalization-history.component.html',
    styleUrls: ['./hospitalization-history.component.scss'],
    standalone: false
})
export class HospitalizationHistoryComponent implements OnInit{
  @Output() loadSelectedConsult = new EventEmitter<any>();
  @Input() selected_visit;

  faPlus = faPlus;
  faCircleNotch = faCircleNotch;
  faSave = faSave;
  faTrash = faTrash;

  modals: any = [];
  is_saving: boolean = false;

  hospitalizationHistoryForm = new FormGroup({
    id: new FormControl<string| null>(null),
    patient_id: new FormControl<string| null>(null),
    admission_date: new FormControl<string| null>(null),
    discharge_date: new FormControl<string| null>(null),
    cause: new FormControl<string| null>(null),
  });

  onSubmit(){
    this.is_saving = true;
    this.http.post('patient-hospitalizaion-history/history', this.hospitalizationHistoryForm.value).subscribe({
      next:(data: any) => {
        this.is_saving = false;
        this.loadSelectedConsult.emit();

        this.createForm();

        let message: string = this.hospitalizationHistoryForm.value.id ? 'updated' : 'recorded';
        this.toastr.success('Successfully ' + message, 'Hospitalization History');
      },
      error: err => { this.http.showError(err.error.message, 'Hospitalization History'); this.is_saving = false; }
    })
  }

  url: string = 'patient-hospitalizaion-history/history/';
  delete_desc: string = 'Hospitalization history';
  delete_id: string;

  toggleModal(name, data?) {
    if(data) this.delete_id = data.id;
    this.modals[name] = !this.modals[name];

    if(this.modals[name] === false) {
      this.loadSelectedConsult.emit();
    }
  }

  createForm() {
    this.hospitalizationHistoryForm = this.formBuilder.nonNullable.group({
      id: [''],
      patient_id: [this.selected_visit.patient.id, [Validators.required]],
      admission_date: ['', [Validators.required]],
      discharge_date: ['', [Validators.required]],
      cause: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }
}
