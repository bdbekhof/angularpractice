import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut',[
  state('visible', style({ opacity: 1, height: '*' })),
  state('hidden', style({ opacity: 0, height: 0 })),
  transition('hidden <=> visible', [animate('300ms ease-in-out')])
]);