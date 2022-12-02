import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import { openCloseTrigger } from './declarations/animation';
import { BmiChart, ChartOptions, WeightChart } from './declarations/chart-options';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from "rxjs/operators";
import { HttpService } from 'app/shared/services/http.service';
import { formatDate } from '@angular/common';
import { faCircle, faFolder, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faEye, faFolderOpen } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-patient-itr',
  templateUrl: './patient-itr.component.html',
  styleUrls: ['./patient-itr.component.scss'],
  animations: [openCloseTrigger]
})
export class PatientItrComponent implements OnInit {
  @ViewChild("bp-chart") bp_chart: ChartComponent;
  @ViewChild("weight-chart") weight_chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public WeightChart: Partial<WeightChart>;
  public BmiChart: Partial<BmiChart>;

  show_details:boolean = false;
  showModal:boolean = false;
  showChart: boolean = false;
  show_bmi: boolean = false;
  show_bp: boolean = false;
  show_weight: boolean = false;

  selected_chart: any;
  visit_list: any;
  patient_details: any;
  latest_vitals: any;

  faCircle = faCircle;
  faEye = faEye;
  faFolderOpen = faFolderOpen;
  faFolder = faFolder;
  faStethoscope = faStethoscope;

  vitals_graph = {
    systolic: [],
    diastolic: [],
    weight: [],
    bp_date: [],
    weight_date: [],
    bmi: [],
    bmi_date: []
  }
  /* open_details(){
    this.show_details = !this.show_details;
  } */

  /* onSubmit(loc){
    this.router.navigate(['/'+loc, {id: this.patient_details.id}])
  } */

  patientInfo(info){
    this.patient_details = info;
    this.loadVisitHistory();
  }

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

  navigationEnd$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    tap(() => {
      this.show_details = false;
    })
  );

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
      case 'all':
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

  loadVisitHistory(){
    // console.log(this.patient_details);
    this.http.get('consultation/cn-records',{params:{patient_id: this.patient_details.id, per_page: 'all', sort: '-consult_date'}}).subscribe({
      next: (data: any) => {
        this.visit_list = data.data;
        console.log(data);
      },
      error: err => console.log(err),
    })
  }

  openVisit(details: any){
    console.log(details);
    console.log(details.pt_group);
    this.router.navigate(['/'+details.pt_group, {id:details.patient.id, consult_id: details.id}])
  }

  showConsult(details: any){
    if(details.vitals) this.getLatestToday(details);
  }

  selected_id: number;
  selected_visit: any;

  getLatestToday(details){
    // console.log(details)
    this.latest_vitals = details.vitals[0];
    this.selected_visit = details;

    Object.entries(details.vitals).every(([keys, values], indexes) => {
      let val:any = values;

      if(!this.latest_vitals.patient_height && val.patient_height) this.latest_vitals.patient_height = val.patient_height;
      if(!this.latest_vitals.patient_weight && val.patient_weight) this.latest_vitals.patient_weight = val.patient_weight;

      let vitals_date = formatDate(val.vitals_date, 'Y-M-dd','en', 'en')
      let date_today = formatDate(new Date(), 'Y-M-dd','en', 'en')
      // console.log(vitals_date, date_today)
      if(vitals_date === date_today){
        if(!this.latest_vitals.bp_systolic && val.bp_systolic){
          this.latest_vitals.bp_systolic = val.bp_systolic;
          this.latest_vitals.bp_diastolic = val.bp_diastolic;
        }

        if(!this.latest_vitals.patient_spo2 && val.patient_spo2) this.latest_vitals.patient_spo2 = val.patient_spo2;
        if(!this.latest_vitals.patient_temp && val.patient_temp) this.latest_vitals.patient_temp = val.patient_temp;
        if(!this.latest_vitals.patient_heart_rate && val.patient_heart_rate) this.latest_vitals.patient_heart_rate = val.patient_heart_rate;
        if(!this.latest_vitals.patient_respiratory_rate && val.patient_respiratory_rate) this.latest_vitals.patient_respiratory_rate = val.patient_respiratory_rate;
        if(!this.latest_vitals.patient_pulse_rate && val.patient_pulse_rate) this.latest_vitals.patient_pulse_rate = val.patient_pulse_rate;

        if(!this.latest_vitals.patient_head_circumference && val.patient_head_circumference) this.latest_vitals.patient_head_circumference = val.patient_head_circumference;
        if(!this.latest_vitals.patient_muac && val.patient_muac) this.latest_vitals.patient_muac = val.patient_muac;
        if(!this.latest_vitals.patient_chest && val.patient_chest) this.latest_vitals.patient_chest = val.patient_chest;
        if(!this.latest_vitals.patient_abdomen && val.patient_abdomen) this.latest_vitals.patient_abdomen = val.patient_abdomen;
        if(!this.latest_vitals.patient_waist && val.patient_waist) this.latest_vitals.patient_waist = val.patient_waist;
        if(!this.latest_vitals.patient_hip && val.patient_hip) this.latest_vitals.patient_hip = val.patient_hip;
        if(!this.latest_vitals.patient_limbs && val.patient_limbs) this.latest_vitals.patient_limbs = val.patient_limbs;
        if(!this.latest_vitals.patient_skinfold_thickness && val.patient_skinfold_thickness) this.latest_vitals.patient_skinfold_thickness = val.patient_skinfold_thickness;
      }

      if(this.latest_vitals.patient_height > 0 && this.latest_vitals.patient_weight > 0 &&
        this.latest_vitals.bp_systolic > 0 && this.latest_vitals.patient_heart_rate > 0 &&
        this.latest_vitals.patient_respiratory_rate > 0 && this.latest_vitals.patient_pulse_rate > 0 &&
        this.latest_vitals.patient_waist > 0){
        return false;
      }
      return true;
    });

    if(this.selected_id){
      if(this.selected_id === details.id){
        this.selected_id = undefined;
        this.show_details = false;
      } else {
        this.selected_id = details.id;
        this.show_details = true;
      }
    } else {
      this.selected_id = details.id;
      this.show_details = true;
    }
  }

  getVisitType(group){
    switch(group){
      case 'cn':
        return 'Consultation';
      case 'cc':
        return 'Child Care';
      case 'mc':
        return 'Maternal Care';
      case 'dn':
        return 'Dental';
      case 'ncd':
        return 'Non Communicable Disease';
    }
  }

  constructor(
    private router: Router,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.navigationEnd$.subscribe();
  }
}
