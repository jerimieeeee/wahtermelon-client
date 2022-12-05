import { Component, OnInit, ViewChild } from '@angular/core';
import { faCircleNotch, faPlus, faPlusSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpService } from 'app/shared/services/http.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { concat, Observable, of, Subject } from 'rxjs';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { BmiChart, ChartOptions, WeightChart } from '../patient-itr/declarations/chart-options';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
  animations: [
    trigger('closeChip', [
    transition(':enter', [
      style({ opacity: 0, visibility: 'hidden'}),
      animate('250ms', style({ opacity: '100%', visibility: 'visible'})),
    ]),
    transition(':leave', [
      animate('250ms', style({ opacity: 0, visibility: 'hidden', overflow: 'hidden' }))
    ])
  ])],
})
export class ConsultationComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>;
  public WeightChart: Partial<WeightChart>;
  public BmiChart: Partial<BmiChart>;

  faPlusSquare = faPlusSquare;
  faSpinner = faCircleNotch;
  faXmark = faXmark;
  faPlus = faPlus;
  faFloppyDisk = faFloppyDisk;

  is_saving: boolean = false;
  show_item: boolean = true;

  complaints$: Observable<any[]>;
  selectedComplaint = [];
  list_complaints: any;
  vitals: any;

  constructor(
    private http: HttpService
  ) {

  }

  selected_chart: any;

  showChart: boolean = false;
  show_bmi: boolean = false;
  show_bp: boolean = false;
  show_weight: boolean = false;

  vitals_graph = {
    systolic: [],
    diastolic: [],
    bp_date: [],
    weight: [],
    weight_date: [],
    bmi: [],
    bmi_date: []
  }

  patientVitals(vitals){
    this.vitals_graph.systolic = [];
    this.vitals_graph.diastolic = [];
    this.vitals_graph.bp_date = [];
    this.vitals_graph.weight = [];
    this.vitals_graph.weight_date = [];

    // console.log(vitals)
    Object.entries(vitals).forEach(([key, value], index) => {
      let val: any = value;
      // console.log(val)
      if(val.bp_systolic){
        this.vitals_graph.systolic.push(val.bp_systolic);
        this.vitals_graph.diastolic.push(val.bp_diastolic);
        this.vitals_graph.bp_date.push(val.vitals_date);
      }

      if(val.patient_weight){
        // console.log(val)
        this.vitals_graph.weight.push(val.patient_weight);
        this.vitals_graph.weight_date.push(val.vitals_date);
      }

      if(val.patient_bmi){
        this.vitals_graph.bmi.push(val.patient_bmi);
        this.vitals_graph.bmi_date.push(val.vitals_date);
      }
    })

    if(this.vitals_graph.systolic.length > 0 || this.vitals_graph.diastolic.length > 0){
      this.selected_chart = 'bp_weight_chart';
      this.loadChart();
    } else {
      this.showChart = false;
    }
  }

  generateBPChart(){
    this.chartOptions = {
      series: [
        {
          name: "Systolic",
          data: this.vitals_graph.systolic
        },
        {
          name: "Diastolic",
          data: this.vitals_graph.diastolic
        }
      ],
      chart: {
        height: 200,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Blood Pressure History"
      },
      xaxis: {
        type: "datetime",
        categories: this.vitals_graph.bp_date
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };

    this.showChart = true;
    this.show_bp = true;
  }

  generateWeightChart(){
    // this.show_weight = true;
    this.WeightChart = {
      series: [
        {
          name: "Weight",
          data: this.vitals_graph.weight
        }
      ],
      chart: {
        height: 200,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Weight History"
      },
      xaxis: {
        type: "datetime",
        categories: this.vitals_graph.weight_date
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };

    this.showChart = true;
    this.show_weight = true;
  }

  generateBMIChart(){
    this.BmiChart = {
      series: [
        {
          name: "BMI",
          data: this.vitals_graph.bmi
        }
      ],
      chart: {
        height: 200,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "BMI History"
      },
      xaxis: {
        type: "datetime",
        categories: this.vitals_graph.bmi_date
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };

    this.showChart = true;
    this.show_bmi = true;
  }

  loadChart(){
    this.show_bmi = false;
    this.show_bp = false;
    this.show_weight = false;

    switch (this.selected_chart) {
      case 'bp_chart':
        this.generateBPChart();
        break;
      case 'weight_chart':
        this.generateWeightChart();
        break;
      case 'bmi_chart':
        this.generateBMIChart();
        break;
      case 'bmi_weight_chart':
        this.generateWeightChart();
        this.generateBMIChart();
        break;
      case 'bp_weight_chart':
        this.generateBPChart();
        this.generateWeightChart();
        break;
      case 'all_chart':
        this.generateBPChart();
        this.generateWeightChart();
        this.generateBMIChart();
        break;
    }
  }

  generateAllChart(){
    this.generateBPChart();
    this.generateWeightChart();
    this.generateBMIChart();
  }

  deleteItem(){
    this.show_item = false;
  }

  onSubmit(table){
    console.log(table)
  }

  //test idx
  idxLoading: boolean = false;
  idx$: Observable<any>;
  searchInput$ = new Subject<string>();
  selectedIdx: any;
  minLengthTerm = 3;
  user_last_name: string;
  user_first_name: string;
  user_middle_name: string;

  loadIdx() {
    this.idx$ = concat(
      of([]), // default items
      this.searchInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.idxLoading = true),
        switchMap(term => {
          return this.getIdx(term).pipe(
            catchError(() => of([])),
            tap(() => this.idxLoading = false)
          )
        })
      )
    );
  }

  getIdx(term: string = null): Observable<any> {
    return this.http.get('patient', {params:{'filter[search]':term, per_page: 'all'}})
    .pipe(map((resp:any) => {
      // console.log(resp);
      /* this.showCreate = resp.data.length == 0 ? true : false;
      console.log(this.showCreate) */
      return resp.data;
    }))
  }
  //text idx

  patient_details: any;
  visit_list: any;

  patientInfo(info){
    this.patient_details = info;
    this.loadVisitHistory();
  }

  loadVisitHistory(){
    // console.log(this.patient_details);
    this.http.get('consultation/cn-records',{params:{patient_id: this.patient_details.id, per_page: 'all', sort: '-consult_date'}}).subscribe({
      next: (data: any) => {
        this.visit_list = data.data;
        // console.log(data);
      },
      error: err => console.log(err),
    })
  }

  pe_grouped = [];
  loadLibraries() {
    let value: any;
    this.http.get('libraries/complaint').subscribe(
      (data: any) => {
        this.complaints$ = of(data.data)
      }
    );

    this.http.get('libraries/pe').subscribe(
      (data: any) => {
        const list = data.data;

        const groups = list.reduce((groups, item) => {
          const group = (groups[item.category_id] || []);
          group.push(item);
          groups[item.category_id] = group;
          return groups;
        }, {});

        this.pe_grouped = groups;
        console.log(this.pe_grouped);
      }
    );
    return value;
  }

  ngOnInit(): void {
    this.loadLibraries();
    // this.loadIdx();
  }

}
