import { Component, signal } from '@angular/core';
import { ServerStatus } from './interfaces/serverStatus';
import { DialogState } from './components/dialog/dialog.component';
import { Theme } from './enums/theme';

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
      name: "Close",
      expanded: true
    }]
  })

  settingDialogState = signal<DialogState>({
    open: false,
    buttons: [{
      name: "Close",
      expanded: true
    }]
  })

  code = "diggaaahhhh hab doch keine ahnung was da rein muss";

  themes: Theme[] = Object.values(Theme);

  theme = signal<Theme>(Theme.Dracula)

  constructor() {
    this.theme.set(Object.values(Theme).find(theme => theme === localStorage.getItem("theme")) ? localStorage.getItem("theme") as Theme : Theme.Dracula);

    this.onThemeSelection();
  }

  /**
   * Updates the localStorage and updates the current theme
   */
  onThemeSelection() {
    document.body.setAttribute("data-theme", this.theme());
    localStorage.setItem("theme", this.theme());
  }
}
