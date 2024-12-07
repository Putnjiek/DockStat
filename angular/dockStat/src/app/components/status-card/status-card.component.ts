import { Component, OnDestroy, signal } from '@angular/core';
import { ServerStatus } from '../../interfaces/serverStatus';
import { ContainerService } from '../../services/container.service';
import { Subscription } from 'rxjs';
import { Container } from '../../interfaces/container';
import { mockContainers } from '../../mockdata/containers';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrl: './status-card.component.scss'
})
export class StatusCardComponent implements OnDestroy {
  serverStatus: ServerStatus = {
    availableMemory: 7.57,
    memoryUsage: 24.12,
    cpuCores: 4,
    cpuUsage: 155.83
  }

  containers = signal<Container[]>(mockContainers)

  subscription = new Subscription();

  constructor(private containerService: ContainerService) {
    this.containerService.getAll();
    this.subscription.add(this.containerService.allContainers$.subscribe(allContainers => {
      // this.containers.set(allContainers);
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
