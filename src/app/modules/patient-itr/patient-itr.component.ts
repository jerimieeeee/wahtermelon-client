import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
};

export type WeightChart = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-patient-itr',
  templateUrl: './patient-itr.component.html',
  styleUrls: ['./patient-itr.component.scss']
})
export class PatientItrComponent implements OnInit {
  show_details = true;
  medical_journal = [
    {
      visit_date: "July 01, 2020",
      visits: [
        {
          visit_type: "GENERAL CONSULTATION",
          assessed_by: "John Doe",
          diagnosed_by: "Dr. Moira Santos"
        },
        {
          visit_type: "LABORATORY - URINALYSIS",
          assessed_by: "John Doe",
          diagnosed_by: "Dr. Francis Gamboa"
        }
      ]
    },
    {
      visit_date: "March 09, 2020",
      visits: [
        {
          visit_type: "FAMILY PLANNING",
          assessed_by: "Midwife 1",
          diagnosed_by: "Nurse 1"
        }
      ]
    },
    {
      visit_date: "March 01, 2020",
      visits: [
        {
          visit_type: "FAMILY PLANNING",
          assessed_by: "Midwife 1",
          diagnosed_by: "Nurse 1"
        }
      ]
    },
    {
      visit_date: "Feb 14, 2020",
      visits: [
        {
          visit_type: "GENERAL CONSULTATION",
          assessed_by: "Procorpio Pepito",
          diagnosed_by: "Pepito Sampu"
        }
      ]
    }
  ];

  open_details(){
    if(this.show_details == true){
      this.show_details = false;
    }else{
      this.show_details = true;
    }
  }

  @ViewChild("bp-chart") bp_chart: ChartComponent;
  @ViewChild("weight-chart") weight_chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public WeightChart: Partial<WeightChart>;

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

  ngOnInit(): void {
  }

}
