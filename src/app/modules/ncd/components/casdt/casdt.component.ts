import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus,faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-casdt',
  templateUrl: './casdt.component.html',
  styleUrls: ['./casdt.component.scss']
})
export class CasdtComponent implements OnInit {

  faInfoCircle = faInfoCircle;

  size = [
    {code: 'small', desc: 'Small'},
    {code: 'normal', desc: 'Normal'},
    {code: 'large', desc: 'Large'}
  ];

  shape = [
    {code: 'pear', desc: 'Pear Shaped'},
    {code: 'horn', desc: 'Horn Shaped'},
    {code: 'heart', desc: 'Heart Shaped'},
    {code: 'double', desc: 'Double'},
    {code: 'tshaped', desc: 'T-Shaped'},
    {code: 'tipped', desc: 'Tipped'}
  ];

  position = [
    {code: 'mid', desc: 'Mid'},
    {code: 'anteflexed', desc: 'Anteflexed'},
    {code: 'retroflexed', desc: 'Retroflexed'},
    {code: 'retroverted', desc: 'Retroverted'},
    {code: 'anteverted', desc: 'Anteverted'}
  ];

  question = [
    {code: 'Y', desc: 'Yes'},
    {code: 'N', desc: 'No'}
  ];

  papsmear = [
    {code: 'a', desc: 'Positive'},
    {code: 'b', desc: 'Negative'},
    {code: 'c', desc: 'Suspect Cancer'}
  ];




  constructor() { }

  ngOnInit(): void {
  }

}
