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
  show: boolean;
  @Input() risk_factors;
  @Input() patient_mc_record;
  searching: boolean;
  today: Date;
  constructor(private http: HttpService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm(this.patient_mc_record[0]);
    this.searching = false;
    this.today = new Date();
  }

  createForm(mc_record) {
    let risk: any
    if(this.patient_mc_record[0].risk_factor[0]?this.patient_mc_record[0].risk_factor[0]:this.patient_mc_record[0].risk_factor.length == 1){
        console.log("it went true again");
        risk = mc_record.risk_factor[0];
    }else{
      console.log(" its false coz prenatal is 0");
      risk = mc_record.risk_factor;
    }
    let user_id = localStorage.getItem('user_id');
    let facility_code = 'DOH000000000005672';
    console.log(risk, " risk");
    
    this.risk_form = this.formBuilder.group({
      patient_mc_id: [, [Validators.required]],
      facility_code: [facility_code, [Validators.required]],
      patient_id: [, [Validators.required]],
      user_id: [user_id, [Validators.required]],
      risk_id: [risk.length != 0?risk.risk_id:'',[Validators.required]],
      date_detected: [risk.length != 0?new Date(risk.date_detected).toISOString().substring(0, 10):new Date().toISOString().substring(0, 10),[Validators.required]],
    });


  }

  searchfocus() {
    document.getElementById("searchbar").focus();
    this.searching = true;
  }
  searchblur() {
    this.searching = false;
  }
  saveForm(data) {
    console.log(data, "data");
    console.log(data.risk_id, " factor");

    data.risk_id = data.risk_id.split('_');
    let index = this.risk_catch.findIndex(c => c.risk_id === data.risk_id[0]);

    if (index != -1) {
      this.risk_catch.splice(index, 1);
    }
    console.log(data.risk_id[1], " risk_id");
    
    // this.risk_form.setValue({
    //   factor: data.factor[0],
    //   date: data.date,
    // });
    this.risk_catch.push({
      risk_id: data.risk_id[1],
      factor: data.risk_id[0],
      hospital_flag: data.risk_id[2],
      monitor_flag: data.risk_id[3],
      date: data.date,
    });

    // this.createForm();
    this.hide = [];
    //this.risk_form.disable();
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

    // console.log(this.keyUp.length);
    // console.log(this.keyUp);
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
  edit(id) {

    this.risk_form.reset();
    this.risk_catch.forEach(c => {
      if (c.risk_id === id) {
        this.risk_form.setValue({
          factor: c.factor,
          date: c.date,
        });
      }
    });
    this.hide.push(id);
    console.log(this.hide.includes(id));

    console.log(this.risk_form.get('factor').value, " factor value");

    console.log(id, " risk_id edit");

  }
}
