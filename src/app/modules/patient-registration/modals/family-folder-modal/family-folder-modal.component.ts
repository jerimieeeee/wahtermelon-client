import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faAnglesLeft, faAnglesRight, faCheck, faChevronLeft, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
    selector: 'app-family-folder-modal',
    templateUrl: './family-folder-modal.component.html',
    styleUrls: ['./family-folder-modal.component.scss'],
    standalone: false
})
export class FamilyFolderModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Output() transaction = new EventEmitter<any>();
  @Input() last_name;

  faSearch = faSearch;
  faCheck = faCheck;
  faAnglesLeft = faAnglesLeft;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesRight = faAnglesRight;

  search_item: string;
  family_list: any;

  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  searchFamily(page?: number){
    // console.log('attempt search')
    this.http.get('households/household-folders', {params:{'filter[search]': this.search_item, page: !page ? this.current_page : page, per_page: this.per_page, include: 'barangay'}}).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.family_list = data.data;

        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
      },
      error: err => console.log(err)
    });
  }

  selectFolder(data){
    let value = {
      type: 'select',
      data: data
    }
    this.transaction.emit(value);
    this.closeModal();
  }

  closeModal(){
    this.toggleModal.emit('family-folder-moodal');
  }

  createNewFolder(){
    let value = {
      type: 'new'
    }
    this.transaction.emit(value);
    this.closeModal();
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    if(this.last_name) {
      this.search_item = this.last_name;
      this.searchFamily();
    }
  }
}
