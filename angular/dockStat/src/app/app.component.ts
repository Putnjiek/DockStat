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

  code = `
mintimeout: 10000 # The minimum time to wait before querying the same server again, defaults to 5000 Ms

log:
  logsize: 10 # Specify the Size of the log files in MB, default is 1MB
  LogCount: 1 # How many log files should be kept in rotation. Default is 5

tags:
  public: yellow-200
  private: stone-950
  databank: cyan-900
  important: red-900
  unused: gray-600

hosts:
  Fin-1:
    url: 10.0.0.2
    port: 2375

container:
  outline: # Container name
    link: https://github.com
    icon: SI:outline
    tags: public

  dockstat-demo:
    link: http://dockstatdemo.hetzner.itsnik.de/
    tags: public

  dockstatapi-demo:
    link: https://dockstatapidemo.hetzner.itsnik.de/stats
    tags: public

  postgres:
    icon: SI:postgresql
    tags: databank

  redis:
    icon: SI:redis
    tags: databank

  docker-proxy-fin-1:
    icon: SI:docker
    tags: proxy

  NginxProxyManager:
    icon: SI:nginxproxymanager
    link: http://localhost:81

  freshrss:
    icon: SI:rss
    link: http://localhost:9891
    tags: unused

  truecommand:
    icon: SI:truenas
    link: http://localhost:9999
    tags: unused

  scarlett-media:
    icon: SI:apache
    link: http://scarlett.itsnik.de
    tags: unused

  openspeedtest:
    icon: SI:speedtest
    link: https://speed.hetzner.itsnik.de
    tags: public

  ntfy:
    icon: SI:ntfy
    tags: unused
`;

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

  highlightYaml(yaml: string): string {
    let highlightedYaml = yaml.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');

    highlightedYaml = highlightedYaml
      .replace(/(^|\s)([a-zA-Z0-9_-]+)(?=:)/g, '$1<span class="key">$2</span>') // Highlight keys
      .replace(/:\s([a-zA-Z0-9._/-]+)(?=\s|$)/g, ': <span class="value">$1</span>') // Highlight values
      .replace(/#(.*)$/gm, '<span class="comment">#$1</span>'); // Highlight comments

    return highlightedYaml;
  }
}
