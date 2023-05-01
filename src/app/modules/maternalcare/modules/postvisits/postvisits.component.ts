import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faAngleDown, faCalendarDay, faCaretRight, faCircleCheck, faCircleNotch, faClose, faInfoCircle, faPencil, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-postvisits',
  templateUrl: './postvisits.component.html',
  styleUrls: ['./postvisits.component.scss']
})
export class PostvisitsComponent implements OnInit {
  faCalendarDay = faCalendarDay;
  faTimes = faTimes;
  faClose = faClose;
  faTimesCircle = faTimesCircle;
  faSave = faSave;
  faSpinner = faCircleNotch;
  faPencil = faPencil;
  faAngleDown = faAngleDown;
  faInfoCircle = faInfoCircle;
  faCaretRight = faCaretRight;
  faCircleCheck = faCircleCheck;

  value: number;
  registry_id: number;
  postpartum_week: number;

  // postpartum_visit_form: FormGroup
  postpartum_visit_form: FormGroup = new FormGroup({
    postpartum_date: new FormControl<string | null>(''),
    visit_type: new FormControl<string | null>(''),
    patient_height: new FormControl<string | null>(''),
    patient_weight: new FormControl<string | null>(''),
    bp_systolic: new FormControl<string | null>(''),
    bp_diastolic: new FormControl<string | null>(''),
    breastfeeding: new FormControl<string | null>(''),
    family_planning: new FormControl<string | null>(''),
    fever: new FormControl<string | null>(''),
    vaginal_infection: new FormControl<string | null>(''),
    vaginal_bleeding: new FormControl<string | null>(''),
    pallor: new FormControl<string | null>(''),
    cord_ok: new FormControl<string | null>(''),
  })
  patient_height: Number = new Number();
  patient_weight: Number = new Number();
  bp_systolic: Number = new Number();
  bp_diastolic: Number = new Number();

  mc_id: Number = new Number();
  user_id: Number = new Number();

  focused: boolean;

  feet: number;
  in: number;
  decimal: number;
  actual_height: any;
  @Input() patient_mc_record;
  @Input() patient_id;

  @Output() post_visit_data = new EventEmitter<string>();

  is_saving: boolean;
  saved: boolean;
  edit_bool: boolean;
  edit_form: any;
  edit_id: any;
  constructor(private http: HttpService, private formBuilder: FormBuilder) { }

  cm_value = '';

  public keyUp = [];
  public buttons = [];
  public postpartum_data = [];

 public toggle_questionaire = [
   {name:"Vaginal infection",form_name:"vaginal_infection"},
   {name:"Vaginal bleeding",form_name:"vaginal_bleeding"},
   {name:"Fever > 38*C",form_name:"fever"},
   {name:"Pallor",form_name:"pallor"},
   {name:"Baby's cord OK",form_name:"cord_ok"},
   {name:"Patient Breastfeeds baby",form_name:"breastfeeding"},
   {name:"Family Planning Method",form_name:"family_planning"},
 ]
  ngOnInit(): void {
    this.value = 1;
    this.getMCR();
    // console.log(this.patient_mc_record, "mc record form postvistis init");
    this.edit_bool = false
    this.focused = false;
  }
  flip(): void {
    this.focused = !this.focused;
    this.keyUp = [];
    this.buttons = [];
    this.buttons.push('save');
  }

