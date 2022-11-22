import { Component, OnInit } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-households',
  templateUrl: './households.component.html',
  styleUrls: ['./households.component.scss']
})
export class HouseholdsComponent implements OnInit {
  household_list: any;

  faPenToSquare = faPenToSquare;

  loadHouseholds(){
    this.http.get('households/household-folders',{params:{per_page:'all', include: 'barangay' }}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.household_list = data.data;
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.loadHouseholds();
  }
}
