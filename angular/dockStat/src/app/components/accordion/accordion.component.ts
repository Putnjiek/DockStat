import { Component, input, model, signal } from '@angular/core';
import { Container } from '../../interfaces/container';
import { ServerStatus } from '../../interfaces/serverStatus';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent {

  containers = model.required<Container[]>();

  serverStatus = input.required<ServerStatus>();

  isAccordionOpen = signal(true);
}
