# Reading View Enhancer plugin for Obsidian

This is a plugin for [Obsidian](https://obsidian.md/) that enhances the reading experience in preview mode
by adding a "collapse indicator" selector. Use arrow keys to select next/previous "collapse indicator" and
fold/unfold easily.

> 📌 Commands are only available if the current active view is in a **reading(preview)** mode.

## Known Issues

- [ ] **Dynamically loaded collapse indicators - not selectable**

Looks like reading view uses some kind of dynamic loading.
I update the list of **"selectable" collapse indicators** whenever there is a change in DOM. So if some collapse indicators are removed from the DOM by dynamic loading, it means that they are not selectable anymore.

- [ ] Invisible, but selectable metadata(frontmatter)

I didn't consider the `Settings > Editor > Show Frontmatter: false` option.
Since I check the 'is-collapsed' class for collapse indicator selection, the invisible collapse indicator has become selectable.

- [ ] Lack of knowledge about plugin development

Actually, I didn't read the [docs](https://marcus.se.net/obsidian-plugin-docs/) much. I'm on reading now!

## Features

- `Reading View Enhancer: Activate selector`
  - Start using the "collapse indicator" selector
- `Reading View Enhancer: Deactivate selector`
  - Turn back to default reading view by deactivating the selector
  - By default, `Esc` deactivates the selector
- Use arrow keys to interact with "collapse indicator"s
  - `Arrow Up`: Select previous "collapse indicator"
  - `Arrow Down`: Select next "collapse indicator"
  - `Arrow Left & Right`: Toggle fold/unfold"
- Click to select nearest "collapse indicator" from clicked position

> Note that the change of a focus deactivates the selector.

## How to install manually?

There might be various ways to install this plugin.

1. Using Obsidian42-BRAT (Recommended)
2. Using `curl`
3. Downloading these files into `plugins/obsidian-reading-view-enhancer` folder

- `main.js`
- `styles.css`
- `manifest.json`

After installation,

1. Go to `Settings > Community Plugins > Installed plugins`
2. Refresh the list
3. Turn on the switch of "Reading View Enhancer" to enable the plugin

### Using Obsidian42-BRAT (Recommended)

By using [Obsidian42-BRAT](https://obsidian.md/plugins?id=obsidian42-brat), you could easily install & update this plugin.

1. Install **Obsidian42-BRAT**
2. Enable Obsidian42-BRAT
3. Go to Obsidian42-BRAT options page
4. Beta plugins list > `Add Beta plugin`
5. Paste this `https://github.com/Galacsh/obsidian-reading-view-enhancer`
6. After installation is done, go to `Settings > Community Plugins > Installed plugins`
7. Refresh the list
8. Turn on the switch of "Reading View Enhancer" to enable the plugin

### Using `curl`

Before to run the code, make sure to change `[VAULT]` and `[RELEASE_VERSION]` into a real value.

```shell
# Go to your vault's plugins folder
cd [VAULT]/.obsidian/plugins
# Make a directory
mkdir obsidian-reading-view-enhancer
cd obsidian-reading-view-enhancer
# Download
curl -OL https://github.com/Galacsh/obsidian-reading-view-enhancer/releases/download/[RELEASE_VERSION]/main.js
curl -OL https://github.com/Galacsh/obsidian-reading-view-enhancer/releases/download/[RELEASE_VERSION]/styles.css
curl -OL https://github.com/Galacsh/obsidian-reading-view-enhancer/releases/download/[RELEASE_VERSION]/manifest.json
```

### By downloading manually

1. Download this files from the latest [release](https://github.com/Galacsh/obsidian-reading-view-enhancer/releases)
   - `main.js`
   - `styles.css`
   - `manifest.json`
2. Create a directory(`obsidian-reading-view-enhancer`) inside `.obsidian/plugins`
3. Move files to your vault's `.obsidian/plugins/obsidian-reading-view-enhancer` folder
