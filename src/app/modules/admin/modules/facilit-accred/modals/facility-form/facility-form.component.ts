import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-facility-form',
    templateUrl: './facility-form.component.html',
    styleUrls: ['./facility-form.component.scss'],
    standalone: false
})
export class FacilityFormComponent implements OnInit, OnChanges {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() credential_to_edit;

  accredForm: FormGroup = new FormGroup({
    program_code: new FormControl<string| null>(null),
    facility_name: new FormControl<string| null>(null),
    accreditation_number: new FormControl<string| null>(null),
    pmcc_number: new FormControl<string| null>(null),
    software_certification_id: new FormControl<string| null>(null),
    cipher_key: new FormControl<string| null>(null),
    username: new FormControl<string| null>(''),
    password: new FormControl<string| null>(''),
  });

  onSubmit() {
    if(this.accredForm.valid) {
      this.http.post('settings/philhealth-credentials', this.accredForm.value).subscribe({
        next: () => {
          this.toastr.success('Recorded successfully!','Accreditation Credentials')
          this.closeModal();
        },
        error: err => console.log(err)
      })
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.accredForm.controls;
  }

  createForm(){
    this.accredForm = this.formBuilder.group({
      program_code: [null, Validators.required],
      facility_name: [null, Validators.required],
      accreditation_number: [null, Validators.required],
      pmcc_number: [null, Validators.required],
      software_certification_id: [null, Validators.required],
      cipher_key: [null, Validators.required],
      username: [''],
      password: [''],
    });
  }

  programs: any;

  loadLibraries(){
    this.http.get('libraries/philhealth-programs').subscribe({
      next: (data: any) => {
        this.programs = data.data;
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.createForm();
    if(this.credential_to_edit) {
      this.accredForm.patchValue({...this.credential_to_edit})
    }
  }

  closeModal() {
    this.toggleModal.emit('add');
  }

  ngOnInit(): void {
    // console.log(this.accredForm)
    this.loadLibraries();
  }
}
