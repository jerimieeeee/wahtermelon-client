import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { faEdit, faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-catchment-population',
  templateUrl: './catchment-population.component.html',
  styleUrls: ['./catchment-population.component.scss']
})
export class CatchmentPopulationComponent implements OnInit, OnChanges {
  @Output() getCatchmentBarangay = new EventEmitter<any>();
  @Input() catchment_barangays;
  @Input() current_year;
  faSave = faSave;
  faCircleNotch = faCircleNotch;
  faEdit = faEdit;

  selected_year: number;
  years: any = [];
  barangay_pop: any = [];

  onSubmit() {
    let params = {
      year: this.selected_year,
      barangay: this.catchment_barangays[this.selected_year].data
    }

    this.http.post('settings/catchment-barangay', params).subscribe({
      next: (data: any) => {
        this.toastr.success('Successfully recorded', 'Population')
        this.reloadData();
      },
      error: err => console.log(err)
    });
  }

  editPop(data) {
    console.log(data)
    this.reloadData();
  }

  show_form: boolean = false;
  reloadData(){
    this.show_form = false;
    this.getCatchmentBarangay.emit(this.selected_year);
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnChanges(change: SimpleChanges): void{
    console.log(this.catchment_barangays);
    if(this.catchment_barangays) this.show_form = true;
  }

  ngOnInit(): void {
    this.selected_year = this.current_year;

    for(let year = Number(this.current_year); year > 2017; year--) {
      this.years.push(year);
    }
  }
}
