import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { adult_tooth_arr, adult_tooth_conditions, temp_tooth_arr, temp_tooth_conditions, tooth_condition_legend } from './libToothNumber';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { faAdd, faCheck, faChevronCircleDown, faChevronCircleUp, faCircleNotch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss']
})
export class ConditionComponent implements OnInit, OnChanges {
  @Output() loadSelectedConsult = new EventEmitter<any>();
  @Input() selected_visit;

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

  modals: any[] =[];
  condition: any[] =[];
  service_list: any[] =[];
  current_services: any[] =[];
  tooth_condition: any[] = [];
  tooth_service_legend: any[] =[];
  is_saving: boolean = false;
  show_form: boolean = false;
  selected_tooth: number;
  show_chart: {} = {adult: true, temporary: true};

  tooth_chart = [
    {chart: adult_tooth_conditions, title: 'adult'},
    {chart: temp_tooth_conditions, title: 'temporary'},
  ] as {chart: {}, title: string }[];

  toggleChart(chart:string) {
    this.show_chart[chart] = !this.show_chart[chart];
  }

  onSubmit() {
    this.is_saving = true;

    let tooth_arr = [];
    Object.entries(this.tooth_condition).forEach(([key, value]: any) => {
      let condition = {
        tooth_number: key,
        tooth_condition: value
      }

      tooth_arr.push(condition)
    });

    let params = {
      patient_id: this.selected_visit.patient.id,
      consult_id: this.selected_visit.id,
      tooth_arr: tooth_arr
    };

    this.http.post('dental/tooth-condition', params).subscribe({
      next: (data: any) => {
        this.is_saving = false;
        this.loadSelectedConsult.emit();
        this.toastr.success('Successfully Recorded', 'Tooth Condition');
      },
      error: err => { this.http.showError(err.error.message, 'Tooth Condition'); this.is_saving = false; }
    })
  }

  updateConditions(chart_type: string) {
    let tooth_chart = chart_type === 'adult' ? this.adult_tooth_arr : this.temp_tooth_arr;

    tooth_chart.forEach((e) => {
      delete this.tooth_condition[e];
      if(!this.tooth_condition[e]) this.tooth_condition[e] = this.condition[chart_type];
    });
  }

  patchData() {
    Object.entries(this.selected_visit.dentalToothCondition).forEach(([key, value]: any, index) => {
      this.tooth_condition[value.tooth_number] = value.tooth_condition;
    });
  }

  toggleModal(name, data?, event?) {
    if(event) event.preventDefault();

    this.selected_tooth = data;
    this.modals[name] = !this.modals[name];

    if(!this.modals[name]) this.loadSelectedConsult.emit();
  }

  iterateServices(new_service: boolean){
    this.service_list = this.selected_visit.dentalToothService;
    if(new_service) this.current_services = [];

    if(Object.keys(this.selected_visit.dentalToothService).length > 0){
      Object.entries(this.selected_visit.dentalToothService).forEach(([key, value]:any, index) => {

        if(this.selected_visit.id === value.consult_id) {
          if(this.current_services[value.tooth_number]) {
            this.current_services[value.tooth_number].push(value.service_code);
          } else {
            this.current_services[value.tooth_number] = [value.service_code];
          }

          delete this.service_list[key];
          this.service_list.length -= 1;
        }
      });
    }

    this.patchData();
  }

  loadLibraries(){
    this.http.get('libraries/dental-tooth-service').subscribe({
      next: (data: any) => {
        this.tooth_service_legend = data.data;
      },
      error: err => { this.http.showError(err.error.message, 'Tooth Services Library') }
    })
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.iterateServices(true);
  }

  ngOnInit(): void {
    this.loadLibraries();
    this.iterateServices(false);
  }
}
