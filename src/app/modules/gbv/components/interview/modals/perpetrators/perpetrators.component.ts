import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-perpetrators',
  templateUrl: './perpetrators.component.html',
  styleUrls: ['./perpetrators.component.scss']
})
export class PerpetratorsComponent implements OnInit{
  @Output() getPatientTbHistory = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() switchPage = new EventEmitter<any>();
  @Input() selected_tb_consult;
  @Input() max_date;

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



  perpetratorForm: FormGroup = new FormGroup({
    patient_id: new FormControl<string| null>(null),
    intake_id: new FormControl<string| null>(null),
    gender: new FormControl<string| null>(null),
    perpetrator_unknown_flag: new FormControl<boolean| null>(null),
    perpetrator_name: new FormControl<string| null>(null),
    perpetrator_nickname: new FormControl<string| null>(null),
    perpetrator_age: new FormControl<number| null>(null),
    occupation_code : new FormControl<string| null>(null),
    known_to_child_flag: new FormControl<boolean| null>(null),
    relation_to_child_id: new FormControl<string| null>(null),
    location_id: new FormControl<string| null>(null),
    perpetrator_address: new FormControl<string| null>(null),
    // unknown_abused_flag: new FormControl<boolean| null>(null),
    abuse_alcohol_flag: new FormControl<boolean| null>(null),
    abuse_drugs_flag: new FormControl<boolean| null>(null),
    abuse_others_flag: new FormControl<boolean| null>(null),
    abuse_drugs_remarks: new FormControl<string| null>(null),
    abuse_others_remarks: new FormControl<string| null>(null),

    abused_as_child_flag: new FormControl<boolean| null>(null),
    abused_as_spouse_flag: new FormControl<boolean| null>(null),
    spouse_abuser_flag: new FormControl<boolean| null>(null),
    family_violence_flag: new FormControl<boolean| null>(null),
    criminal_conviction_similar_flag: new FormControl<boolean| null>(null),
    criminal_conviction_other_flag: new FormControl<boolean| null>(null),
    criminal_record_unknown_flag: new FormControl<boolean| null>(null),
    criminal_barangay_flag: new FormControl<boolean| null>(null),
    criminal_barangay_remarks: new FormControl<string| null>(null),
  });

  onSubmit(){
    console.log(this.perpetratorForm.value);
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

        this.show_form = true;
        // this.toggleModal('abuse_acts', 'Sexual Abuse', 'gbv-sexual-abuse')
      },
      error: err => console.log(err)
    });
  }

  closeModal(){
    this.toggleModal.emit('perpetrators');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.perpetratorForm.controls;
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
      this.loadLibraries();
  }
}
