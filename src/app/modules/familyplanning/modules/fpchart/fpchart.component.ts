import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faCalendarDay, faPlus, faSave, faTimes, faClose, faTimesCircle, faPencil, faCaretDown, faAngleDown, faInfoCircle, faCaretRight, faSpinner, faPlusSquare, faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fpchart',
  templateUrl: './fpchart.component.html',
  styleUrls: ['./fpchart.component.scss']
})
export class FpchartComponent implements OnInit {
  @Output() sourceForm;
  @Output() loadFP = new EventEmitter<any>();
  @Input() patient_id;
  @Input() fp_visit_history;
  
  focused: boolean;
  focused2: boolean;
  modal: boolean;

  faSpinner = faSpinner;

  is_saving: boolean = false;

  faTimes = faTimes;
  faClose = faClose;
  faTimesCircle = faTimesCircle;
  faSave = faSave;
  faPlusSquare = faPlusSquare;
  faPencil = faPencil;
  faAngleDown = faAngleDown;
  faInfoCircle = faInfoCircle;
  faCaretRight = faCaretRight;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  error_message = '';
  public buttons = [];

  public keyUp = [];

  modals: any = [];

  show_form: boolean = false;

  fp_visit_history_details: any;

  fpchart_history: any;

  per_page: number = 5;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  
  toggleModal(name) {
    this.modals[name] = !this.modals[name];
  }

  getChartHistory(page?: number){
    // console.log('query')
    let params = {
      patient_id: this.fp_visit_history_details.patient_id,
      // per_page: 10,
      // page: !page ? this.current_page : page
    }

    // params['params']['page'] = !page ? this.current_page : page;
    // if (this.selected_physician !== 'all') params['params']['physician_id'] = this.selected_physician;
    // params['params']['per_page'] = this.per_page;
    // params['params']['patient_id'] = this.fp_visit_history_details.patient_id;
    // params['params']['consult_done'] = 0;

    // console.log(params, page, this.current_page)
    this.http.get('family-planning/fp-records', {params}).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.show_form = true;
        this.fpchart_history = data.data
        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
        console.log(this.fpchart_history, 'chart history')
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private router: Router,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.fp_visit_history_details = this.fp_visit_history[0];
    this.getChartHistory();
    this.loadFP.emit();
    console.log(this.fp_visit_history_details)
  } 
}