import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cf2',
  templateUrl: './cf2.component.html',
  styleUrls: ['./cf2.component.scss']
})
export class Cf2Component implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient;
  @Input() program_id;
  @Input() program_name;
  @Input() caserate_list;
  @Input() selected_case;

  faFilePdf = faFilePdf;
  faCircleNotch = faCircleNotch;

  pbef_result: any;
  program_code: string = 'mc';
  program_creds: any;

  pdf_exported: boolean = false;
  show_form: boolean = true;

  caserate_field: any;
  selected_caserate: any;


  paramsTb() {
    console.log(this.selected_caserate);
  }

  paramsCc() {

  }

  loadCf2Params() {
    switch(this.program_name) {
      case 'tb': {
        this.paramsTb();
        break;
      }
      case 'cc': {
        this.paramsCc();
        break;
      }
    }
  }

  selectCaserate() {
    this.selected_caserate = this.caserate_field;
    this.loadCf2Params();
  }

  exportAsPdf: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'mainForm',
    options: {
      image: { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 3},
      margin:  [1, 1, 1, 1],
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'], before:['#medForm2', '#medForm3']},
      jsPDF: {
        orientation: 'portrait',
        format: [216, 330],
        precision: 16
      }
    }
  }

  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'GBV Medical').subscribe(() => {
      this.pdf_exported = false;
    });
  }

  closeModal() {
    this.toggleModal.emit('cf2');
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService,
    private exportAsService: ExportAsService
  ) { }

  ngOnInit(): void {
    console.log(this.selected_case);

    if(this.caserate_list.length === 1) {
      this.selected_caserate = this.caserate_list[0];
      this.loadCf2Params();
    }
  }
}
