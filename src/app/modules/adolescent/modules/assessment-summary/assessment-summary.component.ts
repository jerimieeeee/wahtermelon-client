import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faChevronCircleDown, faChevronCircleUp, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assessment-summary',
  templateUrl: './assessment-summary.component.html',
  styleUrl: './assessment-summary.component.scss'
})
export class AssessmentSummaryComponent implements OnInit {
  @Input() patient_id: any;
  @Input() selected_asrh_consult: any;
  @Output() loadASRH = new EventEmitter<any>();
  @Output() updateSelectedAb = new EventEmitter<any>();
  faSave = faSave;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;
  faSpinner = faSpinner;

  show_content: boolean = true;
  is_saving: boolean = false;
  toggle_content: boolean = true;

  asrh_visit_history: any = [];
  rapid_history: any = [];

  selected: any;

  // reloadData(){
  //   let params = {
  //     patient_id: this.patient_id
  //   }

  //   this.http.get('asrh/rapid', {params}).subscribe({
  //     next: (data: any) => {
  //       this.rapid_history = data.data[0];

  //       console.log(this.rapid_history, 'check mo selected rapid')
  //     },
  //     error: err => console.log(err)
  //   });
  // }

  selectVisit(){
    this.selected = this.selected_asrh_consult;
  }

  parseReason(selected_asrh_consult) {
    console.log(selected_asrh_consult, 'parseReason')
    if(selected_asrh_consult) {
      let obj: any = typeof selected_asrh_consult === 'object' ? JSON.stringify(selected_asrh_consult) : selected_asrh_consult;
      let message: any = '';

      if(obj.charAt(0) === '[') {
        obj = JSON.parse(obj);
      } else {
        if(obj.charAt(0) === '{') {
          obj = JSON.parse(obj);
        } else {
          return obj;
        }
      }

      const parse = (obj: any) => {
        Object.entries(obj).forEach(([key, value]: any) => {
          if (typeof value === 'object' && value !== null) {
            parse(value);
          } else {
            message += `${value}<br>`;
          }
        });
      };

      parse(obj);
      return message;
    }
    return '';

  }

  constructor(
      private http: HttpService,
      private formBuilder: FormBuilder,
      // private router: Router
    ) { }

  ngOnInit(): void {
    this.loadASRH.emit();

  this.selectVisit();
    console.log(this.selected_asrh_consult, 'check mo selected rapid')
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnChanges(changes){
    this.show_content = this.toggle_content;

  }


}
