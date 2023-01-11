import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-preghist-modal',
  templateUrl: './preghist-modal.component.html',
  styleUrls: ['./preghist-modal.component.scss']
})
export class PreghistModalComponent implements OnInit {
  @Output() loadData = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_info;
  @Input() pregnancy_history;
  @Input() delivery_method;

  is_saving: boolean = false;
  max_date = formatDate(new Date, 'yyyy-MM-dd', 'en');

  pregnancyForm: FormGroup = new FormGroup({
    patient_id: new FormControl<string| null>(null),
    gravidity: new FormControl<number| null>(null),
    parity: new FormControl<number| null>(null),
    full_term: new FormControl<number| null>(null),
    preterm: new FormControl<number| null>(null),
    abortion: new FormControl<number| null>(null),
    livebirths: new FormControl<number| null>(null),
    delivery_type: new FormControl<string| null>(null),
    induced_hypertension: new FormControl<string| null>(null),
    with_family_planning: new FormControl<string| null>(null)
  });

  onSubmit(){
    this.is_saving = true;
    // console.log(this.pregnancyForm.value);
    this.http.post('patient-pregnancy-history/history', this.pregnancyForm.value).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.is_saving = false;
        this.toastr.success('Successfully recorded!','Pregnancy History');
        this.closeModal()
      },
      error: err => console.log(err)
    })
  }

  createForm(){
    if(this.patient_info){
      this.pregnancyForm = this.formBuilder.nonNullable.group({
        patient_id: [this.patient_info.id],
        gravidity: [null, Validators.required],
        parity: [null, Validators.required],
        full_term: [null, Validators.required],
        preterm: [null, Validators.required],
        abortion: [null, Validators.required],
        livebirths: [null, Validators.required],
        delivery_type: [null, Validators.required],
        induced_hypertension: [null, Validators.required],
        with_family_planning: [null, Validators.required],
      });

      if(this.pregnancy_history){
        // console.log(this.pregnancy_history)
        this.patchValue()
      }
    }
  }

  patchValue() {
    this.pregnancyForm.patchValue({...this.pregnancy_history})
    this.pregnancyForm.patchValue({
      induced_hypertension: this.pregnancy_history.inducedHypertension.id,
      with_family_planning: this.pregnancy_history.withFamilyPlanning.id,
      delivery_type: this.pregnancy_history.libPregnancyDeliveryType.code
    })
    // console.log(this.pregnancyForm.value)
  }

  closeModal(){
    this.toggleModal.emit('preghist');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.pregnancyForm.controls;
  }

  ngOnChanges(changes: SimpleChanges): void {
    /* if(this.pregnancy_history){
      console.log(this.pregnancy_history)
      // this.pregnancyForm.patchValue({...this.pregnancy_history[0]});
      this.pregnancyForm.patchValue({
        menopause: this.pregnancy_history[0].menopause === 0 ? false: true,
        lmp: formatDate(this.pregnancy_history[0].lmp, 'yyyy-MM-dd', 'en')
      })
      console.log(this.pregnancyForm.value)
    } */
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

}
