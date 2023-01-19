import { Component, OnInit } from '@angular/core';
import { faSpinner, faChevronLeft, faChevronRight, faAnglesLeft, faAnglesRight, faSearch, faRotate, faCalendarDays, faArrowsRotate, faUpload } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { NgxXmlToJsonService } from 'ngx-xml-to-json';

@Component({
  selector: 'app-xml-upload',
  templateUrl: './xml-upload.component.html',
  styleUrls: ['./xml-upload.component.scss']
})
export class XmlUploadComponent implements OnInit {
  faSpinner = faSpinner;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faSearch = faSearch;
  faRotate = faRotate;
  faCalendarDays = faCalendarDays;
  faArrowsRotate = faArrowsRotate;
  faUpload = faUpload;

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

  konsulta_list: any = [];

  modals: any = [];
  uploaded_list: any = [];

  toggleModal(data){
    this.modals[data.name] = !this.modals[data.name];
    console.log(data.data)
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

  showList(data) {
    this.konsulta_list = data.ASSIGNMENT;
    console.log(this.konsulta_list);
  }

  /* xmlJson(data) {
    let parseString = require('xml2js').parseString;

    parseString(data, function(err, result) {
      console.log(result)
    })
  } */
  openModal(){
    this.toggleModal({name: 'uploaded-xml'})
  }

  xmlData: string;
  readXML(files: FileList){
    const reader = new FileReader();
    reader.onload = (evt) => {
      const xmlData: string = (evt as any).target.result;
      const option = {
        textKey: 'text',
        attrKey: 'attr',
        cdataKey: 'cdata'
      }
      this.xmlData = this.xml2json.xmlToJson(xmlData, option);
      console.log(this.xmlData)
      this.toggleModal({name: 'uploaded-xml'})
    }

    reader.readAsText(files[0])
  }

  loadList(page?: number){
    let params = {params: { }};
    if (this.search_item) params['params']['search'] = this.search_item;
    if (this.search_pin) params['params']['filter[philhealth_id]'] = this.search_pin;
    if (this.search_year) params['params']['filter[effectivity_year]'] = this.search_year;

    if (page) params['params']['page'] = page;
    params['params']['per_page'] = this.per_page;

    console.log(params)
    this.http.get('konsulta/registration-lists',params).subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.konsulta_list = data.data;

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
    private xml2json: NgxXmlToJsonService
  ) { }

  ngOnInit(): void {
    // this.loadList();
    // this.toggleModal({name: 'uploaded-xml'})
    this.uploaded_list = JSON.parse(localStorage.getItem('uploaded-xml'))
    if(!this.uploaded_list) {
      this.uploaded_list = [];
    }
  }
}
