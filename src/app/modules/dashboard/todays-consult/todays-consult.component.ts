import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faQuestionCircle, faChevronDown, faFolderOpen, faHeart, faFlask, faNotesMedical, faExclamationCircle, faChevronRight, faChevronLeft, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { NameHelperService } from 'app/shared/services/name-helper.service';
import { interval, Subject, Subscription, takeUntil } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-todays-consult',
  templateUrl: './todays-consult.component.html',
  styleUrls: ['./todays-consult.component.scss']
})
export class TodaysConsultComponent implements OnInit, OnDestroy {
  @Input() date_today;
  private unsubscribe$ = new Subject<void>();

  faQuestionCircle = faQuestionCircle;
  faChevronDown = faChevronDown;
  faFolderOpen = faFolderOpen;
  faHeart = faHeart;
  faFlask = faFlask;
  faNotesMedical = faNotesMedical;
  faExclamationCircle = faExclamationCircle;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;

  today_consults: [];
  physicians: [];
  selected_physician: string = "all";

  per_page: number = 10;
  current_page: number = 1;
  last_page: number;
  from: number;
  to: number;
  total: number;

  show_form: boolean = false;
  debounceDelay = 1500; // Adjust the delay as needed
  isLoading: boolean = false;

  // Timer reference
  private debounceTimer: ReturnType<typeof setTimeout>;

  getTodaysConsult(page?: number){
    // console.log('query')
    if (this.isLoading) return;
    let params = {params: { }};
    params['params']['page'] = !page ? this.current_page : page;
    if (this.selected_physician !== 'all') {
      params['params']['physician_id'] = this.selected_physician;
    } else {
      delete params['params']['physician_id'];
    }
    params['params']['per_page'] = this.per_page;
    params['params']['consult_done'] = 0;
    params['params']['todays_patient'] = 1;

    this.isLoading = true;
    // console.log(params, page, this.current_page)
    this.http.get('consultation/records', params)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
      next: (data: any) => {
        // console.log(data);
        this.today_consults = data.data;
        this.show_form = true;

        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
        // this.subscribeRefresh();
      },
      error: err => console.log(err)
    })
  }


  private updateList: Subscription;
  todays_interval: any;

   subscribeRefresh(){
    this.todays_interval = setInterval(() => {
      this.onPhysicianChange();
    }, 30000);
  }

  loadPhysicians(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get('users', {params:{per_page: 'all', designation_code: 'MD'}}).subscribe({
        next: (data: any) => {
          this.physicians = data.data;
          let user_info = this.http.getUserFromJSON();
          this.selected_physician = user_info.designation_code === 'MD' ? user_info.id : 'all';
          resolve(); // Resolve the promise once loading is done
        },
        error: err => {
          console.log(err);
          reject(err); // Reject the promise if there's an error
        }
      });
    });
  }

  openItr(patient_id, ptgroup, id){
    if(ptgroup === 'itr'){
      this.router.navigate(['/patient/'+ptgroup, {id: patient_id}]);
    } else {
      this.router.navigate(['/patient/'+ptgroup, {id: patient_id, consult_id: id}]);
    }
  }

  getDataDiff(consult_date): string {
    let endDate = new Date();
    let startDate = new Date(consult_date);
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));

    let duration_day = days ? days + ' days': '';;
    let duration_hours = hours ? hours + ' hours': '';
    let duration_minutes = minutes ? minutes + ' minutes': '';
    return duration_day+' '+duration_hours+' '+duration_minutes;
  }

  checkVisit(group): string{
    return this.nameHelper.getVisitType(group);
  }

  getInitials(first_name, last_name): string {
    return first_name.charAt(0)+last_name.charAt(0)
  }

  constructor(
    private http: HttpService,
    private router: Router,
    private nameHelper: NameHelperService
  ) { }

  onPhysicianChange(): void {
    // Clear the previous debounce timer if it exists
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Set a new debounce timer
    this.debounceTimer = setTimeout(() => {
      this.getTodaysConsult();
    }, this.debounceDelay);
  }

  ngOnInit(): void {
    this.loadPhysicians().then(() => {
      this.onPhysicianChange();
      this.subscribeRefresh();
    }).catch(error => {
      console.error('Error loading physicians:', error);
    });
  }

  ngOnDestroy(): void {
    // console.log(this.todays_interval);
    if(this.todays_interval) {
      clearInterval(this.todays_interval)
    }
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // this.updateList.unsubscribe();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
