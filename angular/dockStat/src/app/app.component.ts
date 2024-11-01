import { Component } from '@angular/core';
import { ServerStatus } from './interfaces/serverStatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dockStat';

  serverStatus: ServerStatus = {
    availableMemory: 7.57,
    memoryUsage: 24.12,
    cpuCores: 4,
    cpuUsage: 155.83
  }
}
