import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-intake',
  templateUrl: './intake.component.html',
  styleUrls: ['./intake.component.scss']
})
export class IntakeComponent implements OnInit{
  @Input() patient_id;
  @Input() selected_gbv_case;

  faPlus = faPlus;
  faSave = faSave;
  faCircleNotch = faCircleNotch;

  max_date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  show_form: boolean = true;

  modals: any = [];

  intakeForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    case_number: new FormControl<string| null>(''),
    case_date: new FormControl<string| null>(''),
    outcome_date: new FormControl<string| null>(''),
    outcome_reason_id : new FormControl<string| null>(''),
    outcome_result_id : new FormControl<string| null>(''),
    outcome_verdict_id: new FormControl<string| null>(''),
    primary_complaint_id: new FormControl<string| null>(''),
    primary_complaint_remarks: new FormControl<string| null>(''),
    physical_abuse_flag: new FormControl<boolean| null>(false),
    sexual_abuse_flag: new FormControl<boolean| null>(false),
    neglect_abuse_flag: new FormControl<boolean| null>(false),
    emotional_abuse_flag: new FormControl<boolean| null>(false),
    economic_abuse_flag: new FormControl<boolean| null>(false),
    utv_abuse_flag: new FormControl<boolean| null>(false),
    others_abuse_flag: new FormControl<boolean| null>(false),
    others_abuse_remarks: new FormControl<string| null>(''),
    neglect_remarks: new FormControl<string| null>(''),
    behavioral_remarks : new FormControl<string| null>(''),
    service_id : new FormControl<string| null>(''),
    service_remarks : new FormControl<string| null>(''),
    region : new FormControl<string| null>(''),
    province : new FormControl<string| null>(''),
    municipality : new FormControl<string| null>(''),
    barangay_code : new FormControl<string| null>(''),
    address : new FormControl<string| null>(''),
    direction_to_address : new FormControl<string| null>(''),
    guardian_name : new FormControl<string| null>(''),
    guardian_address : new FormControl<string| null>(''),
    relation_to_child_id : new FormControl<string| null>(''),
    guardian_contact_info : new FormControl<string| null>(''),
    economic_status_id : new FormControl<string| null>(''),
    number_of_children : new FormControl<string| null>(''),
    number_of_individual_members : new FormControl<string| null>(''),
    number_of_family : new FormControl<string| null>(''),
    incest_case_flag : new FormControl<boolean| null>(false),
    sleeping_arrangement_id : new FormControl<string| null>(''),
    sleeping_arrangement_remarks : new FormControl<string| null>(''),
    same_bed_adult_male_flag : new FormControl<boolean| null>(false),
    same_bed_adult_female_flag : new FormControl<boolean| null>(false),
    same_bed_child_male_flag : new FormControl<boolean| null>(false),
    same_bed_child_female_flag : new FormControl<boolean| null>(false),
    same_room_adult_male_flag : new FormControl<boolean| null>(false),
    same_room_adult_female_flag : new FormControl<boolean| null>(false),
    same_room_child_male_flag : new FormControl<boolean| null>(false),
    same_room_child_female_flag : new FormControl<boolean| null>(false),
    abuse_living_arrangement_id : new FormControl<string| null>(''),
    abuse_living_arrangement_remarks : new FormControl<string| null>(''),
    present_living_arrangement_id : new FormControl<string| null>(''),
    present_living_arrangement_remarks : new FormControl<string| null>(''),
  });


  regions: any;
  municipalities: any;
  barangays: any;

  economic_statuses: any;
  living_arrangements: any;
  child_relations: any;

  onSubmit(){
    console.log(this.intakeForm.value);
    let query;

    if(this.intakeForm.value.id) {
      query = this.http.update('gender-based-violence/patient-gbv/', this.intakeForm.value.id, this.intakeForm.value)
    } else {
      query = this.http.post('gender-based-violence/patient-gbv', this.intakeForm.value);
    }

    // this.incestCase()
    query.subscribe({
      next: (data: any) => {
        // console.log(data);
        this.toastr.success('Successfully recorded!', 'Intake Form');
        this.selected_gbv_case = data.data
      },
      error: err => console.log(err)
    })
  }

  sexualAbuse(){
    if(this.intakeForm.value.sexual_abuse_flag) this.intakeForm.patchValue({incest_case_flag:0});
    /* this.intakeForm.patchValue({
      incest_case_flag: !this.intakeForm.value.incest_case_flag
    }); */
  }

  incestCase(){
    console.log(this.intakeForm.value.incest_case_flag)
    if(!this.intakeForm.value.incest_case_flag) {
      this.intakeForm.patchValue({
        same_bed_adult_male_flag: null,
        same_bed_adult_female_flag: null,
        same_bed_child_male_flag: null,
        same_bed_child_female_flag: null,
        same_room_adult_male_flag: null,
        same_room_adult_female_flag: null,
        same_room_child_male_flag: null,
        same_room_child_female_flag: null,
        abuse_living_arrangement_id: null,
        abuse_living_arrangement_remarks: null,
        present_living_arrangement_id: null,
        present_living_arrangement_remarks: null,
      })
    }
  }

  primary_complaints: any;

  libraries = [
    {var_name: 'regions', location: 'regions'},
    {var_name: 'economic_statuses', location: 'gbv-economic-status'},
    {var_name: 'living_arrangements', location: 'gbv-living-arrangement'},
    {var_name: 'regions', location: 'child-relation'},
  ]
  loadLibraries(){
    this.libraries.forEach((obj, index) => {
      this.http.get('libraries/'+obj.location).subscribe({
        next: (data: any) => {
          this[obj.var_name] = data.data;
          if(this.libraries.length -1 === index) {
            this.show_form = true
          }
        },
        error: err => console.log(err)
      });
    });
  }

  family_members: any;

  loadFamily(){
    let params = {
      patient_id: this.patient_id
    };

    this.http.get('gender-based-violence/patient-gbv-family-composition', {params}).subscribe({
      next: (data: any) => {
        // console.log(data)
        this.family_members = data.data;
      },
      error: err => console.log(err)
    })
  }

  loadDemog(loc, code, include){
    if(code !== '0') {
      this.http.get('libraries/'+loc+'/'+code,{params:{'include':include}}).subscribe({
        next: (data: any) => {
          this[include] = data.data[include];
          this.disaledSelection(loc, code);
        },
        error: err => console.log(err)
      });
    } else {
      this.disaledSelection(loc, code);
    }
  }

  createForm(){
    this.intakeForm = this.formBuilder.nonNullable.group({
      id: [null],
      patient_id: [this.patient_id],
      case_number: [null],
      case_date: [null],
      outcome_date: [null],
      outcome_reason_id: [null],
      outcome_result_id: [null],
      outcome_verdict_id: [null],
      primary_complaint_id: [null],
      primary_complaint_remarks: [null],
      physical_abuse_flag: [false],
      sexual_abuse_flag: [false],
      neglect_abuse_flag: [false],
      emotional_abuse_flag: [false],
      economic_abuse_flag: [false],
      utv_abuse_flag: [false],
      others_abuse_flag: [false],
      others_abuse_remarks: [null],
      neglect_remarks: [null],
      behavioral_remarks: [null],
      service_remarks: [null],
      region: [null],
      province: [null],
      municipality: [null],
      barangay_code: [null],
      address: [null],
      direction_to_address: [null],
      guardian_name: [null],
      guardian_address: [null],
      relation_to_child_id: [null],
      guardian_contact_info: [null],
      economic_status_id: [null],
      number_of_children: [null],
      number_of_individual_members: [null],
      number_of_family: [null],
      incest_case_flag: [null],
      sleeping_arrangement_id: [null],
      sleeping_arrangement_remarks: [null],
      same_bed_adult_male_flag: [false],
      same_bed_adult_female_flag: [false],
      same_bed_child_male_flag: [false],
      same_bed_child_female_flag: [false],
      same_room_adult_male_flag: [false],
      same_room_adult_female_flag: [false],
      same_room_child_male_flag: [false],
      same_room_child_female_flag: [false],
      abuse_living_arrangement_id: [null],
      abuse_living_arrangement_remarks: [null],
      present_living_arrangement_id: [null],
      present_living_arrangement_remarks: [null]
    });

    this.loadSelectedConsult();
    this.loadFamily();
  }

  loadSelectedConsult(){
    console.log(this.selected_gbv_case)
    if(this.selected_gbv_case){
      this.intakeForm.patchValue({...this.selected_gbv_case});
      this.intakeForm.patchValue({
        relation_to_child_id: this.selected_gbv_case.relation.id,
        case_date: this.selected_gbv_case ? formatDate(this.selected_gbv_case.case_date, 'yyyy-MM-dd', 'en') : null
      })
      // console.log(this.intakeForm.value)
    }
  }
  disaledSelection(loc, code) {
    if(loc === 'regions') {
      this.municipalities = null;
      this.barangays = null;

      this.f['province'].enable();
      this.f['municipality'].disable();
      this.f['barangay_code'].disable();
      this.f['address'].disable();

    } else if (loc === 'provinces') {
      this.barangays = null;

      this.f['municipality'].enable();
      this.f['barangay_code'].disable();
      this.f['address'].disable();

      // this.f['municipality'].enable();
    } else if (loc === 'municipalities') {
      this.f['barangay_code'].enable();
      this.f['address'].enable();
    } else {
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.intakeForm.controls;
  }

  toggleModal(name){
    this.modals[name] = !this.modals[name];

    if(name==='add_family') this.loadFamily();
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.loadLibraries();
    this.createForm();
  }
}
