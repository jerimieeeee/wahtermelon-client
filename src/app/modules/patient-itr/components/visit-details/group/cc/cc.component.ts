import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-cc',
  templateUrl: './cc.component.html',
  styleUrls: ['./cc.component.scss']
})
export class CcComponent implements OnInit {
  @Input() selected_visit;

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
    if(this.selected_visit) this.loadData();
  }
}
