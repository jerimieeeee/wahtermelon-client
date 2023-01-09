import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { faAngleDown, faCalendarDay, faCaretRight, faCircleCheck, faCircleNotch, faClose, faInfoCircle, faPencil, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-prenatal',
  templateUrl: './prenatal.component.html',
  styleUrls: ['./prenatal.component.scss']
})
export class PrenatalComponent implements OnInit {
  focused: boolean;
  faCalendarDay = faCalendarDay;
  faTimes = faTimes;
  faClose = faClose;
  faTimesCircle = faTimesCircle;
  faSave = faSave;
  faPencil = faPencil;
  faAngleDown = faAngleDown;
  faInfoCircle = faInfoCircle;
  faCaretRight = faCaretRight;
  faCircleCheck = faCircleCheck;
  faSpinner = faCircleNotch;

  prenatal_form: FormGroup = new FormGroup({
    prenatal_date: new FormControl<string | null>(''),
    patient_height: new FormControl<string | null>(''),
    patient_weight: new FormControl<string | null>(''),
    bp_systolic: new FormControl<string | null>(''),
    bp_diastolic: new FormControl<string | null>(''),
    fundic_height: new FormControl<string | null>(''),
    presentation_code: new FormControl<string | null>(''),
    fhr: new FormControl<string | null>(''),
    location_code: new FormControl<string | null>(''),
    remarks: new FormControl<string | null>(''),
    private: new FormControl<string | null>(''),
  });

  fhr: Number = new Number();
  fundic_height: Number = new Number();
  fhr_location_id: String = new String();
  fetal_presentation_id: String = new String();
  patient_height: Number = new Number();
  patient_weight: Number = new Number();
  bp_systolic: Number = new Number();
  bp_diastolic: Number = new Number();
  consult_id: Number = new Number();

  mc_id: Number = new Number();
  user_id: Number = new Number();
  trimester: Number = new Number();
  remarks: String = new String();
  value: number;

  cm_value = '';
  modal_id = '';

  feet: number;
  in: number;
  decimal: number;
  actual_height: any;
  edit_bool: boolean;
  vitals_modal: boolean;
  max_value: number;
  edit_id: any;

  @Input() fetals;
  @Input() fhr_lib;
  @Input() patient_mc_record;
  @Input() patient_id;

  @Output() prenatal_mc_data = new EventEmitter<string>();
  is_saving: boolean;
  saved: boolean;
  today: Date;
  public mcPrenatal_id = [];
  constructor(private http: HttpService, private formBuilder: FormBuilder) { }

  public keyUp = [];
  public buttons = [];
  public catch_array = [];
  public hide = [];
  public prenatal_data = [];

  edit_form: any;

  ngOnInit(): void {
    this.value = 1;
    this.today = new Date();
    this.getMCR();

  }

  flip(): void {
    this.focused = !this.focused;
    this.keyUp = [];
    this.buttons = [];
    this.buttons.push('save');
  }
  flipVitals(id) {
    if (id != this.modal_id) {
      this.modal_id = id;
      this.vitals_modal = true;
    } else {
      this.vitals_modal = !this.vitals_modal;
    }


  }
  saveForm(data) {
    this.is_saving = true;
    let index = this.catch_array.findIndex(c => c.visit_sequence === this.value);
    if (index != -1) {
      this.catch_array.splice(index, 1);
    }
    console.log(this.prenatal_form.valid, this.prenatal_form.value);

    if (this.prenatal_form.valid) {
      if (this.actual_height) {
        this.prenatal_form.value.patient_height = this.actual_height;
      }
      let filtered = {}
      let target = this.prenatal_form.value
      for (let key in target) {
        if (target[String(key)] != null) {
          filtered[key] = target[String(key)];
        }
      }
      let http
      if(this.edit_bool){
        http = this.http.update('maternal-care/mc-prenatal/', this.edit_id, filtered);
      }else{
        http = this.http.post('maternal-care/mc-prenatal', filtered);
      }

      console.log(filtered, this.prenatal_form.value, " filtered saveform");
      http.subscribe({
        next: (data: any) => {
          console.log(data.data, " data from saving prenatal")
          this.prenatal_data = data.data;
          this.prenatal_mc_data.emit(data.data);
          this.value = this.prenatal_data[0].visit_sequence + 1;
        },
        error: err => {console.log(err),this.is_saving = false; },
        complete: () => {
          this.is_saving = false;
          this.saved = true;
          this.edit_bool = false;
          this.getMCR();
          setTimeout(() => {
            this.saved = false;
          }, 1500);

        }
      })
    } else {
      this.is_saving = false;
    }
    console.log(this.prenatal_form.value, " prenatal form");

    this.catch_array.push(this.prenatal_form.value);
    this.catch_array.sort(function (x, y) {
      return x.visit_sequence - y.visit_sequence;
    });
  }

  trackByFn(index, item) {
    return index;
  }

