import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { VizCreateOptions, ToolbarPosition} from 'ngx-tableau'


@Component({
    selector: 'app-health-financing',
    templateUrl: './health-financing.component.html',
    styleUrls: ['./health-financing.component.scss'],
    standalone: false
})
export class HealthFinancingComponent {

  userInfo: any;
  options: any;




tabloid(){
  var divElement = document.getElementById('viz1733728776832');
  var vizElement = divElement.getElementsByTagName('object')[0];
  if ( divElement.offsetWidth > 800 ) { vizElement.style.width='1225px';vizElement.style.height='1000px';}
  else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='1225px';vizElement.style.height='1000px';}
  else { vizElement.style.width='100%';vizElement.style.height='4000px';}
  var scriptElement = document.createElement('script');
  scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
  vizElement.parentNode.insertBefore(scriptElement, vizElement);
};

tabloid2(){
  var divElement = document.getElementById('viz1733795611281');
  var vizElement = divElement.getElementsByTagName('object')[0];
  if ( divElement.offsetWidth > 800 ) { vizElement.style.width='1225px';vizElement.style.height='1227px';}
  else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='1225px';vizElement.style.height='1227px';}
  else { vizElement.style.width='100%';vizElement.style.height='4727px';}
  var scriptElement = document.createElement('script');
  scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
  vizElement.parentNode.insertBefore(scriptElement, vizElement);
};


tabloid3(){
  var divElement = document.getElementById('viz1733791127072');
  var vizElement = divElement.getElementsByTagName('object')[0];
  if ( divElement.offsetWidth > 800 ) { vizElement.style.width='1225px';vizElement.style.height='1027px';}
  else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='1225px';vizElement.style.height='1027px';}
  else { vizElement.style.width='100%';vizElement.style.height='2127px';}
  var scriptElement = document.createElement('script');
  scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
  vizElement.parentNode.insertBefore(scriptElement, vizElement);
};

tabloid4(){
  var divElement = document.getElementById('viz1733791599568');
  var vizElement = divElement.getElementsByTagName('object')[0];
  if ( divElement.offsetWidth > 800 ) { vizElement.style.width='1225px';vizElement.style.height='1027px';}
  else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='1225px';vizElement.style.height='1027px';}
  else { vizElement.style.width='100%';vizElement.style.height='2127px';}
  var scriptElement = document.createElement('script');
  scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
  vizElement.parentNode.insertBefore(scriptElement, vizElement);
};

tabloid5(){
  var divElement = document.getElementById('viz1733795339204');
  var vizElement = divElement.getElementsByTagName('object')[0];
  if ( divElement.offsetWidth > 800 ) { vizElement.style.width='1225px';vizElement.style.height='827px';}
  else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='1225px';vizElement.style.height='827px';}
  else { vizElement.style.width='100%';vizElement.style.height='1027px';}
  var scriptElement = document.createElement('script');
  scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
  vizElement.parentNode.insertBefore(scriptElement, vizElement);
};


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService
  ) { }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.tabloid();
    this.tabloid2();
    this.tabloid3();
    this.tabloid4();
    this.tabloid5();
    this.userInfo = this.http.getUserFromJSON();
    console.log(this.userInfo)
 }
}
