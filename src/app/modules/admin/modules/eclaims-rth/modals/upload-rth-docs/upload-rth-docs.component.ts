import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-upload-rth-docs',
  templateUrl: './upload-rth-docs.component.html',
  styleUrl: './upload-rth-docs.component.scss',
  standalone: false
})
export class UploadRthDocsComponent implements OnInit {

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {

  }
}
