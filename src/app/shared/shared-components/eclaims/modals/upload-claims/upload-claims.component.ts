import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch, faFileArrowUp, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-upload-claims',
    templateUrl: './upload-claims.component.html',
    styleUrls: ['./upload-claims.component.scss'],
    standalone: false
})
export class UploadClaimsComponent implements OnInit {
  @Output() modalToggle = new EventEmitter<any>();
  @Input() selected_pHospitalTransmittalNo;
  @Input() program_name;
  @Input() patient;
  @Input() caserate_code;
  @Input() selected_ticket_number;

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
  modals: any =[];

  arr_CR4652 = ['CF2', 'CSF', 'CF3', 'eSOA'];
  arr_CR4651 = ['CF2', 'CSF', 'CF3', 'eSOA'];
  arr_CR4683 = ['CF2', 'CSF', 'CF3', 'eSOA', 'Pink Card'];
  arr_CR4684 = ['CF2', 'CSF', 'CF3', 'eSOA', 'Pink Card'];
  arr_CR4687 = ['CF2', 'CSF + NBS Sticker', 'PMRF', 'eSOA', 'Birth Certificate'];
  arr_CR4656 = ['CF2', 'CSF', 'Treatment Card', 'eSOA'];
  arr_CR4657 = ['CF2', 'CSF', 'Treatment Card', 'eSOA'];
  arr_CR4658 = ['CF2', 'CSF', 'Treatment Card', 'eSOA', 'Summary Report'];
  arr_CR4685 = ['CF2', 'CSF + Serial Sticker', 'eSOA'];
  arr_CR0385 = ['CF2', 'CSF + Serial Number of Box', 'eSOA'];
  arr_CR0456 = ['CF2', 'CSF', 'eSOA'];
  arr_CR4655 = ['CF2', 'CSF', 'Smear Test for OMP'];

  is_retrieving_xml: boolean = false;
  confirm_upload: boolean = false;
  show_confirm_form: boolean = false;
  is_uploading_claim: boolean = false;

  confirmUpload() {
    this.show_confirm_form = !this.show_confirm_form;
  }

  getFileName(value:string): string{
    let name = value.split('/')
    return name[6];
  }

  encryptedXml: any;

  getEncryptedXml() {
    this.is_retrieving_xml = true;

    let params = {
      pHospitalTransmittalNo: this.selected_pHospitalTransmittalNo,
      program_desc: this.program_name
    };

    this.http.post('eclaims/create-enc-xml', params).subscribe({
      next:(data:any) => {
        this.is_retrieving_xml = false;
        this.confirmUpload();
        // console.log(data);
        this.encryptedXml = data.xml;
      },
      error: err => console.log(err)
    });
  }

  uploadClaim(){
    this.is_uploading_claim = true;

    let params = {
      encryptedXml: this.encryptedXml,
      program_code: this.program_name === 'cc' || this.program_name === 'fp' ? 'mc' :  this.program_name
    }

    //ECLAIMS SERVICES
    this.http.post('eclaims/upload-claim', params).subscribe({
      next:(data:any) => {
        console.log(data);
        this.checkSeries(data);
        // this.updateUploadData(data);
      },
      error: err => {
        console.log(err);
        this.is_uploading_claim = false;
        this.toastr.error(err.error.message || err.error.text, 'Upload Claim', {
          closeButton: true,
          positionClass: 'toast-top-center',
          disableTimeOut: true
        });
      }
    })
  }

