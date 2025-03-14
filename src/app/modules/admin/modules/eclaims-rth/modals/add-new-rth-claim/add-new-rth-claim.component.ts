import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-add-new-rth-claim',
  templateUrl: './add-new-rth-claim.component.html',
  styleUrl: './add-new-rth-claim.component.scss',
  standalone: false,
})
export class AddNewRthClaimComponent implements OnInit {

  constructor(
    private http: HttpService
  ) {}

  ngOnInit(): void {

  }
}
