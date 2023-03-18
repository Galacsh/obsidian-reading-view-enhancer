import { Plugin } from "obsidian";
import setCommandsFor from "./commands";
import {
	DEFAULT_SETTINGS,
	ReadingViewEnhancerSettingTab,
	Settings,
} from "./settings";

export default class ReadingViewEnhancer extends Plugin {
	public settings: Settings;

	async onload() {
		this.loadSettings();

		// Add all commands
		setCommandsFor(this);

		// Add settings tab
		this.addSettingTab(new ReadingViewEnhancerSettingTab(this));

		console.log("Loaded 'Reading View Enhancer'");
	}

	async onunload() {
		console.log("Unloaded 'Reading View Enhancer'");
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
