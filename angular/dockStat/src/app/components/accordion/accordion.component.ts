import { Component, input, model, OnDestroy, signal } from '@angular/core';
import { Container } from '../../interfaces/container';
import { ServerStatus } from '../../interfaces/serverStatus';
import { ContainerService } from '../../services/container.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent implements OnDestroy {

  containers = model.required<Container[]>();

  serverStatus = input.required<ServerStatus>();

  isAccordionOpen = signal(true);

  subscription = new Subscription();

  constructor(private containerService: ContainerService) {
    this.subscription.add(this.containerService.allContainers$.subscribe(allContainers => {
      this.containers.set(allContainers);
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