  show_ticket_number: boolean = false;
  ticket_number: string;
  updateUploadData(result){
    let data = result;
    console.log(data);
    let params = {
      pHospitalTransmittalNo: this.selected_pHospitalTransmittalNo,
      pTransmissionControlNumber: data.pTransmissionControlNumber,
      pReceiptTicketNumber: data.pReceiptTicketNumber,
      pClaimSeriesLhio: data.pClaimSeriesLhio,
      pStatus: 'IN PROCESS',
      pTransmissionDate: formatDate(data.pTransmissionDate, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      pTransmissionTime: formatDate(new Date(), 'HH:mm:ss', 'en', 'Asia/Manila'),
      isSuccess:'Y',
      program_desc: this.program_name,
      program_code: this.program_name === 'cc' || this.program_name === 'fp' ? 'mc' :  this.program_name,
    }

    this.http.post('eclaims/eclaims-upload', params).subscribe({
      next: (res: any) => {
        this.ticket_number = res.data.pReceiptTicketNumber;

        this.toastr.success('Ticket Number: '+this.ticket_number+'| Claim Series: '+data.pClaimSeriesLhio, 'Claim Uploaded!', {
          closeButton: true,
          positionClass: 'toast-top-center',
          disableTimeOut: true
        });

        this.is_uploading_claim = false;
        this.closeModal();
      },
      error: err => console.log(err)
    })
  }
  /* updateUploadData(result){
    let data = result;
    console.log(data);
    let params = {
      pHospitalTransmittalNo: this.selected_pHospitalTransmittalNo,
      pTransmissionControlNumber: data.pTransmissionControlNumber,
      pReceiptTicketNumber: data.pReceiptTicketNumber,
      pStatus: 'IN PROCESS',
      pTransmissionDate: formatDate(data.pTransmissionDate, 'yyyy-MM-dd', 'en', 'Asia/Manila'),
      pTransmissionTime: formatDate(new Date(), 'HH:mm:ss', 'en', 'Asia/Manila'),
      isSuccess:'Y',
      program_desc: this.program_name,
      program_code: this.program_name === 'cc' || this.program_name === 'fp' ? 'mc' :  this.program_name,
    }

    this.http.post('eclaims/eclaims-upload', params).subscribe({
      next: (res: any) => {
        this.ticket_number = res.data.pReceiptTicketNumber;

        this.toastr.success('Ticket Number: '+this.ticket_number, 'Claim Uploaded!', {
          closeButton: true,
          positionClass: 'toast-top-center',
          disableTimeOut: true
        });

        this.is_uploading_claim = false;
        this.closeModal();
      },
      error: err => console.log(err)
    })
  } */

  checkSeries(result){
    let data: any = result['@attributes'];
    let params = {
      receiptTicketNumber: data.pReceiptTicketNumber,
      program_code: this.program_name === 'cc' || this.program_name === 'fp' ? 'mc' :  this.program_name
    }

    this.http.post('eclaims/get-claims-map', params).subscribe({
      next: (resp: any) => {
        console.log(data)
        console.log(resp.mapping[0])
        if(resp.success === false) {
          this.toastr.error('No query result', 'Series LHIO');
        } else {
          data.pClaimSeriesLhio = resp.mapping[0].pclaimSeriesLhio;

          /*
          pTransmissionControlNumber: data.pTransmissionControlNumber,
          pReceiptTicketNumber: data.pReceiptTicketNumber,
          pTransmissionDate: formatDate(data.pTransmissionDate, 'yyyy-MM-dd', 'en', 'Asia/Manila')*/

          this.updateUploadData(data);
        }
      },
      error: err => {
        this.toastr.error(err.error.message, 'Series LHIO', {
          closeButton: true,
          positionClass: 'toast-top-center',
          disableTimeOut: true
        });
      }
    })
  }

  deleteDocs(data){
    // this.closeModal();
  }

  show_form: boolean = false;
  missing_esa: boolean = true;
  loadDocs(){
    this.show_form = false;
    let params = {
      pHospitalTransmittalNo: this.selected_pHospitalTransmittalNo,
      required: 'N'
    };

    this.http.get('eclaims/eclaims-doc', {params}).subscribe({
      next:(data:any) => {
        console.log(data)
        this.uploaded_docs = data.data;
        this.checkForEsa(data.data);
        this.show_form = true;
      },
      error: err => console.log(err)
    });
  }

  checkForEsa(docs) {
    this.missing_esa = !docs.some(doc => doc.doc_type_code === 'ESA');
  }

  uploadDocs(file_to_upload){
    this.is_uploading = true;

    const formData: FormData = new FormData();

    const allowedTypes = ['application/pdf', 'text/xml', 'application/xml'];
    if (!allowedTypes.includes(this.file_to_upload.type)) {
      this.is_uploading = false;
      this.toastr.error('Only PDF or XML files are allowed.', 'File Upload', {
        closeButton: true,
        positionClass: 'toast-top-center',
        disableTimeOut: true
      });
      return;
    }

    if(this.file_to_upload.size > (2*1024*1024)) {
      this.is_uploading = false;
      this.toastr.error('File size exceeds the allowed limit 2MB', 'File Upload', {
        closeButton: true,
        positionClass: 'toast-top-center',
        disableTimeOut: true
      });
    } else {
      formData.append('doc', this.file_to_upload);
      formData.append('doc_type_code', this.doc_type);
      formData.append('pHospitalTransmittalNo', this.selected_pHospitalTransmittalNo);
      formData.append('program_desc', this.program_name);
      formData.append('patient_id', this.patient.id);
      formData.append('required', 'N');

      this.http.post('eclaims/eclaims-doc', formData).subscribe({
        next: (data:any) => {
          console.log(data);
          this.loadDocs();
          this.resetForm();
          this.is_uploading = false;
          this.toastr.success('Successfully uploaded.', 'EClaims Docs');
        },
        error: err => {
          console.log(err);
          this.is_uploading = false;
        }
      })
    }
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
        this.doc_list = data.data;
        this.loadDocs();
      },
      error: err => console.log(err)
    })
  }

  closeModal(){
    this.modalToggle.emit('upload-claims');
  }

  delete_url: string = 'eclaims/eclaims-doc/';
  delete_desc: string = 'eClaims Document';
  selected_doc_id: string;
  toggleModal(name, data?) {
    this.selected_doc_id = data ? data.id : null;
    this.delete_desc = this.delete_desc+" "+(data ? data.doc_type_code : '');
    this.modals[name] = !this.modals[name];

    if(this.modals['delete-item'] === false) this.loadDocs();
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  required_docs: any;
  ngOnInit(): void {
    this.getLibraries();
    this.required_docs = this['arr_'+this.caserate_code];
    console.log(this.caserate_code);
    console.log(this.required_docs);
  }
}
