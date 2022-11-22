import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { faAngleDown, faCalendarDay, faCaretRight, faClose, faInfoCircle, faPencil, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
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
  patient_id: Number = new Number();
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


  @Input() fetals;
  @Input() fhr_lib;
  @Input() patient_mc_record;
  @Input() patient_details;
  is_saving: boolean;
  today: Date;
  public mcPrenatal_id = [];
  constructor(private http: HttpService, private formBuilder: FormBuilder) { }

  public keyUp = [];
  public buttons = [];
  public catch_array = [];
  public hide = [];
  public prenatal_data = [];

  ngOnInit(): void {
    this.value = 1;
    this.today = new Date();
    this.getMCR('latest', this.patient_details.id);

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

      this.http.post('maternal-care/mc-prenatal', this.prenatal_form.value).subscribe({
        next: (data: any) => {
          console.log(data.data, " data from saving prenatal")
          this.prenatal_data = [];
          // this.updateMCR('latest', this.patient_details.id);
          
          data.data.forEach(d => {
            d.push({aog_count: d.aog_weeks + ' weeks and ' + d.aog_days + ' days'});
            this.prenatal_data.push(d)
            console.log(d, " the Ds");

          })
          this.value = this.prenatal_data[0].visit_sequence + 1;
        },
        error: err => console.log(err),
        complete: () => {
          this.is_saving = false;
          // this.saved = true;
          setTimeout(() => {
            // this.saved = false;
          }, 1500);
          // this.loading = false;
          // this.showModal = true;
        }
      })
    } else {
      // this.loading = false;
    }
    console.log(this.prenatal_form.value, " prenatal form");

    this.catch_array.push(this.prenatal_form.value);
    this.catch_array.sort(function (x, y) {
      return x.visit_sequence - y.visit_sequence;
    });
  }

  getMCR(type: any, id: any) {
    console.log(this.patient_mc_record[0], " from getMCR - prenatal;");


    console.log(this.patient_mc_record[0].prenatal_visit[0]?this.patient_mc_record[0].prenatal_visit[0]:this.patient_mc_record[0].prenatal_visit, " try getmcr");
   
    if(this.patient_mc_record[0].prenatal_visit[0]?this.patient_mc_record[0].prenatal_visit[0]:this.patient_mc_record[0].prenatal_visit.length == 1){
      console.log("it went true");
      
    this.value = this.patient_mc_record[0].prenatal_visit[0].visit_sequence + 1;
    this.patient_mc_record[0].prenatal_visit.forEach((p, i) => {
      // p.push();
      let aog_days_unit;
      let aog_weeks_unit;
      let final_statement;

      if(p.aog_days > 1){
        aog_days_unit = 'days';
      }else{
        aog_days_unit = 'day';
      }
      if(p.aog_weeks > 1){
        aog_weeks_unit = 'weeks';
      }else{
        aog_weeks_unit = 'week';
      }

      if(p.aog_weeks > 0){
        if(p.aog_days > 0){
          final_statement = p.aog_weeks + ' ' + aog_weeks_unit + ' and ' + p.aog_days + ' ' + aog_days_unit
        }else{
          final_statement = p.aog_weeks + ' ' + aog_weeks_unit
        }
      }else{
        final_statement = p.aog_days + ' ' + aog_days_unit
      }
      this.prenatal_data.push(p);
      this.prenatal_data[i]["aog_count"] = final_statement;
      console.log(this.prenatal_data, " prenatal data");
      
    });
  }
  this.createForm(this.patient_mc_record[0]);
  }
  createForm(mc_record: any) {
    let prenatal_visit: any
    if(this.patient_mc_record[0].prenatal_visit[0]?this.patient_mc_record[0].prenatal_visit[0]:this.patient_mc_record[0].prenatal_visit.length == 1){
        console.log("it went true again");
        prenatal_visit = mc_record.prenatal_visit[0];
    }else{
      console.log(" its false coz prenatal is 0");
      prenatal_visit = mc_record.prenatal_visit;
    }
   
    let user_id = localStorage.getItem('user_id');
    let facility_code = 'DOH000000000005672';
    console.log(prenatal_visit, " log prenatal_visit");
    
    this.prenatal_form = this.formBuilder.group({
      patient_mc_id: [mc_record.id, [Validators.required, Validators.minLength(2)]],
      facility_code: [facility_code, [Validators.required, Validators.minLength(2)]],
      patient_id: [this.patient_details.id, [Validators.required, Validators.minLength(2)]],
      user_id: [user_id, [Validators.required, Validators.minLength(2)]],
      prenatal_date: [prenatal_visit.length != 0 ? new Date(prenatal_visit.prenatal_date).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),
      [Validators.required]],
      patient_height: [prenatal_visit.length != 0 ? prenatal_visit.patient_height : 0, [Validators.required, Validators.minLength(2)]],
      patient_weight: [prenatal_visit.length != 0 ? prenatal_visit.patient_weight : 0, [Validators.required, Validators.minLength(2)]],
      bp_systolic: [prenatal_visit.bp_systolic ? prenatal_visit.bp_systolic : '', [Validators.required, Validators.minLength(2)]],
      bp_diastolic: [prenatal_visit.bp_diastolic ? prenatal_visit.bp_diastolic : '', [Validators.required, Validators.minLength(2)]],
      fundic_height: [prenatal_visit.fundic_height ? prenatal_visit.fundic_height : 0],
      presentation_code: [prenatal_visit.presentation_code ? prenatal_visit.presentation_code : '', [Validators.required, Validators.minLength(2)]],
      fhr: [prenatal_visit.fhr ? prenatal_visit.fhr : 0],
      location_code: [prenatal_visit.location_code ? prenatal_visit.location_code : 'NA'],
      private: [prenatal_visit.private ? prenatal_visit.private : 0],
    });

    console.log(this.prenatal_form.value, " form prenatal creatform");
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
    this.createForm(0);
  }
  edit(id) {
    this.edit_bool = true;
    this.prenatal_form.reset();
    this.catch_array.forEach(c => {
      if (c.visit_sequence == id) {
        //this.value = c.visit_sequence;
        this.prenatal_form.setValue({
          visit_sequence: c.visit_sequence,
          fhr: c.fhr,
          fundic_height: c.fundic_height,
          fhr_location_id: c.fhr_location_id,
          fetal_presentation_id: c.fetal_presentation_id,
          patient_height: c.patient_height,
          patient_weight: c.patient_weight,
          bp_systolic: c.bp_systolic,
          bp_diastolic: c.bp_diastolic,
          consult_id: c.consult_id,
          lmp_date: c.lmp_date,
          mc_id: c.mc_id,
          user_id: c.user_id,
          patient_id: c.patient_id,
          remarks: c.remarks,
          prenatal_date: c.prenatal_date,
        });
      }
    });

    this.hide.push(id);
    console.log(this.hide.includes(id));

    console.log(id, " prenatal id edit");

  }
}
