import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  faEnvelope = faEnvelope;

  constructor(
    private router: Router
  ) { }
//email/verify/
  ngOnInit(): void {
    console.log(this.router.url.split(';')[0]);
  }
}
