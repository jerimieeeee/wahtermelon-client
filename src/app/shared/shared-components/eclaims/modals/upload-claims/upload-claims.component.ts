import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch, faFileArrowUp, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-upload-claims',
  templateUrl: './upload-claims.component.html',
  styleUrls: ['./upload-claims.component.scss']
})
export class UploadClaimsComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_pHospitalTransmittalNo;
  @Input() program_name;
  @Input() patient;
  @Input() caserate_code;

  faPenToSquare = faPenToSquare;
  faUpload = faUpload;
  faTrash = faTrash;
  faFileArrowUp = faFileArrowUp;
  faCircleNotch = faCircleNotch;

  philhealth_infos: [];
  uploaded_docs: any;

  file_to_upload: any = null;
  doc_type: string = null;
  doc_list:any;

  is_uploading: boolean = false;
  uploading_claim: boolean = false;

  /* arr_CR4652 = ['CF2', 'CSF', 'CF3', 'SOA'];
  arr_CR4651 = ['CF2', 'CSF', 'CF3', 'SOA'];
  arr_CR4683 = ['CF2', 'CSF', 'CF3', 'SOA', 'OTH'];
  arr_CR4684 = ['CF2', 'CSF', 'CF3', 'SOA', 'OTH'];
  arr_CR4687 = ['CF2', 'CSF', 'PMRF', 'SOA', 'PBC'];
  arr_CR4656 = ['CF2', 'CSF', 'NTP', 'SOA'];
  arr_CR4657 = ['CF2', 'CSF', 'NTP', 'SOA'];
  arr_CR4658 = ['CF2', 'CSF', 'SOA', 'OTH'];
  arr_CR4685 = ['CF2', 'CSF', 'SOA'];
  arr_CR0385 = ['CF2', 'CSF', 'SOA'];
  arr_CR0456 = ['CF2', 'CSF', 'SOA'];
  arr_CR4655 = ['CF2', 'CSF', 'MSR']; */

  arr_CR4652 = ['CF2', 'CSF', 'CF3', 'SOA w/ CTC'];
  arr_CR4651 = ['CF2', 'CSF', 'CF3', 'SOA w/ CTC'];
  arr_CR4683 = ['CF2', 'CSF', 'CF3', 'SOA w/ CTC', 'Pink Card'];
  arr_CR4684 = ['CF2', 'CSF', 'CF3', 'SOA w/ CTC', 'Pink Card'];
  arr_CR4687 = ['CF2', 'CSF + NBS Sticker', 'PMRF', 'SOA w/ CTC', 'Birth Certificate'];
  arr_CR4656 = ['CF2', 'CSF', 'Treatment Card', 'SOA w/ CTC'];
  arr_CR4657 = ['CF2', 'CSF', 'Treatment Card', 'SOA w/ CTC'];
  arr_CR4658 = ['CF2', 'CSF', 'Treatment Card', 'SOA w/ CTC', 'Summary Report'];
  arr_CR4685 = ['CF2', 'CSF + Serial Sticker', 'SOA w/ CTC'];
  arr_CR0385 = ['CF2', 'CSF + Serial Number of Box', 'SOA w/ CTC'];
  arr_CR0456 = ['CF2', 'CSF', 'SOA'];
  arr_CR4655 = ['CF2', 'CSF', 'Smear Test for OMP'];

  uploadClaim() {
    let params = {
      pHospitalTransmittalNo: this.selected_pHospitalTransmittalNo
    };

    this.http.post('eclaims/eclaims-upload', params).subscribe({
      next:(data:any) => {
        console.log(data)
      },
      error: err => console.log(err)
    });
  }

  deleteDocs(data){
    // this.closeModal();
  }

  show_form: boolean = false;

  loadDocs(){
    this.show_form = false;
    let params = {
      pHospitalTransmittalNo: this.selected_pHospitalTransmittalNo
    };

    this.http.get('eclaims/eclaims-doc', {params}).subscribe({
      next:(data:any) => {
        console.log(data)
        this.uploaded_docs = data.data;
        this.show_form = true;
      },
      error: err => console.log(err)
    });
  }


  uploadDocs(file_to_upload){
    this.is_uploading = true;

    const formData: FormData = new FormData();

    formData.append('doc', this.file_to_upload);
    formData.append('doc_type_code', this.doc_type);
    formData.append('pHospitalTransmittalNo', this.selected_pHospitalTransmittalNo);
    formData.append('program_desc', this.program_name);
    formData.append('patient_id', this.patient.id);

    this.http.post('eclaims/eclaims-doc', formData).subscribe({
      next: (data:any) => {
        console.log(data)
        this.loadDocs();
        this.resetForm();
        this.is_uploading = false;
      },
      error: err => console.log(err)
    })
  }

  resetForm(){
    this.doc_type = null;
    this.file_to_upload = null;
  }

  readXML(file: File) {
    this.file_to_upload = file;
  }


  getLibraries(){
    this.http.get('libraries/eclaims-doc-type').subscribe({
      next:(data:any) => {
        console.log(data)
        this.doc_list = data.data;
        this.loadDocs();
      },
      error: err => console.log(err)
    })
  }

  closeModal(){
    this.toggleModal.emit('upload-claims');
  }

  constructor(
    private http: HttpService
  ) { }

  required_docs: any;
  ngOnInit(): void {
    this.getLibraries();
    console.log(this.selected_pHospitalTransmittalNo);
    console.log(this.caserate_code);
    this.required_docs = this['arr_'+this.caserate_code];
    console.log(this.required_docs)
  }
}
