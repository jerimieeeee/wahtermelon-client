import { Component, Input, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-ab-preexposure',
    templateUrl: './ab-preexposure.component.html',
    styleUrls: ['./ab-preexposure.component.scss'],
    standalone: false
})
export class AbPreexposureComponent implements OnInit {
  @Input() patient_id;

  pre_exposure_list: {};
  selected_pre_exposure: any;
  fetching_history: boolean = true;
  modals: any = [];

  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  faEdit = faEdit;

  getPreExposure(){
    this.fetching_history = true;

    let params = {
      patient_id: this.patient_id
    }

    this.http.get('animal-bite/patient-ab-pre-exposure', {params}).subscribe({
      next: (data: any) => {
        this.pre_exposure_list = data.data;
        this.fetching_history = false;
      },
      error: err => console.log(err)
    });
  }

  editPreExposure(name, data) {
    this.selected_pre_exposure = data;
    this.modals[name] = !this.modals[name];
  }

  toggleModal(name) {
    this.selected_pre_exposure = null;
    this.modals[name] = !this.modals[name];
    if(name==='preexp-modal' && this.modals['preexp-modal'] === false) this.getPreExposure();
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPreExposure();
  }
}
