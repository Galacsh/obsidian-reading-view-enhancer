import { PluginSettingTab } from "obsidian";
import ReadingViewEnhancer from "../main";
import { RveSettings } from "./types";
import CaretSettings from "./caret";
import { toHex } from "color2k";

export const DEFAULT_SETTINGS: RveSettings = {
	caretColor: toHex(
		getComputedStyle(document.body).getPropertyValue("--color-accent").trim()
	),
	alwaysEnableCaret: false,
};

export class RveSettingTab extends PluginSettingTab {
	plugin: ReadingViewEnhancer;

	constructor(plugin: ReadingViewEnhancer) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const { containerEl } = this;

		// Clear all first
		containerEl.empty();

		// Add header
		containerEl.createEl("h1", { text: "Reading View Enhancer" });

		// Add caret settings
		new CaretSettings(containerEl, this.plugin);
	}
}
