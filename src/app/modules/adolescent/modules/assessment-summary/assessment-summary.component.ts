import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { faChevronCircleDown, faChevronCircleUp, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assessment-summary',
  templateUrl: './assessment-summary.component.html',
  styleUrl: './assessment-summary.component.scss'
})
export class AssessmentSummaryComponent implements OnInit {


  faSave = faSave;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;
  faSpinner = faSpinner;

  show_content: boolean = true;
  is_saving: boolean = false;
  toggle_content: boolean = true;

  g2 = [
    { name: 'Have you been involvedin fights? Involved in gangs? When was your last fight?', id:'1' },
    { name: 'Have you ever been injured in a fight? Have you ever injured someone else in a fight?', id:'2' },
    { name: 'Has your partner ever hit or hurt you? Have you ever hit or hurt your partner? Have you been forced to have sex against your will?', id:'3' },
    { name: 'Has someone carrying a weapon ever threatened you? What happened?', id:'4' },
    { name: 'Has anything changed since then to make you feel safer?' },
    { name: 'What do you do if someone tries to pick a fight with you?', id:'6' },
    { name: 'Have you ever carried a weapon in self-defense?', id:'7' },
    { name: 'Do you ever have thoughts of hurting yourself?', id:'8' },
    { name: 'Do you have a plan?', id:'9' },
    { name: 'Do you have access to what you need to carry out your plan?', id:'10' },
    { name: 'Have you been exposed to violent discipline or have a history of aggressive behavior?', id:'11' },
    { name: 'How much exposure do you have to social media violence?', id:'12' },
    { name: 'Do you have any history of multiple or serious injuries?', id:'13' },
    { name: 'Are you involved or engaged in alcohol/ drugs/ substance use?', id:'14' },
  ];

  ngOnInit(): void {
    console.log()
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnChanges(changes){
    this.show_content = this.toggle_content;

  }


}
