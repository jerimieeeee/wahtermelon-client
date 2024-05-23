import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faAdd, faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faCircleXmark, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-drug-list',
  templateUrl: './drug-list.component.html',
  styleUrls: ['./drug-list.component.scss']
})
export class DrugListComponent implements OnInit {
  @Output() openAddForm = new EventEmitter<any>()
  @Output() toggleList = new EventEmitter<any>()
  faAnglesLeft = faAnglesLeft;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesRight = faAnglesRight;
  faSearch = faSearch;
  faEdit = faEdit;
  faAdd = faAdd;
  faCircleXmark = faCircleXmark;

  is_updating: boolean = false;
  show_lib_drug: boolean = false;

  submit_error: any;
  drug_list: any;

  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  search_item: string;

  selectDrugs(drug) {
    delete drug['id'];
    drug['new_drug'] = this.lib_drug_table;
    this.openAddForm.emit(drug);
    this.toggleList.emit();
  }

  closeModal() {
    this.toggleList.emit();
  }

  lib_drug_table: boolean = false;
  showLibDrugs(){
    /* this.openAddForm.emit();
    this.toggleList.emit(); */
    // this.search_item = null;
    this.lib_drug_table = true;
    this.loadMedicineList(1);
  }

  addNewDrug(data){
    this.openAddForm.emit(data);
    this.toggleList.emit();
  }

  loadMedicineList(page?: number){
    let url = this.lib_drug_table ? 'libraries/konsulta-medicines' : 'medicine/list';
    // let filter = this.lib_drug_table ? 'filter[desc]' : 'filter[search]';
    let params = {params: { }};
    if (this.search_item) params['params']['filter[search]'] = this.search_item;
    if (page) params['params']['page'] = page;
    params['params']['per_page'] = this.per_page;

    this.http.get(url, params).subscribe({
      next: (data: any) => {
        // console.log(data.data);
        this.drug_list = data.data;

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
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.loadMedicineList();
  }
}
