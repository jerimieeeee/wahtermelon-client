import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, WeightChart } from '../patient-itr/declarations/chart-options';
import { ChartComponent } from "ng-apexcharts";
import { faCircleNotch, faPlusSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpService } from 'app/shared/services/http.service';
import { delay, map, Observable, of } from 'rxjs';
import { Complaints  } from './model/complaint';
import { Pe  } from './model/pe';

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
  @ViewChild("bp-chart") bp_chart: ChartComponent;
  @ViewChild("weight-chart") weight_chart: ChartComponent;

  faPlusSquare = faPlusSquare;
  faSpinner = faCircleNotch;
  faXmark = faXmark;

  is_saving: boolean = false;
  show_item: boolean = true;

  complaints$: Observable<any[]>;
  selectedComplaint = [];
  list_complaints: any;

  /* async getComplaint(term: string = null): Observable<Complaints[]> {
    console.log(term)
    let items = this.complaints$;
    if(term) {
      items = items.filter(x => x.complaint_desc.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
    }
    return of(items).pipe(delay(500))
  } */

  constructor(
    private http: HttpService
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

  saveConsult(){
    this.is_saving = true;

    setTimeout(() => {
      this.is_saving = false;
    }, 5000);
  }

  deleteItem(){
    this.show_item = false;
  }

  pe_grouped = [];
  pe: Pe;
  loadLibraries() {
    let value: any;
    /* return this.http.get('libraries/complaint').pipe(
      map((res:any) => {
        return {
          ...res.data
        } as Complaints
      })
    ); */
    this.http.get('libraries/complaint').subscribe(
      (data: any) => {
        this.complaints$ = of(data.data)
      }
    );

    this.http.get('libraries/pe').subscribe(
      (data: any) => {
        console.log(data.data)
        this.pe = {...data.data};
        console.log(this.pe)
        // this.pe_grouped = this.pe.group(({ category_id }) => category_id);
        /* this.pe_grouped = result.groupBy(pe => {
          return pe.category_id
        }) */
        // console.log(this.pe_grouped);
      }
    );
    /* return this.http.get('libraries/complaint').subscribe({
      next: (data: any) =>  {return data.data} ,
      error: (err) => console.log(err)
    }); */
    /* const res$ = this.http.get('libraries/complaint')
                .map(res => { return res});

    value = await lastValueFrom(res$);
    console.log(value); */
    return value;
  }

  ngOnInit(): void {
    this.loadLibraries();
  }

}
