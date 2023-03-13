# Reading View Enhancer plugin for Obsidian

This is a plugin for [Obsidian](https://obsidian.md/) that enhances the reading experience in preview mode
by adding a "collapse indicator" selector. Use arrow keys to select next/previous "collapse indicator" and
fold/unfold easily.

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

- Using `curl`
- Downloading this these files into `plugins/obsidian-reading-view-enhancer` folder
  - `main.js`
  - `styles.css`
  - `manifest.json`

After installation,

1. Restart your Obsidian
2. Go to `Settings > Community Plugins > Installed plugins`
3. Turn on the switch of "Reading View Enhancer" to enable the plugin

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

### Downloading and Extracting

1. Download this files from the latest [release](https://github.com/Galacsh/obsidian-reading-view-enhancer/releases)
   - `main.js`
   - `styles.css`
   - `manifest.json`
2. Create a directory(`obsidian-reading-view-enhancer`) inside `.obsidian/plugins`
3. Move files to your vault's `.obsidian/plugins/obsidian-reading-view-enhancer` folder
