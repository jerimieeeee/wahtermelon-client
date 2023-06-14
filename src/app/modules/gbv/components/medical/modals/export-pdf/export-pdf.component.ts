import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { AgeService } from 'app/shared/services/age.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';

@Component({
  selector: 'app-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.scss']
})
export class ExportPdfComponent implements OnInit {
  @Output() toggleExportPDF = new EventEmitter<any>();
  @Input() selected_gbv_case;
  

  is_saving: boolean = false;

  faCircleNotch = faCircleNotch;

  patient_details: any;

  patient_age: any;

  pdf_exported: boolean = false;

  closeModal(){
    this.toggleExportPDF.emit('export_pdf');
    console.log('check modal')
  }

  getAge(){
    if(this.patient_details && this.patient_details.birthdate){
      let age_value = this.ageService.calcuateAge(this.patient_details.birthdate);
      this.patient_age = age_value;
      return age_value.age + ' ' + age_value.type+(age_value.age>1 ? 's old' : ' old' );
    }
  }

  exportAsPdf: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'medForm',
    options: {
      image: { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 3},
      margin:  [1, 1, 1, 1],
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      jsPDF: {
        orientation: 'landscape',
        format: 'a4',
        precision: 16
      }
    }
  }

  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'GBV Medical').subscribe(() => {
      // save started
    });
  }

  constructor(private http: HttpService,
              private ageService: AgeService, 
              private exportAsService: ExportAsService
  ) { }
  
  ngOnInit() {
    this.patient_details = this.http.getPatientInfo();
    console.log(this.patient_details,'export modal patient')
    console.log(this.selected_gbv_case,'export modal')
  }

}
