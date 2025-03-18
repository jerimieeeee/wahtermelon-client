import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges {
  @Output() pageChange = new EventEmitter<any>();
  @Input() meta_info: any;
  faAnglesLeft = faAnglesLeft;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesRight = faAnglesRight;

  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  loadList(page){
    this.pageChange.emit(page);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.meta_info)
    this.current_page = this.meta_info.current_page;
    this.last_page = this.meta_info.last_page;
    this.from = this.meta_info.from;
    this.to = this.meta_info.to;
    this.total = this.meta_info.total
  }
}
