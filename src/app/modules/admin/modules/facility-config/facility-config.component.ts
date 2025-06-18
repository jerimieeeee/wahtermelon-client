import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faCircleNotch, faDoorClosed, faImage, faSave } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-facility-config',
    templateUrl: './facility-config.component.html',
    styleUrls: ['./facility-config.component.scss'],
    standalone: false
})
export class FacilityConfigComponent implements OnInit {
  current_year = formatDate(new Date(), 'yyyy', 'en', 'Asia/Manila');

  faSave = faSave;
  faCircleNotch = faCircleNotch;
  faDoorClosed = faDoorClosed;
  faImage = faImage;

  pages: number = 1;
  module: number = 1;

  show_form: boolean = false;

  barangays: any = [];
  catchment_barangays: any = [];
  selected_catchment: any = [];
  selected_year: any;
  modals: any = [];
  municipality_code: string;
  facility_code: string;
  years: any = [];
  loading_text: string;
  switchPage(page) {
    this.pages = page;
  }

  switchTab(tab) {
    this.module = tab;
  }

  onSubmit() {
    let barangays: any = [];
    Object.entries(this.selected_catchment).forEach(([key, value]: any, index) => {
      if(value) barangays.push({barangay_code: key});
    });

    let params = {
      year: this.current_year,
      barangay: barangays
    };

    this.http.post('settings/catchment-barangay', params).subscribe({
      next: (data: any) => {
        this.toastr.success('Successfully recorded', 'Catchment Barangay');
        this.getCatchmentBarangay(this.selected_year);
      },
      error: err => console.log(err)
    })
  }

  getCatchmentBarangay(year?) {
    this.loading_text = 'catchment barangays'
    this.show_form = false;
    this.http.get('settings/catchment-barangay',{params:{'filter[year]': year ?? this.current_year}}).subscribe({
      next: (data: any) => {
        this.catchment_barangays = data;

        if(this.catchment_barangays[this.selected_year] && Object.keys(this.catchment_barangays[this.selected_year].data).length > 0) {
          this.loadCatchment(this.catchment_barangays[this.selected_year].data);
        } else {
          this.selected_catchment = [];
          this.show_form = true;
        }
        // this.pages = 2;
      },
      error: err => console.log(err)
    });
  }

  loadCatchment(data){
    Object.entries(data).forEach(([key, value]: any, index) => {
      this.selected_catchment[value.barangay.code] = true;
    });

    this.show_form = true;
  }

  loadBarangays(){
    this.loading_text = 'barangays';
    this.http.get('libraries/municipalities/'+this.municipality_code,{params:{include:'barangays'}}).subscribe({
      next: (data: any) => {
        this.barangays = data.data.barangays;
        this.getCatchmentBarangay();
      },
      error: err => console.log(err)
    })
  }


  /* logo upload start */
 /*  imageData: string | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageData = reader.result as string;
    };
    reader.readAsDataURL(file);

    // Upload
    const formData = new FormData();
    formData.append('logo', file);

    this.http.post('consultation/upload-logo', formData)
      .subscribe({
        next: (res:any) => {
          const imageUrl = 'http://localhost:8000' + res.path;
          console.log('Logo uploaded:', imageUrl);
          this.imageData = imageUrl; // optionally update to live URL
           this.toastr.success('Logo successfully uploaded');
        },
         error: (err) => {
            console.error('Upload failed.', err);
            this.toastr.error('Logo upload failed!');
        }
      });
  } */

      imageData: string | null = null;

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (!file) return;


  // Upload to backend
  const formData = new FormData();
  formData.append('logo', file);

  this.http.post('consultation/upload-logo', formData).subscribe({
    next: (res: any) => {
      const imageUrl = 'http://localhost:8000' + res.path;
      console.log('Logo uploaded:', imageUrl);
      this.imageData = imageUrl; // Set the real image URL after successful upload
      this.toastr.success('Logo successfully uploaded');
    },
    error: (err) => {
      console.error('Upload failed.', err);
      this.toastr.error('Logo upload failed!');
    }
  });
}

loadLogo() {
  this.http.get('consultation/logo').subscribe({
    next: (res: any) => {
      if (res.path) {
        this.imageData = 'http://localhost:8000' + res.path;
      }
    },
    error: () => {
      console.warn('No logo found or failed to load.');
      this.imageData = null;
    }
  });
}
  

 /* logo upload end */

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    let facility = this.http.getUserFromJSON().facility;
    this.municipality_code = facility.municipality_code ?? facility.municipality.code;
    this.facility_code = facility.code ?? facility.facility.code;
    this.loadBarangays();

    this.selected_year = this.current_year;
    for(let year = Number(this.current_year); year > 2017; year--) {
      this.years.push(year);
    }

     this.loadLogo();
  }

  
}
