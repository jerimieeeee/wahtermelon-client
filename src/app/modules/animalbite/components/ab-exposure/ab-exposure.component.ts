import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { abExposureForm } from './abExposureForm';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-ab-exposure',
  templateUrl: './ab-exposure.component.html',
  styleUrls: ['./ab-exposure.component.scss']
})
export class AbExposureComponent implements OnInit, OnChanges {
  @Output() updateSelectedAb = new EventEmitter<any>();
  @Input() patient_id;
  @Input() selected_ab_consult;

  faCircleNotch = faCircleNotch;
  faSave = faSave;

  abExposureForm:FormGroup=abExposureForm();
  max_date: string = formatDate(new Date(), 'yyyy-MM-dd', 'en', 'Asia/Manila');

  is_saving: boolean = false;
  show_form: boolean = false;

  animal_types: {};
  animal_ownerships: {};
  exposure_types: {};

  bite_locations = [
    {bite_code: 'feet_flag', bite_desc: 'Feet'},
    {bite_code: 'leg_flag', bite_desc: 'Leg'},
    {bite_code: 'arms_flag', bite_desc: 'Arms'},
    {bite_code: 'hand_flag', bite_desc: 'Hand'},
    {bite_code: 'knee_flag', bite_desc: 'Knee'},
    {bite_code: 'neck_flag', bite_desc: 'Neck'},
    {bite_code: 'head_flag', bite_desc: 'Head'},
    {bite_code: 'others_flag', bite_desc: 'Others'},
  ];

  onSubmit(){
    this.is_saving = true;
    let query;

    console.log(this.abExposureForm.value)
    if(this.abExposureForm.value.id) {
      query = this.http.update('animal-bite/patient-ab-exposure/', this.abExposureForm.value.id, this.abExposureForm.value);
    } else {
      query = this.http.post('animal-bite/patient-ab', this.abExposureForm.value);
    }

    query.subscribe({
      next: (data: any) => {
        this.is_saving = false;
        this.toastr.success('Successfully recorded!', 'Exposure Details');
        this.updateSelectedAb.emit(data);
      },
      error: err => console.log(err)
    });
  }

  loadLibraries() {
    const getAnimalType = this.http.get('libraries/ab-animal-type');
    const getAnimalOwnership = this.http.get('libraries/ab-animal-ownership');
    const getExposureType = this.http.get('libraries/ab-exposure-type');

    forkJoin([getAnimalType, getAnimalOwnership, getExposureType]).subscribe({
      next: ([dataAnimalType, dataAnimalOwnership, dataExposureType]: any) => {
        this.animal_types = dataAnimalType.data;
        this.animal_ownerships = dataAnimalOwnership.data;
        this.exposure_types = dataExposureType.data;

        this.createForm();
      },
      error: err => console.log(err)
    })
  }

  createForm() {
    this.abExposureForm = this.formBuilder.group({
      id: [null],
      patient_id: [this.patient_id, Validators.required],
      consult_date: [null, Validators.required],
      exposure_date: [null, Validators.required],
      patient_ab_id: [null],
      animal_type_id: [null, Validators.required],
      animal_type_remarks: [null],
      exposure_place: [null],
      bite_flag: [false],
      animal_ownership_id: [null, Validators.required],
      feet_flag: [false],
      leg_flag: [false],
      arms_flag: [false],
      hand_flag: [false],
      knee_flag: [false],
      neck_flag: [false],
      head_flag: [false],
      others_flag: [false],
      al_remarks: [null],
      exposure_type_code : [null, Validators.required],
      wash_flag: [false],
      pep_flag: [false],
      tandok_name: [null],
      tandok_addresss: [null],
      remarks: [null]
    })

    this.patchData();
    this.show_form =true;
  }

  patchData(){
    if(this.selected_ab_consult && this.selected_ab_consult.abExposure) {
      this.abExposureForm.patchValue({...this.selected_ab_consult.abExposure});
      this.abExposureForm.patchValue({
        consult_date: this.selected_ab_consult.consult_date ? formatDate(this.selected_ab_consult.consult_date, 'yyyy-MM-dd', 'en', 'Asia/Manila') : null,
        exposure_date: this.selected_ab_consult.exposure_date ? formatDate(this.selected_ab_consult.exposure_date, 'yyyy-MM-dd', 'en', 'Asia/Manila') : null
      });
    }
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges(change: SimpleChanges): void{
    this.patchData();
  }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
