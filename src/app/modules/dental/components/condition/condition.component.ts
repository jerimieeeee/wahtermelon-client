import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { adult_tooth_arr, adult_tooth_conditions, temp_tooth_arr, temp_tooth_conditions, tooth_condition_legend } from './libToothNumber';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { faAdd, faCheck, faChevronCircleDown, faChevronCircleUp, faCircleNotch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { oralCOnditionForm } from './oralConditionForm';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-condition',
    templateUrl: './condition.component.html',
    styleUrls: ['./condition.component.scss'],
    standalone: false
})
export class ConditionComponent implements OnInit, OnChanges {
  @Output() loadSelectedConsult = new EventEmitter<any>();
  @Input() selected_visit;

  oralConditionForm:FormGroup=oralCOnditionForm();

  adult_tooth_conditions = adult_tooth_conditions;
  temp_tooth_condition = temp_tooth_conditions;

  adult_tooth_arr = adult_tooth_arr;
  temp_tooth_arr = temp_tooth_arr;

  tooth_condition_legend = tooth_condition_legend;
  faTrash = faTrash;
  faAdd = faAdd;
  faCheck = faCheck;
  faSave = faSave;
  faCircleNotch = faCircleNotch;
  faChevronCircleDown = faChevronCircleDown;
  faChevronCircleUp = faChevronCircleUp;

  modals: any[] = [];
  condition: any[] = [];
  service_list: any[] = [];
  current_services: any[] = [];
  tooth_condition: any[] = [];
  tooth_service_legend: any[] = [];
  is_saving: boolean = false;
  show_form: boolean = false;
  selected_tooth: number;
  consultCondition: boolean = false;
  show_chart: {} = {adult: true, temporary: true};
  oral_health_condition: {};
  url: string;
  delete_id: string;
  delete_desc: string;

  tooth_chart = [
    {chart: adult_tooth_conditions, title: 'adult'},
    {chart: temp_tooth_conditions, title: 'temporary'},
  ] as {chart: {}, title: string }[];

  toggleChart(chart:string) {
    this.show_chart[chart] = !this.show_chart[chart];
  }

  saving_oralCondition: boolean = false;

  submitCondition() {
    this.saving_oralCondition = true;

    this.http.post('dental/oral-condition', this.oralConditionForm.value).subscribe({
      next: () => {
        this.saving_oralCondition = false;
        this.loadSelectedConsult.emit();
        this.toastr.success('Successfully Recorded', 'Oral Health Condition');
      },
      error: err => { this.http.showError(err.error.message, 'Oral Health Condition'); }
    })
  }

  onSubmit(chart_type:string) {
    this.is_saving = true;

    let tooth_arr = [];
    let tooth_chart = chart_type === 'adult' ? this.adult_tooth_arr : this.temp_tooth_arr;

    tooth_chart.forEach((e) => {
      let condition = {
        tooth_number: e,
        tooth_condition: this.tooth_condition[e]
      }

      tooth_arr.push(condition)
    });

    let params = {
      patient_id: this.selected_visit.patient.id,
      consult_id: this.selected_visit.id,
      tooth_arr: tooth_arr
    };

    this.http.post('dental/tooth-condition', params).subscribe({
      next: () => {
        this.is_saving = false;
        this.loadSelectedConsult.emit();
        this.toastr.success('Successfully Recorded', 'Tooth Condition');
      },
      error: err => { this.http.showError(err.error.message, 'Tooth Condition'); this.is_saving = false; }
    })
  }

  patchToothCondition() {
    this.consultCondition = Object.keys(this.selected_visit.consultToothCondition).length > 0;
    let toothCondition: [] = this.consultCondition ? this.selected_visit.consultToothCondition : this.selected_visit.latestToothCondition;

    Object.entries(toothCondition).forEach(([key, value]: any, index) => {
      this.tooth_condition[value.tooth_number] = value.tooth_condition;
    });

    if(this.selected_visit.dentalOralHealthCondition) this.oralConditionForm.patchValue({...this.selected_visit.dentalOralHealthCondition});
  }

  toggleModal(name, data?, event?) {
    if(event) event.preventDefault();

    if(name==='delete-service' && data) {
      this.url = 'dental/tooth-service/';
      this.delete_desc = 'Tooth Service';
      this.delete_id = data.id;
    }

    this.selected_tooth = data;
    this.modals[name] = !this.modals[name];

    if(!this.modals[name]) this.loadSelectedConsult.emit();
  }

  iterateServices(new_service: boolean){
    this.service_list = this.selected_visit.dentalToothService;
    this.current_services = [];

    if(Object.keys(this.selected_visit.dentalToothService).length > 0){
      Object.entries(this.selected_visit.dentalToothService).forEach(([key, value]:any, index) => {

        if(this.selected_visit.id === value.consult_id) {
          if(this.current_services[value.tooth_number]) {
            this.current_services[value.tooth_number].push({service_code: value.service_code, id: value.id});
          } else {
            this.current_services[value.tooth_number] = [{service_code: value.service_code, id: value.id}];
          }

          // delete this.service_list[key];
          // this.service_list.length -= 1;
        }
      });
    }

    this.createForm();
  }

  createForm() {
    this.oralConditionForm = this.formBuilder.nonNullable.group({
      patient_id: [this.selected_visit.patient.id, [Validators.required]],
      consult_id: [this.selected_visit.id, [Validators.required]],

      healthy_gums_flag: [false],
      orally_fit_flag: [false],
      oral_rehab_flag: [false],
      dental_caries_flag: [false],
      gingivitis_flag: [false],
      periodontal_flag: [false],
      debris_flag: [false],
      calculus_flag: [false],
      abnormal_growth_flag: [false],
      cleft_lip_flag: [false],
      supernumerary_flag: [false],
      dento_facial_flag: [false],
      others_flag: [false],
      remarks: [null],
    });

    this.patchToothCondition();
  }

  loadLibraries(){
    const getLibToothService = this.http.get('libraries/dental-tooth-service');
    const getLibOralCondition = this.http.get('libraries/dental-oral-condition');

    forkJoin([getLibToothService, getLibOralCondition]).subscribe({
      next: ([dataLibToothService, dataLibOralCondition]: any) => {
        this.tooth_service_legend = dataLibToothService.data;
        this.oral_health_condition = dataLibOralCondition.data;

        this.iterateServices(false);
      },
      error: err => { this.http.showError(err.error.message, 'Condition and Service Library'); }
    });
  }

  updateConditions(chart_type: string) {
    let tooth_chart = chart_type === 'adult' ? this.adult_tooth_arr : this.temp_tooth_arr;

    tooth_chart.forEach((e) => {
      delete this.tooth_condition[e];
      if(!this.tooth_condition[e]) this.tooth_condition[e] = this.condition[chart_type];
    });
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.iterateServices(true);
  }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
