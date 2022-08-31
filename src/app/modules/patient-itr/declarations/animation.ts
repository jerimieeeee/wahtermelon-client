import { animate, state, style, transition, trigger } from "@angular/animations";

export const openCloseTrigger = [
  trigger('myInsertRemoveTrigger', [
    transition(':enter', [
      style({width: 0, opacity: 0}),
      animate('200ms', style({ width: '50%', opacity: '100%' })),
    ]),
    transition(':leave', [
      animate('200ms', style({ width: 0, opacity: 0 }))
    ])
  ]),
  trigger('halfFull', [
    state('half', style({width: '50%'})),
    state('full', style({width: '100%'})),
    transition('* => *', [
      animate('200ms')
    ])
  ])
]
