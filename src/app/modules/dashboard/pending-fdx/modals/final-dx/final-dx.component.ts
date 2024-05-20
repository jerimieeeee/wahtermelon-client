import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faAnglesLeft, faAnglesRight, faCircleXmark, faSearch} from "@fortawesome/free-solid-svg-icons";
import {HttpService} from "../../../../../shared/services/http.service";
import {map, Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-final-dx',
  templateUrl: './final-dx.component.html',
  styleUrls: ['./final-dx.component.scss']
})
export class FinalDxComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() show_patient_data: any;
  // @Input() pending_fdx: any;

  data: any;

  closeModal() {
    this.toggleModal.emit();
  }

  constructor (
    private http: HttpService,
  ) { }

  getFdx(term: string = null): Observable<any> {
    return this.http.get('libraries/icd10', {params:{'filter[search]':term}})
      .pipe(map((resp:any) => {
        // console.log(resp)
        return resp.data;
      }))
  }

  ngOnInit(): void {
    // this.getData();
    this.data = this.show_patient_data.data;
    console.log(this.data, 'amen5u');
  }

  protected readonly faAnglesRight = faAnglesRight;
  protected readonly faAnglesLeft = faAnglesLeft;
  protected readonly Number = Number;
  protected readonly faCircleXmark = faCircleXmark;
  protected readonly faSearch = faSearch;
}
