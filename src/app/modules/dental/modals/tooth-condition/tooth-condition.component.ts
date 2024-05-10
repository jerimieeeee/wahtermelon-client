import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tooth-condition',
  templateUrl: './tooth-condition.component.html',
  styleUrls: ['./tooth-condition.component.scss']
})
export class ToothConditionComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_tooth;

  date = new Date();

  showModal: boolean = false;

  toothNumber: any = [];

  toothConditionForm: FormGroup = new FormGroup({
    facility_code: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    user_id: new FormControl<string| null>(''),
    tooth_number: new FormControl<string| null>(''),
    tooth_condition: new FormControl<number| null>(null)
  });

  condition_list = [
    {id: 'Y',  desc: 'Sound/Sealed'},
    {id: 'D',  desc: 'Decayed'},
    {id: 'F',  desc: 'Filled'},
    {id: 'JC', desc: 'Jacket Crown'},
    {id: 'M',  desc: 'Missing'},
    {id: 'P',  desc: 'Pontic'},
    {id: 'S',  desc: 'Supernumerary'},
    {id: 'Un', desc: 'Unerupted'},
    {id: 'Dx', desc: 'For Extraction'}
  ];

  get f(): { [key: string]: AbstractControl } {
    return this.toothConditionForm.controls;
  }

  onSubmit(){
    console.log(this.toothNumber);
    /* this.http.post('', this.toothConditionForm.value).subscribe({
      next: (data: any) => {
        console.log(data)

        let message: string = 'recorded';
        this.toastr.success('Successfully '+ message, 'Tooth Condition')
      },
      error: err => { this.http.showError(err.error.message, 'Tooth Condition') }
    }) */
  }

  onRightClick(){
    alert('right click');
    return false;
  }

  closeModal(){
    this.toggleModal.emit('tooth_condition');
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    console.log(this.selected_tooth)
  }
}
