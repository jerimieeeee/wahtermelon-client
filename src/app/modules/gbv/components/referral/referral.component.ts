import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faEdit, faSave } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent {
  faPlus = faPlus;
  faEdit = faEdit;
  faSave = faSave;
  show_form: boolean = true;

  modals: any = [];

  toggleModal(name){
    this.modals[name] = !this.modals[name]
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }
}
