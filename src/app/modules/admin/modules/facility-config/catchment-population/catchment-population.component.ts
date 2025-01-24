import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { faEdit, faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-catchment-population',
    templateUrl: './catchment-population.component.html',
    styleUrls: ['./catchment-population.component.scss'],
    standalone: false
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
  is_saving: boolean = false;

  onSubmit() {
    this.is_saving = true;
    let params = {
      year: this.selected_year,
      barangay: this.catchment_barangays[this.selected_year].data
    }

    this.http.post('settings/catchment-barangay', params).subscribe({
      next: (data: any) => {
        this.toastr.success('Successfully recorded', 'Population')
        this.is_saving = false;
        this.updateData();
      },
      error: err => console.log(err)
    });
  }

  editPop(year) {
    if(this.selected_year !== year){
      this.selected_year = year;
      this.reloadData();
    }
  }

  show_form: boolean = false;
  updateData(){
    // this.show_form = false;
    this.show_pop = false;
    // this.getCatchmentBarangay.emit(this.selected_year);
    this.getPopulations();
  }

  reloadData(){
    this.show_form = false;
    this.getCatchmentBarangay.emit(this.selected_year);
  }

  catchment_population: object;
  show_pop: boolean = false;
  getPopulations(){
    this.show_pop = false;

    this.http.get('settings/catchment-barangay').subscribe({
      next: (data:any) => {
        // console.log(data)
        this.catchment_population = data;
        this.show_pop = true;
      },
      error: err => console.log(err)
    })
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnChanges(change: SimpleChanges): void{
    if(this.catchment_barangays) this.show_form = true;
  }

  ngOnInit(): void {
    this.selected_year = this.current_year;
    this.getPopulations();

    for(let year = Number(this.current_year); year > 2017; year--) {
      this.years.push(year);
    }
  }
}
