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
  @Input() patient_details;
  @Input() patient_mc_record;
  provinces: any;
  municipalities: any;
  barangays: any;
  today: Date;
  public mcr_data: any;
  is_saving: boolean;
  
  constructor(private http: HttpService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.getMCR('latest', this.patient_details.id)
    // this.getMCR()
    this.filter = '';
    this.today = new Date();
    this.is_saving = false;
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
    let postpartum_visit: any;
    if(this.patient_mc_record[0].postpartum_visit[0]?this.patient_mc_record[0].postpartum_visit[0]:this.patient_mc_record[0].postpartum_visit.length == 1){
      console.log("it went true again");
      postpartum_visit = mc_record.postpartum_visit[0];
  }else{
    console.log(" its false coz postpartum_visit is 0");
    postpartum_visit = mc_record.postpartum_visit;
  }
    let user_id = localStorage.getItem('user_id');
    let facility_code = 'DOH000000000005672';
    console.log(mc_record, " mc_record createForm Post");
    
    this.postpartum_form = this.formBuilder.group({
    facility_code: [facility_code],
    patient_id: [this.patient_details.id],
    user_id: [user_id],
    post_registration_date:[postpartum_visit.length != 0?new Date(postpartum_visit.postpartum_date).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),[Validators.required]],
    admission_date: [postpartum_visit.length != 0?new Date(postpartum_visit.admission_date).toISOString().substring(0, 10) : '',[Validators.required]],
    discharge_date: [postpartum_visit.length != 0?new Date(postpartum_visit.discharge_date).toISOString().substring(0, 10) : '',[Validators.required]],
    delivery_date: [postpartum_visit.length != 0?new Date(postpartum_visit.delivery_date).toISOString().substring(0, 10) : '',[Validators.required]],
    delivery_location_code: [postpartum_visit.length != 0?postpartum_visit.delivery_location_code:'',[Validators.required]],
    barangay_code: [postpartum_visit.length != 0?postpartum_visit.barangay_code:'',[Validators.required]],
    gravidity:[postpartum_visit.length != 0?postpartum_visit.gravidity:'',[Validators.required]],
    parity: [postpartum_visit.length != 0?postpartum_visit.parity:'',[Validators.required]],
    full_term: [postpartum_visit.length != 0?postpartum_visit.full_term:'',[Validators.required]],
    preterm: [postpartum_visit.length != 0?postpartum_visit.preterm:'',[Validators.required]],
    abortion: [postpartum_visit.length != 0?postpartum_visit.abortion:'',[Validators.required]],
    livebirths: [postpartum_visit.length != 0?postpartum_visit.livebirths:'',[Validators.required]],
    outcome_code: [postpartum_visit.length != 0?postpartum_visit.outcome_code:'',[Validators.required]],
    healthy_baby: [postpartum_visit.length != 0?postpartum_visit.healthy_baby:true],
    birth_weight: [postpartum_visit.length != 0?postpartum_visit.birth_weight:0],
    attendant_code: [postpartum_visit.length != 0?postpartum_visit.attendant_code:'',[Validators.required]],
    breastfeeding:[postpartum_visit.length != 0?postpartum_visit.breastfeeding:''],
    breastfed_date: [postpartum_visit.length != 0?postpartum_visit.breastfed_date:'',[Validators.required]],
    end_pregnancy: [postpartum_visit.length != 0?postpartum_visit.end_pregnancy:false],
    postpartum_remarks:[postpartum_visit.length != 0?postpartum_visit.postpartum_remarks:''],
    });
  }
  flip(): void {
    this.focused = !this.focused;
    this.keyUp = [];
    this.buttons = [];
    this.buttons.push('save');
  }
  saveForm(data) {
    this.is_saving = true;
    this.postpartum_form.value.delivery_date = this.postpartum_form.value.delivery_date.replace("T", " ") + ':00';
    this.postpartum_form.value.admission_date = this.postpartum_form.value.admission_date.replace("T", " ") + ':00';
    this.postpartum_form.value.discharge_date = this.postpartum_form.value.discharge_date.replace("T", " ") + ':00';
  console.log(this.postpartum_form.value.discharge_date);
  
    if (this.postpartum_form.valid) {

      this.http.post('maternal-care/mc-postregistrations', this.postpartum_form.value).subscribe({
        next: (data: any) => {
          console.log(data.data, " data from saving postpartum")        
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
      console.log( "post partum form invalid");
      
    }

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
      next: (data: any) => { this[include] = data.data[include] },
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
