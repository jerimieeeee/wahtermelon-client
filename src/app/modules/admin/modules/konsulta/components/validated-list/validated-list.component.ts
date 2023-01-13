import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCircleCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-validated-list',
  templateUrl: './validated-list.component.html',
  styleUrls: ['./validated-list.component.scss']
})
export class ValidatedListComponent implements OnInit {
  @Output() showReturn = new EventEmitter<any>();
  @Output() showList = new EventEmitter<any>();
  @Input() konsulta_list;
  @Input() filter_tranche;
  @Input() filter_status;

  faSpinner = faSpinner;
  faCircleCheck = faCircleCheck;

  validating: boolean = false;
  submitting: boolean = false;

  validate(kon){
    this.submitting = true;
    this.validating = true;

    let params = {
      tranche: [this.filter_tranche],
      revalidate: 1,
      transmittal_number: [kon.transmittal_number]
    }

    this.http.get('konsulta/validate-report', {params}).subscribe({
      next: (data: any) => {
        console.log(data)
        let result = data.data ? data.data : data
        console.log(result)
        this.processReturn(result)
      },
      error: err => console.log(err)
    })
  }

  downloading: boolean = false;

  downloadXml(kon, type) {
    this.downloading = true
    let params = {
      raw: type === 'raw' ? 1 : 0
    }

    if(kon.xml_status === 'S') {
      params['konsulta_transaction_number'] = kon.konsulta_transaction_number
    } else {
      params['transmittal_number'] = kon.transmittal_number
    }

    let query;
    if(type === 'raw') {
      query = this.http.get('konsulta/download-xml', {params: params, responseType: 'text/xml'});
    } else {
      query = this.http.get('konsulta/download-xml', {params: params});
    }

    query.subscribe({
      next: (response) => {
        // console.log(response)
        if(type === 'raw') {
          this.downloadFile(response, kon.xml_status === 'S' ? kon.konsulta_transaction_number : kon.transmittal_number, 'raw')
        } else {
          this.downloadFile(response, kon.xml_status === 'S' ? kon.konsulta_transaction_number : kon.transmittal_number, 'enc')
        }
      },
      error: err => console.log()
    })
  }

  downloadFile(response, trans_number, type) {
    let content;
    if(type === 'raw') {
      content = response;
    } else {
      content = JSON.stringify(response);
    }

    let blob = new Blob([content], { type: 'text/xml'})
    let url = window.URL.createObjectURL(blob)

    let element = document.createElement('a');
    element.href = url;
    element.setAttribute('download', trans_number+(type === 'raw' ? '.xml' : '.xml.enc'));
    document.body.appendChild(element);
    element.click();

    this.downloading = false;
  }

  submit(transmittal_number){
    this.validating = true;
    this.submitting = true;
    let params = {
      transmittal_number: transmittal_number
    }

    this.http.get('konsulta/submit-xml', {params}).subscribe({
      next: (data: any) => {
        let result = data.data ? data.data : data
        console.log(result)
        this.processReturn(result)
      },
      error: err => console.log(err)
    })
  }

  checkPatientList(patient_list) {
    if(Object.keys(patient_list).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  processReturn(data){
    console.log(data)
    if(data){
      if(data.errors) {
        this.toastr.error('Record error','Error')
        this.returnData(data)
      } else {
        if(data.message){
          this.returnData(data);
          this.toastr.success('Record validated/submitted', 'Success')
        }
      }
    } else {
      this.toastr.error('Validation failed','Error')
    }

    this.submitting = false;
    this.validating = false;
  }

  openList(data){
    this.showList.emit(data);
  }

  returnData(data, save?){
    this.showReturn.emit({data: data, save: save});
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }
}
