import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faSearch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-households',
  templateUrl: './households.component.html',
  styleUrls: ['./households.component.scss']
})
export class HouseholdsComponent implements OnInit {
  household_list: any;
  search_item: string;

  faSearch = faSearch;
  faPenToSquare = faPenToSquare;

  searchFamily(){
    console.log('attempt search')
    this.http.get('households/household-folders', {params:{'filter[search]': this.search_item, per_page: 'all', include: 'barangay'}}).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.household_list = data.data;
      },
      error: err => console.log(err)
    })
  }


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
