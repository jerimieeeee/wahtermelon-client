import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faCalendarDay, faPlus, faSave, faTimes, faClose, faTimesCircle, faPencil, faCaretDown, faAngleDown, faInfoCircle, faCaretRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.scss']
})
export class MethodsComponent implements OnInit {
  focused: boolean;
  focused2: boolean;
  modal: boolean;

  faSpinner = faSpinner;

  is_saving: boolean = false;

  faTimes = faTimes;
  faClose = faClose;
  faTimesCircle = faTimesCircle;
  faSave = faSave;
  faPencil = faPencil;
  faAngleDown = faAngleDown;
  faInfoCircle = faInfoCircle;
  faCaretRight = faCaretRight;
  error_message = '';
  public buttons = [];

  public keyUp = [];

  fp_methods: any = [];
  client_list: any = [];

  modals: any = [];
  
  toggleModal(name) {
    this.modals[name] = !this.modals[name];
  }

  loadLibraries() {
    const getMethod = this.http.get('libraries/family-planning-method');
    const getClient = this.http.get('libraries/family-planning-client-type');

    forkJoin([getMethod, getClient]).subscribe({
      next:([dataMethod, dataClient]:any) => {
        this.fp_methods = dataMethod.data;
        this.client_list = dataClient.data;
        console.log(this.fp_methods, 'new function');
        console.log(this.client_list, 'new function');
      },
      error: err => console.log(err)
    });
  }
  

  constructor(
    private router: Router,
    private http: HttpService,) { }

  ngOnInit(): void {
    this.loadLibraries();
    this.error_message = '**please enter numbers only';
  } 
}

