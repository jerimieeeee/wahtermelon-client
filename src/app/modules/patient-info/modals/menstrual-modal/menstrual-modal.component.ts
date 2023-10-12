import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menstrual-modal',
  templateUrl: './menstrual-modal.component.html',
  styleUrls: ['./menstrual-modal.component.scss']
})
export class MenstrualModalComponent implements OnInit, OnChanges {
  @Output() loadData = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_info;
  @Input() menstrual_history;
  @Input() fp_method;

  is_saving: boolean = false;
  max_date = formatDate(new Date, 'yyyy-MM-dd', 'en', 'Asia/Manila');

  menstrualForm: FormGroup = new FormGroup({
    patient_id: new FormControl<string| null>(null),
    menarche: new FormControl<number| null>(null),
    lmp: new FormControl<string| null>(null),
    period_duration: new FormControl<number| null>(null),
    cycle: new FormControl<number| null>(null),
    pads_per_day: new FormControl<number| null>(null),
    onset_sexual_intercourse: new FormControl<number| null>(null),
    method: new FormControl<string| null>(null),
    menopause: new FormControl<boolean| null>(null),
    menopause_age: new FormControl<number| null>(null)
  });

  onSubmit(){
    console.log(this.menstrualForm.value);
    this.http.post('patient-menstrual-history/history', this.menstrualForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastr.success('Successfully recorded!','Menstual History');
        this.closeModal()
      },
      error: err => console.log(err)
    })
  }

  createForm(){
    if(this.patient_info){
      this.menstrualForm = this.formBuilder.nonNullable.group({
        patient_id: [this.patient_info.id],
        menarche: [null],
        lmp: [null],
        period_duration: [null],
        cycle: [null],
        pads_per_day: [null],
        onset_sexual_intercourse: [null],
        method: ['NA', Validators.required],
        menopause: [false, Validators.required],
        menopause_age: [null],
      });

      if(this.menstrual_history){
        this.patchValue()
      }
    }
  }

  patchValue() {
    this.menstrualForm.patchValue({...this.menstrual_history[0]})
    this.menstrualForm.patchValue({
      menopause: this.menstrual_history[0].menopause === 0 ? false: true,
      lmp: formatDate(this.menstrual_history[0].lmp, 'yyyy-MM-dd', 'en', 'Asia/Manila')
    })
    console.log(this.menstrualForm.value)
  }

  closeModal(){
    this.toggleModal.emit('menstrual');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.menstrualForm.controls;
  }

  ngOnChanges(changes: SimpleChanges): void {
    /* if(this.menstrual_history){
      console.log(this.menstrual_history)
      // this.menstrualForm.patchValue({...this.menstrual_history[0]});
      this.menstrualForm.patchValue({
        menopause: this.menstrual_history[0].menopause === 0 ? false: true,
        lmp: formatDate(this.menstrual_history[0].lmp, 'yyyy-MM-dd', 'en', 'Asia/Manila')
      })
      console.log(this.menstrualForm.value)
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
