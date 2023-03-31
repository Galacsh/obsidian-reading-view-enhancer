# Reading View Enhancer Plugin

The Reading View Enhancer is an Obsidian plugin designed to improve the reading experience in Obsidian's reading view mode. It provides several features aimed at making the reading view more convenient and comfortable.

## Features

### Overview

- **Keyboard block navigation**
  - `ArrowDown`: Select the next block
  - `ArrowUp`: Select the previous block
- **Keyboard fold/unfold toggling**
  - `ArrowLeft`/`ArrowRight`: Toggle fold/unfold
    - 📌 Collapsible callouts can also be folded/unfolded
- **Always-visible collapse indicators**
  - Keep all collapse indicators visible
- **Table overflow prevention**
  - Make tables scrollable to prevent overflowing
- **Scrollable code blocks**
  - Make code blocks scrollable instead of line-wrapping

### Keyboard Block Navigation

> ⚡️ Settings > Reading View Enhancer > Enable Block Selector

https://user-images.githubusercontent.com/78684419/228733812-26bfa11a-f246-4153-83ea-eed9aae39753.mov

Inspired by Notion's block navigation, this feature allows you to select blocks
in the reading view by clicking on them. Selected blocks will be highlighted,
and you can navigate between blocks using the arrow keys.

💡 Additionally, there is a `Select top block in the view` command,
which allows you to assign a hotkey for keyboard control.

If a selected block is too long, the plugin will automatically scroll to display
the block's top or bottom, loading adjacent blocks that are not yet in the DOM tree.

- `ArrowDown`: Select the next block
- `ArrowUp`: Select the previous block
- `ArrowLeft`/`ArrowRight`: Toggle fold/unfold

❗️ To disable this feature only on mobile,
enable the 'Disable Block Selector on Mobile' option in settings.

#### What is a "Block"?

In this plugin, a "block" refers to an HTML element that can be
considered a distinct content unit within a markdown document.
Paragraphs, headings, lists, tables, code blocks, quotes, media elements,
and callouts are examples of blocks.

#### Block Color

> ⚡️ Settings > Reading View Enhancer > Block Color

You can set a custom color for the block highlight effect.

### Always-visible Collapse Indicators

> ⚡️ Settings > Reading View Enhancer > Always on collapse indicator

By default, collapse indicators are invisible until hovered over.

<img width="400" alt="no-indicator" src="https://user-images.githubusercontent.com/78684419/228733972-6b364496-071b-469a-a401-656b3df27311.png">

This option,

<img width="400" alt="turn-on-indicator" src="https://user-images.githubusercontent.com/78684419/228734050-54d19f73-35cd-4eba-ae33-8d91f7bed180.png">

keeps indicators always visible.

<img width="400" alt="has-indicator" src="https://user-images.githubusercontent.com/78684419/228734081-99e58a5d-b6b2-4418-92f1-b47db403e7ae.png">

### Table Overflow Prevention

> ⚡️ Settings > Reading View Enhancer > Prevent Table Overflowing

https://user-images.githubusercontent.com/78684419/228734185-aca9e6ee-711e-4929-8e10-a269a43b97f8.mov

Enable horizontally scrollable tables to prevent table overflow.

In Obsidian v1.1.16, tables having a word longer than the viewport's width
will create a horizontal scrollbar across the entire view,
which can be inconvenient on mobile devices.

### Scrollable Code Blocks

> ⚡️ Settings > Reading View Enhancer > Scrollable Code

This feature makes code blocks scrollable, rather than using line-wrapping.

By default, codes get line-wrapped when it's too long.

<img width="400" alt="before-code-scroll" src="https://user-images.githubusercontent.com/78684419/228734385-2cf4650a-0559-48c8-a1ad-3229f68b40a1.png">

With this option,

<img width="400" alt="turn-on-code-scroll" src="https://user-images.githubusercontent.com/78684419/228734481-5ed5994c-ca63-4777-9341-8da105afcc94.png">

You can make code blocks scrollable instead of line break.

<img width="400" alt="code-scroll" src="https://user-images.githubusercontent.com/78684419/228734516-77f5446f-2669-43d5-8428-65e400e7a00d.png">

## How to install manually?

There might be various ways to install this plugin.

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
