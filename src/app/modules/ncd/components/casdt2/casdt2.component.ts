import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus,faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-casdt2',
  templateUrl: './casdt2.component.html',
  styleUrls: ['./casdt2.component.scss']
})
export class Casdt2Component implements OnInit {

  faInfoCircle = faInfoCircle;

  eye = [
    {code: 'blurred', desc: 'Blurred (Malabo, maulap o mausok)'},
    {code: 'floaters', desc: 'Floaters (May lumulutang)'},
    {code: 'tearing', desc: 'Tearing (Pagluluha)'},
    {code: 'pain', desc: 'Pain (Mahapdi, masakit o mabigat sa pakiramdam)'},
    {code: 'redness', desc: 'Redness (Namumula)'},
    {code: 'glare', desc: 'Glare (Nasisilaw)'},
    {code: 'discharge', desc: 'Discharge (May muta)'},
    {code: 'photopsia', desc: 'Photopsia (May kumikislap)'},
    {code: 'itchiness', desc: 'Itchiness (Makati)'}
  ];

  opthal = [
    {code: 'a', desc: 'Eye Injury'},
    {code: 'b', desc: 'Foreign Body'}
  ];


  vision_eye = [
    {code: 'right', desc: 'Right Eye'},
    {code: 'left', desc: 'Left Eye'},
    {code: 'both', desc: 'Both Eye'},
    {code: 'none', desc: 'None'}
  ];

  refer = [
    {code: 'improve', desc: 'If VA is 20/40 to 20/100 but IMPROVES WITH PINHOLE: Refer to OPTOMETRIST'},
    {code: 'not', desc: 'If VA is 20/40 to 20/100 but DOES NOT IMPROVE WITH PINHOLE: Refer to OPHTHALMOLOGIST'},
    {code: 'worse', desc: 'If VA is 20/200 or worse: Refer to OPHTHALMOLOGIST'}
  ];




  constructor() { }

  ngOnInit(): void {
  }

}
