import { PluginSettingTab } from "obsidian";
import ReadingViewEnhancer from "../main";
import BlockSelectorSettings from "./block";
import MiscellaneousSettings from "./miscellaneous";

export interface RveSettings {
	blockColor: string;
	enableBlockSelector: boolean;
	disableBlockSelectorOnMobile: boolean;
	alwaysOnCollapseIndicator: boolean;
	preventTableOverflowing: boolean;
	scrollableCode: boolean;
}

export const DEFAULT_SETTINGS: RveSettings = {
	blockColor: "#8b6cef", // Obsidian default color
	enableBlockSelector: false,
	disableBlockSelectorOnMobile: false,
	alwaysOnCollapseIndicator: false,
	preventTableOverflowing: false,
	scrollableCode: false,
};

// ===================================================================

/**
 * Settings tab.
 * In this tab, you can change settings.
 *
 * - Block color
 * - Enable/Disable Block Selector
 */
export class RveSettingTab extends PluginSettingTab {
	plugin: ReadingViewEnhancer;

	constructor(plugin: ReadingViewEnhancer) {
		super(app, plugin);
		this.plugin = plugin;
	}

	/**
	 * Displays settings tab.
	 */
	display() {
		const { containerEl } = this;

		// Clear all first
		containerEl.empty();

		// Add header
		containerEl.createEl("h1", { text: "Reading View Enhancer" });

		// Add block selector settings
		new BlockSelectorSettings(containerEl, this.plugin);

		// Add miscellaneous settings
		new MiscellaneousSettings(containerEl, this.plugin);
	}
}
