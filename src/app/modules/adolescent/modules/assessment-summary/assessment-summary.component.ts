import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faChevronCircleDown, faChevronCircleUp, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assessment-summary',
  templateUrl: './assessment-summary.component.html',
  styleUrl: './assessment-summary.component.scss'
})
export class AssessmentSummaryComponent {

  faSave = faSave;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;
  faSpinner = faSpinner;

  show_content: boolean = true;
  is_saving: boolean = false;

}
