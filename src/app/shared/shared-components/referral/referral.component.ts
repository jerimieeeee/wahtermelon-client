import { Component } from '@angular/core';
import { ReferralFormComponent } from './modals/referral-form/referral-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBuildingCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-referral',
  imports: [ReferralFormComponent, FontAwesomeModule, CommonModule],
  templateUrl: './referral.component.html',
  styleUrl: './referral.component.scss'
})
export class ReferralComponent {
  faBuildingCircleArrowRight = faBuildingCircleArrowRight;

  modals: any = [];

  toggleModal(name) {
    this.modals[name] = !this.modals[name];
  }
}
