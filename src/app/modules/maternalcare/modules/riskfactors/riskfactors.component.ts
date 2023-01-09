import { formatDate } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faAngleDown, faCalendarDay, faCaretRight, faClose, faInfoCircle, faPencil, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';


@Component({
  selector: 'app-riskfactors',
  templateUrl: './riskfactors.component.html',
  styleUrls: ['./riskfactors.component.scss']
})
export class RiskfactorsComponent implements OnInit {
  faCalendarDay = faCalendarDay;
  faTimes = faTimes;
  faClose = faClose;
  faTimesCircle = faTimesCircle;
  faSave = faSave;
  faPencil = faPencil;
  faAngleDown = faAngleDown;
  faInfoCircle = faInfoCircle;
  faCaretRight = faCaretRight;

  risk_form: FormGroup = new FormGroup({
    risk_id: new FormControl<string | null>(''),
    date_detected: new FormControl<string | null>(''),
  });

  factor: String = new String();
  focused: boolean;

  public keyUp = [];
  public buttons = [];
  public hide = [];
  public risk_catch = [];
  public module_data: any;

  show: boolean;
  @Input() risk_factors;
  @Input() patient_mc_record;
  @Input() patient_id;
  searching: boolean;
  today: Date;
  constructor(private http: HttpService, private formBuilder: FormBuilder) { }
  is_saving: boolean;
  saved: boolean;

  ngOnInit(): void {
    this.loadModule();
    this.searching = false;
    this.today = new Date();
    this.is_saving = false;
    this.saved = false;
  }


  loadModule() {
    if (!this.patient_mc_record) {
      this.module_data = -1;
    } else {
      this.module_data = this.patient_mc_record;
      console.log(this.module_data, " module data from  loadModule - RISK FACTOR");
    }

    this.createForm();
    if (this.module_data != -1) {
      this.getRisk()
    }

  }

  createForm() {
    let user_id = this.http.getUserID();
    let facility_code = this.http.getUserFacility();

    this.risk_form = this.formBuilder.group({
      patient_mc_id: [this.module_data == -1 ? null : this.module_data.id, [Validators.required]],
      facility_code: [facility_code, [Validators.required]],
      patient_id: [this.patient_id, [Validators.required]],
      user_id: [user_id, [Validators.required]],
      risk_id: ['', [Validators.required]],
      date_detected: [new Date().toISOString().substring(0, 10), [Validators.required]],
    });
  }

  getRisk() {
    this.http.get('maternal-care/mc-risk-factors?patient_mc_id=' + this.module_data.id).subscribe({
      next: (data: any) => {
        console.log(data, " get risks");
        this.risk_catch = data.data;
      },
      error: err => console.log(err),

    })
  }

  searchfocus() {
    document.getElementById("searchbar").focus();
    this.searching = true;
  }

  searchblur() {
    this.searching = false;
  }

  risk_to_edit: string = null;

  saveForm(data) {
    console.log(data);
    this.is_saving = true;
    if (this.risk_form.valid) {
      let query;

      if(this.risk_to_edit){
        query = this.http.update('maternal-care/mc-risk-factors/', this.risk_to_edit, data)
      } else {
        query = this.http.post('maternal-care/mc-risk-factors', data);
      }

      query.subscribe({
        next: (data: any) => {
          console.log(data.data, " data from saving risks")
          this.risk_catch = data.data;
          this.risk_to_edit = null;
        },
        error: err => console.log(err),
        complete: () => {
          this.is_saving = false;
          this.saved = true;
          setTimeout(() => {
            this.saved = false;
          }, 1500);
        }
      })
    }
  }

  flip(): void {
    this.focused = !this.focused;
    this.keyUp = [];
    this.buttons = [];
    this.buttons.push('save');
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
    // console.log(this.buttons);

  }
  cancel() {
    this.hide = [];
    this.keyUp = [];
    this.risk_form.reset();
  }

  edit(risk) {
    console.log(risk)
    this.risk_form.reset();

    this.createForm();

    this.risk_form.patchValue({
      id: risk.id,
      risk_id: risk.risk.id,
      date_detected: formatDate(risk.date_detected, 'Y-MM-dd', 'en'),
    });

    this.risk_to_edit = risk.id;

    console.log(this.risk_form, " factor value");
    console.log(risk, " risk_id edit");

  }
}
