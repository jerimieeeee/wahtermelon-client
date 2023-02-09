import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BmiChart, ChartOptions, WeightChart } from './chart-option';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  @Input() patient_vitals;
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
    // console.log('test')
    this.generateBPChart();
    this.generateWeightChart();
    this.generateBMIChart();
  }


  constructor(
  ) { }

  ngOnChanges(changes: SimpleChanges):void{
    if(this.patient_vitals) this.patientVitals(this.patient_vitals);
  }

  ngOnInit(): void {

  }
}
