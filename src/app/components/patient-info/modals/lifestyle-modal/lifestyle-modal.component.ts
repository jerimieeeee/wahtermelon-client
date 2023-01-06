import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lifestyle-modal',
  templateUrl: './lifestyle-modal.component.html',
  styleUrls: ['./lifestyle-modal.component.scss']
})
export class LifestyleModalComponent implements OnInit, OnChanges {
  @Output() loadData = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_info;
  @Input() social_history;
  answers: any;
  answers_yn: any;

  is_saving: boolean = false;

  lifestyleForm: FormGroup = new FormGroup({
    patient_id: new FormControl<string| null>(''),
    smoking: new FormControl<string| null>(''),
    pack_per_year: new FormControl<number| null>(null),
    alcohol: new FormControl<string| null>(null),
    bottles_per_day: new FormControl<number| null>(null),
    illicit_drugs: new FormControl<string| null>(null),
    sexually_active: new FormControl<string| null>(null)
  });


  get f(): { [key: string]: AbstractControl } {
    return this.lifestyleForm.controls;
  }

  onSubmit(){
    this.is_saving = true;

    console.log(this.lifestyleForm);
    this.http.post('patient-social-history/history', this.lifestyleForm.value).subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.saveComplete()
      },
      error: err => console.log(err)
    });
  }

  saveComplete(){
    this.is_saving = false;
    this.toastr.success('Successfully recorded!','Social History');
    this.closeModal();
  }

  disableFields(){
    if(this.lifestyleForm.value.smoking !== 'Y') {
      this.lifestyleForm.patchValue({pack_per_year: null})
      // this.lifestyleForm.controls.pack_per_year.disable();
    } else {
      this.lifestyleForm.controls.pack_per_year.enable();
    }

    if(this.lifestyleForm.value.alcohol !== 'Y') {
      this.lifestyleForm.patchValue({bottles_per_day: null})
      // this.lifestyleForm.controls.bottles_per_day.disable();
    } else {
      this.lifestyleForm.controls.bottles_per_day.enable();
    }
  }

  loadLibraries(){
    this.http.get('libraries/social-history').subscribe({
      next: (data: any) => this.answers = data.data,
      error: err => console.log(err)
    })

    this.http.get('libraries/ncd-answers-s2').subscribe({
      next: (data: any) => this.answers_yn = data.data,
      error: err => console.log(err)
    })
  }

  createForm(){
    if(this.patient_info){
      this.lifestyleForm = this.formBuilder.nonNullable.group({
        patient_id: [this.patient_info.id],
        smoking: [null, Validators.required],
        pack_per_year: [null],
        alcohol: [null, Validators.required],
        bottles_per_day: [null],
        illicit_drugs: [null, Validators.required],
        sexually_active: [null, Validators.required],
      });

      this.disableFields()
    }
  }

  closeModal(){
    this.toggleModal.emit('lifestyle');
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.lifestyleForm.patchValue({...this.social_history[0]});
    this.disableFields();
  }

  ngOnInit(): void {
    this.createForm();
    this.loadLibraries();


    if(this.social_history) {
      this.lifestyleForm.patchValue({...this.social_history[0]});
    }
  }
}
