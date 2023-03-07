import { Component, OnInit } from '@angular/core';
import { faSpinner,  faSearch, faCalendarDays, faArrowsRotate, faUpload, faClipboardList, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-xml-upload',
  templateUrl: './xml-upload.component.html',
  styleUrls: ['./xml-upload.component.scss']
})
export class XmlUploadComponent implements OnInit {
  faCircleNotch = faCircleNotch;
  faSearch = faSearch;
  faCalendarDays = faCalendarDays;
  faArrowsRotate = faArrowsRotate;
  faUpload = faUpload;
  faClipboardList = faClipboardList;

  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  search_item: string;
  search_pin: string;
  search_year: string;
  xml_file: any;

  submit_error: any;

  xml_list: any = [];

  modals: any = [];
  uploaded_list: any = [];

  toggleModal(data){
    this.modals[data.name] = !this.modals[data.name];

    if(data.data) {
      console.log(typeof this.uploaded_list)
      Object.entries(data.data).forEach(([key, value], index) => {
        console.log(value)
        this.uploaded_list.push(value)
      });


      localStorage.setItem('uploaded-xml', JSON.stringify(this.uploaded_list))
      console.log(this.uploaded_list)
    }

  }

  openModal(){
    this.toggleModal({name: 'uploaded-xml'})
  }

  file_to_upload: any = null;
  xmlFile: any = null;
  cipher_key: string;

  readXML(files: FileList){
    // console.log(files.item(0))
    this.file_to_upload = files;
  }

  file_upload_count: number;
  uploaded_count: number = 0;
  is_uploading: boolean = false;

  uploadFile(fileToUpload){
    this.is_uploading = true;

    const formData: FormData = new FormData();
    this.file_upload_count = fileToUpload.length;
    this.uploaded_count = 0;
    for (let index = 0; index < fileToUpload.length; index++) {

      let name = fileToUpload[index].name.split('.');
      if(name[name.length - 1] === 'enc') {
        this.uploaded_count += 1;
        formData.append('xml[]', fileToUpload[index])
      }
    }

    formData.append('cipher_key', this.cipher_key);
    console.log(formData.get('cipher_key'))
    console.log(this.file_upload_count, this.uploaded_count)

    this.http.post('konsulta/upload-xml', formData).subscribe({
      next: (data:any) => {
        console.log(data)
        this.resetInput();
        this.showToast('success','Uploaded '+ this.uploaded_count +' of '+this.file_upload_count+' files', 'Upload Success')
      },
      error: err => {
        this.resetInput();
      }
    })
  }

  showToast(type, message, title) {
    this.toastr[type](message, title, {
      closeButton: true,
      positionClass: 'toast-top-center',
      disableTimeOut: true
    })
  }

  resetInput(){
    this.is_uploading = false;
    this.file_to_upload = null;
    this.xmlFile = null;
  }

  xml_to_view: any;

  viewContent(data){
    this.xml_to_view = data;

    this.openModal();
  }

  loadList(page?: number){
    let params = {params: { }};
    /* if (this.search_item) params['params']['search'] = this.search_item;
    if (this.search_pin) params['params']['filter[philhealth_id]'] = this.search_pin;
    if (this.search_year) params['params']['filter[effectivity_year]'] = this.search_year; */

    if (page) params['params']['page'] = page;
    params['params']['per_page'] = this.per_page;

    // console.log(params)
    this.http.get('konsulta/imported-xml',params).subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.xml_list = data.data;

        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadList()
  }
}
