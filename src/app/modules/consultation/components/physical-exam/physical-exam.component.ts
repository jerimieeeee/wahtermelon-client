import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { faChevronCircleUp, faChevronCircleDown, faSave } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-physical-exam',
  templateUrl: './physical-exam.component.html',
  styleUrls: ['./physical-exam.component.scss']
})
export class PhysicalExamComponent implements OnInit, OnChanges {
  @Input() toggle_content;
  @Input() consult_details;

  faSave = faSave;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;

  pe_grouped = [];

  show_content: boolean =false;

  onSubmit(){

  }

  loadLibraries() {
    this.http.get('libraries/pe').subscribe(
      (data: any) => {
        const list = data.data;

        const groups = list.reduce((groups, item) => {
          const group = (groups[item.category_id] || []);
          group.push(item);
          groups[item.category_id] = group;
          return groups;
        }, {});

        this.pe_grouped = groups;
        // console.log(this.pe_grouped);
      }
    );
  }

  ngOnChanges(changes){
    // this.show_content = this.toggle_content;
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
