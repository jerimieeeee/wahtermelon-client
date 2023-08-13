import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCircleCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-validated-list',
  templateUrl: './validated-list.component.html',
  styleUrls: ['./validated-list.component.scss']
})
export class ValidatedListComponent {
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
      transmittal_number: [kon.transmittal_number],
      save: 1
    }

    // if(kon.xml_status === 'F') params['revalidate'] = true;

    this.http.get('konsulta/validate-report', {params}).subscribe({
      next: (data: any) => {
        this.processReturn(data)
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

    params['transmittal_number'] = kon.transmittal_number

    let query;
    if(type === 'raw') {
      query = this.http.get('konsulta/download-xml', {params: params, responseType: 'text/xml'});
    } else {
      query = this.http.get('konsulta/download-xml', {params: params});
    }

    let file_info = kon.xml_url.split('/')
    let file_name = file_info[file_info.length-1];
    query.subscribe({
      next: (response) => {
        if(type === 'raw') {
          let raw_file = kon.xml_status === 'S' ? kon.konsulta_transaction_number : kon.transmittal_number+'.xml'
          this.downloadFile(response, kon.xml_status === 'S' ? kon.konsulta_transaction_number : kon.transmittal_number, 'raw', raw_file)
        } else {
          this.downloadFile(response, kon.xml_status === 'S' ? kon.konsulta_transaction_number : kon.transmittal_number, 'enc', file_name)
        }
      },
      error: err => console.log(err)
    })
  }

  downloadFile(response, trans_number, type, filename) {
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
    element.setAttribute('download', filename);
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
        this.processReturn(data)
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
    if(data){
      let result = data.data ? data.data : data
      if(result.errors) {
        this.toastr.error('Record error','Error')
        this.returnData(result)
      } else {
        if(result.message){
          this.returnData(result);
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
}
