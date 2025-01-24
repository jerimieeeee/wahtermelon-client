import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { faAngleDown, faCalendarDay, faCaretRight, faCircleNotch, faClose, faInfoCircle, faPencil, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';


@Component({
    selector: 'app-postpartum',
    templateUrl: './postpartum.component.html',
    styleUrls: ['./postpartum.component.scss'],
    standalone: false
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
  faSpinner = faCircleNotch;
  faAngleDown = faAngleDown;
  faInfoCircle = faInfoCircle;
  faCaretRight = faCaretRight;

  postpartum_form: FormGroup = new FormGroup({
    post_registration_date: new FormControl<string | null>(''),
    admission_date: new FormControl<string | null>(''),
    discharge_date: new FormControl<string | null>(''),
    delivery_date: new FormControl<string | null>(''),
    delivery_location_code: new FormControl<string | null>(''),
    barangay_code: new FormControl<string | null>(''),
    gravidity: new FormControl<boolean | null>(false),
    parity: new FormControl<boolean | null>(false),
    full_term: new FormControl<boolean | null>(false),
    preterm: new FormControl<boolean | null>(false),
    abortion: new FormControl<boolean | null>(false),
    livebirths: new FormControl<boolean | null>(false),
    outcome_code: new FormControl<boolean | null>(false),
    healthy_baby: new FormControl<boolean | null>(false),
    birth_weight: new FormControl<boolean | null>(false),
    attendant_code: new FormControl<boolean | null>(false),
    breastfeeding: new FormControl<boolean | null>(false),
    breastfed_date: new FormControl<boolean | null>(false),
    end_pregnancy: new FormControl<boolean | null>(false),
    postpartum_remarks: new FormControl<boolean | null>(false),
  });

  gravidity: Number = new Number();
  parity: Number = new Number();
  full_term: Number = new Number();
  live_births: Number = new Number();
  abortions: Number = new Number();
  pre_term: Number = new Number();
  bfd: boolean;
  demog = [
    { name: 'Province', loc: 'provinces', includes: 'municipalities', fname: 'p_code' },
    { name: 'Municipality', loc: 'municipalities', includes: 'barangays', fname: 'm_code' },
    { name: 'Barangay', loc: 'barangays', includes: '', fname: 'barangay_code' }
  ];
  @Output() postpartum_bool = new EventEmitter<string>();
  filter: string;
  @Input() delivery_location;
  @Input() regions;
  @Input() attendants;
  @Input() preg_outcome;
  @Input() patient_id;
  @Input() patient_mc_record;

  @Output() post_mc_data = new EventEmitter<string>();
  provinces: any;
  municipalities: any;
  barangays: any;
  today: Date;
  public mcr_data: any;
  is_saving: boolean;
  saved: boolean;
  selected_regions: string;
  updating: boolean;

  constructor(private http: HttpService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.getMCR()
    // this.getMCR()
    this.filter = '';
    this.today = new Date();
    this.is_saving = false;
    this.saved = false;
  }

  getMCR() {
    if (!this.patient_mc_record) {
      this.mcr_data = -1;
    } else {
      this.mcr_data = this.patient_mc_record;
      if(this.patient_mc_record.post_registration){
        this.updating = true;
      }
    }
    this.createForm(this.mcr_data);
  }

  createForm(mc_record: any) {
    let post_registration: any;
    post_registration = mc_record.post_registration?mc_record.post_registration:'';

    let user_id = this.http.getUserID();
    let facility_code = this.http.getUserFacility();
    let provinces;
    let municipalities;
    let barangays;

    if(post_registration){
    if(post_registration.barangay.code != ''){
      this.selected_regions = post_registration.barangay.region.code;
      provinces = post_registration.barangay.province.code;
      municipalities = post_registration.barangay.municipality.code;
      barangays = post_registration.barangay.code;
      /* this.selected_regions = post_registration.barangay.code.substring(0, post_registration.barangay.code.length - 7) + '0000000';
      provinces = post_registration.barangay.code.substring(0, post_registration.barangay.code.length - 5) + '00000';
      municipalities = post_registration.barangay.code.substring(0, post_registration.barangay.code.length - 3) + '000';
      barangays = post_registration.barangay.code; */

      this.loadDemog('regions', this.selected_regions, 'provinces');
      this.loadDemog('provinces', provinces, 'municipalities');
      this.loadDemog('municipalities', municipalities, 'barangays');
      this.loadDemog('barangays', barangays, '');
    }
  }
    this.postpartum_form = this.formBuilder.group({
    facility_code: [facility_code],
    patient_id: [this.patient_id],
    user_id: [user_id],
    post_registration_date:[post_registration.length != 0  ?new Date(post_registration.post_registration_date).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),[Validators.required]],
    admission_date: [post_registration.length != 0 ?post_registration.admission_date.substring(0 , 19): '',[Validators.required]],
    discharge_date: [post_registration.length != 0 ?post_registration.discharge_date: '',[Validators.required]],
    delivery_date: [post_registration.length != 0 ?post_registration.delivery_date : '',[Validators.required]],
    delivery_location_code: [post_registration.length != 0 ?post_registration.delivery_location.code:'',[Validators.required]],
    barangay_code: [post_registration.length != 0 ?post_registration.barangay.code:'',[Validators.required]],
    p_code: [post_registration.length != 0 ?provinces:'',[Validators.required]],
    m_code: [post_registration.length != 0 ?municipalities:'',[Validators.required]],
    gravidity:[post_registration.length != 0 ?post_registration.gravidity:'',[Validators.required]],
    parity: [post_registration.length != 0 ?post_registration.parity:'',[Validators.required]],
    full_term: [post_registration.length != 0 ?post_registration.full_term:'',[Validators.required]],
    preterm: [post_registration.length != 0 ?post_registration.preterm:'',[Validators.required]],
    abortion: [post_registration.length != 0 ?post_registration.abortion:'',[Validators.required]],
    livebirths: [post_registration.length != 0 ?post_registration.livebirths:'',[Validators.required]],
    outcome_code: [post_registration.length != 0 ?post_registration.outcome.code:'',[Validators.required]],
    healthy_baby: [post_registration.length != 0 ?post_registration.healthy_baby:true],
    birth_weight: [post_registration.length != 0 ?post_registration.birth_weight:0],
    attendant_code: [post_registration.length != 0 ?post_registration.attendant.code:'',[Validators.required]],
    breastfeeding:[post_registration.length != 0 ?post_registration.breastfeeding:false],
    breastfed_date: [post_registration.length != 0 ?new Date(post_registration.breastfed_date).toISOString().substring(0, 10):null],
    end_pregnancy: [post_registration.length != 0 ?post_registration.end_pregnancy:false],
    postpartum_remarks:[post_registration.length != 0 ?post_registration.postpartum_remarks:''],
    });

    this.bfd = post_registration.length != 0 ?(post_registration.breastfeeding?true:false):false;
  }

  flip(): void {
    this.focused = !this.focused;
    this.keyUp = [];
    this.buttons = [];
    this.buttons.push('save');
  }

  saveForm(data) {
    this.is_saving = true;
    this.postpartum_form.value.delivery_date = this.postpartum_form.value.delivery_date.length == 16? this.postpartum_form.value.delivery_date.replace("T", " ") + ':00':this.postpartum_form.value.delivery_date.replace("T", " ");
    this.postpartum_form.value.admission_date = this.postpartum_form.value.admission_date.length == 16? this.postpartum_form.value.admission_date.replace("T", " ") + ':00':this.postpartum_form.value.admission_date.replace("T", " ");
    this.postpartum_form.value.discharge_date = this.postpartum_form.value.discharge_date.length == 16? this.postpartum_form.value.discharge_date.replace("T", " ") + ':00':this.postpartum_form.value.discharge_date.replace("T", " ");

    let filtered = {}
    let target = this.postpartum_form.value;

    for (let key in target) {
      if (this.postpartum_form.value.breastfeeding == false) {
        if(key != 'breastfed_date'){
          filtered[key] = target[String(key)];
        }
      }else{
        filtered = target
      }
    }

    if (this.postpartum_form.valid) {
      let http
      if (this.updating) {
        http = this.http.update('maternal-care/mc-postregistrations/', this.mcr_data.post_registration.id, filtered)
      } else {
        http = this.http.post('maternal-care/mc-postregistrations', filtered)
      }


      http.subscribe({
        next: (data: any) => {
          console.log(data, " data from saving postpartum")
          this.post_mc_data.emit(data.patient_mc_id);
        },
        error: err => console.log(err),
        complete: () => {
          this.is_saving = false;
          this.saved = true;
          setTimeout(() => {
            this.saved = false;
          }, 1500);
          // this.loading = false;
          // this.showModal = true;
        }
      })
    } else {
      this.is_saving = false;
    }

    this.postpartum_bool.emit(this.postpartum_form.value);
  }

  bfdCheck(value) {
    this.bfd = !this.bfd;
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

  loadDemog(loc, code, include) {
    if (loc == 'regions') {
      this.municipalities = null;
      this.barangays = null;
    } else if (loc == 'provinces') {
      this.barangays = null;
    }

    this.http.get('libraries/' + loc + '/' + code, { params: { 'include': include, per_page: 'all' } }).subscribe({
      next: (data: any) => {
        this[include] = data.data[include];
      },
      error: err => console.log(err)
    });
  }

  buttonShow(name) {
    this.buttons = [];
    if (!this.buttons.includes(name)) {
      this.buttons.push(name);
    }
  }
  cancel() {
    this.bfd = false;
    this.keyUp = [];
    // this.createForm();
  }
}
