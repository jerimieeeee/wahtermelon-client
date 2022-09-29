import { animate, state, style, transition, trigger } from "@angular/animations";

export const openCloseTrigger = [
  trigger('myInsertRemoveTrigger', [
    transition(':enter', [
      style({width: 0, opacity: 0, visibility: 'hidden'}),
      animate('250ms', style({ width: '50%', opacity: '100%', visibility: 'visible'})),
    ]),
    transition(':leave', [
      animate('250ms', style({ width: 0, opacity: 0, visibility: 'hidden', overflow: 'hidden' }))
    ])
  ]),
]
