import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-casefindings',
  templateUrl: './casefindings.component.html',
  styleUrls: ['./casefindings.component.scss']
})
export class CasefindingsComponent implements OnInit {
  delivery_method: any = [];

  createForm() {

  }

  onSubmit(data) {

  }

  loadLibraries(){
    this.http.get('tbdots/tb-libraries').subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: err => console.log(err)
    });
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    console.log('test')
    this.loadLibraries();
  }
}
