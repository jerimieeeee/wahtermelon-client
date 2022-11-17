import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import { openCloseTrigger } from './declarations/animation';
import { ChartOptions, WeightChart } from './declarations/chart-options';
import { MedicalJournal } from './data/sample-journal';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, tap } from "rxjs/operators";
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-patient-itr',
  templateUrl: './patient-itr.component.html',
  styleUrls: ['./patient-itr.component.scss'],
  animations: [openCloseTrigger]
})
export class PatientItrComponent implements OnInit {
  show_details:boolean = true;
  showModal:boolean = false;
  medical_journal = MedicalJournal;

  patient_details: any;

  open_details(){
    this.show_details = !this.show_details;
  }

  list_modules = [
    {
      group: 'General',
      modules: [
        {
          name: 'Consultation',
          location: 'consultation'
        },
        {
          name: 'Child Care',
          location: 'cc'
        },
        {
          name: 'Maternal Care',
          location: 'mc'
        },
        /* {
          name: 'Family Planning',
          location: 'fp'
        }, */
       /*  {
          name: 'Dental',
          location: 'dental'
        }, */
      ]
    },
    /* {
      group: 'Others',
      modules: [
        {
          name: 'Laboratory',
          location: 'consultation'
        },
        {
          name: 'Animal Bite',
          location: 'consultation'
        },
        {
          name: 'Tuberculosis',
          location: 'consultation'
        },
        {
          name: 'NCD',
          location: 'consultation'
        },
      ]
    } */
  ]
  @ViewChild("bp-chart") bp_chart: ChartComponent;
  @ViewChild("weight-chart") weight_chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public WeightChart: Partial<WeightChart>;
  /* get openCloseTrigger() {
    return this.show_details ? "open" : "closed";
  } */

  constructor(
    private router: Router
  ) {
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

  onSubmit(loc){
    this.router.navigate(['/'+loc, {id: this.patient_details.id}])
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  patientInfo(info){
    this.patient_details = info;
  }

  navigationEnd$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    tap(() => {
      this.show_details = false;
    })
  );

  ngOnInit(): void {
    this.navigationEnd$.subscribe();
  }
}
