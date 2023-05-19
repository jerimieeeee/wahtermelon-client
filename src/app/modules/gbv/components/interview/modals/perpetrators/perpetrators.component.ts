import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { perpetratorForm } from './perpetratorForm';

@Component({
  selector: 'app-perpetrators',
  templateUrl: './perpetrators.component.html',
  styleUrls: ['./perpetrators.component.scss']
})
export class PerpetratorsComponent implements OnInit{
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_perpetrator;
  @Input() intake_id;
  @Input() patient_id;

  is_saving: boolean = false;
  show_error: boolean = false;
  show_form: boolean = false;

  occupations: any;
  child_relations: any;
  perpetrator_locations: any;

  genders = [
    {id: 'M', desc: 'Male'},
    {id: 'F', desc: 'Female'},
  ];

  perpetratorForm: FormGroup = perpetratorForm();

  onSubmit(){
    console.log(this.perpetratorForm.value);

    let query;

    if(this.perpetratorForm.value.id) {
      query = this.http.update('gender-based-violence/patient-gbv-perpetrator/', this.perpetratorForm.value.id, this.perpetratorForm.value);
    } else {
      query = this.http.post('gender-based-violence/patient-gbv-perpetrator', this.perpetratorForm.value);
    }
    query.subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastr.success('Successfully Recorded', 'Alleged Perpetator');
        this.closeModal();
      },
      error: err => console.log(err)
    })
  }

  loadLibraries(){
    const getOccupation = this.http.get('libraries/occupations');
    const getChildRelation = this.http.get('libraries/child-relation');
    const getPerpetratorLocation = this.http.get('libraries/gbv-perpetrator-location');

    forkJoin([getOccupation, getChildRelation, getPerpetratorLocation]).subscribe({
      next: ([dataOccupation, dataChildRelation, dataPerpetratorLocation]: any) => {
        this.occupations = dataOccupation.data;
        this.child_relations = dataChildRelation.data;
        this.perpetrator_locations = dataPerpetratorLocation.data;
        this.createForm();
        // this.toggleModal('abuse_acts', 'Sexual Abuse', 'gbv-sexual-abuse')
      },
      error: err => console.log(err)
    });
  }

  createForm() {
    this.perpetratorForm = this.formBuilder.group({
      id: [null],
      patient_id: [this.patient_id],
      intake_id: [this.intake_id],
      gender: [null],
      perpetrator_unknown_flag: [false],
      perpetrator_name: [null],
      perpetrator_nickname: [null],
      perpetrator_age: [null],
      occupation_code : [null],
      known_to_child_flag: [false],
      relation_to_child_id: [null],
      location_id: [null],
      perpetrator_address: [null],
      abuse_alcohol_flag: [false],
      abuse_drugs_flag: [false],
      abuse_others_flag: [false],
      abuse_drugs_remarks: [null],
      abuse_others_remarks: [null],
      abused_as_child_flag: [false],
      abused_as_spouse_flag: [false],
      spouse_abuser_flag: [false],
      family_violence_flag: [false],
      criminal_conviction_similar_flag: [false],
      criminal_conviction_other_flag: [false],
      criminal_record_unknown_flag: [false],
      criminal_barangay_flag: [false],
      criminal_barangay_remarks: [null],
    });

    if(this.selected_perpetrator.data) {
      this.patchData();
    } else {
      this.show_form = true;
    }
    // console.log(this.perpetratorForm)
  }

  patchData(){
    console.log(this.selected_perpetrator)
    this.perpetratorForm.patchValue({...this.selected_perpetrator.data});
    this.show_form = true;
  }

  closeModal(){
    this.toggleModal.emit('perpetrators');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.perpetratorForm.controls;
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // console.log(this.intake_id)
    this.loadLibraries();
  }
}
