import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faAnglesLeft, faAnglesRight, faCircleXmark, faSearch} from "@fortawesome/free-solid-svg-icons";
import {HttpService} from "../../../../../shared/services/http.service";
import {map, Observable} from "rxjs";
import { AgeService } from 'app/shared/services/age.service';
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
  @Input() pending_fdx: any;

  data: any;
  patient_age: any;

  closeModal() {
    this.toggleModal.emit();
  }

  constructor (
    private http: HttpService,
    private ageService: AgeService,
  ) { }

  getAge(){
    if(this.data && this.data[0].birthdate){
      let age_value = this.ageService.calcuateAge(this.data[0].birthdate);
      this.patient_age = age_value;
      return age_value.age;
    }
  }

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
    console.log(this.data[0], 'amen5u');
  }

  protected readonly faAnglesRight = faAnglesRight;
  protected readonly faAnglesLeft = faAnglesLeft;
  protected readonly Number = Number;
  protected readonly faCircleXmark = faCircleXmark;
  protected readonly faSearch = faSearch;
}
