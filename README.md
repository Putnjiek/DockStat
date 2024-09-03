<h1 align="center">🐳 Dockstat 🐳</h1>
<p align="center">
  A new Docker Monitoring software
</p>

Dockstat is a monitoring frontend powered by the [DockStatAPI](https://github.com/Its4Nik/dockstatapi).

It shows usage statistics like CPU, RAM and Network usage.

![Example, Night Theme](/docs/screenshots/night.png)

See more examples [here](/docs/MultipleThemes.md).

## 🖊️ WORK IN PROGRESS

- [X] Refactoring
- [X] Fix theme switcher
- [X] WebUI for API config (Read only)
- [ ] WebUI for adding/removing hosts from the config of DockStatAPI
- [X] Sorting for Hosts
- [X] Custom host Tags like "Raspberry" or "Cloudserver"
- [ ] Alert System using apprise or similar
- [X] better mobile UI
- [ ] Host Stats (CPU Cores, Max RAM amount available and ram used by containers)
- [X] More themes
- [X] More advanced sub pages.
- [X] Exlude network mode "host" from network stats or do smth else with it (not sure yet)
- [ ] Add "Secondary API Host" for High availability
- [ ] Persistent choice of Theme / Refresh rate

## ⬇️ Installation using Docker:

```yaml
name: DockStat
services:
  # Frontend
  dockstat:
    image: ghcr.io/its4nik/dockstat:latest
    container_name: dockstat
    ports:
      - "4444:3000"
    environment:
      - API_URL="http://localhost:7070" # Host of the DockStatAPI endpoint
      - DEFAULT_THEME="dracula"
      - SECRET="CHANGME"
      - LOGO_SIZE="M"                   # Default Logo Size "M"
      - DM_LOGO_COLOR="#FFFFFF"         # Default Dark mode logo color "#FFFFFF" (white) 
      - LM_LOGO_COLOR="#000000"         # Default Dark mode logo color "#000000" (black)
    volumes:
      - ./dockstat/icons:/app/build/icons
    restart: always

    # API:
  dockstatapi:
    image: ghcr.io/its4nik/dockstatapi:latest
    container_name: dockstatapi
    environment:
      - SECRET=CHANGEME # This is required in the header 'Authorization': 'CHANGEME'
    ports:
      - "7070:7070"
    volumes:
      - ./dockstatapi:/api/config # Place your hosts.yaml file here
    restart: always
```

## 🖊️ Configuration

⚠️ = required

⚙️ = optional

---

- ⚠️ API_URL: The URL of the DockStatAPI endpoint

- ⚠️ SECRET: The Secret Token required fot the DockStatAPI endpoint

- ⚙️ DEFAULT_THEME: default theme. Screenshots [here](/docs/MultipleThemes.md)

- ⚙️ LOGO_SIZE: Logo sizes (XS, S, M, L, XL)

- ⚙️ DM_LOGO_COLOR: Darkmode Logo Color (as HEX)

- ⚙️ LM_LOGO_COLOR: Lightmode Logo Color (as HEX)

To use the original logo colors you NEED to enter "original" in both, `LM_LOGO_COLOR` and `DM_LOGO_COLOR`.

ℹ️ Please use HTTPS to fetch data from the API

---

### ❗❗❗ THIS CONFIGURATION IS FOR THE API ❗❗❗

Please place this file inside the mounted directory for `/api/config`.

Example for the host.yaml file:
```yaml
mintimeout: 10000 # The minimum time to wait before querying the same server again, defaults to 5000 Ms

log:
  logsize: 10 # Specify the Size of the log files in MB, default is 1MB
  LogCount: 1 # How many log files should be kept in rotation. Default is 5

hosts:
  YourHost1:
    url: server.local
    port: 2375

  YourHost2:
    url: raspberrypi.local
    port: 1234

  YourHost3:
    url: dockerhost.local
    port: 4321


container:
  MyContainer: # Container name
    link: https://github.com
    icon: container.png
```

---

## 🔗 Add quick links to containers

To add quick links to your containers, marked by the chain icon on the left site of the container, you need to specify them like this inside the yaml* file:

*) The yaml file of the DockStatAPI

```yaml
container:
  MyContainer:
    link: https://github.com
```

Inside the container section you can specify the link of said container by referencing the container's name.

---

## 🖼️ Add logos to containers

### Simple Icons:

To use Simple Icons, you can just prefix the icon name with "SI:" and then it will fetch the Simple Icon from their CDN.

Example:

```yaml
container:
  redis:
    icon: SI:redis
```

![Redis Example icon](/docs/screenshots/redis.png)

### Custom Logo:

To add a logo to a container you can reference the logo file like this inside the yaml* file:

*) The yaml file of the DockStatAPI

```yaml
container:
  MyContainer:
    icon: mylogo.png
```

Be sure to mount the path `/app/build/icons` from the docker container and to populate it with your own icons.

📰 Example:

> I have a Logo.png file inside the `/app/build/icons` (mounted as `./icons` on the host)

> This is what my config, of the dockstat api should look like:

```yaml
container:
  MyContainer:
    icon: Logo.png
```

> Now the container with the name "MyContainer" will have this logo displayed.

---

## ✨ Tag different containers

![Tag example](/docs/screenshots/examples/16.png)
To Tag different containers you have to add this to the config of your desired container at the backend side:

```yaml
container:
  MyContainer:
    tags: private:violet-400
```

You can add multiple tags by seperating them like this:

(I don't recommend more then 2 tags otherwise it will look cluttered)

```yaml
container:
  MyContainer:
    tags: private:violet-400,cloudserver:red-200
```

For color specifications we are using TailwindCSS background color values.

Just take the desired color and remove the `border-` infront of the text.

To choose the right color for your need have a look here:
https://tailwindcss.com/docs/border-color

All supported colors are [here](/src/components/css/Tags.css).   

⚠️ Only full borders are supported somethin like `border-x-teal-50` or `x-teal-50` will not work.

The config for the example was this one:
```yaml
constainer:
  dockstatapi:
    tags: private:violet-700,cloudserver:red-900,api:blue-800
```

---

## Star History

<a href="https://star-history.com/#its4nik/dockstat&its4nik/dockstatapi&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=its4nik/dockstat,its4nik/dockstatapi&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=its4nik/dockstat,its4nik/dockstatapi&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=its4nik/dockstat,its4nik/dockstatapi&type=Date" />
 </picture>
</a>

---

## 🚫 Known Issues
### Open:

3. No "Known Issues" 🎉🎉🎉

---
### Resolved:

2. Adding the default theme will make other themes unusable due to not being able to select them.

1. Theme switching only works once to the selected theme, you cant change back (yet). See the code logic here:

```javascript
// App.js - Line 42 -> 51

useEffect(() => {
        setLoadingTheme(true);
        if (theme === 'nord') {
            import('./themes/nord.css').then(() => setLoadingTheme(false));
        } else if (theme === 'dracula') {
            import('./themes/dracula.css').then(() => setLoadingTheme(false));
        } else if (theme === 'light') {
            import('./themes/light.css').then(() => setLoadingTheme(false));
        }
    }, [theme]);
```

---

Please don't judge this project, it's my first time using react in a bigger project.

For more information open a new issue :D
