import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faEdit, faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { intakeForm } from './intakeForm';
@Component({
  selector: 'app-intake',
  templateUrl: './intake.component.html',
  styleUrls: ['./intake.component.scss']
})
export class IntakeComponent implements OnInit{
  @Output() updateSelectedGbv = new EventEmitter<any>();
  @Input() patient_id;
  @Input() selected_gbv_case;
  @Input() pos;

  faPlus = faPlus;
  faSave = faSave;
  faCircleNotch = faCircleNotch;
  faEdit = faEdit;

  max_date = formatDate(new Date(), 'yyyy-MM-dd', 'en', 'Asia/Singapore');
  show_form: boolean = true;

  modals: any = [];

  intakeForm:FormGroup=intakeForm();

  regions: any;
  municipalities: any;
  barangays: any;

  economic_statuses: any;
  living_arrangements: any;
  child_relations: any;
  primary_complaints: any;
  family_members: any;
  selected_intake: any;

  selected_perpetrator: any;
  onSubmit(){
    console.log(this.intakeForm.value);
    let query;

    if(!this.intakeForm.value.others_abuse_flag) this.intakeForm.patchValue({others_abuse_remarks: null});

    if(this.intakeForm.value.id) {
      query = this.http.update('gender-based-violence/patient-gbv-intake/', this.intakeForm.value.id, this.intakeForm.value)
    } else {
      query = this.http.post('gender-based-violence/patient-gbv-intake', this.intakeForm.value);
    }

    query.subscribe({
      next: (data: any) => {
        this.toastr.success('Successfully recorded!', 'Intake Form');
        // this.selected_gbv_case = data.data;
        this.reloadData();
      },
      error: err => console.log(err)
    })
  }

  libraries = [
    {var_name: 'regions', location: 'regions'},
    {var_name: 'economic_statuses', location: 'gbv-economic-status'},
    {var_name: 'living_arrangements', location: 'gbv-living-arrangement'},
    {var_name: 'child_relations', location: 'child-relation'},
  ];

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

  loadSelectedConsult(){
    this.intakeForm.controls.case_number.disable();
    if(this.pos !== 'WCPD') {
      this.f.vaw_physical_flag.disable();
      this.f.vaw_sexual_flag.disable();
      this.f.vaw_psychological_flag.disable();
      this.f.vaw_economic_flag.disable();
      this.f.rape_sex_intercourse_flag.disable();
      this.f.rape_sex_assault_flag.disable();
      this.f.rape_incest_flag.disable();
      this.f.rape_statutory_flag.disable();
      this.f.rape_marital_flag.disable();
      this.f.harassment_verbal_flag.disable();
      this.f.harassment_physical_flag.disable();
      this.f.harassment_object_flag.disable();
      this.f.child_abuse_engaged_flag.disable();
      this.f.child_abuse_sexual_flag.disable();
      this.f.child_abuse_physical_flag.disable();
      this.f.child_abuse_emotional_flag.disable();
      this.f.child_abuse_economic_flag.disable();
      this.f.wcpd_others.disable();
    }

    if(this.selected_gbv_case.gbvIntake) {
      console.log(this.selected_gbv_case.gbvIntake);
      this.intakeForm.patchValue({...this.selected_gbv_case.gbvIntake});
      this.intakeForm.patchValue({
        case_date: this.selected_gbv_case.gbvIntake ? formatDate(this.selected_gbv_case.gbvIntake.case_date, 'yyyy-MM-dd', 'en', 'Asia/Singapore') : null
      })
    } else {
      this.intakeForm.patchValue({
        patient_id: this.selected_gbv_case.patient_id,
        patient_gbv_id: this.selected_gbv_case.id
      })
    }

    console.log(this.intakeForm.value);
  }

  sexualAbuse(){
    if(this.intakeForm.value.sexual_abuse_flag) this.intakeForm.patchValue({incest_case_flag:0});
  }

  incestCase(){
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

  reloadData(){
    let params = {
      id: this.selected_gbv_case.id,
      // patient_id: this.selected_gbv_case.patient_id
    }
    console.log(params)
    this.http.get('gender-based-violence/patient-gbv', {params}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.selected_gbv_case = data.data[0];
        this.loadSelectedConsult();
        this.updateSelectedGbv.emit(this.selected_gbv_case);
      },
      error: err => console.log(err)
    });
  }

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
      patient_gbv_id: [null],
      consent_flag: [false],
      consent_relation_to_child_id: [null],
      case_number: [null],
      case_date: [null],
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
      same_address_flag: [false],
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
      present_living_arrangement_remarks: [null],

      vaw_physical_flag: [false],
      vaw_sexual_flag: [false],
      vaw_psychological_flag: [false],
      vaw_economic_flag: [false],
      rape_sex_intercourse_flag: [false],
      rape_sex_assault_flag: [false],
      rape_incest_flag: [false],
      rape_statutory_flag: [false],
      rape_marital_flag: [false],
      harassment_verbal_flag: [false],
      harassment_physical_flag: [false],
      harassment_object_flag: [false],
      child_abuse_engaged_flag: [false],
      child_abuse_sexual_flag: [false],
      child_abuse_physical_flag: [false],
      child_abuse_emotional_flag: [false],
      child_abuse_economic_flag: [false],
      wcpd_others: [null]
    });

    this.loadSelectedConsult();
    this.loadFamily();
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
  selected_member: any;

  toggleModal(name, data?){
    if(name==='perpetrators') {
      this.selected_perpetrator = {
        act_title: 'Perpetrator',
        data: data
      }
    } else if (name==='add_family') {
      this.selected_member = data ?? null
    }

    this.modals[name] = !this.modals[name];

    if(name==='add_family' && !this.modals[name]) this.loadFamily();
    if(name==='perpetrators' && !this.modals[name]) this.reloadData();
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