  getMCR() {
    this.prenatal_data =[]
    console.log(this.patient_mc_record, " from getMCR - prenatal;");


    console.log(this.patient_mc_record.prenatal_visit[0]?this.patient_mc_record.prenatal_visit[0]:this.patient_mc_record.prenatal_visit, " try getmcr");

    if(this.patient_mc_record.prenatal_visit[0]?this.patient_mc_record.prenatal_visit[0]:this.patient_mc_record.prenatal_visit.length == 1){
      console.log("it went true");

    this.value = this.patient_mc_record.prenatal_visit[0].visit_sequence + 1;
    this.prenatal_data = this.patient_mc_record.prenatal_visit;
  }
  this.createForm();
  }
  createForm() {
    let prenatal_visit: any
    if(this.patient_mc_record.prenatal_visit[0]?this.patient_mc_record.prenatal_visit[0]:this.patient_mc_record.prenatal_visit.length == 1){
        // console.log("it went true again");
        prenatal_visit = this.patient_mc_record.prenatal_visit[0];
    }else{
      console.log(" its false coz prenatal is 0");
      prenatal_visit = this.patient_mc_record.prenatal_visit;
    }

    let user_id = this.http.getUserID();
    let facility_code = this.http.getUserFacility();
    // console.log(prenatal_visit, " log prenatal_visit");

    this.prenatal_form = this.formBuilder.group({
      patient_mc_id: [this.patient_mc_record.id, [Validators.required, Validators.minLength(2)]],
      facility_code: [facility_code, [Validators.required, Validators.minLength(2)]],
      patient_id: [this.patient_id, [Validators.required, Validators.minLength(2)]],
      user_id: [user_id, [Validators.required, Validators.minLength(2)]],
      prenatal_date: [new Date().toISOString().substring(0, 10),[Validators.required]],
      patient_height: [prenatal_visit.length != 0 ? prenatal_visit.patient_height : 0, [Validators.required, Validators.minLength(2)]],
      patient_weight: [prenatal_visit.length != 0 ? prenatal_visit.patient_weight : 0, [Validators.required, Validators.minLength(2)]],
      bp_systolic: ['', [Validators.required, Validators.minLength(2)]],
      bp_diastolic: ['', [Validators.required, Validators.minLength(2)]],
      fundic_height: [null],
      presentation_code: ['', [Validators.required, Validators.minLength(2)]],
      fhr: [null],
      location_code: ['NA'],
      remarks: [''],
      private: [0],
    });

    // console.log(this.prenatal_form.value, " form prenatal creatform
  }

  quadrant(id) {
    if (this.prenatal_form.get('location_code').value == id) {
      this.prenatal_form.get('location_code').setValue('N/A');
      this.keyUp.splice(this.keyUp.indexOf(id), 1);
    } else {
      this.prenatal_form.get('location_code').setValue(id);
    }
  }

  onKeyUp(data_input: string, id: string) {
    console.log(data_input + ' this is my data input');

    if (this.keyUp.includes(id)) {
      if (data_input == '') {
        this.keyUp.splice(this.keyUp.indexOf(id), 1);
      }
    } else {
      this.keyUp.push(id);

    }
    console.log(this.keyUp);

  }
  clearForm(id) {
    this.prenatal_form.get(id).reset();
    // this.onKeyUp('', id);
  }

  cmCatcher(h, h2) {
    console.log(h, " cmCatcher");

    h2 = h.split(' ');

    console.log(h2[0]);

    if (h2[0] > 9) {
      this.feet = h / 30.48;
      this.decimal = this.feet - Math.trunc(this.feet);
      this.in = this.decimal * 12;
      this.in = +this.in.toFixed(2);
      this.actual_height = h;
      this.cm_value = Math.trunc(this.feet) + 'ft ' + this.in + ' in';
      console.log('h value is ', Math.trunc(this.feet), 'ft ', this.in, ' in');
    } else {
      console.log(h.lastIndexOf(' '));
      console.log(h.lastIndexOf(','));
      if (h.lastIndexOf(' ') == 1) {

        h = h.split(' ');

        this.feet = h[0] * 30.48;
        this.feet = +this.feet.toFixed(1);
        console.log(h[1] > 12);

        if (h[1] >= 12) {
          h[1] = 11
        }
        this.in = h[1] * 2.54;
        this.in = +this.in.toFixed(1);

        this.actual_height = this.feet + this.in;
        this.cm_value = this.feet + this.in + ' cm';
      } else {
        this.feet = h * 30.48;
        this.feet = +this.feet.toFixed(1);
        this.actual_height = this.feet;
        this.cm_value = this.feet + ' cm';
      }
    }
  }
  buttonShow(name) {
    this.buttons = [];
    if (!this.buttons.includes(name)) {
      this.buttons.push(name);
    }
    // console.log(this.buttons);
  }
  cancel() {
    this.hide = [];
    this.keyUp = [];
    this.edit_bool = false;
    this.is_saving = false;
    this.getMCR();
    this.edit_id;
    // this.prenatal_form.patchValue(this.prenatal_data[0])
    console.log("canceling");

  }
  edit(prenatal) {
    this.edit_bool = true;
    console.log(prenatal, " data to be editesd");

    // this.prenatal_form.reset();
        this.edit_form = {
          patient_mc_id: prenatal.patient_mc_id,
          patient_id: this.patient_id,
          prenatal_date: prenatal.prenatal_date,
          patient_height: prenatal.patient_height,
          patient_weight: prenatal.patient_weight,
          bp_systolic: prenatal.bp_systolic,
          bp_diastolic: prenatal.bp_diastolic,
          fundic_height: prenatal.fundic_height,
          presentation_code: prenatal.presentation_code,
          fhr: prenatal.fhr,
          location_code: prenatal.location_code,
          private: prenatal.private,
          remarks: prenatal.remarks
        };

        this.prenatal_form.patchValue(this.edit_form);
      // }
    // });
        this.value = prenatal.visit_sequence;
    // this.hide.push(id);
    console.log(this.edit_form, " edit form");
    console.log(prenatal.id, " id pre edit");

    this.edit_id = prenatal.id;

        this.edit_bool = true;
    // console.log(id, " prenatal id edit");

  }
}
