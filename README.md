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
- Click to select nearest "collapse indicator" from clicked position

## Installation

- Download the latest release from the [releases page](https://github.com/Galacsh/obsidian-reading-view-enhancer/releases)
- Extract the downloaded folder into your Obsidian plugins folder
- Restart Obsidian if it is running
  - Or, refresh the `Community plugins > Installed plugins`
- Enable the plugin in the `Installed plugins`

### How to install manually?

There might be various ways to install this plugin.

- Using `curl`
- Downloading this [archive file](https://github.com/Galacsh/obsidian-reading-view-enhancer/releases/download/manual-installation/obsidian-reading-view-enhancer.zip) and extracting it to `plugins` folder

After installation,

1. Restart your Obsidian
2. Go to `Settings > Community Plugins > Installed plugins`
3. Turn on the switch of "Reading View Enhancer" to enable the plugin

#### Using `curl`

```shell
# Go to your vault's plugins folder
cd VAULT/.obsidian/plugins
# Download the archive file
curl -O https://github.com/Galacsh/obsidian-reading-view-enhancer/releases/download/manual-installation/obsidian-reading-view-enhancer.zip
# Unzip
unzip obsidian-reading-view-enhancer.zip
# Remove the archive file
rm obsidian-reading-view-enhancer.zip
```

#### Downloading and Extracting

1. Download this [archive file](https://github.com/Galacsh/obsidian-reading-view-enhancer/releases/download/manual-installation/obsidian-reading-view-enhancer.zip)
2. Move the file to your vault's `plugins` forlder
3. Extract the file
   - If you're using MacOS, you could just double click the file to extract
4. Remove the archive file
