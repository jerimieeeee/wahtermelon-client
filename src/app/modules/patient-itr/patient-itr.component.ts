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


  @ViewChild("bp-chart") bp_chart: ChartComponent;
  @ViewChild("weight-chart") weight_chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public WeightChart: Partial<WeightChart>;
  /* get openCloseTrigger() {
    return this.show_details ? "open" : "closed";
  } */

  constructor(
    private router: Router,
    private http: HttpService
  ) {

  }

  onSubmit(loc){
    this.router.navigate(['/'+loc, {id: this.patient_details.id}])
  }

  patientInfo(info){
    this.patient_details = info;
    this.loadVisitHistory();
  }

  vitals_graph = {
    systolic: [],
    diastolic: [],
    weight: [],
    bp_date: [],
    weight_date: [],
  }

  showChart: boolean = false;


  patientVitals(vitals){
    this.vitals_graph.systolic = [];
    this.vitals_graph.diastolic = [];
    this.vitals_graph.bp_date = [];
    this.vitals_graph.weight = [];
    this.vitals_graph.weight_date = [];

    Object.entries(vitals).forEach(([key, value], index) => {
      let val: any = value;
      if(val.bp_systolic){
        this.vitals_graph.systolic.push(val.bp_systolic);
        this.vitals_graph.diastolic.push(val.bp_diastolic);
        this.vitals_graph.bp_date.push(val.vitals_date);
      }

      if(val.patient_weight){
        this.vitals_graph.weight.push(val.patient_weight);
        this.vitals_graph.weight_date.push(val.vitals_date);
      }
    })

    if(this.vitals_graph.systolic.length > 0 || this.vitals_graph.diastolic.length > 0){
      this.showChart = true;
      this.generateChart();
    } else {
      this.showChart = false;
    }
  }

  navigationEnd$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    tap(() => {
      this.show_details = false;
    })
  );

  generateChart(){
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
  }

  visit_list: any;

  loadVisitHistory(){
    console.log(this.patient_details);
    this.http.get('consultation/cn-records/'+this.patient_details.id).subscribe({
      next: (data: any) => {
        this.visit_list = data.data;
        console.log(data);
      },
      error: err => console.log(err),
    })
  }

  getVisitType(group){
    switch(group){
      case 'cn':
        return 'Consultation';
        break;
      case 'cc':
        return 'Child Care';
        break;
      case 'mc':
        return 'Maternal Care';
        break;
      case 'dn':
        return 'Dental';
        break;
      case 'ncd':
        return 'Non Communicable Disease';
        break;
    }
  }

  ngOnInit(): void {
    this.navigationEnd$.subscribe();
  }
}
