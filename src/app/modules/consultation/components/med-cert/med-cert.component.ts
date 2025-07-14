import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileExcel, faFilePdf, faPrint, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AgeService } from 'app/shared/services/age.service';
import { HttpService } from 'app/shared/services/http.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxPrintModule } from 'ngx-print';

RouterOutlet

@Component({
  selector: 'app-med-cert',
  templateUrl: './med-cert.component.html',
  styleUrl: './med-cert.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, NgxPrintModule],
  providers: [DatePipe] 
})
export class MedCertComponent implements OnInit {

  faFilePdf = faFilePdf;
  faFileExcel = faFileExcel;
  faSpinner = faSpinner;
  faPrint = faPrint;

  constructor(
      private router: Router,
      private http: HttpService,
      private ageService: AgeService,
      private datePipe: DatePipe,
      private exportAsService: ExportAsService,
      private sanitizer: DomSanitizer,
      private route: ActivatedRoute
    ) { }

  selected_consult_id!: string;
  user_facility: string;

  occupations: object;
  civil_statuses: object;

  patient_age: any;

  isModalOpen = true;
    
    closeModal() {
  this.router.navigate(['../'], { relativeTo: this.route });
}

   getAge(){
    if(this.patient_info && this.patient_info.birthdate){
      let age_value = this.ageService.calcuateAge(this.patient_info.birthdate);
      this.patient_age = age_value;
      return age_value.age + ' ' + age_value.type+(age_value.age>1 ? 's old' : ' old' );
    }
  }

  dateNgayon : any;

  todaysDate(){
    const today = new Date();

    const formattedDate = this.datePipe.transform(today, 'MM/dd/yyyy');
    this.dateNgayon = formattedDate;

  }

exportAsPdf: ExportAsConfig = {
  type: 'pdf',
  elementIdOrContent: 'pdf-content',
  options: {
    html2canvas: { 
      useCORS: true,
      allowTaint: true,
      scrollX: false,
      scrollY: false,
    },

   jsPDF: {
      orientation: 'portrait',
      format: 'a4',
      putOnlyUsedFonts: true,
      precision: 2,
      margin: [0, 0, 0, 0]
      }
  }
}

  getTrailName(): string {
    let trailName: string = '';

    trailName = this.consult[0]?.file_patient_name + '_' + 'Medical Certificate';
    return trailName
  }
  

  
 pdf_exported: boolean = false;          
  exportP(med_cert: string) {
  this.pdf_exported = true;
     if (this.pdf_exported) {
    this.exportAsService.save(this.exportAsPdf, this.getTrailName()).subscribe(() => {
      this.printCount();
    });
  } else {
    // Try again after short delay until image loads
    setTimeout(() => this.exportP(med_cert), 300);
  }
  }

   printCount() {
  const consultId = this.consultation.consult_id;
  console.log(consultId, 'consult id for print');

  this.http.post(`consultation/print/${consultId}`, {})
    .subscribe({
      next: (res: any) => {
        console.log('Print count updated:', res);
      },
      error: (err) => {
        console.error('Error incrementing print count:', err);
      }
    });
}
  
//med cert

  selectedPurpose: string = '';
  otherPurpose: string = '';
  step = 1;

  goToStep(stepNumber: number): void {
    this.step = stepNumber;
  }

   isPurposeValid(): boolean {
    return (
      this.selectedPurpose &&
      (this.selectedPurpose !== 'others' || this.otherPurpose.trim().length > 0)
    );
  }

  get displayPurpose(): string {
    return this.selectedPurpose === 'others' ? this.otherPurpose : this.selectedPurpose;
  }

  consult: any[] = [];
  loading = true;

  show_form = true;

  getConsultInfo(){
    const params = this.consultation

   this.http.get('consultation/med-cert', { params }).subscribe({
  next: (data: any) => {
    this.consult = data.data;
    console.log('consult:', this.consult);
    this.show_form = false;
  },
  error: err => {
    this.loading = false;
     this.show_form = false;
  }
  
    })
  } 

  capitalizeFirst(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  patient_info: any;
   consultation: any;

  user = {
    facility: {facility_name:''},
    municipality: {municipality_code:''},
  };

  /* logo */
   logoUrl: SafeUrl | string = '';
    apiBase = this.http.baseUrl.replace('/api/v1/', '');

  fetchFacilityLogo() {

  this.http.get('consultation/logo', { params: { facility_code: this.facility_code }}).subscribe({
    next: (res: any) => {
      console.log('Logo response:', res);
      if (res.path) {
       this.logoUrl = this.apiBase + '/logo-image/' + res.path.replace('/storage/logos/', '');
        console.log('Full logo URL:', this.logoUrl);
      }
    },
    error: (err) => {
      console.warn('No logo found:', err);
      this.logoUrl = ''; // Optional: hide logo if error
    }
  });
}
  facility_code: string;

  ngOnInit(): void {
      let facility = this.http.getUserFromJSON().facility;


     this.facility_code = facility.code ?? facility.facility.code;

    this.consultation = this.http.getUrlParams();
     if (this.consultation.consult_id?.includes('/')) {
    this.consultation.consult_id = this.consultation.consult_id.split('/')[0];
  }

  console.log(this.consultation, 'consult id');
 console.log(this.facility_code, 'facility code');

  this.todaysDate();

  this.getConsultInfo();

  this.fetchFacilityLogo();
   
  }
}
