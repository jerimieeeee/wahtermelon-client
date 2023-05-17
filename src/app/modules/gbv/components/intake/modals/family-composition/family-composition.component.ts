import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-family-composition',
  templateUrl: './family-composition.component.html',
  styleUrls: ['./family-composition.component.scss']
})
export class FamilyCompositionComponent {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_id;
  @Input() patient_gbv_id;
  @Input() selected_family_member;

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  answers: any;
  answers_yn: any;

  is_saving: boolean = false;
  show_error: boolean = false;
  required_message = 'Required field';

  familyForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    patient_gbv_id  : new FormControl<string| null>(''),
    name : new FormControl<string| null>(''),
    child_relation_id : new FormControl<string| null>(''),
    living_with_child_flag: new FormControl<boolean| null>(false),
    age: new FormControl<string| null>(''),
    gender: new FormControl<string| null>(''),
    civil_status_code : new FormControl<string| null>(''),
    employed_flag: new FormControl<string| null>(''),
    occupation_code : new FormControl<string| null>(''),
    education_code : new FormControl<string| null>(''),
    weekly_income : new FormControl<string| null>(''),
    school : new FormControl<string| null>(''),
    company : new FormControl<string| null>(''),
    contact_information : new FormControl<string| null>('')
  });


  get f(): { [key: string]: AbstractControl } {
    return this.familyForm.controls;
  }

  onSubmit(){
    // this.is_saving = true;

    let query;

    console.log(this.selected_family_member)
    console.log(this.familyForm.value)
    if(this.selected_family_member) {
      query = this.http.update('gender-based-violence/patient-gbv-family-composition/', this.selected_family_member.id, this.familyForm);
    } else {
      console.log('store')
      query = this.http.post('gender-based-violence/patient-gbv-family-composition', this.familyForm.value);
    }

    query.subscribe({
      next: (data: any) => {
        console.log(data)
        this.toastr.success('Successfully recorded!', 'Family');
        // this.is_saving = false;
        this.closeModal();
      },
      error: err => console.log(err)
    })
  }

  saveComplete(){
    this.is_saving = false;
    this.toastr.success('Successfully recorded!','Treatment Outcome');
    // this.switchPage.emit(1);
    this.closeModal();
  }

  child_relations: any;
  civil_statuses: any;
  occupations: any;
  educations: any;

  loadLibraries(){
    this.http.get('libraries/child-relation').subscribe({
      next: (data: any) => this.child_relations = data.data,
      error: err => console.log(err)
    });

    this.http.get('libraries/civil-statuses').subscribe({
      next: (data: any) => this.civil_statuses = data.data,
      error: err => console.log(err)
    });

    this.http.get('libraries/occupations').subscribe({
      next: (data: any) => this.occupations = data.data,
      error: err => console.log(err)
    });

    this.http.get('libraries/education').subscribe({
      next: (data: any) => this.educations = data.data,
      error: err => console.log(err)
    });
  }

  createForm(){
    this.familyForm = this.formBuilder.nonNullable.group({
      id: [null],
      patient_id: [this.patient_id],
      patient_gbv_id: [this.patient_gbv_id],
      name: [null, Validators.required],
      child_relation_id: [null, Validators.required],
      living_with_child_flag: [false],
      age: [null, Validators.required],
      gender: [null],
      civil_status_code: [null, Validators.required],
      employed_flag: [null],
      occupation_code: [null],
      education_code: [null],
      weekly_income: [null],
      school: [null],
      company: [null],
      contact_information: [null],
    });

    this.loadLibraries();
  }

  loadSelectedMember(){

  }

  closeModal(){
    this.toggleModal.emit('add_family');
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }
}
