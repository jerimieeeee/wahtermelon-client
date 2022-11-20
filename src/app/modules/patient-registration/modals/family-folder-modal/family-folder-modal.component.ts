import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheck, faSearch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-family-folder-modal',
  templateUrl: './family-folder-modal.component.html',
  styleUrls: ['./family-folder-modal.component.scss']
})
export class FamilyFolderModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Output() transaction = new EventEmitter<any>();
  @Input() last_name;

  faSearch = faSearch;
  faCheck = faCheck;

  search_item: string;
  family_list: any;

  searchFamily(){
    console.log('attempt search')
    this.http.get('households/household-folders', {params:{'filter[search]': this.search_item, per_page: 'all'}}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.family_list = data.data;
      },
      error: err => console.log(err)
    })
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
    console.log(this.last_name);
  }

}
