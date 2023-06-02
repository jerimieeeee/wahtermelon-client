import { Component, Input, OnInit } from '@angular/core';
import { faEdit, faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-catchment-bhs',
  templateUrl: './catchment-bhs.component.html',
  styleUrls: ['./catchment-bhs.component.scss']
})
export class CatchmentBhsComponent implements OnInit {
  @Input() catchment_barangays;
  @Input() facility_code;

  faSave = faSave;
  faCircleNotch = faCircleNotch;
  faEdit = faEdit;
  faTrashCan = faTrashCan;
  living_arrangements: any =[];
  is_loading: boolean = false;

  bhs = {
    id: null,
    assigned_user_id: null,
    bhs_name: null,
    barangay_code: null,
    barangay: []
  }
  selected_barangays: any = [];

  rhu_staffs: any = [];
  facility_bhs: any = [];

  editBhs(data) {
    console.log(data);
    this.bhs = data;

    Object.entries(data.bhs_barangay).forEach(([key, value]: any, index) => {
      this.selected_barangays[value.id] = true;
    })
  }

  onSubmit() {
    this.is_loading = true;
    let barangay_arr: any = [];
    Object.entries(this.selected_barangays).forEach(([key, value]: any, index) => {
      if(value) barangay_arr.push({settings_catchment_barangay_id: key});
    });

    if(barangay_arr.length > 0) {
      this.bhs.barangay = barangay_arr;
      console.log(this.bhs)

      this.http.post('settings/bhs', this.bhs).subscribe({
        next: (data: any) => {
          console.log(data);
          this.loadData();
        },
        error: err => console.log(err)
      });
    } else {
      this.is_loading = false;
    }

  }

  loadBhs() {
    this.http.get('settings/bhs').subscribe({
      next: (data: any) => {
        console.log(data)
      },
      error: err => console.log(err)
    })
  }

  onDelete() {

  }

  loadData() {
    const getBhs = this.http.get('settings/bhs');
    const getStaff = this.http.get('users', {params:{facility_code: this.facility_code}});

    forkJoin([getBhs, getStaff]).subscribe({
      next: ([dataBhs, dataStaff]: any) => {
        this.facility_bhs = dataBhs;
        this.rhu_staffs = dataStaff.data;
        this.is_loading = false;
      },
      error: err => console.log(err)
    });
  }



  getStaff(){
    this.http.get('users', {params:{facility_code: this.facility_code}}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.rhu_staffs = data.data;
        this.loadBhs();
      },
      error: err => console.log(err)
    })
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
}
