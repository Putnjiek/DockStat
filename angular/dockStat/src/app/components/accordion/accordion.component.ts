import { Component, input, model, signal } from '@angular/core';
import { Container } from '../../interfaces/container';
import { ServerStatus } from '../../interfaces/serverStatus';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  animations: [
    trigger('accordionToggle', [
      state('open', style({ height: '*', opacity: 1 })),
      state('closed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      transition('open <=> closed', [
        animate('0.5s cubic-bezier(.4, 0, .2, 1)')
      ]),
    ]),
  ]
})
export class AccordionComponent {

  containers = model.required<Container[]>();

  serverStatus = input.required<ServerStatus>();

  isAccordionOpen = signal(true);
}
