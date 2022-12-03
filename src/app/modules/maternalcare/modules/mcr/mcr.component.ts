import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { faAngleDown, faCalendarDay, faCaretRight, faCircleNotch, faClose, faInfoCircle, faPencil, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';



@Component({
  selector: 'app-mcr',
  templateUrl: './mcr.component.html',
  styleUrls: ['./mcr.component.scss']
})
export class McrComponent implements OnInit {
  date = new Date();
  focused: boolean;

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
  error_message = '';
  lmp_date: any;
  edc_date: any;
  aog_date: any;
  public keyUp = [];
  public buttons = [];
  public mcr_data: any

  mcr_form: FormGroup = new FormGroup({
    pre_registration_date: new FormControl<string | null>(''),
    lmp_date: new FormControl<string | null>(''),
    initial_gravidity: new FormControl<string | null>(''),
    initial_parity: new FormControl<string | null>(''),
    initial_full_term: new FormControl<string | null>(''),
    initial_preterm: new FormControl<string | null>(''),
    initial_abortion: new FormControl<string | null>(''),
    initial_livebirths: new FormControl<string | null>(''),
  });

  response: any;
  first_tri: any;
  second_tri: any;
  third_tri: any;
  today: any;

  @Input() patient_details;
  @Input() patient_mc_record;
  @Output() patient_mc_id = new EventEmitter<string>();
  is_saving: boolean;
  saved: boolean;
  updating: boolean;
  loading: boolean;

  constructor(private http: HttpService, private formBuilder: FormBuilder) { }



  ngOnInit() {
    this.today = new Date();

    this.focused = false;
    this.updating = false;
    this.loading = false;
    this.saved = false;
    this.getMCR();

  }

  getMCR() {
    if (!this.patient_mc_record) {
      this.mcr_data = -1;
      this.getEDC(this.today, 'any');
    } else {
      this.mcr_data = this.patient_mc_record.pre_registration;
      console.log(this.mcr_data, " mcr data from getMCR - MCR");
      this.getEDC(this.mcr_data.lmp_date, 'db');
      this.updating = true;
    }

    this.createForm();
  }

  createForm() {
    let user_id = this.http.getUserID();
    let facility_code = this.http.getUserFacility();
    this.mcr_form = this.formBuilder.group({
      patient_id: [this.patient_details.id, [Validators.required, Validators.minLength(2)]],
      user_id: [user_id, [Validators.required, Validators.minLength(2)]],
      facility_code: [facility_code, [Validators.required, Validators.minLength(2)]],
      pre_registration_date: [(this.mcr_data == -1 ? new Date().toISOString().substring(0, 10) : new Date(this.mcr_data.pre_registration_date).toISOString().substring(0, 10)),
      [Validators.required]],
      lmp_date: [(this.mcr_data == -1 ? null : new Date(this.mcr_data.lmp_date).toISOString().substring(0, 10)),
      [Validators.required]],
      initial_gravidity: [(this.mcr_data == -1 ? null : this.mcr_data.initial_gravidity),
      [Validators.required]],
      initial_parity: [(this.mcr_data == -1 ? null : this.mcr_data.initial_parity),
      [Validators.required]],
      initial_full_term: [(this.mcr_data == -1 ? 0 : this.mcr_data.initial_full_term),
      [Validators.required]],
      initial_preterm: [(this.mcr_data == -1 ? 0 : this.mcr_data.initial_preterm),
      [Validators.required]],
      initial_abortion: [(this.mcr_data == -1 ? 0 : this.mcr_data.initial_abortion),
      [Validators.required]],
      initial_livebirths: [(this.mcr_data == -1 ? 0 : this.mcr_data.initial_livebirths),
      [Validators.required]],
    });
  }
  flip(): void {
    this.focused = !this.focused;
    this.keyUp = [];
    this.buttons = [];
    this.buttons.push('save');
  }
  saveForm() {

    console.log(this.mcr_form.value, " validation check");
    this.loading = true;
    let http;
    if (this.updating) {
      http = this.http.update('maternal-care/mc-preregistrations/', this.mcr_data.id, this.mcr_form.value)
    } else {
      http = this.http.post('maternal-care/mc-preregistrations', this.mcr_form.value)
    }

    if (this.mcr_form.valid) {
      http.subscribe({
        next: (data: any) => {
          console.log(data, " data from saving");
          this.patient_mc_id.emit(data.patient_mc_id)
        },
        error: err => console.log(err),
        complete: () => {
          this.saved = true;
          setTimeout(() => {
            this.saved = false;
          }, 1500);
          this.loading = false;
        }
      })
    } else {
      this.loading = false;
    }
  }

  onKeyUp(data_input: string, id: string) {
    if (this.keyUp.includes(id)) {
      if (data_input == '') {
        this.keyUp.splice(this.keyUp.indexOf(id), 1);
      }
    } else {
      this.keyUp.push(id);
    }
  }

  buttonShow(name) {
    this.buttons = [];
    if (!this.buttons.includes(name)) {
      this.buttons.push(name);
    }
  }

  cancel() {
    this.keyUp = [];
    this.getMCR();
  }

  edit() {
    this.mcr_form.enable();
  }

  getEDC(value: any, from: any) {
    console.log('fetching Important dates from ' + from, ' using ' + value);

    this.edc_date = from == 'db' ? new Date(this.mcr_data.edc_date).toISOString().substring(0, 10) : (value ? new Date(value).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10))

    this.first_tri = from == 'db' ? new Date(this.mcr_data.trimester1_date).toISOString().substring(0, 10) : (value ? new Date(value).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10));

    this.second_tri = from == 'db' ? new Date(this.mcr_data.trimester2_date).toISOString().substring(0, 10) : (value ? new Date(value).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10));

    this.third_tri = from == 'db' ? new Date(this.mcr_data.trimester3_date).toISOString().substring(0, 10) : (value ? new Date(value).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10));

    if (from == 'input' && value != '') {
      this.edc_date = new Date(this.edc_date).setDate(new Date(this.edc_date).getDate() + 280);
      this.first_tri = new Date(this.first_tri).setDate(new Date(this.first_tri).getDate() + 84);
      this.second_tri = new Date(this.second_tri).setDate(new Date(this.second_tri).getDate() + 189);
      this.third_tri = this.edc_date;
    }

    this.aog_date = new Date();
    this.aog_date.setHours(0, 0, 0, 0);

    var lmp = value ? new Date(value) : new Date();
    lmp.setHours(0, 0, 0, 0);

    const msInWeek = 1000 * 60 * 60 * 24 * 7;
    var aggregate = ((this.aog_date.getTime() - lmp.getTime()) / msInWeek).toFixed(2);
    var aggre_decimal = Number(aggregate) - Math.trunc(Number(aggregate));

    if (Number(aggregate) > 1) { //1.4
      if (Math.trunc(Number(aggregate)) > 1) {
        if (aggre_decimal > 0) {
          var suffix = Math.trunc(Number(aggregate)) + ' weeks and ' + (aggre_decimal * 7).toFixed(0) + ' days';
        } else if (aggre_decimal == 0) {
          var suffix = Math.trunc(Number(aggregate)) + ' weeks';
        }
      } else if (Math.trunc(Number(aggregate)) == 1) {
        if (aggre_decimal > 0) {
          var suffix = Math.trunc(Number(aggregate)).toFixed(0) + ' week and ' + (aggre_decimal * 7).toFixed(0) + ' days';
        }
      }
    } else if (Number(aggregate) == 1) {
      var suffix = Number(aggregate).toFixed(0) + ' week';
    } else if (Number(aggregate) < 1) {
      aggregate = JSON.stringify(Math.round(((this.aog_date.getTime() - lmp.getTime()) / msInWeek) * 7))
      if (Number(aggregate) > 1 || Number(aggregate) <= 0) {
        var suffix = aggregate + ' days'
      } else if (Number(aggregate) == 1) {
        var suffix = aggregate + ' day'
      }
    }
    // console.log(suffix, " suffix");
    this.aog_date = suffix;

  }
}