  getMCR() {
    // console.log(this.patient_mc_record.length == 0, " from getMCR - post visit;");
    if(this.patient_mc_record.length != 0){
      if(this.patient_mc_record.postpartum_visit[0]?this.patient_mc_record.postpartum_visit[0]:this.patient_mc_record.postpartum_visit.length == 1){
        // console.log("it went true");

      this.value = this.patient_mc_record.postpartum_visit[0].visit_sequence + 1;
      this.postpartum_data =  this.patient_mc_record.postpartum_visit
       }
       this.createForm(this.patient_mc_record);
    }

  }
createForm(mc_record: any) {
  let user_id = this.http.getUserID();
  let facility_code = this.http.getUserFacility();
  let post_visit: any
  // console.log(this.patient_mc_record.postpartum_visit, " post visit true or false ?");

  if(this.patient_mc_record.postpartum_visit[0]?this.patient_mc_record.postpartum_visit[0]:this.patient_mc_record.postpartum_visit.length == 1){
    // console.log("post visit true");

    post_visit = mc_record.postpartum_visit[0];
  }else{
    // console.log("post visit false");

    post_visit = mc_record.postpartum_visit;
  }

  this.postpartum_visit_form = this.formBuilder.group({
    patient_mc_id: [mc_record.id],
    facility_code: [facility_code],
    patient_id: [this.patient_id],
    user_id: [user_id],
    postpartum_date: [new Date().toISOString().substring(0, 10), [Validators.required]],
    visit_type: ['', [Validators.required]],
    patient_height:  [post_visit?post_visit.patient_height:'', [Validators.required]],
    patient_weight:  [post_visit?post_visit.patient_weight:'', [Validators.required]],
    bp_systolic: ['', [Validators.required]],
    bp_diastolic:  ['', [Validators.required]],
    breastfeeding: [false],
    family_planning: [false],
    fever: [false],
    vaginal_infection: [false],
    vaginal_bleeding: [false],
    pallor:  [false],
    cord_ok: [false],
  })
}

edit(visit) {
  this.edit_bool = true;
  // console.log(visit, " data to be editesd");

  // this.prenatal_form.reset();
      this.edit_form = {
        patient_mc_id: visit.patient_mc_id,
        patient_id: this.patient_id,
        postpartum_date: visit.postpartum_date,
        visit_type: visit.visit_type,
        patient_height: visit.patient_height,
        patient_weight: visit.patient_weight,
        bp_systolic: visit.bp_systolic,
        bp_diastolic: visit.bp_diastolic,
        breastfeeding: visit.breastfeeding,
        family_planning: visit.family_planning,
        fever: visit.fever,
        vaginal_infection: visit.vaginal_infection,
        vaginal_bleeding: visit.vaginal_bleeding,
        pallor: visit.pallor,
        cord_ok: visit.cord_ok
      };

      this.postpartum_visit_form.patchValue(this.edit_form);
    // }
  // });
  this.value = 0;
  this.value = visit.visit_sequence;
  // this.hide.push(id);
  // console.log(this.edit_form, " edit form");
  // console.log(visit.id, " id pre edit");

  this.edit_id = visit.id;

      this.edit_bool = true;
  // console.log(id, " prenatal id edit");

}

saveForm(){
  this.is_saving = true;

  // console.log(this.postpartum_visit_form.valid, this.postpartum_visit_form);
  // console.log(this.edit_form);

  if (this.postpartum_visit_form.valid) {
    if (this.actual_height) {
      this.postpartum_visit_form.value.patient_height = this.actual_height;
      if(this.edit_form) this.edit_form.patient_height = this.actual_height
    }

    let http
    if(this.edit_bool){
      http = this.http.update('maternal-care/mc-postpartum/', this.edit_id, this.postpartum_visit_form.value);
      // console.log(" going to update");

    }else{
      http = this.http.post('maternal-care/mc-postpartum', this.postpartum_visit_form.value);
    }

    // console.log(this.postpartum_visit_form, " this is my data for saving post vist");
    http.subscribe({
      next: (data: any) => {
        // console.log(data.data, " data from saving post visit")
        this.postpartum_data = data.data
        this.post_visit_data.emit(data.data)
        this.value = this.postpartum_data[0].visit_sequence + 1;
      },
      error: err => console.log(err),
      complete: () => {
        this.is_saving = false;
        this.saved = true;
        this.edit_bool = false
        this.edit_form = []
        this.createForm(this.patient_mc_record);
        setTimeout(() => {
          this.saved = false;
        }, 1500);
      }
    })
  } else {
    this.is_saving = false;
  }

}

onKeyUp(data_input: string, id: string) {
  // console.log(data_input + ' this is my data input');

 if (this.keyUp.includes(id)) {
   if (data_input == '') {
     this.keyUp.splice(this.keyUp.indexOf(id), 1);
   }
 } else {
   this.keyUp.push(id);

 }
//  console.log(this.keyUp);

}
clearForm(id) {
 this.postpartum_visit_form.get(id).reset();
 // this.onKeyUp('', id);
}
cmCatcher(h, h2) {
  // console.log(h, " cmCatcher");

  h2 = h.split(' ');

  // console.log(h2[0]);

  if (h2[0] > 9) {
    this.feet = h / 30.48;
    this.decimal = this.feet - Math.trunc(this.feet);
    this.in = this.decimal * 12;
    this.in = +this.in.toFixed(2);
    this.actual_height = h;
    this.cm_value = Math.trunc(this.feet) + 'ft ' + this.in + ' in';
    console.log('h value is ', Math.trunc(this.feet), 'ft ', this.in, ' in');
  } else {
    // console.log(h.lastIndexOf(' '));
    // console.log(h.lastIndexOf(','));
    if (h.lastIndexOf(' ') == 1) {

      h = h.split(' ');

      this.feet = h[0] * 30.48;
      this.feet = +this.feet.toFixed(1);
      // console.log(h[1] > 12);

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
  this.keyUp = [];
  this.edit_bool = false
  this.getMCR();
  // this.createForm();
}
}
