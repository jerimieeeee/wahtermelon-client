import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { faAngleDown, faCalendarDay, faCaretRight, faClose, faInfoCircle, faPencil, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';


@Component({
  selector: 'app-postpartum',
  templateUrl: './postpartum.component.html',
  styleUrls: ['./postpartum.component.scss']
})
export class PostpartumComponent implements OnInit {
  focused: boolean;
  public keyUp = [];
  public buttons = [];

  faCalendarDay = faCalendarDay;
  faTimes = faTimes;
  faClose = faClose;
  faTimesCircle = faTimesCircle;
  faSave = faSave;
  faPencil = faPencil;
  faAngleDown = faAngleDown;
  faInfoCircle = faInfoCircle;
  faCaretRight = faCaretRight;

  postpartum_form: FormGroup = new FormGroup({
    postpartum_date: new FormControl<string | null>(''),
    visit_type: new FormControl<string | null>(''),
    patient_height: new FormControl<string | null>(''),
    patient_weight: new FormControl<string | null>(''),
    bp_systolic: new FormControl<string | null>(''),
    bp_diastolic: new FormControl<string | null>(''),
    breastfeeding: new FormControl<boolean | null>(false),
    family_planning: new FormControl<boolean | null>(false),
    fever: new FormControl<boolean | null>(false),
    vaginal_infection: new FormControl<boolean | null>(false),
    vaginal_bleeding: new FormControl<boolean | null>(false),
    pallor: new FormControl<boolean | null>(false),
    cord_ok: new FormControl<boolean | null>(false),
  });

  gravidity: Number = new Number();
  parity: Number = new Number();
  full_term: Number = new Number();
  live_births: Number = new Number();
  abortions: Number = new Number();
  pre_term: Number = new Number();
  bfd: boolean;
  demog = [
    { loc: 'regions', includes: 'provinces' },
    { loc: 'provinces', includes: 'municipalities' },
    { loc: 'municipalities', includes: 'barangays' },
    { loc: 'barangays', includes: '' }
  ];
  @Output() postpartum_bool = new EventEmitter<string>();
  filter: string;
  @Input() delivery_location;
  @Input() regions;
  @Input() attendants;
  @Input() preg_outcome;
  @Input() patient_details;
  @Input() patient_mc_record;
  provinces: any;
  municipalities: any;
  barangays: any;
  today: Date;
  public mcr_data: any;
  
  constructor(private http: HttpService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.getMCR('latest', this.patient_details.id)
    // this.getMCR()
    this.filter = '';
    this.today = new Date();
  }

  getMCR(type: any, id: any) {
    // this.http.get('maternal-care/mc-records?type=' + type + '&patient_id=' + id).subscribe({
    //   next: (data: any) => {
        if (!this.patient_mc_record[0]) {
          console.log(this.patient_mc_record[0].message);
          this.mcr_data = -1;
        } else {
          this.mcr_data = this.patient_mc_record[0];
          console.log(this.patient_mc_record[0], ' MCR SDATA DASOIDU');
        }
        this.createForm(this.mcr_data);
      // },
    //   error: err => console.log(err),
    // })
  }

  createForm(mc_record: any) {
    let postpartum_visit = mc_record.postpartum_visit[0];
    let user_id = localStorage.getItem('user_id');
    let facility_code = 'DOH000000000005672';
    console.log(mc_record, " mc_record createForm Post");
    
    this.postpartum_form = this.formBuilder.group({
     postpartum_date: [mc_record.postpartum_visit.length != 0?new Date(postpartum_visit.postpartum_date).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),[Validators.required]],
    visit_type:  [mc_record.postpartum_visit.length != 0 ? postpartum_visit.postpartum_date : '', [Validators.required, Validators.minLength(2)]],
    // patient_height: new FormControl<string | null>(''),
    // patient_weight: new FormControl<string | null>(''),
    // bp_systolic: new FormControl<string | null>(''),
    // bp_diastolic: new FormControl<string | null>(''),
    // breastfeeding: new FormControl<boolean | null>(false),
    // family_planning: new FormControl<boolean | null>(false),
    // fever: new FormControl<boolean | null>(false),
    // vaginal_infection: new FormControl<boolean | null>(false),
    // vaginal_bleeding: new FormControl<boolean | null>(false),
    // pallor: new FormControl<boolean | null>(false),
    // cord_ok: new FormControl<boolean | null>(false),
    });

    // this.postpartum_form = new FormGroup({
    //   registration_date: new FormControl(new Date().toISOString().substring(0, 10)),
    //   delivery_date: new FormControl(new Date().toISOString().substring(0, 10)),
    //   admission_date: new FormControl(new Date().toISOString().substring(0, 10)),
    //   discharge_date: new FormControl(new Date().toISOString().substring(0, 10)),
    //   gravidity: new FormControl(this.gravidity),
    //   parity: new FormControl(this.parity),
    //   full_term: new FormControl(this.full_term),
    //   pre_term: new FormControl(this.pre_term),
    //   abortions: new FormControl(this.abortions),
    //   live_births: new FormControl(this.live_births),
    //   delivery_location: new FormControl(),
    //   region: new FormControl(),
    //   province: new FormControl(),
    //   muncity: new FormControl(),
    //   barangay: new FormControl(),
    //   birth_attendant: new FormControl(),
    //   pregnancy_outcome: new FormControl(),
    //   breastfeeding_asap: new FormControl(),
    //   baby_healthy: new FormControl(),
    //   breastfeeding_date: new FormControl(new Date().toISOString().substring(0, 10)),
    // });
  }
  flip(): void {
    this.focused = !this.focused;
    this.keyUp = [];
    this.buttons = [];
    this.buttons.push('save');
  }
  saveForm(data) {
    this.postpartum_form.setValue({
      registration_date: data.registration_date,
      delivery_date: data.delivery_date,
      admission_date: data.admission_date,
      discharge_date: data.discharge_date,
      gravidity: data.gravidity,
      parity: data.parity,
      full_term: data.full_term,
      pre_term: data.pre_term,
      abortions: data.abortions,
      live_births: data.live_births,
      delivery_location: data.delivery_location,
      region: data.region,
      province: data.province,
      muncity: data.muncity,
      barangay: data.barangay,
      birth_attendant: data.birth_attendant,
      pregnancy_outcome: data.pregnancy_outcome,
      breastfeeding_asap: data.breastfeeding_asap,
      baby_healthy: data.baby_healthy,
      breastfeeding_date: data.breastfeeding_date,
      // region:  ,
      // province: ,
      // muncity: ,
      // barangay: 
    });
    console.log(this.postpartum_form.value, " data value");
    this.postpartum_bool.emit(this.postpartum_form.value);
  }
  bfdCheck(value) {
    this.bfd = !this.bfd;
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


    // this.demog.forEach((demo, index) => {
    //   if (demo == id){
    //     this.http.get('libraries/'+demo+'/'+data_input,{params:{'include':this.demog[index + 1]}}).subscribe({
    //       next: (data: any) => {console.log(data.data); this[this.demog[index + 1]] = data.data[this.demog[index + 1]]},
    //       error: err => console.log(err)
    //     });   
    //   }
    //   console.log(this.demog[index + 1]);
    // }); 
  }

  loadDemog(loc, code, include) {
    if (loc == 'regions') {
      this.municipalities = null;
      this.barangays = null;
    } else if (loc == 'provinces') {
      this.barangays = null;
    }

    this.http.get('libraries/' + loc + '/' + code, { params: { 'include': include } }).subscribe({
      next: (data: any) => { console.log(data.data); this[include] = data.data[include] },
      error: err => console.log(err)
    });
  }

  buttonShow(name) {
    this.buttons = [];
    if (!this.buttons.includes(name)) {
      this.buttons.push(name);
    }
    // console.log(this.buttons);

  }
  cancel() {
    this.bfd = false;
    this.keyUp = [];
    // this.createForm();
  }
}
