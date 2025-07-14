import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { faCircleNotch, faDoorClosed, faImage, faSave } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { environment } from 'environments/environment';
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


 imageData: SafeUrl | null = null;

  apiBase = this.http.baseUrl.replace('/api/v1/', '');

 fileError: string | null = null;

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  if (!file) return;

  // Validate file type
  if (!allowedTypes.includes(file.type)) {
  this.toastr.error('Only JPG and PNG images are allowed.', 'Upload Error');
  return;
  }

  // Validate file size (e.g., max 2MB)
  const maxSize = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSize) {
    this.toastr.error('File is too large. Maximum size is 2MB.', 'Upload Error');
    return;
  }

  // Proceed with upload
  const formData = new FormData();
  formData.append('logo', file);
  formData.append('facility_code', this.facility_code);

  this.http.post('consultation/upload-logo', formData).subscribe({
    next: (res: any) => {
      const imageUrl = this.apiBase + res.path;
      console.log('Logo uploaded:', imageUrl);
      this.imageData = imageUrl;
      this.toastr.success('Logo successfully uploaded', 'Success');
    },
    error: (err) => {
      console.error('Upload failed.', err);
      this.toastr.error('Logo upload failed!', 'Server Error');
    }
  });
}



loadLogo() {
  this.http.get('consultation/logo', { params: { facility_code: this.facility_code }}).subscribe({
    next: (res: any) => {
      if (res.path) {

         console.log('Logo response:', res);
        this.imageData = this.apiBase + res.path;
        console.log('Full logo URL:', this.imageData);

      } else {
        this.imageData = null;
        console.warn('No logo found.');
      }
    },
    error: () => {
      console.warn('No logo found or failed to load.');
      this.imageData = '';
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
