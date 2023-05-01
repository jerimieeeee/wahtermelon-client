import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-ncd',
  templateUrl: './ncd.component.html',
  styleUrls: ['./ncd.component.scss']
})
export class NcdComponent implements OnInit {
  @Input() selected_visit

  loadData(){
    this.http.get('child-care/cc-records/'+this.selected_visit.patient.id).subscribe({
      next: (data: any) => {
        console.log(data)
      },
      error: err => console.log(err)
    });
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
  }

}
