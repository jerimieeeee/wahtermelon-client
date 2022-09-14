import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, WeightChart } from '../patient-itr/declarations/chart-options';
import { ChartComponent } from "ng-apexcharts";
import { faCircleNotch, faPlusSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate } from '@angular/animations';

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
  public WeightChart: Partial<WeightChart>;
  public chartOptions: Partial<ChartOptions>;
  faPlusSquare = faPlusSquare;
  faSpinner = faCircleNotch;
  faXmark = faXmark;

  is_saving: boolean = false;
  show_item: boolean = true;

  @ViewChild("bp-chart") bp_chart: ChartComponent;
  @ViewChild("weight-chart") weight_chart: ChartComponent;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Systolic",
          data: [120, 120, 110, 120, 140, 120, 120]
        },
        {
          name: "Diastolic",
          data: [90, 80, 80, 84, 92, 70, 80]
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
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };

    this.WeightChart = {
      series: [
        {
          name: "Weight",
          data: [120, 120, 110, 120, 140, 120, 120]
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
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  }

  saveConsult(){
    this.is_saving = true;

    setTimeout(() => {
      this.is_saving = false;
    }, 5000);
  }

  deleteItem(){
    this.show_item = false;
  }

  ngOnInit(): void {
  }

}
