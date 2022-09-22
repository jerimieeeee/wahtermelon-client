import { Component, OnInit } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-health-facility',
  templateUrl: './health-facility.component.html',
  styleUrls: ['./health-facility.component.scss']
})
export class HealthFacilityComponent implements OnInit {
  
  faInfoCircle = faInfoCircle;

  location = [
    {code: 'community', desc: 'Community Level'},
    {code: 'facility', desc: 'Health Facility'}];

  constructor() { }

  ngOnInit(): void {
  }

}
