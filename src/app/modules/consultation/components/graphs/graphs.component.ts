import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { BmiChart, ChartOptions, WeightChart } from 'app/modules/patient-itr/declarations/chart-options';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
    selector: 'app-graphs',
    templateUrl: './graphs.component.html',
    styleUrls: ['./graphs.component.scss'],
    animations: [
        trigger('openCloseAccordion', [
            transition(':enter', [
                style({ height: 0, opacity: 0 }),
                animate('200ms', style({ height: '100%', opacity: '100%' })),
            ]),
            transition(':leave', [
                animate('200ms', style({ height: 0, opacity: 0 }))
            ])
        ]),
    ],
    standalone: false
})
export class GraphsComponent implements OnInit, OnChanges {
  @Input() vitals;
  public chartOptions: Partial<ChartOptions>;
  public WeightChart: Partial<WeightChart>;
  public BmiChart: Partial<BmiChart>;

  showChart: boolean = false;
  show_bmi: boolean = false;
  show_bp: boolean = false;
  show_weight: boolean = false;
  show_graphs: boolean = true;

  selected_chart: any;

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

    if(this.vitals_graph.systolic.length > 0 || this.vitals_graph.diastolic.length > 0 || this.vitals_graph.weight.length > 0 || this.vitals_graph.bmi.length > 0){
      this.selected_chart = 'all_chart';
      this.loadChart(this.selected_chart);
    } else {
      this.showChart = false;
    }

    this.generateAllChart();
    // console.log(this.vitals_graph)
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
            format: "MM/dd/yyyy HH:mm"
          }
        }
      };

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
            format: "MM/dd/yyyy HH:mm"
          }
        }
      };

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
            format: "MM/dd/yyyy HH:mm"
          }
        }
      };

  }

  loadChart(selected){
    this.show_bmi = false;
    this.show_bp = false;
    this.show_weight = false;

    switch (selected) {
      case 'bp_chart':
        this.show_bp = true;
        break;
      case 'weight_chart':
        this.show_weight = true;
        break;
      case 'bmi_chart':
        this.show_bmi = true;
        break;
      case 'bmi_weight_chart':
        this.show_weight = true;
        this.show_bmi = true;
        break;
      case 'bp_weight_chart':
        this.show_bp = true;
        this.show_weight = true;
        break;
      case 'all_chart':
        this.show_bp = true;
        this.show_weight = true;
        this.show_bmi = true;
        break;
      default:

        break;
    }

    this.showChart = true;
  }

  generateAllChart() {
    this.generateBPChart();
    this.generateWeightChart();
    this.generateBMIChart();
  }


  constructor(
    private router: Router
  ) { }

  ngOnChanges(changes){
    if(this.vitals) this.patientVitals(this.vitals);
  }

  ngOnInit(): void {

  }
}
