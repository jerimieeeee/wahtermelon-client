import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.scss']
})
export class HistoryModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();

  historyForm: FormGroup = new FormGroup({
    history_allergy: new FormControl<string| null>(''),
    history_cancer: new FormControl<string| null>(null),
    history_hepatitis: new FormControl<string| null>(null),
    history_hypertension: new FormControl<string| null>(null),
    history_tuberculosis: new FormControl<string| null>(null),
    history_tuberculosis_cat: new FormControl<string| null>(null),
    history_bool: new FormGroup({
      history_asthma: new FormControl<boolean| null>(null),
      history_diabetes_mellitus: new FormControl<boolean| null>(null),
      history_cerebrovascular: new FormControl<boolean| null>(null),
      history_coronary_arthery: new FormControl<boolean| null>(null),
      history_emphysema: new FormControl<boolean| null>(null),
      history_epilepsy: new FormControl<boolean| null>(null),
      history_hyperlipedemmia: new FormControl<boolean| null>(null),
      history_peptic_ulcer: new FormControl<boolean| null>(null),
      history_pneumonia: new FormControl<boolean| null>(null),
      history_thyroid: new FormControl<boolean| null>(null),
      history_uti: new FormControl<boolean| null>(null)
    }),
    history_remarks: new FormControl<string| null>(null)
  });

  history_list = [
    {
      history_id: 1,
      history_desc: 'Asthma',
      history_var: 'history_asthma'
    },
    {
      history_id: 2,
      history_desc: 'Diabetes Mellitus',
      history_var: 'history_diabetes_mellitus'
    },
    {
      history_id: 3,
      history_desc: 'Cerebrovascular',
      history_var: 'history_cerebrovascular'
    },
    {
      history_id: 4,
      history_desc: 'Coronary Arthery Disease',
      history_var: 'history_coronary_arthery'
    },
    {
      history_id: 5,
      history_desc: 'Emphysema',
      history_var: 'history_emphysema'
    },
    {
      history_id: 6,
      history_desc: 'Epilepsy/Seizure Disorder',
      history_var: 'history_epilepsy'
    },
    {
      history_id: 7,
      history_desc: 'Hyperlipidemia',
      history_var: 'history_hyperlipedemmia'
    },
    {
      history_id: 8,
      history_desc: 'Peptic Ulcer Disease',
      history_var: 'history_peptic_ulcer'
    },
    {
      history_id: 9,
      history_desc: 'Pneumonia',
      history_var: 'history_pneumonia'
    },
    {
      history_id: 10,
      history_desc: 'Thyroid Disease',
      history_var: 'history_thyroid'
    },
    {
      history_id: 11,
      history_desc: 'Urinary Track Infection',
      history_var: 'history_uti'
    },
  ]
  constructor(
    private formBuilder: FormBuilder
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.historyForm.controls;
  }

  onSubmit(){
    console.log(this.historyForm);
  }

  closeModal(){
    this.toggleModal.emit('history-modal')
  }

  ngOnInit(): void {
  }

}
