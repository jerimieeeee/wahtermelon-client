import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { VizCreateOptions, ToolbarPosition} from 'ngx-tableau'


@Component({
  selector: 'app-health-financing',
  templateUrl: './health-financing.component.html',
  styleUrls: ['./health-financing.component.scss']
})
export class HealthFinancingComponent {

  userInfo: any;
  options: any;


  tabloid(){

      this.options = {
      hideTabs: true,
      hideToolbar: true,
      disableUrlActionsPopups: true,
      width: '1225px',
      height: '1300px'

    };

    // if ( divElement.offsetWidth > 500 ) { vizElement.style.width='1100px';vizElement.style.height='2327px';} else { vizElement.style.width='100%';vizElement.style.height='6777px';}

  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService
  ) { }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.tabloid();
    this.userInfo = this.http.getUserFromJSON();
    console.log(this.userInfo)
 }
}
