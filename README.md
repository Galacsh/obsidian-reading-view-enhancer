# Reading View Enhancer Plugin

The Reading View Enhancer is an Obsidian plugin designed to improve the reading experience in Obsidian's reading view mode.
It provides several features aimed at making the reading view more convenient and comfortable.

## Features

### Overview

- **Keyboard block navigation**
  - Select the next block
  - Select the previous block
- **Toggle collapse with keyboard**
- **Auto-select top block on switching into reading view**
- **Always-visible collapse indicators**
  - Keep all collapse indicators visible
- **Right side collapse indicator** (experimental)
- **Scrollable code blocks**
  - Make code blocks scrollable instead of line-wrapping
- **Block highlighting in reading view**

### Keyboard Block Navigation

> ⚡️ Settings > Reading View Enhancer > Enable Block Selector

This feature allows you to select **blocks** in the reading view by pressing keyboard. Selected blocks will be highlighted.

Paragraphs, headings, lists, tables, code blocks, quotes, media elements,
and callouts are examples of blocks.

- Default key binding
  - `ArrowDown | KeyJ`: Select the next block
  - `ArrowUp | KeyK`: Select the previous block

> [!IMPORTANT]
> If a selected block is too long, the plugin will automatically scroll to display
> the block's top or bottom, loading adjacent blocks that are not yet in the DOM tree.

> [!NOTE]
> Additionally, there is a `Select top block in the view` command,
> which allows you to assign a hotkey for keyboard control.

#### Block Color

> ⚡️ Settings > Reading View Enhancer > Block color

You can set a custom color and transparency for the block highlight effect.

### Toggle collapse with keyboard

When a block is selected and collapsible, you can use your keyboard to toggle collapse.

- Default key binding
  - `ArrowLeft | KeyH | ArrowRight | KeyL`: Toggle collapse

### Auto-select top block on switching into reading view

> ⚡️ Settings > Reading View Enhancer > Auto-select top block

When you switch to reading view, the top block will be automatically selected.

### Always-visible Collapse Indicators

> ⚡️ Settings > Reading View Enhancer > Always on collapse indicator

By default, collapse indicators are invisible until hovered over.  
This option keeps indicators always visible.

### Right side collapse indicator (experimental)

> ⚡️ Settings > Reading View Enhancer > [Experimental] Collapse indicator on the right side

Set collapse indicators to be shown on the right side.

> [!WARNING]
> Since this makes some elements relative that were previously not, may lead some problems.

### Scrollable Code Blocks

> ⚡️ Settings > Reading View Enhancer > Scrollable code

This feature makes code blocks scrollable in reading view,
rather than using line-wrapping.

By default, codes get line-wrapped when it's too long.  
With this option, you can make code blocks scrollable instead of line break.

> [!IMPORTANT]
> This feature is for reading view. For the editor,
> install "Style Settings" plugin and set the code block to scrollable.

### Block Highlighting in Reading View

When a block is selected, you can highlight the block right away in the reading view by running the command:

`Reading View Enhancer: Toggle Block Highlight`.

> [!TIP]  
> Assign a hot key for more convenient use.  
> For example, I use `Ctrl + Shift + h`.

> [!NOTE]  
> **Why it blinks during the highlight?**  
> This is because the plugin changes to 'editor' mode to insert the `==` syntax for highlighting and then changes back to 'reading' mode.
>
> This is the only way I found to toggle the highlight while **keeping the editing history**. You can always undo the highlight by pressing `Ctrl + z` in the editing mode.

## How to install manually?

By using [Obsidian42-BRAT](https://obsidian.md/plugins?id=obsidian42-brat), you could easily install & update this plugin.

1. Install **Obsidian42-BRAT**
2. Enable Obsidian42-BRAT
3. Go to Obsidian42-BRAT options page
4. Beta plugins list > `Add Beta plugin`
5. Paste this `https://github.com/Galacsh/obsidian-reading-view-enhancer`
6. Go to `Settings > Community Plugins > Installed plugins`
7. Refresh the list
8. Turn on the switch of "Reading View Enhancer" to enable the plugin
