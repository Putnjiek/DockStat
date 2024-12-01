import { Component, signal } from '@angular/core';
import { ServerStatus } from './interfaces/serverStatus';
import { AuthService } from './services/auth.service';
import { DialogState } from './components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DockStat';

  serverStatus: ServerStatus = {
    availableMemory: 7.57,
    memoryUsage: 24.12,
    cpuCores: 4,
    cpuUsage: 155.83
  }

  codeDialogState = signal<DialogState>({
    open: false,
    buttons: [{
      name: "close",
      expanded: true
    }]
  })

  code = "diggaaahhhh hab doch keine ahnung was da rein muss";

  constructor(private authService: AuthService) {
    // this.authService.enable("test")
  }
}
